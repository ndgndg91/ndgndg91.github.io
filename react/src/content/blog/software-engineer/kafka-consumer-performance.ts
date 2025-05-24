import type { BlogPost } from '../../../types/blog';

export const kafkaConsumerPerformance: BlogPost = {
  id: 'kafka-consumer-performance',
  category: 'software-engineer',
  title: 'Optimizing Kafka Consumer Performance',
  description: 'Explore effective strategies to optimize Kafka consumer performance including partition-pod 1:1 mapping, concurrent listeners, Confluent Parallel Consumer, and asynchronous processing patterns. Learn implementation techniques, advantages, and trade-offs for each approach to maximize throughput and resource efficiency in your Kafka-based systems.',
  date: '2025-04-10',
  updatedDate: '2025-04-10',
  tags: ['Kafka', 'Performance'],
  image: 'kafka-consumer-performance.webp',
  content: `
    <nav class="mb-4 px-2 sm:px-4 xl:pr-0" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list.html" class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-400 dark:text-gray-500">Optimizing Kafka Consumer Performance</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8 px-2 sm:px-4 xl:pr-0">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">Optimizing Kafka Consumer Performance</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: April 10, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:text-gray-900 prose-code:dark:text-gray-100 prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-400 prose-strong:text-gray-900 prose-strong:dark:text-white px-2 sm:px-4 xl:pr-0">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Partitions and Pods: 1:1 Mapping</h2>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Simplest configuration approach</li>
          <li class="whitespace-nowrap mobile-wrap">Ensures uniform load distribution across consumers</li>
          <li class="whitespace-nowrap mobile-wrap">Each pod handles exactly one partition</li>
          <li class="whitespace-nowrap mobile-wrap">Scales linearly with partition count</li>
        </ul>
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Disadvantages:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Increased overhead for partition leader election and metadata management</li>
          <li class="whitespace-nowrap mobile-wrap">Higher resource consumption across cluster</li>
          <li class="whitespace-nowrap mobile-wrap">More complex rebalancing when pods join/leave the cluster</li>
          <li class="whitespace-nowrap mobile-wrap">Limited by maximum partition count of a topic</li>
        </ul>
      </div>

      <div class="overflow-x-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460" class="w-full max-w-full mx-auto">
          <rect width="900" height="460" fill="#f8f9fa" rx="10" ry="10"/>

          <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">
            Partition-Pod 1:1 Mapping
          </text>

          <!-- Kafka Topic -->
          <rect x="50" y="80" width="180" height="260" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
          <text x="140" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Topic</text>

          <!-- Partitions -->
          <rect x="70" y="130" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="155" font-family="Arial" font-size="16" text-anchor="middle">Partition 0</text>

          <rect x="70" y="180" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="205" font-family="Arial" font-size="16" text-anchor="middle">Partition 1</text>

          <rect x="70" y="230" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="255" font-family="Arial" font-size="16" text-anchor="middle">Partition 2</text>

          <rect x="70" y="280" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="305" font-family="Arial" font-size="16" text-anchor="middle">Partition 3</text>

          <!-- Consumer Pods -->
          <rect x="520" y="80" width="250" height="260" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
          <text x="645" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Consumer Pods</text>

          <!-- Pods -->
          <rect x="540" y="130" width="210" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
          <text x="645" y="155" font-family="Arial" font-size="16" text-anchor="middle">Pod 1 (Partition 0)</text>

          <rect x="540" y="180" width="210" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
          <text x="645" y="205" font-family="Arial" font-size="16" text-anchor="middle">Pod 2 (Partition 1)</text>

          <rect x="540" y="230" width="210" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
          <text x="645" y="255" font-family="Arial" font-size="16" text-anchor="middle">Pod 3 (Partition 2)</text>

          <rect x="540" y="280" width="210" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
          <text x="645" y="305" font-family="Arial" font-size="16" text-anchor="middle">Pod 4 (Partition 3)</text>

          <!-- Arrows -->
          <path d="M210,150 L540,150" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M210,200 L540,200" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M210,250 L540,250" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M210,300 L540,300" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

          <!-- Advantages and Disadvantages -->
          <text x="165" y="360" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Advantages:</text>
          <text x="165" y="380" font-family="Arial" font-size="12" text-anchor="middle">Simple, even load: 1 pod = 1 partition</text>

          <text x="650" y="360" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Disadvantages:</text>
          <text x="650" y="380" font-family="Arial" font-size="12" text-anchor="middle">Scales only with partitions, high coordination cost</text>

          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#fa8c16"/>
            </marker>
          </defs>
        </svg>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">ConcurrentKafkaListenerContainerFactory</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Kafka provides the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">ConcurrentKafkaListenerContainerFactory</code> to control concurrency within a consumer pod.
          It determines how many threads will process Kafka messages in parallel.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Key considerations:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Maximum concurrency is limited by the number of topic partitions</li>
          <li class="whitespace-nowrap mobile-wrap">Threads exceeding the number of partitions will stay idle</li>
          <li class="whitespace-nowrap mobile-wrap">High concurrency may cause increased CPU and memory pressure</li>
          <li class="whitespace-nowrap mobile-wrap">The default concurrency value is 1 (single-threaded message consumption)</li>
          <li class="whitespace-nowrap mobile-wrap">Concurrency should generally not exceed the number of partitions assigned to the consumer instance</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation example (Kotlin):</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <div class="overflow-x-auto">
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 max-w-full overflow-x-auto"><code class="language-kotlin"><span class="text-[#808080]">@Bean</span>
<span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA">kafkaListenerContainerFactory</span>(
    <span class="text-[#9CDCFE">consumerFactory</span>: <span class="text-[#4EC9B0]">ConsumerFactory</span><<span class="text-[#4EC9B0]">String</span>, <span class="text-[#4EC9B0]">CloudEvent</span>>
): <span class="text-[#4EC9B0]">ConcurrentKafkaListenerContainerFactory</span><<span class="text-[#4EC9B0]">String</span>, <span class="text-[#4EC9B0]">CloudEvent</span>> {
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE">factory</span> = <span class="text-[#4EC9B0]">ConcurrentKafkaListenerContainerFactory</span><<span class="text-[#4EC9B0]">String</span>, <span class="text-[#4EC9B0]">CloudEvent</span>>()
    <span class="text-[#9CDCFE">factory</span>.<span class="text-[#9CDCFE">consumerFactory</span> = <span class="text-[#9CDCFE">consumerFactory</span>
    <span class="text-[#9CDCFE">factory</span>.<span class="text-[#DCDCAA">setConcurrency</span>(<span class="text-[#B5CEA8">3</span>) <span class="text-[#808080]">// Adjust based on the number of partitions</span>
    <span class="text-[#569CD6]">return</span> <span class="text-[#9CDCFE">factory</span>
}</code></pre>
          </div>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Source code reference (Java):</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <div class="overflow-x-auto">
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 max-w-full overflow-x-auto"><code class="language-java"><span class="text-[#569CD6]">public class</span> <span class="text-[#4EC9B0]">ConcurrentMessageListenerContainer</span><<span class="text-[#4EC9B0]">K</span>, <span class="text-[#4EC9B0]">V</span>> <span class="text-[#569CD6]">extends</span> <span class="text-[#4EC9B0]">AbstractMessageListenerContainer</span><<span class="text-[#4EC9B0]">K</span>, <span class="text-[#4EC9B0]">V</span>> {
    <span class="text-[#808080]">// Other code omitted</span>
    <span class="text-[#569CD6]">private</span> <span class="text-[#4EC9B0]">int</span> <span class="text-[#9CDCFE">concurrency</span> = <span class="text-[#B5CEA8">1</span>;
    <span class="text-[#808080]">// Other code omitted</span>
}</code></pre>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-2">
          The <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">ConsumerFactory</code> must be configured for the listener container to function correctly.
          For example, a <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">DefaultKafkaConsumerFactory</code> can be used with specific deserializers and properties.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Confluent Parallel Consumer Overview</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Confluent's Parallel Consumer offers an alternative approach to enhance consumer throughput without needing additional partitions.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Key Features:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Allows multiple threads to process messages from a single partition</li>
          <li class="whitespace-nowrap mobile-wrap">Bypasses scaling limits imposed by partition count</li>
          <li class="whitespace-nowrap mobile-wrap">Overcomes batch listener limitations, offering better error handling and retry capabilities</li>
          <li class="whitespace-nowrap mobile-wrap">Supports fine-grained per-message acknowledgments</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Limitations:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Limited community references and documentation</li>
          <li class="whitespace-nowrap mobile-wrap">No direct integration with Spring Kafka (as of April 2025)</li>
          <li class="whitespace-nowrap mobile-wrap">Independent from the Spring ecosystem</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Resources:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap"><a href="https://github.com/confluentinc/parallel-consumer" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">GitHub - confluentinc/parallel-consumer</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.confluent.io/blog/introducing-confluent-parallel-consumer/" class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">Introducing Confluent's Parallel Consumer Message Processing Client</a></li>
        </ul>
      </div>

      <div class="overflow-x-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" class="w-full max-w-full mx-auto">
          <!-- Background -->
          <rect width="800" height="450" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Confluent Parallel Consumer</text>

          <!-- Kafka Topic -->
          <rect x="50" y="80" width="180" height="140" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
          <text x="140" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Topic</text>

          <!-- Partitions -->
          <rect x="70" y="130" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="155" font-family="Arial" font-size="16" text-anchor="middle">Partition 0</text>

          <rect x="70" y="180" width="140" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="140" y="205" font-family="Arial" font-size="16" text-anchor="middle">Partition 1</text>

          <!-- Parallel Consumer -->
          <rect x="320" y="80" width="200" height="200" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
          <text x="420" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Parallel Consumer</text>

          <!-- Internal Queue -->
          <rect x="340" y="140" width="160" height="100" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
          <text x="420" y="160" font-family="Arial" font-size="14" text-anchor="middle">Parallel Consumer Buffer</text>

          <!-- Queue Items -->
          <rect x="350" y="170" width="140" height="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
          <rect x="350" y="190" width="140" height="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
          <rect x="350" y="210" width="140" height="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>

          <!-- Worker Pool -->
          <rect x="600" y="80" width="150" height="200" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
          <text x="675" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Worker Pool</text>

          <!-- Worker Threads -->
          <rect x="620" y="130" width="110" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="5" ry="5"/>
          <text x="675" y="150" font-family="Arial" font-size="14" text-anchor="middle">Worker 1</text>

          <rect x="620" y="170" width="110" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="5" ry="5"/>
          <text x="675" y="190" font-family="Arial" font-size="14" text-anchor="middle">Worker 2</text>

          <rect x="620" y="210" width="110" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="5" ry="5"/>
          <text x="675" y="230" font-family="Arial" font-size="14" text-anchor="middle">Worker 3</text>

          <rect x="620" y="250" width="110" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="5" ry="5"/>
          <text x="675" y="270" font-family="Arial" font-size="14" text-anchor="middle">Worker 4</text>

          <!-- Arrows: Partitions to Internal Queue -->
          <path d="M210,150 L320,150" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow1)"/>
          <path d="M210,200 L320,200" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow1)"/>

          <!-- Arrows: Internal Queue to Workers -->
          <path d="M500,150 L620,145" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
          <path d="M500,175 L620,185" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
          <path d="M500,200 L620,225" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
          <path d="M500,225 L620,265" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>

          <!-- Explanation Box -->
          <text x="400" y="320" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Benefits of Parallel Consumer:</text>
          <text x="400" y="350" font-family="Arial" font-size="14" text-anchor="middle">• Enables multi-threaded processing per partition</text>
          <text x="400" y="375" font-family="Arial" font-size="14" text-anchor="middle">• Scales consumption without increasing partitions</text>
          <text x="400" y="400" font-family="Arial" font-size="14" text-anchor="middle">• Supports individual message-level acknowledgement</text>
          <text x="400" y="425" font-family="Arial" font-size="14" text-anchor="middle">• Improves reliability over batch-based listeners</text>

          <!-- Arrow Definitions -->
          <defs>
            <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#1890ff"/>
            </marker>
            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#fa8c16"/>
            </marker>
          </defs>
        </svg>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Async Processing After Consume</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Another approach to improve throughput is to offload the actual message processing to a separate thread pool after
          quickly acknowledging receipt of the message from Kafka.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <div class="overflow-x-auto">
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 max-w-full overflow-x-auto"><code class="language-kotlin"><span class="text-[#808080]">@Component</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">KafkaMessageHandler</span>(
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">asyncExecutor</span>: <span class="text-[#4EC9B0]">AsyncExecutor</span>
) {
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">logger</span> = <span class="text-[#4EC9B0]">LoggerFactory</span>.<span class="text-[#DCDCAA]">getLogger</span>(<span class="text-[#4EC9B0]">KafkaMessageHandler</span>::<span class="text-[#569CD6]">class</span>.<span class="text-[#9CDCFE]">java</span>)

    <span class="text-[#808080]">@KafkaListener</span>(topics = [<span class="text-[#CE9178]">"my-topic"</span>])
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">handleMessage</span>(<span class="text-[#9CDCFE">message</span>: <span class="text-[#4EC9B0]">ConsumerRecord</span><<span class="text-[#4EC9B0]">String</span>, <span class="text-[#4EC9B0]">String</span>>) {
        <span class="text-[#569CD6]">try</span> {
            <span class="text-[#9CDCFE">asyncExecutor</span>.<span class="text-[#DCDCAA">execute</span> {
                <span class="text-[#569CD6]">try</span> {
                    <span class="text-[#9CDCFE">processMessage</span>(<span class="text-[#9CDCFE">message</span>)
                } <span class="text-[#569CD6]">catch</span> (<span class="text-[#9CDCFE">e</span>: <span class="text-[#4EC9B0]">Exception</span>) {
                    <span class="text-[#9CDCFE">logger</span>.<span class="text-[#DCDCAA">error</span>(<span class="text-[#CE9178]">"Error processing message: {}"</span>, <span class="text-[#9CDCFE">e</span>.<span class="text-[#9CDCFE">message</span>, <span class="text-[#9CDCFE">e</span>)
                }
            }
        } <span class="text-[#569CD6]">catch</span> (<span class="text-[#9CDCFE">e</span>: <span class="text-[#4EC9B0]">RejectedExecutionException</span>) {
            <span class="text-[#9CDCFE">logger</span>.<span class="text-[#DCDCAA">warn</span>(<span class="text-[#CE9178]">"Thread pool is full, message will be retried"</span>)
            <span class="text-[#569CD6]">throw</span> <span class="text-[#9CDCFE">e</span>
        }
    }

    <span class="text-[#569CD6]">private fun</span> <span class="text-[#DCDCAA">processMessage</span>(<span class="text-[#9CDCFE">message</span>: <span class="text-[#4EC9B0]">ConsumerRecord</span><<span class="text-[#4EC9B0]">String</span>, <span class="text-[#4EC9B0]">String</span>>) {
        <span class="text-[#808080]">// Simulate I/O-bound operation</span>
        <span class="text-[#4EC9B0]">Thread</span>.<span class="text-[#DCDCAA]">sleep</span>(<span class="text-[#B5CEA8]">100</span>)
        <span class="text-[#9CDCFE">logger</span>.<span class="text-[#DCDCAA">info</span>(<span class="text-[#CE9178]">"Processed message: {}"</span>, <span class="text-[#9CDCFE">message</span>.<span class="text-[#9CDCFE">value</span>())
    }
}</code></pre>
          </div>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">AsyncExecutor</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <div class="overflow-x-auto">
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 max-w-full overflow-x-auto"><code class="language-kotlin"><span class="text-[#808080]">@Bean</span>(destroyMethod = <span class="text-[#CE9178]">"shutdown"</span>)
<span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA">asyncExecutor</span>(): <span class="text-[#4EC9B0]">ExecutorService</span> {
  <span class="text-[#569CD6]">return</span> <span class="text-[#4EC9B0]">Executors</span>.<span class="text-[#DCDCAA]">newFixedThreadPool</span>(<span class="text-[#B5CEA8]">10</span>)
}</code></pre>
          </div>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Benefits:</h3>
        <ul class="max-w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 overflow-x-auto">
          <li class="whitespace-nowrap mobile-wrap">Improved throughput for I/O-bound operations</li>
          <li class="whitespace-nowrap mobile-wrap">Consumer thread quickly acknowledges messages and continues</li>
          <li class="whitespace-nowrap mobile-wrap">Good for operations where reliability isn't critical</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Drawbacks:</h3>
        <ul class="w-full space-y-2 text-gray-700 list-none dark:text-gray-400">
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Increased memory usage: All messages in a batch are stored in memory before processing, leading to higher memory consumption especially with large batches.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Higher latency: Batch listener waits for either the batch size to be reached or a timeout to occur, which can delay message processing compared to single-message processing.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Difficult to tune batch size: Setting the optimal batch size is non-trivial. A large size increases memory usage; a small size reduces efficiency.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Complex error handling: If a single message in a batch fails, it may affect the entire batch. This requires more sophisticated error-handling logic.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Complex retry logic: When some messages in a batch fail, you'll need custom logic to isolate and retry only those messages, which adds processing complexity.</span>
          </li>
        </ul>
      </div>

      <div class="overflow-x-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 520" class="w-full max-w-full mx-auto">
          <rect width="900" height="520" fill="#f8f9fa" rx="10" ry="10"/>

          <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Reliable Async Processing</text>

          <!-- Kafka -->
          <rect x="40" y="100" width="160" height="200" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
          <text x="120" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka</text>

          <!-- Consumer -->
          <rect x="240" y="100" width="220" height="200" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
          <text x="350" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Consumer</text>
          <text x="350" y="160" font-family="Arial" font-size="14" text-anchor="middle">submit to ExecutorService</text>

          <!-- Async Executor -->
          <rect x="520" y="100" width="320" height="270" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="8" ry="8"/>
          <text x="680" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ExecutorService</text>

          <!-- Workers -->
          <rect x="540" y="170" width="280" height="30" fill="#adc6ff" stroke="#2f54eb" stroke-width="1" rx="5" ry="5"/>
          <text x="680" y="190" font-family="Arial" font-size="14" text-anchor="middle">processMessage()</text>

          <!-- Success path -->
          <rect x="540" y="220" width="280" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
          <text x="680" y="240" font-family="Arial" font-size="14" text-anchor="middle">ack.acknowledge() if success ✅</text>

          <!-- Failure path -->
          <rect x="540" y="270" width="280" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
          <text x="680" y="290" font-family="Arial" font-size="14" text-anchor="middle">handleProcessingError() if fail ❌</text>

          <!-- Retry/DLT -->
          <rect x="700" y="330" width="100" height="30" fill="#fff1b8" stroke="#d48806" stroke-width="1" rx="5" ry="5"/>
          <text x="750" y="350" font-family="Arial" font-size="13" text-anchor="middle">Retry / DLT</text>

          <!-- Arrows -->
          <path d="M200,150 L240,150" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M460,170 L520,185" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M820,285 L820,345 L800,345" stroke="#cf1322" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M820,285 L820,345 L800,345" fill="none"/>

          <!-- Retry path arrow -->
          <path d="M820,285 Q850,310 800,330" stroke="#d48806" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

          <!-- Steps -->
          <text x="130" y="430" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">1. Consume message</text>
          <text x="350" y="430" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">2. Submit to thread pool</text>
          <text x="680" y="430" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">3. Process → Ack / Error</text>

          <!-- Backpressure Note -->
          <text x="680" y="470" font-family="Arial" font-size="13" text-anchor="middle" fill="#595959">⚠ Backpressure mechanism may be needed if thread pool is overloaded</text>

          <!-- Arrow Marker -->
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#595959"/>
            </marker>
          </defs>
        </svg>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Batch Listener</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Using the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">@KafkaListener</code> annotation in Spring Kafka, you can configure your consumer to operate in batch mode to enhance processing efficiency.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto max-w-full"><code class="language-java"><span class="text-[#808080]">@Bean</span>
<span class="text-[#569CD6]">public</span> <span class="text-[#4EC9B0]">KafkaListenerContainerFactory</span><<span class="text-[#569CD6]">?</span>> <span class="text-[#DCDCAA">batchFactory</span>() {
    <span class="text-[#4EC9B0]">ConcurrentKafkaListenerContainerFactory</span><<span class="text-[#4EC9B0]">Integer</span>, <span class="text-[#4EC9B0]">String</span>> <span class="text-[#9CDCFE">factory</span> = <span class="text-[#569CD6]">new</span> <span class="text-[#4EC9B0]">ConcurrentKafkaListenerContainerFactory</span><>();
    <span class="text-[#9CDCFE">factory</span>.<span class="text-[#DCDCAA">setConsumerFactory</span>(<span class="text-[#DCDCAA">consumerFactory</span>());
    <span class="text-[#9CDCFE">factory</span>.<span class="text-[#DCDCAA">setBatchListener</span>(<span class="text-[#569CD6]">true</span>);  <span class="text-[#808080]">// <<<<<<<<<<<<<</span>
    <span class="text-[#569CD6]">return</span> <span class="text-[#9CDCFE">factory</span>;
}

<span class="text-[#808080]">@KafkaListener</span>(id = <span class="text-[#CE9178]">"list"</span>, topics = <span class="text-[#CE9178]">"myTopic"</span>, containerFactory = <span class="text-[#CE9178]">"batchFactory"</span>)
<span class="text-[#569CD6]">public void</span> <span class="text-[#DCDCAA]">listen</span>(
    <span class="text-[#4EC9B0]">List</span><<span class="text-[#4EC9B0]">String</span>> <span class="text-[#9CDCFE">list</span>,
    <span class="text-[#808080]">@Header</span>(<span class="text-[#4EC9B0]">KafkaHeaders</span>.<span class="text-[#9CDCFE">RECEIVED_KEY</span>) <span class="text-[#4EC9B0]">List</span><<span class="text-[#4EC9B0]">Integer</span>> <span class="text-[#9CDCFE">keys</span>,
    <span class="text-[#808080]">@Header</span>(<span class="text-[#4EC9B0]">KafkaHeaders</span>.<span class="text-[#9CDCFE">RECEIVED_PARTITION</span>) <span class="text-[#4EC9B0]">List</span><<span class="text-[#4EC9B0]">Integer</span>> <span class="text-[#9CDCFE">partitions</span>,
    <span class="text-[#808080]">@Header</span>(<span class="text-[#4EC9B0]">KafkaHeaders</span>.<span class="text-[#9CDCFE">RECEIVED_TOPIC</span>) <span class="text-[#4EC9B0]">List</span><<span class="text-[#4EC9B0]">String</span>> <span class="text-[#9CDCFE">topics</span>,
    <span class="text-[#808080]">@Header</span>(<span class="text-[#4EC9B0]">KafkaHeaders</span>.<span class="text-[#9CDCFE">OFFSET</span>) <span class="text-[#4EC9B0]">List</span><<span class="text-[#4EC9B0]">Long</span>> <span class="text-[#9CDCFE">offsets</span>) {
    <span class="text-[#808080]">...</span>
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Drawbacks:</h3>
        <ul class="w-full space-y-2 text-gray-700 list-none dark:text-gray-400">
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Increased memory usage: All messages in a batch are stored in memory before processing, leading to higher memory consumption especially with large batches.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Higher latency: Batch listener waits for either the batch size to be reached or a timeout to occur, which can delay message processing compared to single-message processing.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Difficult to tune batch size: Setting the optimal batch size is non-trivial. A large size increases memory usage; a small size reduces efficiency.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Complex error handling: If a single message in a batch fails, it may affect the entire batch. This requires more sophisticated error-handling logic.</span>
          </li>
          <li class="flex gap-2">
            <span class="flex-shrink-0">•</span>
            <span>Complex retry logic: When some messages in a batch fail, you'll need custom logic to isolate and retry only those messages, which adds processing complexity.</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <br>
`
}; 