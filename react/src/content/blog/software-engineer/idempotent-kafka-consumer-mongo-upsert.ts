import type { BlogPost } from '../../../types/blog';

export const idempotentKafkaConsumerMongoUpsert: BlogPost = {
  id: 'idempotent-kafka-consumer-mongo-upsert',
  title: 'The Day an MSK Upgrade Duplicated Every Outbound Record: Why Your Kafka Consumer Needs Idempotency, Not Just Your Producer',
  description: 'A managed Kafka cluster upgrade rolled brokers, our consumer re-processed already-handled records, and Mongo happily inserted them again because we never set _id. Multiple DLTs, a duplicate-document mess, and the one-line fix that one of our sibling pipelines had been quietly using all along.',
  category: 'software-engineer',
  date: '2026-05-29',
  updatedDate: '2026-05-29',
  tags: ['Kafka', 'MSK', 'Spring Boot', 'Spring Data MongoDB', 'Kotlin', 'Idempotency', 'At-Least-Once', 'Consumer Group Rebalance', 'Production Operations'],
  image: 'idempotent-kafka-consumer-mongo-upsert.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Idempotent Kafka Consumer with Mongo Upsert</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">The Day an MSK Upgrade Duplicated Every Outbound Record</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        A managed Kafka cluster upgrade rolled brokers, our consumer re-processed already-handled records, and Mongo happily inserted them again because we never set <code>_id</code>. Multiple DLTs, a duplicate-document mess, and the one-line fix that one of our sibling pipelines had been quietly using all along.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We had producer idempotence enabled. We had Kafka transactional commit configured. We had a fixed backoff and a DLT recoverer. And we still ended up with several duplicate records in MongoDB across two of our outbound message channels, every one of them eventually causing a webhook handler to crash with <code>IncorrectResultSizeDataAccessException</code> when it tried to look up the single document it expected.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The trigger was a managed Kafka (MSK) cluster upgrade. The root cause was something else entirely &mdash; and it had been sitting in our code waiting for the right kind of bad weather to expose it.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. TL;DR</h2>
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-3 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li>Producer <code>enable.idempotence</code> and Kafka transactional commit do not make your consumer idempotent. They protect the producer side only.</li>
            <li>Kafka guarantees <strong>at-least-once</strong>. Any broker rolling restart, coordinator transition, or session timeout can cause a record to be re-delivered <em>after</em> your listener has already finished its side effects.</li>
            <li>If your listener writes to MongoDB by calling <code>repository.save(entity)</code> on an entity whose <code>_id</code> is generated inside the listener, every re-delivery creates a new document. Same business key, different <code>_id</code>.</li>
            <li>The fix is to <strong>let the producer mint the <code>_id</code></strong>, ship it in the event payload, and have the consumer rehydrate the entity with that exact <code>_id</code>. Mongo's <code>save</code> becomes <code>replaceOne({_id: X}, ..., upsert: true)</code>, which is a single atomic upsert. Re-deliveries replace instead of duplicate.</li>
            <li>One of our sibling pipelines had been doing exactly this for years. It absorbed the same broker storm without a single DLT. The other two pipelines did not, so they took the hit.</li>
            <li>If you only ship one change after reading this post: audit every <code>@KafkaListener</code> that writes to a database and confirm the listener can be re-invoked with the same record and still leave the system in the same state.</li>
          </ol>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Incident: A Cluster of DLTs in Half an Hour</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The on-call channel started lighting up with DLT alerts from our writer consumer group. All of them carried the same exception:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-yellow-300">IncorrectResultSizeDataAccessException</span>
Query findByExternalMessageId returned non unique result
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The listener was a webhook handler. A third-party delivery provider had POSTed back with the delivery status of a message we sent earlier. The handler looked up the original record by its provider-issued ID and was expecting a single document. It was getting two. Or three.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We checked the collection directly:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
db.outbound_messages.find(
    {external_message_id: <span class="text-green-400">"&lt;id-A&gt;"</span>}
).count()
<span class="text-gray-500">// 2</span>

db.outbound_messages.find(
    {external_message_id: <span class="text-green-400">"&lt;id-B&gt;"</span>}
).count()
<span class="text-gray-500">// 3</span>
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Two documents for a send that we knew, from upstream logs, had been emitted exactly once. Three documents for another single send. The provider APIs each saw one outbound call. The webhook came back once. Yet the database had multiples.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Something between the producer and the writer was multiplying the records.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. Trigger vs Root Cause</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The natural first move during a postmortem is to point at whatever was different that day. In our case the infra team had announced a managed-Kafka cluster upgrade, rolling the brokers in sequence (~70 minutes per cluster). The DLTs landed right in the middle of the upgrade window for the cluster our notification consumers were attached to. Case closed?
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Not quite. The MSK upgrade was the <em>trigger</em>. It was the gust of wind that knocked the dead branch off the tree. The branch had been dead for months. We had simply never had wind strong enough.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Separating trigger from root cause matters because the trigger is one-off and the root cause is permanent. Without the upgrade, the same outcome would have followed from <em>any</em> coordinator transition: a broker restart for a routine OS patch, an availability-zone failover, an ISR shrink under network blip, a consumer pod rolling restart that overruns the session timeout. We would have lived with a latent bug indefinitely, and it would have fired on a date determined entirely by cloud provider luck.
        </p>
        <div class="bg-indigo-50 dark:bg-indigo-900/10 p-5 rounded-lg border border-indigo-200 dark:border-indigo-800 my-6">
          <p class="text-indigo-900 dark:text-indigo-200 mb-0">
            <strong>Heuristic:</strong> if the trigger is unique but the root cause is universal, you have a bug. If the trigger and the failure are both universal, you have a regression. If both are unique, you might just have noise. Postmortems that stop at the trigger ship the bug into the next outage.
          </p>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. What MSK Upgrade Looked Like from the Consumer's Point of View</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The Kafka broker layer cycles in a rolling fashion: one broker is taken out of rotation, patched, started up, allowed to rejoin the cluster, and then the next. For consumer groups this is mostly invisible &mdash; until the broker being cycled happens to be the <em>group coordinator</em> for your consumer group. Then three errors show up in your logs in rapid succession.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          First the heartbeats fail because the coordinator broker went down:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
[Consumer ... groupId=writer-service]
Attempt to heartbeat failed since coordinator
b-1.example-cluster.kafka.amazonaws.com:9094 (id: 2)
is either not started or not valid; will attempt rejoin
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Then offset commits start failing while the coordinator is in transition:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
Offset commit failed on partition outbound.message.write-0
at offset 3586709:
The coordinator is loading and hence can't process requests.

Offset commit failed on partition outbound.message.write-1
at offset 3588551:
This is not the correct coordinator.
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          These three messages &mdash; <code>not started or not valid</code>, <code>coordinator is loading</code>, and <code>not the correct coordinator</code> &mdash; are the signature of a broker rolling restart from the consumer's perspective. If you see them clustered together, the broker hosting your group coordinator is changing.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Crucially, the offset commit failure does not mean the record was not processed. The listener method had already returned successfully. The Mongo insert was already done. The failure is only on the <em>bookkeeping step</em> &mdash; telling Kafka "I'm done with offset N, please don't give that one to me again."
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          That bookkeeping failure is enough to trigger Kafka's at-least-once recovery. When the consumer re-establishes its session against the new coordinator, it asks "where do I resume?" and the coordinator answers "from the last offset I have on record" &mdash; which is the offset <em>before</em> the failed commit. The next poll returns the same record again. The listener fires again. The Mongo insert happens again.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our consumer group experienced this on three separate broker rotations during the upgrade window. One channel got hit once, ending up with two documents per record. Another channel got hit twice, ending up with three.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. The Root Cause: Listener Mints the <code>_id</code></h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is the offending listener, simplified:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@KafkaListener</span>(topics = [<span class="text-green-400">"outbound.message.write"</span>])
<span class="text-purple-400">fun</span> <span class="text-blue-400">consume</span>(event: <span class="text-yellow-300">MessageWriteEvent</span>) {
    <span class="text-purple-400">val</span> record = <span class="text-yellow-300">OutboundMessage</span>.create(
        recordId          = event.recordId,            <span class="text-gray-500">// often null from the producer</span>
        externalMessageId = event.externalMessageId,
        ...
    )
    adaptor.create(record)
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          And the factory:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">fun</span> <span class="text-blue-400">create</span>(recordId: <span class="text-yellow-300">String</span>?, ...): <span class="text-yellow-300">OutboundMessage</span> {
    <span class="text-purple-400">return</span> <span class="text-yellow-300">OutboundMessage</span>(
        id = recordId?.let { <span class="text-yellow-300">ObjectId</span>(it) } ?: <span class="text-yellow-300">ObjectId</span>.get(),  <span class="text-gray-500">// &larr;</span>
        ...
    )
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The producer was not setting <code>recordId</code>, so every consumer invocation called <code>ObjectId.get()</code>, generating a fresh ObjectId on the spot. When the same event was delivered twice, the listener built two entities with two different <code>_id</code> values but the same <code>external_message_id</code>. <code>repository.save(entity)</code> happily inserted both, because from Mongo's perspective they were two distinct documents with distinct primary keys.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          There was no unique index on <code>external_message_id</code> to catch this at the database level. The field was indexed for query performance, but the index was not declared unique. So Mongo had no opinion about whether the second insert should be rejected.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Three failures lined up:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>The producer side did not stamp a stable primary key into the event payload.</li>
          <li>The consumer side minted a fresh primary key each time it ran.</li>
          <li>The database had no unique constraint on the natural business key (<code>external_message_id</code>) that would have noticed the duplicate.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Any one of those fixes would have prevented the incident. We applied the first two, because they are the cheapest and the most local.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">6. Why <code>save()</code> with a Stable <code>_id</code> Is Naturally Idempotent</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This is the part that took a couple of whiteboard rounds in the postmortem, so it's worth being explicit.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Spring Data MongoDB's <code>MongoRepository.save(entity)</code> does <em>not</em> issue a "check if exists then insert or update" pair of operations. It issues a single Mongo command:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
update {
  q: { _id: <span class="text-yellow-300">ObjectId</span>(<span class="text-green-400">"..."</span>) },
  u: { ...full document... },
  upsert: <span class="text-orange-400">true</span>,
  multi:  <span class="text-orange-400">false</span>
}
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The wire-level operation is <code>replaceOne(filter, doc, {upsert: true})</code>. Mongo executes it atomically inside the storage engine, holding the <code>_id</code> index lock for the duration. There is no separate read. The two paths converge into one wire call:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>If no document matches the filter, insert the document.</li>
          <li>If a document matches, replace it with the new one.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          For an at-least-once consumer this is exactly the semantics you want. The first delivery inserts. The second delivery replaces with identical content. Net effect: one document, regardless of how many times the listener ran.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">Common Confusion: <code>save</code> vs <code>insert</code></h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The names look interchangeable. They are not.
        </p>
        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">API call</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">When same <code>_id</code> already exists</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-mono text-gray-900 dark:text-white">MongoRepository.save(e)</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Replace (no exception)</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800/40 dark:border-gray-800">
                <td class="px-6 py-4 font-mono text-gray-900 dark:text-white">MongoRepository.insert(e)</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">DuplicateKeyException</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-mono text-gray-900 dark:text-white">collection.replaceOne(..., upsert)</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Replace (no exception)</td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/40">
                <td class="px-6 py-4 font-mono text-gray-900 dark:text-white">collection.insertOne(doc)</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">DuplicateKeyException</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The contract is set by the method name. <code>save</code> means "make the database look like this." <code>insert</code> means "add this new thing." Re-running a Kafka consumer wants the first semantic, not the second.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          As a useful side benefit, Spring Data's <code>@CreatedDate</code> annotation is driven by the <code>isNew()</code> check, which for entities with an <code>_id</code> already populated returns <code>false</code>. So <code>createdAt</code> is set on the first insert and untouched on replace. <code>@LastModifiedDate</code> ticks on every save, as expected. The audit metadata survives re-delivery correctly.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">7. The Sibling That Survived</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The most useful discovery during the postmortem was an internal one. Our system has three outbound message channels sharing the same writer service, the same broker, and the same Mongo cluster. All three were exposed to the same broker rotation. Only two of them ended up with duplicate documents.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Looking at the surviving channel's producer:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
queueTemplate.send(
    <span class="text-yellow-300">WRITE_TOPIC</span>,
    <span class="text-yellow-300">EventBuilder</span>()
        .targets(listOf(<span class="text-yellow-300">WriteTarget</span>(
            outbound.accountId,
            outbound.id!!.toHexString()    <span class="text-gray-500">// &larr; the _id is minted here</span>
        )))
        .build()
)
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The producer mints the Mongo <code>_id</code> before the message ever hits Kafka. The consumer rehydrates with that exact id:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-yellow-300">OutboundMessage</span>.from(
    id = <span class="text-yellow-300">ObjectId</span>(target.recordId),    <span class="text-gray-500">// &larr; stable across re-delivery</span>
    ...
)
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          So when the broker storm caused the surviving channel's partitions to re-deliver, the listener built entities with the <em>same</em> <code>_id</code> the second time. <code>save</code> turned into <code>replaceOne</code>. The database never saw a duplicate.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We could see the re-delivery in the consume logs. Throughput on the surviving channel during the upgrade window spiked from ~85 records/minute baseline to over 320 records/minute as Kafka replayed records that had not been committed. The application happily absorbed the storm because every replay landed on top of an existing document.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          That code had been written this way for years, with no relation to any incident. It was simply how the author had chosen to plumb the relationship between the gateway-side entity and the writer-side document. The choice paid out under stress that nobody had anticipated when the code was written.
        </p>
        <div class="bg-green-50 dark:bg-green-900/10 p-5 rounded-lg border border-green-200 dark:border-green-800 my-6">
          <p class="text-green-900 dark:text-green-200 mb-0">
            <strong>Lesson:</strong> when one part of your system survives an incident that breaks a sibling, study the survivor before designing the fix. The pattern you need may already exist in your codebase and be one git grep away.
          </p>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">8. Four Patterns for Idempotent Consumers</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Once you accept that at-least-once is permanent and that any of the triggers (broker rotation, AZ failover, pod restart, GC pause) will eventually cause a redelivery, the only question is which idempotency pattern to apply. In rough order of how cheap and how local they are:
        </p>
        <ol class="list-decimal pl-5 space-y-4 mb-6 text-gray-900 dark:text-gray-100">
          <li>
            <strong>Use a natural business key for upsert.</strong> If you already have a unique identifier in the event payload (vendor message id, order id, payment intent id), use it as the filter key. The benefit is zero extra plumbing &mdash; you store something you were already storing. The cost is making sure the field is unique in the data, which is usually true but worth confirming.
          </li>
          <li>
            <strong>Mint the primary key on the producer side and ship it in the event.</strong> This is what the surviving channel did. The consumer rehydrates with the same key on every delivery, and <code>save</code> turns into upsert. Works well when the producer naturally creates the record and the consumer is just persisting it. This is the change we applied to the other two channels.
          </li>
          <li>
            <strong>Add a unique index on the business key and swallow the duplicate exception.</strong> If you cannot change the producer or the consumer key, you can still let the database enforce uniqueness. Catch <code>DuplicateKeyException</code> and treat it as success. The cost is a slightly more awkward control flow and the need to be careful that the catch does not hide a real bug. The benefit is a defense-in-depth layer that catches any future producer-side path that forgets to send a key.
          </li>
          <li>
            <strong>External dedup store.</strong> Maintain a set of processed event ids in Redis or a small Mongo collection, check before processing, write after success. This is the most expensive option in terms of latency and operational surface area, so reserve it for cases where 1&ndash;3 are not feasible &mdash; for example, when the side effect is an external HTTP call that the receiving system cannot dedup on its own.
          </li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In our incident, pattern 2 was the fix and pattern 3 is the follow-up. The two compose nicely. Pattern 2 handles the common path with no extra code at the writer. Pattern 3 catches the case where a future endpoint is added that forgets to mint the id.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">9. What Producer Idempotence and Transactional Commit Do <em>Not</em> Solve</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A reasonable response when reading this story is: "we have <code>enable.idempotence=true</code> on the producer, surely that protects us?" It does not. It is worth being precise about which problem each Kafka feature actually addresses.
        </p>
        <ul class="list-none pl-0 space-y-4 mb-6">
          <li class="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
            <span class="font-bold text-blue-700 dark:text-blue-400 flex items-center mb-2">📤 Producer idempotence</span>
            <span class="text-gray-800 dark:text-gray-200">Prevents the same producer from publishing the same record twice when it retries an inflight request. Scope: producer &rarr; broker. Does nothing for what happens after the consumer reads the record.</span>
          </li>
          <li class="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
            <span class="font-bold text-purple-700 dark:text-purple-400 flex items-center mb-2">🔁 Kafka transactional commit (EOS)</span>
            <span class="text-gray-800 dark:text-gray-200">Lets a consumer-producer pair commit "I read offset N and I produced these output records" atomically. Useful when your consumer is itself a producer. Does nothing if your consumer's side effect is a write to an external system like MongoDB.</span>
          </li>
          <li class="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/30">
            <span class="font-bold text-yellow-700 dark:text-yellow-400 flex items-center mb-2">🧱 Application idempotency</span>
            <span class="text-gray-800 dark:text-gray-200">The only thing that protects external side effects (database, HTTP, email). It is the consumer's responsibility, not Kafka's. The Kafka features above coexist with the duplicate-insert bug we hit, because none of them ever touch the Mongo write path.</span>
          </li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The mental model that gets you through this: Kafka's guarantees are about Kafka. Any state you maintain outside Kafka has to handle re-delivery on its own.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">10. The Fix and the Cleanup</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The code change was small. On the producer side, the two affected channels now mint an <code>ObjectId</code> alongside the external message id and ship both in the write event:
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">val</span> recordId          = <span class="text-yellow-300">ObjectId</span>.get()
<span class="text-purple-400">val</span> externalMessageId = externalIdGenerator.generate()

producer.produceWriteEvent(
    command           = command,
    externalMessageId = externalMessageId,
    recordId          = recordId,   <span class="text-gray-500">// &larr; new</span>
)
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          On the consumer side no change was required, because the factory already accepted an optional <code>recordId</code> and used it when present. The bug was that the producer call sites had been silently relying on the default of <code>null</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The data cleanup was less elegant. For each <code>external_message_id</code> that had duplicates, we kept the document with the earliest <code>created_at</code> (which still had the correct upstream status) and removed the rest. Then we redrove the DLT events back to the original topic, where the now-deduplicated documents could be looked up cleanly.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A separate ticket tracks adding a unique index on <code>external_message_id</code>. We do not want to add it before the dedup is done, because the index build will fail in the presence of duplicates. The order is: deduplicate &rarr; add index &rarr; the database now refuses any future bug of this shape.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">11. Takeaways</h2>
        <ul class="list-disc pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
          <li>At-least-once is permanent. Every Kafka consumer that mutates external state needs a deliberate idempotency story. The question is "which pattern" not "do we need one."</li>
          <li>Trigger and root cause are different. The infra event that exposes a latent application bug is news; the application bug is the work.</li>
          <li><code>MongoRepository.save</code> is a single atomic upsert keyed on <code>_id</code>. Pair it with a stable, producer-minted <code>_id</code> and you get idempotency for free.</li>
          <li>The signature of a broker rolling restart in your consumer logs is the trio "not started or not valid", "coordinator is loading", and "not the correct coordinator". When you see them together, expect re-deliveries.</li>
          <li>When one part of your system survives an incident and a sibling does not, the survivor is documentation. Read it before reaching for a new design.</li>
          <li>Database-level constraints (unique indexes) are a defense-in-depth layer, not a substitute for application-level idempotency. Use both when the data is critical.</li>
        </ul>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">12. Related Reading</h2>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><a href="/blog/software-engineer/list/spring-mongo-kafka-no-message-loss/" class="text-indigo-600 hover:underline dark:text-indigo-400">Surviving DocDB Failover with Spring Data MongoDB and Kafka</a> &mdash; the prequel that focuses on CircuitBreaker fallback behavior during a failover.</li>
          <li><a href="/blog/software-engineer/list/circuit-breaker-tuning-for-failover/" class="text-indigo-600 hover:underline dark:text-indigo-400">When Your CircuitBreaker Never Opens</a> &mdash; tuning Resilience4j thresholds so they actually fire during real outages.</li>
          <li><a href="/blog/software-engineer/list/kafka-event-ordering-illusion/" class="text-indigo-600 hover:underline dark:text-indigo-400">The Kafka Event Ordering Illusion</a> &mdash; another category of at-least-once surprise that catches teams off guard.</li>
        </ul>
      </section>
    </article>
  `,
};
