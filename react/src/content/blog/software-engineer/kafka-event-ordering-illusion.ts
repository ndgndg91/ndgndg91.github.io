import type { BlogPost } from '../../../types/blog';

export const kafkaEventOrderingIllusion: BlogPost = {
  id: 'kafka-event-ordering-illusion',
  title: 'Why 100% Event Ordering in Kafka is an Illusion',
  description: 'A deep dive into why relying solely on Kafka for perfect event ordering in microservices is an illusion, the underlying causes, and practical design patterns to ensure data consistency.',
  category: 'software-engineer',
  date: '2026-04-17',
  updatedDate: '2026-04-17',
  tags: ['Kafka', 'Microservices', 'Event-Driven Architecture', 'EDA', 'Distributed Systems'],
  image: 'kafka-event-ordering-illusion.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">Kafka Event Ordering</span>
        </li>
      </ol>
    </nav>

    <header class="mb-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 dark:text-gray-300 uppercase">
        Kafka & Distributed Systems
      </div>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        🚀 Why 100% Event Ordering in Kafka is an Illusion
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Published: April 19, 2026</div>
    </header>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        When dealing with events in a Microservices Architecture (MSA), we often design our systems believing the fundamental principle that "Kafka guarantees order within a partition." However, even if you configure your producer for idempotence (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">enable.idempotence=true</code>) and restrict your architecture to a single pod publishing to a single partition, expecting <strong>100% perfect ordering from a strict business perspective is near impossible</strong>.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold">
        Here are the primary reasons why this illusion shatters in production environments:
      </p>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. Concurrency at the Application Level (Race Conditions)</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The most fundamental reason is that <strong>the order can already be inverted in the application memory</strong> long before the events ever reach the Kafka broker.
      </p>

      <ul class="list-disc pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
        <li>
          <strong>Multi-threaded Processing:</strong> Applications like Spring Boot process incoming API requests asynchronously via a thread pool. A later request can easily overtake an earlier one.
        </li>
        <li>
          <strong>OS Scheduling Context Switches:</strong> Imagine state change requests A and B for the exact same domain object arriving milliseconds apart. While thread A is executing heavy business logic, the OS scheduler might pause it and grant CPU time to thread B, allowing B to invoke the Kafka send operation first.
        </li>
      </ul>

      <!-- SVG Diagram 1: Race Condition -->
      <div class="my-8 hidden sm:block">
        <svg viewBox="0 0 600 250" class="w-full h-auto max-w-3xl mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-gray-200 dark:border-gray-700 shadow-sm" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-500 dark:fill-gray-400" />
            </marker>
          </defs>

          <!-- Timelines -->
          <line x1="100" y1="50" x2="500" y2="50" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600" />
          <line x1="100" y1="130" x2="500" y2="130" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600" />
          <line x1="550" y1="30" x2="550" y2="200" stroke="currentColor" stroke-width="4" class="text-indigo-400" />
          
          <text x="10" y="55" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">Thread A</text>
          <text x="10" y="135" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">Thread B</text>
          <text x="510" y="20" class="text-sm font-bold fill-indigo-600 dark:fill-indigo-400">Kafka Topic</text>

          <!-- Thread A Activities -->
          <rect x="120" y="40" width="80" height="20" rx="4" class="fill-blue-100 dark:fill-blue-900 stroke-blue-500" stroke-width="1" />
          <text x="160" y="54" text-anchor="middle" class="text-xs fill-blue-800 dark:fill-blue-200">DB Update</text>
          
          <!-- Pause -->
          <rect x="200" y="45" width="140" height="10" class="fill-red-100 dark:fill-red-900/50" />
          <text x="270" y="36" text-anchor="middle" class="text-xs font-medium fill-red-600 dark:fill-red-400">OS Context Switch (Paused)</text>
          
          <rect x="340" y="40" width="80" height="20" rx="4" class="fill-blue-100 dark:fill-blue-900 stroke-blue-500" stroke-width="1" />
          <text x="380" y="54" text-anchor="middle" class="text-xs font-bold fill-blue-800 dark:fill-blue-200">send(Msg A)</text>
          <line x1="420" y1="50" x2="550" y2="160" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4" />

          <!-- Thread B Activities -->
          <rect x="210" y="120" width="80" height="20" rx="4" class="fill-green-100 dark:fill-green-900 stroke-green-500" stroke-width="1" />
          <text x="250" y="134" text-anchor="middle" class="text-xs fill-green-800 dark:fill-green-200">DB Update</text>
          <rect x="300" y="120" width="80" height="20" rx="4" class="fill-green-100 dark:fill-green-900 stroke-green-500" stroke-width="1" />
          <text x="340" y="134" text-anchor="middle" class="text-xs font-bold fill-green-800 dark:fill-green-200">send(Msg B)</text>
          
          <line x1="380" y1="130" x2="550" y2="80" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4" />

          <!-- Kafka Partition Array -->
          <rect x="525" y="60" width="50" height="40" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="550" y="85" text-anchor="middle" class="text-sm font-bold fill-gray-800 dark:fill-gray-200">Msg B</text>

          <rect x="525" y="140" width="50" height="40" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="550" y="165" text-anchor="middle" class="text-sm font-bold fill-gray-800 dark:fill-gray-200">Msg A</text>

          <text x="300" y="230" text-anchor="middle" class="text-sm font-medium fill-gray-600 dark:fill-gray-400">Result: Even though Thread A started first, Msg B is appended to Kafka before Msg A.</text>
        </svg>
      </div>

      <p class="mb-2 text-gray-900 dark:text-gray-100 mt-6">
        Here is a typical Kotlin/Spring Boot snippet highly susceptible to this exact concurrency issue:
      </p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Anti-pattern: Sending events directly inside a business method.</span>
<span class="text-yellow-400">@Service</span>
<span class="text-blue-400">class</span> <span class="text-green-400">OrderService</span>(
    <span class="text-blue-400">private</span> <span class="text-blue-400">val</span> orderRepository: OrderRepository,
    <span class="text-blue-400">private</span> <span class="text-blue-400">val</span> kafkaTemplate: KafkaTemplate&lt;String, OrderEvent&gt;
) {
    <span class="text-yellow-400">@Transactional</span>
    <span class="text-blue-400">fun</span> <span class="text-yellow-400">updateOrderStatus</span>(orderId: Long, status: OrderStatus) {
        <span class="text-blue-400">val</span> order = orderRepository.findById(orderId).orElseThrow()
        order.changeStatus(status)
        
        <span class="text-gray-500">// ⚠️ RACE CONDITION DANGER</span>
        <span class="text-gray-500">// Thread might be paused by OS scheduler exactly here.</span>
        <span class="text-gray-500">// If Thread B executes this method for the same order, it might send() first.</span>
        kafkaTemplate.send(<span class="text-green-300">"order-topic"</span>, orderId.toString(), OrderEvent(order, status))
    }
}</pre>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. Asynchronous Network Communication & Application-level Retries</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Network unpredictability is another major culprit in tangling the sequential order of events.
      </p>

      <ul class="list-disc pl-5 space-y-3 mb-6 text-gray-900 dark:text-gray-100">
        <li>
          <strong>Limitations of Asynchronous Publishing:</strong> If a producer asynchronously publishes events A and B sequentially, a momentary network timeout during A's transmission might allow B to traverse the network successfully and arrive at the broker entirely first.
        </li>
        <li>
          <strong>Improper Exception Handling:</strong> Suppose the transmission of A fails, and the application attempts a retry via a <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">catch</code> block or a library like <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">@Retryable</code>. If events B and C have already been successfully published in the meantime, the retried event A will be pushed to the very end of the line, landing after C.
        </li>
      </ul>

      <!-- SVG Diagram 2: Retries -->
      <div class="my-8 hidden sm:block">
        <svg viewBox="0 0 600 200" class="w-full h-auto max-w-3xl mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-gray-200 dark:border-gray-700 shadow-sm" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-n" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-500 dark:fill-gray-400" />
            </marker>
          </defs>
          <text x="60" y="30" class="text-sm font-semibold fill-gray-700 dark:fill-gray-300">Producer</text>
          <line x1="110" y1="50" x2="110" y2="150" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600" />
          
          <text x="510" y="30" class="text-sm font-bold fill-indigo-600 dark:fill-indigo-400">Kafka Broker</text>
          <line x1="550" y1="40" x2="550" y2="150" stroke="currentColor" stroke-width="4" class="text-indigo-400" />

          <!-- Attempt Msg A (Fails) -->
          <circle cx="110" cy="60" r="5" class="fill-blue-500" />
          <text x="95" y="64" text-anchor="end" class="text-xs font-bold fill-blue-600 dark:fill-blue-400">send(A)</text>
          <line x1="120" y1="60" x2="300" y2="70" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow-n)" stroke-dasharray="4" />
          <path d="M 310 65 L 320 75 M 320 65 L 310 75" class="stroke-red-500" stroke-width="2" />
          <text x="340" y="75" class="text-xs font-bold fill-red-600 dark:fill-red-400">Network Timeout!</text>

          <!-- Attempt Msg B (Succeeds) -->
          <circle cx="110" cy="90" r="5" class="fill-green-500" />
          <text x="95" y="94" text-anchor="end" class="text-xs font-bold fill-green-600 dark:fill-green-400">send(B)</text>
          <line x1="120" y1="90" x2="530" y2="100" stroke="#10b981" stroke-width="2" marker-end="url(#arrow-n)" />
          
          <rect x="535" y="85" width="30" height="30" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="550" y="105" text-anchor="middle" class="text-xs font-bold fill-gray-800 dark:fill-gray-200">B</text>

          <!-- Retry Msg A (Succeeds later) -->
          <circle cx="110" cy="130" r="5" class="fill-blue-500" />
          <text x="95" y="134" text-anchor="end" class="text-xs font-bold fill-blue-600 dark:fill-blue-400">Retry send(A)</text>
          <line x1="120" y1="130" x2="530" y2="140" stroke="#3b82f6" stroke-width="2" marker-end="url(#arrow-n)" />

          <rect x="535" y="125" width="30" height="30" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="550" y="145" text-anchor="middle" class="text-xs font-bold fill-gray-800 dark:fill-gray-200">A</text>

          <text x="280" y="185" text-anchor="middle" class="text-sm font-medium fill-gray-600 dark:fill-gray-400">Even though A was published first, A's retry lands it AFTER B in the partition.</text>
        </svg>
      </div>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Example: Application-level asynchronous retry silently reversing order</span>
<span class="text-blue-400">fun</span> <span class="text-yellow-400">publishStatusChanges</span>(events: List&lt;OrderEvent&gt;) {
    events.forEach { event ->
        kafkaTemplate.send(<span class="text-green-300">"order-topic"</span>, event.orderId, event)
            .whenComplete { _, exception ->
                <span class="text-blue-400">if</span> (exception != <span class="text-blue-400">null</span>) {
                    <span class="text-gray-500">// ⚠️ DANGER: If Msg 'A' fails here due to an unstable network,</span>
                    <span class="text-gray-500">// it triggers this async callback ms or seconds later.</span>
                    <span class="text-gray-500">// Meanwhile, Msg 'B' might have already succeeded flawlessly.</span>
                    log.warn(<span class="text-green-300">"Failed to send \${event.id}, retrying asynchronously..."</span>)
                    retryPublishing(event) <span class="text-gray-500">// 'A' will now be appended AFTER 'B'</span>
                }
            }
    }
}</pre>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. Dynamic Infrastructure Changes in Cloud Environments</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        In cloud-native environments like Kubernetes (EKS), the infrastructure is relentlessly dynamic and rarely static.
      </p>
      <ul class="list-disc pl-5 space-y-3 text-gray-900 dark:text-gray-100 mb-6">
        <li><strong>Consumer Rebalancing:</strong> When pods scale horizontally (via HPA) or rollout, partition assignments rapidly shift. Uncommitted offset messages get re-polled by new pods, tangling state sequence.</li>
        <li><strong>Partition Scaling:</strong> Adding more partitions dynamically alters the key-hash destination. Successive events for the identical <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">userId</code> will instantly be scattered to isolated partitions.</li>
      </ul>

      <!-- SVG Diagram 3: Partition Scaling -->
      <div class="my-8 hidden sm:block">
        <svg viewBox="0 0 600 220" class="w-full h-auto max-w-3xl mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-gray-200 dark:border-gray-700 shadow-sm" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow-ps" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" class="fill-gray-500 dark:fill-gray-400" />
            </marker>
          </defs>
          
          <text x="130" y="30" text-anchor="middle" class="text-sm font-bold fill-gray-700 dark:fill-gray-300">Before Scaling (2 Partitions)</text>
          
          <rect x="40" y="50" width="180" height="40" rx="4" class="fill-blue-100 dark:fill-blue-900 stroke-blue-500" stroke-width="1" />
          <text x="130" y="75" text-anchor="middle" class="text-xs font-bold fill-blue-800 dark:fill-blue-200">Key: 'User123' (Msg A)</text>
          
          <line x1="130" y1="90" x2="130" y2="130" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow-ps)" />
          <text x="140" y="115" class="text-xs fill-gray-500">Hash % 2 = 0</text>
          
          <rect x="70" y="140" width="50" height="40" rx="4" class="fill-blue-200 dark:fill-blue-800 stroke-blue-500" stroke-width="2" />
          <text x="95" y="165" text-anchor="middle" class="text-xs font-bold fill-blue-900 dark:fill-blue-100">P-0</text>
          <rect x="140" y="140" width="50" height="40" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="165" y="165" text-anchor="middle" class="text-xs font-bold fill-gray-800 dark:fill-gray-200">P-1</text>
          
          <line x1="280" y1="30" x2="280" y2="190" stroke="#9ca3af" stroke-width="1" stroke-dasharray="4"/>

          <text x="440" y="30" text-anchor="middle" class="text-sm font-bold fill-indigo-700 dark:fill-indigo-300">After Scaling (3 Partitions)</text>
          
          <rect x="350" y="50" width="180" height="40" rx="4" class="fill-green-100 dark:fill-green-900 stroke-green-500" stroke-width="1" />
          <text x="440" y="75" text-anchor="middle" class="text-xs font-bold fill-green-800 dark:fill-green-200">Key: 'User123' (Msg B)</text>
          
          <line x1="440" y1="90" x2="510" y2="130" stroke="#6b7280" stroke-width="2" marker-end="url(#arrow-ps)" />
          <text x="480" y="115" class="text-xs fill-gray-500">Hash % 3 = 2</text>
          
          <rect x="370" y="140" width="50" height="40" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="395" y="165" text-anchor="middle" class="text-xs font-bold fill-gray-800 dark:fill-gray-200">P-0</text>
          <rect x="440" y="140" width="50" height="40" rx="4" class="fill-white dark:fill-gray-700 stroke-gray-400" stroke-width="2" />
          <text x="465" y="165" text-anchor="middle" class="text-xs font-bold fill-gray-800 dark:fill-gray-200">P-1</text>
          <rect x="510" y="140" width="50" height="40" rx="4" class="fill-green-200 dark:fill-green-800 stroke-green-500" stroke-width="2" />
          <text x="535" y="165" text-anchor="middle" class="text-xs font-bold fill-green-900 dark:fill-green-100">P-2</text>

          <text x="300" y="210" text-anchor="middle" class="text-sm font-medium fill-gray-600 dark:fill-gray-400">Result: New events for 'User123' jump to P-2. Consumers reading P-2 might process Msg B before Msg A in P-0.</text>
        </svg>
      </div>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Theoretical demonstration of how Partition Scaling shatters Sequence mapping</span>
