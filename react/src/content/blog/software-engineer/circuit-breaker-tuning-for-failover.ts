import type { BlogPost } from '../../../types/blog';

export const circuitBreakerTuningForFailover: BlogPost = {
  id: 'circuit-breaker-tuning-for-failover',
  title: 'When Your CircuitBreaker Never Opens: Lessons from Two Production DocDB Failovers',
  description: 'Resilience4j defaults that look reasonable on paper will never fire during a real DocumentDB failover. Plus the MongoDB driver setting that silently blocks every request for 30 seconds. The exact tuning that fixes both.',
  category: 'software-engineer',
  date: '2026-05-13',
  updatedDate: '2026-05-13',
  tags: ['Resilience4j', 'CircuitBreaker', 'MongoDB', 'Spring Data MongoDB', 'DocumentDB', 'Failover', 'Tuning', 'Production Operations'],
  image: 'distributed-lock-redis.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">CircuitBreaker Tuning for Failover</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">When Your CircuitBreaker Never Opens: Lessons from Two Production DocDB Failovers</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Part 3 of the <em>DocDB Maintenance Survival Guide</em>. Defaults that look reasonable on paper will never fire during a real failover. Here is what tuning to apply, and the MongoDB driver setting that quietly defeats your fast-fail strategy.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In <a href="/blog/software-engineer/list/aws-docdb-forced-maintenance/" class="text-indigo-600 hover:underline dark:text-indigo-400">Part 1</a> we covered how DocumentDB maintenance fails. In <a href="/blog/software-engineer/list/spring-mongo-kafka-no-message-loss/" class="text-indigo-600 hover:underline dark:text-indigo-400">Part 2</a> we showed how a one-line <code>throw</code> from a Resilience4j fallback prevents Kafka message loss during a failover.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Both are necessary. Neither is sufficient on their own.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In both production failovers we observed, the CircuitBreaker <strong>never opened</strong>. We had a working safety net that &mdash; under realistic outage conditions &mdash; was never tested in production. The fallback throw still saved us, but the breaker itself, the thing supposed to fail fast and shed load, was sitting on the bench.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This post is about why, and what to change.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. TL;DR</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-3 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li>Resilience4j's default <code>minimumNumberOfCalls = 100</code> with <code>COUNT_BASED</code> sliding window is too high for short, infrastructure-level outages distributed across multiple pods.</li>
            <li>Connection-pool exceptions like <code>MongoConnectionPoolClearedException</code> are <strong>not</strong> in most teams' <code>RECORD_EXCEPTIONS</code> list, which silently exempts them from the failure count.</li>
            <li>The MongoDB Java driver's <code>serverSelectionTimeout</code> defaults to <strong>30 seconds</strong>. If you only set <code>connectTimeout</code> and <code>readTimeout</code>, your application is still bound by that 30-second wall during failover.</li>
            <li>The recommended combination is <strong>B + C + E</strong>: lower the minimum call threshold, add the missing exception, and explicitly configure <code>serverSelectionTimeout</code> to fail fast.</li>
            <li>Validate every change with a forced failover on a non-prod cluster before relying on it.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Setup: A Reasonable-Looking CircuitBreaker</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is the configuration we ran into production with. It looks unobjectionable.
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Configuration</span>
<span class="text-purple-400">class</span> <span class="text-yellow-300">Resilience4JConfig</span> {

    <span class="text-purple-400">@Bean</span>
    <span class="text-purple-400">fun</span> <span class="text-blue-400">circuitBreakerConfig</span>(): <span class="text-yellow-300">CircuitBreakerConfig</span> = <span class="text-yellow-300">CircuitBreakerConfig</span>.custom()
        .slidingWindowType(<span class="text-yellow-300">COUNT_BASED</span>)
        .slidingWindowSize(<span class="text-orange-400">100</span>)
        .minimumNumberOfCalls(<span class="text-orange-400">100</span>)
        .failureRateThreshold(<span class="text-orange-400">30f</span>)
        .waitDurationInOpenState(<span class="text-yellow-300">Duration</span>.ofSeconds(<span class="text-orange-400">30</span>))
        .permittedNumberOfCallsInHalfOpenState(<span class="text-orange-400">10</span>)
        .recordExceptions(
            <span class="text-yellow-300">DataAccessResourceFailureException</span>::<span class="text-purple-400">class</span>.java,
            <span class="text-yellow-300">MongoSocketException</span>::<span class="text-purple-400">class</span>.java,
            <span class="text-yellow-300">MongoTimeoutException</span>::<span class="text-purple-400">class</span>.java,
            <span class="text-gray-500">// ... 10 more</span>
        )
        .build()
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The intent is reasonable. We do not want the breaker to flip on a single hiccup, so we require 100 calls in the sliding window before the breaker even starts evaluating. We track the most relevant Mongo exception types. Failure threshold of 30%. Standard stuff.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Now look at what happened in our two production DocumentDB events.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. Why It Did Not Fire: The Math</h2>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Event A: Cluster Maintenance (8 pods, 47s window)</h3>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Total Mongo-related exceptions across the fleet: ~989</li>
          <li>Pod with the most exceptions: 75</li>
          <li>Sliding window threshold required to start evaluating: 100</li>
          <li><strong>Result:</strong> No pod accumulated enough calls in its 47-second window. The breaker never reached evaluation state.</li>
        </ul>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📊 Event B: Instance Maintenance Failover (4 history-writer pods)</h3>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Total errors: 5</li>
          <li>Distributed as: 3 / 1 / 1 / 0 across pods</li>
          <li>Maximum on any single pod: 3</li>
          <li><strong>Result:</strong> Even more dramatically below threshold. Spring Kafka's retry absorbed all 5 because the new primary was elected before retries exhausted.</li>
        </ul>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The fundamental problem with <code>COUNT_BASED</code> sliding windows of size 100 is that they assume sustained traffic. During an infrastructure outage, the failures are <em>concentrated</em> in time but <em>diluted</em> across pods. A short outage on a horizontally-scaled service produces single-digit errors per pod, which never reaches the minimum-calls floor.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The breaker is designed to protect against <em>endpoint degradation under heavy load</em>. It is not designed to detect <em>brief, total failures</em>. Tuning has to acknowledge that.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. The Tuning Options</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We considered five options. Each has trade-offs.
        </p>

        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Option</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Change</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Pros</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Cons</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">A</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Switch to <code>TIME_BASED</code> sliding window with 10s window + minimumCalls 10</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Catches short, sharp outages</td>
                <td class="px-6 py-4 text-red-700 dark:text-red-400">Short window risks false positives on transient hiccups</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-indigo-700 dark:text-indigo-300">B ✅</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10"><code>minimumNumberOfCalls 100 &rarr; 20~30</code></td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Smallest behavioral change, breaker can fire under realistic per-pod failure counts</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Slightly more sensitive to spikes; pair with proper failure-rate threshold</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-indigo-700 dark:text-indigo-300">C ✅</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Add <code>MongoConnectionPoolClearedException</code> to <code>recordExceptions</code></td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Stops silently exempting a major failure mode</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Alone, still does not solve the threshold problem (38 extra errors / 8 pods is +5 per pod)</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">D</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Leave defaults, rely on fallback throw + Kafka retry</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Already shown to prevent message loss</td>
                <td class="px-6 py-4 text-red-700 dark:text-red-400">Breaker remains untested in production; HTTP read paths still pay full failover latency</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-6 py-4 font-semibold text-indigo-700 dark:text-indigo-300">E ✅</td>
                <td class="px-6 py-4 text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Explicitly configure <code>serverSelectionTimeout</code> on the MongoDB driver</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Caps per-request latency during failover, accelerates failure accrual into the breaker window</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Too short means false positives during normal driver re-discovery</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The recommended combination is <strong>B + C + E</strong>. Each addresses a different facet of the same problem.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Option E in Detail: The serverSelectionTimeout Trap</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Option E deserves its own section because it is the one most teams have wrong by default and never realize.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">🔍 The Discovery</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During the post-mortem of one of our maintenances, we noticed something odd in the Dead Letter Topic. A single message had landed there. The interesting part was the timing of its retry attempts:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Event published to Kafka: <code>15:04:59</code></li>
          <li>First processing attempt failed: <code>15:05:29</code> &mdash; exactly <strong>30 seconds</strong> later.</li>
          <li>Subsequent retries: 3-second intervals (matching <code>FixedBackOff(3000L, 3L)</code>).</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A 30-second gap between Kafka pulling the message and the first error is not normal. The Kafka consumer should have started processing immediately. So where did the 30 seconds go?
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">📚 What the Driver Was Doing</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Reading the official MongoDB Java Driver and Spring Data MongoDB documentation:
        </p>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          <code>serverSelectionTimeoutMS</code> &mdash; The maximum number of milliseconds the driver will wait while attempting to find a suitable server before throwing a server selection error. <strong>Default: 30000 ms.</strong>
        </blockquote>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During a failover, the driver knows the old primary is gone and needs to find a new one. It enters a server-selection phase. <em>This phase has nothing to do with <code>connectTimeout</code> or <code>readTimeout</code></em> &mdash; those govern the socket once selected. While selecting, the driver waits up to 30 seconds for a suitable server to appear in its topology view.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          AWS DocumentDB cluster failover, per AWS documentation, "typically completes within 30 seconds." If your driver default is also 30 seconds, you are racing the cluster recovery against the driver timeout, with no safety margin and no fast-fail signal.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">🛠️ The Fix</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Most teams configure socket timeouts but forget the cluster-settings builder, where server-selection lives:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Configuration</span>
<span class="text-purple-400">class</span> <span class="text-yellow-300">MongoConfig</span>(<span class="text-purple-400">private val</span> connectionDetails: <span class="text-yellow-300">MongoConnectionDetails</span>) :
    <span class="text-yellow-300">AbstractMongoClientConfiguration</span>() {

    <span class="text-purple-400">override fun</span> <span class="text-blue-400">configureClientSettings</span>(builder: <span class="text-yellow-300">MongoClientSettings</span>.<span class="text-yellow-300">Builder</span>) {
        builder.applyConnectionString(connectionDetails.connectionString)
            .applyToConnectionPoolSettings { ... }
            .applyToSocketSettings { socket -&gt;
                socket
                    .connectTimeout(<span class="text-orange-400">3</span>, <span class="text-yellow-300">TimeUnit</span>.SECONDS)
                    .readTimeout(<span class="text-orange-400">3</span>, <span class="text-yellow-300">TimeUnit</span>.SECONDS)
            }
            <span class="text-orange-400">.applyToClusterSettings { cluster -&gt;</span>
                <span class="text-orange-400">cluster.serverSelectionTimeout(<span class="text-yellow-300">10</span>, <span class="text-yellow-300">TimeUnit</span>.SECONDS)</span>
            <span class="text-orange-400">}</span>
    }
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The highlighted block is the addition. Picking the value is the harder question:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Too short (e.g. 5s)</strong>: false-fail during normal driver re-discovery, especially on cold-start or transient network blips.</li>
          <li><strong>Too long (default 30s)</strong>: every failover-affected request blocks for 30 seconds before failing. CircuitBreaker accrual is delayed, user-facing endpoints look hung.</li>
          <li><strong>10&ndash;15s</strong>: covers most observed AWS failover durations with margin, fails fast enough to feed the breaker.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Pick a value, validate it with a forced failover on a non-prod cluster, and watch what your driver does during topology re-discovery. Adjust based on observed reality, not online advice.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">6. Option C in Detail: The RECORD_EXCEPTIONS Audit</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The MongoDB driver throws a wide variety of exceptions during failure scenarios. Most teams populate <code>recordExceptions</code> with the obvious ones:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><code>DataAccessResourceFailureException</code> (Spring's translation of socket-level failures)</li>
          <li><code>MongoSocketException</code></li>
          <li><code>MongoTimeoutException</code></li>
          <li><code>UncategorizedMongoDbException</code></li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          But MongoDB also throws connection-pool-management exceptions that <strong>do not inherit from any of the above</strong>:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
com.mongodb.MongoConnectionPoolClearedException:
  Connection pool for db.example.com:27017 was cleared because another
  operation failed with: MongoSocketException
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This appears during cascading pool failures &mdash; one connection breaks, the pool clears, every other in-flight request that was about to use that pool fails with this exception. In a 47-second cluster outage we observed 38 of these. None of them counted toward the breaker's failure tally.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Add it explicitly:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
.recordExceptions(
    <span class="text-yellow-300">DataAccessResourceFailureException</span>::<span class="text-purple-400">class</span>.java,
    <span class="text-yellow-300">MongoSocketException</span>::<span class="text-purple-400">class</span>.java,
    <span class="text-yellow-300">MongoTimeoutException</span>::<span class="text-purple-400">class</span>.java,
    <span class="text-orange-400"><span class="text-yellow-300">MongoConnectionPoolClearedException</span>::<span class="text-purple-400">class</span>.java,</span>  <span class="text-gray-500">// often missing</span>
    <span class="text-gray-500">// ...</span>
)
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A pragmatic audit: write a small test that forces a failure scenario (kill the database, or use TestContainers + chaos), capture every exception type bubbling up, and confirm each is in your <code>recordExceptions</code> list.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">7. The Combined Tuning</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Putting B + C + E together:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-gray-500">// Resilience4j config</span>
<span class="text-yellow-300">CircuitBreakerConfig</span>.custom()
    .slidingWindowType(<span class="text-yellow-300">COUNT_BASED</span>)
    .slidingWindowSize(<span class="text-orange-400">100</span>)
    .minimumNumberOfCalls(<span class="text-orange-400">25</span>)                 <span class="text-gray-500">// B: was 100</span>
    .failureRateThreshold(<span class="text-orange-400">30f</span>)
    .waitDurationInOpenState(<span class="text-yellow-300">Duration</span>.ofSeconds(<span class="text-orange-400">30</span>))
    .recordExceptions(
        <span class="text-yellow-300">DataAccessResourceFailureException</span>::<span class="text-purple-400">class</span>.java,
        <span class="text-yellow-300">MongoSocketException</span>::<span class="text-purple-400">class</span>.java,
        <span class="text-yellow-300">MongoTimeoutException</span>::<span class="text-purple-400">class</span>.java,
        <span class="text-yellow-300">MongoConnectionPoolClearedException</span>::<span class="text-purple-400">class</span>.java,  <span class="text-gray-500">// C</span>
    )
    .build()

<span class="text-gray-500">// MongoDB driver config</span>
builder.applyToClusterSettings { cluster -&gt;
    cluster.serverSelectionTimeout(<span class="text-orange-400">10</span>, <span class="text-yellow-300">TimeUnit</span>.SECONDS)  <span class="text-gray-500">// E</span>
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Why each piece is necessary:
        </p>
        <ul class="list-none pl-0 space-y-4 mb-6">
          <li class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <span class="font-bold text-blue-700 dark:text-blue-400 flex items-center mb-2">B alone</span>
            <span class="text-gray-800 dark:text-gray-200">Lower threshold, but if half your failures are <code>MongoConnectionPoolClearedException</code>, they still do not count. Breaker still misfires.</span>
          </li>
          <li class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <span class="font-bold text-purple-700 dark:text-purple-400 flex items-center mb-2">C alone</span>
            <span class="text-gray-800 dark:text-gray-200">Counts the right exceptions, but minimumNumberOfCalls 100 is still unreachable in short outages on multiple pods. Breaker still misfires.</span>
          </li>
          <li class="bg-amber-50 dark:bg-amber-900/10 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
            <span class="font-bold text-amber-700 dark:text-amber-400 flex items-center mb-2">E alone</span>
            <span class="text-gray-800 dark:text-gray-200">Each individual request fails faster, so you accrue failures faster. But B and C still gate whether they reach the breaker. E only helps if B and C are also fixed.</span>
          </li>
          <li class="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
            <span class="font-bold text-green-700 dark:text-green-400 flex items-center mb-2">B + C + E</span>
            <span class="text-gray-800 dark:text-gray-200">Lower threshold + correct exception coverage + fast-fail per request. The breaker can now actually fire under realistic outage conditions, and user-facing latency during failover is bounded.</span>
          </li>
        </ul>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">8. Validating Before You Trust It</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Configuration changes that you have not validated against a real failure are configuration changes you should not trust. Three ways to validate, in increasing order of confidence:
        </p>
        <ol class="list-decimal pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Unit test the breaker config.</strong> Build a <code>CircuitBreaker</code> from your config, fire 25 simulated failures of each <code>recordExceptions</code> type, assert the breaker transitions to <code>OPEN</code>. Catches typos, missing exceptions, and threshold mistakes.</li>
          <li><strong>Integration test against a flaky Mongo.</strong> Use TestContainers + Toxiproxy to simulate connection failures and observe both your breaker state and your application's behavior. Catches driver-level issues like the <code>serverSelectionTimeout</code> default.</li>
          <li><strong>Forced failover on non-prod.</strong> <code>db.adminCommand({failover:1})</code> on your dev/staging DocumentDB cluster. Observe the actual driver topology change, the breaker transition, and the consumer behavior. This is the only way to catch issues that only appear in real cluster topology.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Schedule a quarterly chaos drill. Maintenance happens whether you are ready for it or not; rehearsal is cheaper than recovery.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">9. Action Items</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-4 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li><strong>Audit <code>minimumNumberOfCalls</code></strong> against realistic per-pod failure counts during a short outage. Drop it to 20&ndash;30 if your outage profile is short and concentrated.</li>
            <li><strong>List every exception your driver throws</strong> during a forced failure scenario. Add the missing ones (commonly <code>MongoConnectionPoolClearedException</code>) to <code>recordExceptions</code>.</li>
            <li><strong>Explicitly configure <code>serverSelectionTimeout</code></strong> via <code>applyToClusterSettings</code>. Pick a value (10&ndash;15s is a defensible starting point) and validate.</li>
            <li><strong>Run a forced failover</strong> on a non-prod cluster. Watch the breaker transition logs, watch driver topology logs, watch consumer lag. Iterate.</li>
            <li><strong>Document your outage profile.</strong> If you ever read your own runbook in 18 months, you will want the per-pod failure counts and recovery times written down somewhere.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">10. Series Wrap-Up</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Across three posts we walked through the full picture of running Spring Boot + Spring Data MongoDB + Kafka against AWS DocumentDB through real maintenance events:
        </p>
        <ul class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Part 1 &mdash;</strong> AWS forces maintenance on its own schedule. Cluster and instance maintenance fail differently. Plan accordingly. <a href="/blog/software-engineer/list/aws-docdb-forced-maintenance/" class="text-indigo-600 hover:underline dark:text-indigo-400">Read &rarr;</a></li>
          <li><strong>Part 2 &mdash;</strong> A silent CircuitBreaker fallback is a message-loss bug. One <code>throw</code> turns it into a Kafka-protected retry chain. <a href="/blog/software-engineer/list/spring-mongo-kafka-no-message-loss/" class="text-indigo-600 hover:underline dark:text-indigo-400">Read &rarr;</a></li>
          <li><strong>Part 3 (this post) &mdash;</strong> Default Resilience4j thresholds and default <code>serverSelectionTimeout</code> together produce a breaker that never fires. B + C + E fixes that.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The deeper lesson across all three: defaults are designed for the average case, and infrastructure outages are not the average case. The best time to find out which of your defaults are wrong is in a non-prod chaos drill, not at 3 AM during an AWS-forced maintenance window.
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-8 italic">
          This series is based on real production incidents. All cluster names, instance identifiers, internal ticket references, and organization-specific details have been anonymized or generalized. Error signatures, log messages, error counts, and outage durations are real and unmodified.
        </p>
      </section>
    </article>
  `
};
