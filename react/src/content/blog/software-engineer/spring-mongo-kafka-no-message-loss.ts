import type { BlogPost } from '../../../types/blog';

export const springMongoKafkaNoMessageLoss: BlogPost = {
  id: 'spring-mongo-kafka-no-message-loss',
  title: 'Surviving DocDB Failover with Spring Data MongoDB and Kafka: The One-Line Throw That Saved Our Messages',
  description: 'When a MongoDB primary fails over during peak traffic, the difference between losing every message and retrying every message is exactly one line of Kotlin. Here is the silent-fallback anti-pattern, the fix, and the production data that proves it works.',
  category: 'software-engineer',
  date: '2026-05-12',
  updatedDate: '2026-05-12',
  tags: ['Spring Boot', 'Spring Data MongoDB', 'Kafka', 'CircuitBreaker', 'Resilience4j', 'Kotlin', 'DocumentDB', 'Production Operations'],
  image: 'documentdb-cons.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list" class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Surviving DocDB Failover</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Surviving DocDB Failover with Spring Data MongoDB and Kafka: The One-Line Throw That Saved Our Messages</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Part 2 of the <em>DocDB Maintenance Survival Guide</em>. When a MongoDB primary fails over during peak traffic, the difference between losing every message and retrying every message is exactly one line of Kotlin.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In <a href="/blog/software-engineer/list/aws-docdb-forced-maintenance/" class="text-indigo-600 hover:underline dark:text-indigo-400">Part 1</a>, we covered how AWS DocumentDB maintenance is unavoidable and how cluster vs instance maintenance fail in completely different ways. The summary: instance maintenance triggers a real failover, your write path goes down for 2&ndash;4 minutes, and whatever your error handling does during that window is your blast radius.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This post is about that error handling. Specifically: a Kafka consumer that persists messages to MongoDB, wrapped in a Resilience4j <code>@CircuitBreaker</code>, with a fallback method that &mdash; following an extremely common pattern &mdash; <strong>logs the error and returns silently</strong>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          That pattern silently drops every message during a failover. Here is how we found out, and the one-line fix.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. TL;DR</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-3 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li>A Resilience4j <code>@CircuitBreaker</code> fallback that <strong>logs and returns</strong> will silently absorb all failures, including the failures that should retry.</li>
            <li>For Kafka consumers persisting to MongoDB, "absorb" means <strong>the offset gets committed and the message is gone</strong>.</li>
            <li>The fix is to <strong>throw the exception argument</strong> from the fallback. Spring Kafka then engages its retry / backoff / DLT machinery, and Kafka's own offset semantics protect you.</li>
            <li>We verified this in production through two real DocumentDB maintenances: 105 errors during a cluster maintenance, 5 errors during an instance maintenance failover. Zero messages lost. One DLT entry across both events, redriven cleanly.</li>
            <li>If you only ship one change after reading this post: audit every <code>@CircuitBreaker</code> fallback in your Kafka consumer paths and confirm it throws.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Setup: Kafka &rarr; CircuitBreaker &rarr; MongoDB</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The architecture is unremarkable. A Kafka consumer receives a message, deserializes it, calls a service method, and the service method calls an adaptor that performs a Mongo write through Spring Data MongoDB.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The Mongo write is wrapped in a Resilience4j <code>@CircuitBreaker</code>. This is a perfectly reasonable choice: when the database becomes unhealthy, you want to fail fast instead of holding consumer threads hostage on every blocked request.
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Component</span>
<span class="text-purple-400">class</span> <span class="text-yellow-300">PushHistoryAdaptor</span>(
    <span class="text-purple-400">private val</span> repository: <span class="text-yellow-300">PushHistoryRepository</span>,
) {
    <span class="text-purple-400">@CircuitBreaker</span>(name = <span class="text-green-400">"mongoWrite"</span>, fallbackMethod = <span class="text-green-400">"saveAllFallback"</span>)
    <span class="text-purple-400">fun</span> <span class="text-blue-400">saveAll</span>(entities: <span class="text-yellow-300">List</span>&lt;<span class="text-yellow-300">PushHistory</span>&gt;) {
        repository.saveAll(entities)
    }

    <span class="text-purple-400">private fun</span> <span class="text-blue-400">saveAllFallback</span>(
        entities: <span class="text-yellow-300">List</span>&lt;<span class="text-yellow-300">PushHistory</span>&gt;,
        e: <span class="text-yellow-300">Exception</span>,
    ) {
        logger.error(<span class="text-green-400">"PushHistory save failed"</span>, e)
        <span class="text-gray-500">// silently returns Unit</span>
    }
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          From the consumer side it looks like this:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@KafkaListener</span>(topics = [<span class="text-green-400">"push-history-events"</span>])
<span class="text-purple-400">fun</span> <span class="text-blue-400">consume</span>(records: <span class="text-yellow-300">List</span>&lt;<span class="text-yellow-300">ConsumerRecord</span>&lt;<span class="text-yellow-300">String</span>, <span class="text-yellow-300">PushHistoryEvent</span>&gt;&gt;) {
    <span class="text-purple-400">val</span> entities = records.map { it.value().toEntity() }
    pushHistoryAdaptor.saveAll(entities)
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The pattern reads cleanly. The fallback "handles" the error. The consumer method completes without throwing. Spring Kafka commits the offset. Everyone goes home happy.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Until the database fails over.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Anti-Pattern: Silent Fallback</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is what happens when the MongoDB primary disappears for 47 seconds during a cluster maintenance:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>The consumer pulls a batch of records from Kafka.</li>
          <li><code>saveAll</code> calls <code>repository.saveAll(entities)</code>.</li>
          <li>Spring Data MongoDB tries to acquire a connection, the driver returns <code>DataAccessResourceFailureException</code>.</li>
          <li>Resilience4j catches the exception, calls <code>saveAllFallback</code>.</li>
          <li>The fallback logs the error and returns. <strong>The consumer method sees no exception</strong>.</li>
          <li>Spring Kafka commits the offset for that batch.</li>
          <li>The next batch arrives. Mongo is still down. Step 4 fires again. Step 6 fires again.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          By the time the database recovers, every message that arrived during the outage has been read, "handled", offset-committed, and <strong>permanently lost</strong>. There is no DLT. There is no retry. The consumer never sees a failure that it can react to. The error log is all you have, and you are now in the recovery business of replaying messages from upstream &mdash; if upstream still has them.
        </p>
        <div class="bg-red-50 dark:bg-red-900/10 p-5 rounded-lg border border-red-200 dark:border-red-800 my-6">
          <p class="text-red-900 dark:text-red-200 mb-0">
            <strong>The anti-pattern in one sentence:</strong> a fallback that does not throw transforms an infrastructure outage into silent message loss, because Spring Kafka's offset commit is driven by whether the listener method threw, not by whether your business logic actually succeeded.
          </p>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. The Fix: One Line</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Resilience4j fallback methods receive the original exception as their last argument. The fix is to throw it.
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">private fun</span> <span class="text-blue-400">saveAllFallback</span>(
    entities: <span class="text-yellow-300">List</span>&lt;<span class="text-yellow-300">PushHistory</span>&gt;,
    e: <span class="text-yellow-300">Exception</span>,
) {
    logger.error(<span class="text-green-400">"PushHistory save failed"</span>, e)
    <span class="text-orange-400">throw</span> e   <span class="text-gray-500">// &larr; the only change</span>
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          That is the entire diff. The fallback still exists. It still logs. The CircuitBreaker still flips open under sustained failure. The only difference is the exception now propagates back to the listener.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          What changes downstream of that throw:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>The <code>@KafkaListener</code> method receives the exception.</li>
          <li>Spring Kafka's <code>DefaultErrorHandler</code> kicks in.</li>
          <li>The configured <code>BackOff</code> (we use <code>FixedBackOff(3000L, 3L)</code>) retries the batch up to 3 times with 3-second delays.</li>
          <li>If all retries fail, the <code>DeadLetterPublishingRecoverer</code> sends the record to a DLT topic.</li>
          <li>Crucially, the offset is <strong>only committed once the record either succeeds or lands in the DLT</strong>. Until then, Kafka considers the message unprocessed.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The Spring Kafka error-handler configuration that backs this looks roughly like:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Bean</span>
<span class="text-purple-400">fun</span> <span class="text-blue-400">errorHandler</span>(template: <span class="text-yellow-300">KafkaTemplate</span>&lt;<span class="text-yellow-300">Any</span>, <span class="text-yellow-300">Any</span>&gt;): <span class="text-yellow-300">DefaultErrorHandler</span> {
    <span class="text-purple-400">val</span> recoverer = <span class="text-yellow-300">DeadLetterPublishingRecoverer</span>(template) { record, _ -&gt;
        <span class="text-yellow-300">TopicPartition</span>(<span class="text-green-400">"\${record.topic()}.DLT"</span>, record.partition())
    }
    <span class="text-purple-400">return</span> <span class="text-yellow-300">DefaultErrorHandler</span>(recoverer, <span class="text-yellow-300">FixedBackOff</span>(<span class="text-orange-400">3000L</span>, <span class="text-orange-400">3L</span>))
}
</pre>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Why This Works: Kafka's Offset Semantics</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The whole pattern hinges on a property of Spring Kafka that is easy to forget: <strong>the listener throwing is the signal that something went wrong</strong>. There is no other signal.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          When the listener method returns normally, Spring Kafka treats it as successful processing and proceeds to commit the offset for that record (or batch). It does not introspect your code. It does not check whether <code>repository.saveAll()</code> actually wrote anything. It does not read the logger output. The contract is binary: returned cleanly = success, threw = failure.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A silent fallback breaks this contract. It catches an actual failure and lies about it. Spring Kafka has no way to know.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Throwing from the fallback restores the contract. Now Spring Kafka sees the exception and:
        </p>
        <ul class="list-none pl-0 space-y-4 mb-6">
          <li class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <span class="font-bold text-blue-700 dark:text-blue-400 flex items-center mb-2">⏳ Retry phase</span>
            <span class="text-gray-800 dark:text-gray-200">The <code>DefaultErrorHandler</code> seeks back to the offset of the failed record and re-delivers it after the backoff. If the database is back by retry 2, the message goes through.</span>
          </li>
          <li class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <span class="font-bold text-purple-700 dark:text-purple-400 flex items-center mb-2">📦 DLT phase</span>
            <span class="text-gray-800 dark:text-gray-200">If retries exhaust, the recoverer publishes the record to a Dead Letter Topic. Now you have a durable record of the failure that ops can inspect, redrive, or replay.</span>
          </li>
          <li class="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
            <span class="font-bold text-green-700 dark:text-green-400 flex items-center mb-2">✅ Offset advance</span>
            <span class="text-gray-800 dark:text-gray-200">Only after success or DLT publish does the offset advance. There is no path that loses data without explicit human visibility.</span>
          </li>
        </ul>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">6. Production Verification: Two Real Failovers</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Cluster names and identifiers below are anonymized. Error counts, durations, and signatures are real.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Event A: DocumentDB Cluster Maintenance (~47s window)</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During regular production traffic, AWS rolled the cluster engine version. Cluster endpoint stopped responding.
        </p>
        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Metric</th>
                <th scope="col" class="px-6 py-3 border-b border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">Observed</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Application errors</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300">105 (60 from API gateway, 45 from Kafka consumer pods)</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Error signature</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300"><code>DataAccessResourceFailureException</code> (100% of cases)</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Pod restarts</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300">0</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Messages routed to DLT</td>
                <td class="px-6 py-4 font-bold text-indigo-700 dark:text-indigo-300">1 (redriven cleanly post-recovery)</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Messages lost</td>
                <td class="px-6 py-4 font-bold text-green-600 dark:text-green-400">0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Without the fallback throw, every one of the 45 consumer-side errors would have been a silently dropped message.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Event B: DocumentDB Instance Maintenance with Real Failover</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Run during a maintenance window with traffic gated upstream, but Kafka consumers were still draining queued messages. The primary was patched and a new primary was elected.
        </p>
        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Metric</th>
                <th scope="col" class="px-6 py-3 border-b border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200">Observed</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Topology change duration</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300">~4 minutes (primary loss + election + driver re-discovery)</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Application errors</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300">5 (all on consumer pods)</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Error signature</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300"><code>DataAccessResourceFailureException: Prematurely reached end of stream</code></td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Messages routed to DLT</td>
                <td class="px-6 py-4 font-bold text-indigo-700 dark:text-indigo-300">0</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Messages lost</td>
                <td class="px-6 py-4 font-bold text-green-600 dark:text-green-400">0 (all 5 absorbed by retry, primary re-elected before DLT threshold)</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This is the cleaner outcome. The 4-minute window included the actual primary election, but Spring Kafka's 3-attempt retry with 3-second backoff was generous enough to span the topology change. Every failed write retried, found the new primary, and committed.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">7. The Wider Pattern: Where Else This Bites</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The CircuitBreaker fallback is the most common case, but the same anti-pattern appears anywhere a layer "handles" an exception that should propagate. Audit your code for:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Try-catch blocks that log and continue</strong> in service or adaptor layers above a Kafka listener.</li>
          <li><strong>Reactive <code>onErrorResume</code> / <code>onErrorReturn</code></strong> in WebFlux pipelines that convert an upstream failure into a successful empty result.</li>
          <li><strong><code>@Async</code> methods</strong> whose exceptions are dropped because nothing awaits the returned <code>CompletableFuture</code>.</li>
          <li><strong>Scheduled jobs</strong> with broad <code>catch (Exception e)</code> that quietly skip the failed iteration.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The rule of thumb: <em>any place where a failure is logged but not signalled to the caller</em> is a place where the system can silently drop work. In transactional or message-driven contexts, that is exactly what you do not want.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">8. Caveats and Trade-offs</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Throwing from the fallback is not free. A few things to be aware of:
        </p>
        <ul class="list-decimal pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Consumer lag will grow during outages.</strong> If the database is down for 4 minutes and your consumer cannot make progress, lag accumulates. Right answer; bad for dashboards. Make sure your alerting differentiates "lag from infrastructure outage" from "lag from slow processing".</li>
          <li><strong>The CircuitBreaker still flips.</strong> Once you cross <code>minimumNumberOfCalls</code> with a high enough failure rate, the breaker opens and short-circuits subsequent attempts. The fallback throws either way, so the consumer keeps retrying via Spring Kafka's backoff, which is now extra cheap because the breaker fails fast. This is the desired behavior.</li>
          <li><strong>DLT topics need lifecycle planning.</strong> If your DLT receives a message during an outage, you need a redrive process. We use a small admin endpoint that consumes from the DLT and re-publishes to the original topic; you can also use Kafka's MirrorMaker or a simple shell script.</li>
          <li><strong>Idempotency matters.</strong> Retries can deliver the same message multiple times. Make sure your write is idempotent &mdash; either through a unique index on the natural key, or an upsert, or an explicit dedup check. Without that, you trade message loss for duplicate writes.</li>
        </ul>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">9. Action Items</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-4 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li><strong>Grep your codebase</strong> for <code>fallbackMethod</code> and audit every fallback. If it does not throw and the wrapped operation is on a write path, fix it.</li>
            <li><strong>Verify your Spring Kafka error handler</strong> is configured with both a <code>BackOff</code> and a <code>DeadLetterPublishingRecoverer</code>. A retry-only configuration without DLT will eventually exhaust and you are back to silent loss.</li>
            <li><strong>Write a test that asserts the fallback throws.</strong> A simple unit test against the adaptor with a mocked failing repository, asserting that the exception propagates, will catch regressions before they hit production.</li>
            <li><strong>Make every Mongo write idempotent.</strong> Unique indexes on natural keys, or explicit upserts. Retries become safe; duplicate deliveries become non-events.</li>
            <li><strong>Run a chaos drill.</strong> Force a failover on a non-prod cluster and confirm your consumer drains its lag without losing messages or restarting pods.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">10. Coming in Part 3</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The fallback throw is necessary, but it is not sufficient. In both production events above, the CircuitBreaker <em>never opened</em>. Sliding window thresholds were never reached. We had a working safety net that was never tested in production at the level we expected.
        </p>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          When your CircuitBreaker is configured with <code>minimumNumberOfCalls = 100</code> and your real production failure produces 5 errors across 4 pods, what tuning makes the breaker actually fire? And what does <code>serverSelectionTimeout</code> have to do with it?
        </blockquote>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Part 3 covers the tuning analysis and the MongoDB driver setting that, by default, blocks every request for 30 seconds during failover &mdash; whether you wanted it to or not.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-8 italic">
          This series is based on real production incidents. All cluster names, instance identifiers, internal ticket references, and organization-specific details have been anonymized or generalized. Error signatures, log messages, error counts, and outage durations are real and unmodified.
        </p>
      </section>
    </article>
  `
};