<span class="text-blue-400">fun</span> <span class="text-yellow-400">determineTargetPartition</span>(key: String, partitionCount: Int): Int {
    <span class="text-gray-500">// Kafka's DefaultPartitioner relies heavily on the total partition count</span>
    <span class="text-blue-400">return</span> Math.abs(Utils.murmur2(key.toByteArray())) % partitionCount
}

<span class="text-blue-400">fun</span> <span class="text-yellow-400">main</span>() {
    <span class="text-blue-400">val</span> userId = <span class="text-green-300">"User_9921"</span>
    
    <span class="text-gray-500">// Scenario 1: Topic initially has 2 partitions</span>
    println(determineTargetPartition(userId, <span class="text-blue-400">2</span>)) <span class="text-gray-500">// Output: Partition 0</span>
    
    <span class="text-gray-500">// Scenario 2: Traffic surges, Ops dynamically scales topic to 3 partitions</span>
    <span class="text-gray-500">// Events for 'User_9921' instantly drift to a completely different partition!</span>
    println(determineTargetPartition(userId, <span class="text-blue-400">3</span>)) <span class="text-gray-500">// Output: Partition 2</span>
}</pre>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">💡 Practical Best Practices: Defensive Consumers</h2>
      <p class="mb-4">
        Rather than attempting the Sisyphean task of preserving chronological order at the precarious infrastructure layer, <strong>it is vastly more robust to design defensive logic at the consumer layer</strong>.
      </p>
      
      <p class="mb-2 font-bold text-lg">Optimistic Locking / Timestamp Versioning</p>
      <p class="mb-4">
        Compare the incoming event's <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">occurredAt</code> timestamp against the database. If it's stale, discard it purely based on chronological truth, effectively filtering out any out-of-order latency noise.
      </p>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Consumer-layer Idempotency using Timestamp/Versioning</span>
<span class="text-yellow-400">@KafkaListener</span>(topics = [<span class="text-green-300">"order-topic"</span>])
<span class="text-yellow-400">@Transactional</span>
<span class="text-blue-400">fun</span> <span class="text-yellow-400">handleOrderEvent</span>(event: OrderEvent) {
    <span class="text-blue-400">val</span> order = orderRepository.findById(event.orderId).orElseThrow()
    
    <span class="text-gray-500">// Defensive logic: Completely neutralize out-of-order event risks.</span>
    <span class="text-gray-500">// If the DB's updated time is strictly newer than the event's creation time, skip.</span>
    <span class="text-blue-400">if</span> (event.occurredAt.isBefore(order.lastUpdatedAt)) {
        log.warn(<span class="text-green-300">"Ignored stale/out-of-order event for order \${event.orderId}"</span>)
        <span class="text-blue-400">return</span>
    }
    
    <span class="text-gray-500">// Proceed with business logic securely...</span>
    order.syncStateFromEvent(event)
}</pre>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">💡 Attempting 100% Ordering: Transactional Outbox Pattern</h2>
      <p class="mb-4">
        If an absolute guarantee is mandatory without entirely destroying throughput, the <strong>Transactional Outbox Pattern paired with CDC</strong> is the architectural gold standard.
      </p>
      
      <!-- SVG Diagram 2: Outbox Pattern -->
      <div class="my-8 hidden sm:block">
        <svg viewBox="0 0 650 220" class="w-full h-auto max-w-3xl mx-auto rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-gray-200 dark:border-gray-700 shadow-sm" preserveAspectRatio="xMidYMid meet">
          <defs>
            <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" class="fill-indigo-500 dark:fill-indigo-400" />
            </marker>
          </defs>

          <!-- Component Flow -->
          <rect x="20" y="60" width="120" height="70" rx="8" class="fill-white dark:fill-gray-900 stroke-indigo-400" stroke-width="2" />
          <text x="80" y="90" text-anchor="middle" class="text-sm font-bold fill-indigo-700 dark:fill-indigo-300">Application</text>
          <text x="80" y="110" text-anchor="middle" class="text-xs font-semibold fill-indigo-600 dark:fill-indigo-400">(Local TX)</text>

          <line x1="140" y1="95" x2="210" y2="95" stroke="currentColor" class="text-indigo-500 dark:text-indigo-400" stroke-width="3" marker-end="url(#arrow2)" />

          <!-- DB Box -->
          <rect x="220" y="30" width="140" height="130" rx="8" class="fill-blue-50 dark:fill-gray-800 stroke-blue-500" stroke-width="2" />
          <text x="290" y="55" text-anchor="middle" class="text-sm font-bold fill-blue-800 dark:fill-blue-300">Database</text>
          
          <rect x="235" y="75" width="110" height="25" rx="4" class="fill-blue-200 dark:fill-blue-900 stroke-blue-400" stroke-width="1" />
          <text x="290" y="92" text-anchor="middle" class="text-xs font-bold fill-gray-900 dark:fill-gray-100">Domain Table</text>
          
          <rect x="235" y="115" width="110" height="25" rx="4" class="fill-green-200 dark:fill-green-900 stroke-green-400" stroke-width="1" />
          <text x="290" y="132" text-anchor="middle" class="text-xs font-bold fill-gray-900 dark:fill-gray-100">Outbox Table</text>

          <line x1="360" y1="125" x2="430" y2="125" stroke="currentColor" class="text-indigo-500 dark:text-indigo-400" stroke-width="3" stroke-dasharray="4" marker-end="url(#arrow2)" />
          <text x="395" y="115" text-anchor="middle" class="text-xs font-semibold fill-gray-500 dark:fill-gray-400">Binlog tail</text>

          <rect x="440" y="90" width="180" height="70" rx="8" class="fill-white dark:fill-gray-900 stroke-teal-500" stroke-width="2" />
          <text x="530" y="120" text-anchor="middle" class="text-sm font-bold fill-teal-700 dark:fill-teal-300">Debezium CDC</text>
          <text x="530" y="140" text-anchor="middle" class="text-xs font-semibold fill-teal-600 dark:fill-teal-400">Pushes accurately to Kafka</text>

          <text x="325" y="200" text-anchor="middle" class="text-sm font-medium fill-gray-600 dark:fill-gray-400">Updates happen atomically. CDC reads binlog strictly in committed order.</text>
        </svg>
      </div>

<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// Transactional Outbox Implementation approach</span>
<span class="text-yellow-400">@Service</span>
<span class="text-blue-400">class</span> <span class="text-green-400">PaymentService</span>(
    <span class="text-blue-400">private</span> <span class="text-blue-400">val</span> paymentRepository: PaymentRepository,
    <span class="text-blue-400">private</span> <span class="text-blue-400">val</span> outboxRepository: OutboxRepository
) {
    <span class="text-yellow-400">@Transactional</span>
    <span class="text-blue-400">fun</span> <span class="text-yellow-400">processPayment</span>(paymentReq: PaymentRequest) {
        <span class="text-gray-500">// 1. Process local core business logic securely</span>
        <span class="text-blue-400">val</span> payment = paymentRepository.save(Payment(paymentReq))
        
        <span class="text-gray-500">// 2. Save event in the highly precise same Local DB Transaction</span>
        <span class="text-gray-500">// Absolutely NO direct kafkaTemplate.send() happens here.</span>
        outboxRepository.save(OutboxEntity(
            aggregateId = payment.id.toString(),
            aggregateType = <span class="text-green-300">"PAYMENT"</span>,
            payload = objectMapper.writeValueAsString(PaymentRequestedEvent(payment))
        ))
    }
}
<span class="text-gray-500">// An external, highly-resilient CDC process automatically tails the DB binary log</span>
<span class="text-gray-500">// emitting outbox entities into Kafka in perfect, undeniable mathematical order.</span>
</pre>
      
      <p class="mb-4">
        Because both records are flushed simultaneously exactly when the Database commits, you completely eliminate the application sequence risk.
      </p>
    </section>

    <section class="mb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">🎯 Conclusion: The Architect's Choice</h2>
      
      <div class="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl border-l-8 border-l-indigo-500 relative overflow-hidden">
        <blockquote class="text-lg text-gray-700 dark:text-gray-300 relative z-10 space-y-4">
          <p class="text-base leading-relaxed">
            Ultimately, 100% guaranteed order is not technically impossible; rather, it is a demanding question of: <strong>"Is your business truly willing to pay the steep, punitive costs in degraded performance and massive infrastructure complexity to achieve it?"</strong>
          </p>
          <p class="text-base leading-relaxed">
            In the vast majority of practical, high-throughput environments, rather than making the underlying system convoluted, proactively leveraging consumer-side idempotency and discarding stale data based on robust versioning or timestamps is widely accepted as the most cost-effective and pragmatic architectural compromise.
          </p>
        </blockquote>
      </div>
    </section>
  `
};
