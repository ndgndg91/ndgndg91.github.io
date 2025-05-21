import type { BlogPost } from '../../../types/blog';

export const kafkaConsumerRate: BlogPost = {
  id: 'kafka-consumer-rate',
  category: 'software-engineer',
  title: 'Controlling Processing Rate in Kafka Consumers',
  description: 'One of the most common challenges when working with message brokers like Kafka is controlling the rate at which messages are processed. Especially when a large volume of messages arrives in a short period, it can lead to system overload or impact downstream services.',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['Kafka', 'Spring Kafka', 'Rate Limiting'],
  image: 'kafka-consumer-rate.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">Kafka Consumer Rate</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">Controlling Processing Rate in Kafka Consumers</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: March 31, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:text-gray-900 prose-code:dark:text-gray-100 prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-400 prose-strong:text-gray-900 prose-strong:dark:text-white">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Introduction</h2>
        <p class="text-gray-700 dark:text-gray-400">
          One of the most common challenges when working with message brokers like Kafka is controlling the rate at which messages are processed.
          Especially when a large volume of messages arrives in a short period, it can lead to system overload or impact downstream services.
          This article explores how to implement rate limiting in Spring Kafka consumers using an internal queue approach.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">The Problem</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Need to send push notifications to many users simultaneously</li>
          <li class="whitespace-nowrap mobile-wrap">Processing all notifications at once can overwhelm notification services</li>
          <li class="whitespace-nowrap mobile-wrap">Want to control the processing rate (e.g., X notifications per second)</li>
          <li class="whitespace-nowrap mobile-wrap">Need to maintain message ordering and ensure delivery</li>
        </ul>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
        <!-- Background -->
        <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka Consumer with Rate Limiting Queue and DLT</text>

        <!-- Kafka Input Topic -->
        <rect x="50" y="100" width="160" height="120" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="130" y="125" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Topic</text>

        <!-- Messages in Kafka -->
        <rect x="70" y="140" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>
        <rect x="110" y="140" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>
        <rect x="150" y="140" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>
        <rect x="70" y="170" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>
        <rect x="110" y="170" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>
        <rect x="150" y="170" width="30" height="20" fill="#1890ff" rx="2" ry="2"/>

        <!-- Consumer -->
        <rect x="280" y="100" width="160" height="120" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="360" y="125" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Consumer</text>
        <text x="360" y="155" font-family="Arial" font-size="14" text-anchor="middle">Reads messages</text>
        <text x="360" y="175" font-family="Arial" font-size="14" text-anchor="middle">from Kafka</text>
        <text x="360" y="195" font-family="Arial" font-size="14" text-anchor="middle">and enqueues</text>

        <!-- Queue -->
        <rect x="510" y="100" width="240" height="120" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="630" y="125" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ConcurrentLinkedQueue</text>

        <!-- Items in Queue -->
        <rect x="530" y="150" width="30" height="20" fill="#52c41a" rx="2" ry="2"/>
        <rect x="570" y="150" width="30" height="20" fill="#52c41a" rx="2" ry="2"/>
        <rect x="610" y="150" width="30" height="20" fill="#52c41a" rx="2" ry="2"/>
        <rect x="650" y="150" width="30" height="20" fill="#52c41a" rx="2" ry="2"/>
        <rect x="690" y="150" width="30" height="20" fill="#52c41a" rx="2" ry="2"/>

        <!-- Scheduled Task -->
        <rect x="480" y="250" width="300" height="30" fill="#fff2e8" stroke="#fa541c" stroke-width="2" rx="5" ry="5"/>
        <text x="630" y="270" font-family="Arial" font-size="14" text-anchor="middle">Scheduled Task (1/sec): Process N messages</text>

        <!-- Dead Letter Topic -->
        <rect x="240" y="320" width="180" height="60" fill="#fff1f0" stroke="#f5222d" stroke-width="2" rx="5" ry="5"/>
        <text x="330" y="345" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Dead Letter Topic</text>
        <text x="330" y="365" font-family="Arial" font-size="12" text-anchor="middle">Failed messages with error info</text>

        <!-- Success and Error boxes - fixed positions to match labels -->
        <rect x="650" y="320" width="100" height="60" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="700" y="345" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Success</text>
        <text x="700" y="365" font-family="Arial" font-size="12" text-anchor="middle">Process message</text>

        <rect x="510" y="320" width="100" height="60" fill="#fff1f0" stroke="#f5222d" stroke-width="2" rx="5" ry="5"/>
        <text x="560" y="345" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Failure</text>
        <text x="560" y="365" font-family="Arial" font-size="12" text-anchor="middle">Send to DLT</text>

        <!-- Arrows -->
        <!-- Incoming message flow -->
        <path d="M210,160 L280,160" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M440,160 L510,160" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M630,220 L630,250" stroke="#52c41a" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- From Scheduled Task to Success/Failure branches -->
        <path d="M700,280 L700,320" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M560,280 L560,320" stroke="#f5222d" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- From Failure to DLT -->
        <path d="M510,350 L420,350" stroke="#f5222d" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000"/>
          </marker>
        </defs>

        <!-- Labels -->
        <text x="245" y="140" font-family="Arial" font-size="12" text-anchor="middle">1. Consume</text>
        <text x="475" y="140" font-family="Arial" font-size="12" text-anchor="middle">2. Queue</text>
        <text x="670" y="240" font-family="Arial" font-size="12" text-anchor="middle">3. Process</text>
        <text x="740" y="300" font-family="Arial" font-size="12" text-anchor="middle">4a. Success</text>
        <text x="530" y="300" font-family="Arial" font-size="12" text-anchor="middle">4b. Error</text>
        <text x="465" y="340" font-family="Arial" font-size="12" text-anchor="middle" fill="#f5222d">5. Send to DLT</text>
      </svg>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">The Solution</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The solution involves using a ConcurrentLinkedQueue to store messages and a scheduled task to process them at a controlled rate.
          The queue ensures message ordering and delivery, while the scheduled task controls the processing rate.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Key Components</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>ConcurrentLinkedQueue:</strong> A thread-safe queue that serves as our buffer for incoming messages</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Message Type Filtering:</strong> Only specific message types (in this case, reward notifications) are added to the queue</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Scheduled Method:</strong> A method annotated with <code class="inline-code">@Scheduled</code> that runs at a fixed rate (1000ms)</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Configurable Rate:</strong> The number of messages processed per batch is controlled by a configuration property</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">How It Works</h2>
        <ol class="max-w-md space-y-1 text-gray-700 list-decimal list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">The Kafka listener receives messages from the configured topic</li>
          <li class="whitespace-nowrap mobile-wrap">For regular messages, they are processed immediately in the listener</li>
          <li class="whitespace-nowrap mobile-wrap">For reward push notifications (SYSTEM_PLUS_REWARD), messages are added to the queue</li>
          <li class="whitespace-nowrap mobile-wrap">A scheduled task runs every second, taking up to N messages from the queue</li>
          <li class="whitespace-nowrap mobile-wrap">This creates a controlled flow of notifications, limiting to N per second</li>
        </ol>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Configuration</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The processing rate is controlled by a configuration property:
        </p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-yaml">
# application.properties or application.yml
mobile-push:
  process-per-second: 50  # Process 50 notifications per second</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Implementation</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Let's look at the key parts of the implementation:
        </p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#808080]">@Component</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">MobilePushRequestConsumer</span>(
    <span class="text-[#569CD6]">private val</span> historyService: <span class="text-[#4EC9B0]">MobilePushHistoryWriteService</span>,
    <span class="text-[#569CD6]">private val</span> producer: <span class="text-[#4EC9B0]">MobilePushProducer</span>
) {
    <span class="text-[#569CD6]">private val</span> logger = <span class="text-[#4EC9B0]">LoggerFactory</span>.getLogger(javaClass)
    <span class="text-[#569CD6]">private val</span> queue: <span class="text-[#4EC9B0]">ConcurrentLinkedQueue</span>&lt;<span class="text-[#4EC9B0]">MobilePushRequest</span>&gt; = <span class="text-[#4EC9B0]">ConcurrentLinkedQueue</span>()

    <span class="text-[#808080]">@Value</span>(\${mobile-push.process-per-second})
    <span class="text-[#569CD6]">private lateinit var</span> processPerSecond: <span class="text-[#4EC9B0]">String</span>

    <span class="text-[#808080]">@PostConstruct</span>
    <span class="text-[#569CD6]">private fun</span> <span class="text-[#DCDCAA]">setup</span>() {
        logger.info(<span class="text-[#CE9178]">"plus reward push process per second : {}"</span>, processPerSecond)
    }

    <span class="text-[#808080]">@KafkaListener</span>(
        topics = [MOBILE_PUSH_FROM_OTHER_SERVICE],
        containerFactory = DEFAULT_KAFKA_LISTENER_CONTAINER_FACTORY
    )
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">consumeTargetMobilePushRequest</span>(message: <span class="text-[#4EC9B0]">CloudEvent</span>) {
        <span class="text-[#569CD6]">try</span> {
            <span class="text-[#6A9955]">// Deserialize the message</span>
            <span class="text-[#569CD6]">val</span> data = <span class="text-[#4EC9B0]">CloudEventUtils</span>.mapData(
                message,
                <span class="text-[#4EC9B0]">PojoCloudEventDataMapper</span>.from(jacksonObjectMapper(), <span class="text-[#4EC9B0]">MobilePushRequest</span>::class.java)
            )?.value!!

            <span class="text-[#569CD6]">val</span> type = <span class="text-[#4EC9B0]">MobilePushType</span>.fromParamKey(data.type)

            <span class="text-[#6A9955]">// For specific message type, add to queue instead of processing immediately</span>
            <span class="text-[#569CD6]">if</span> (type == <span class="text-[#4EC9B0]">MobilePushType</span>.HEAVY) {
                queue.add(data)
                logger.info(<span class="text-[#CE9178]">"Added to queue: {}"</span>, data)
            } <span class="text-[#569CD6]">else</span> {
                <span class="text-[#6A9955]">// Process other types immediately</span>
                <span class="text-[#6A9955]">// ...processing logic omitted...</span>
            }
        } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">Exception</span>) {
            logger.error(<span class="text-[#CE9178]">"An error occurred while consuming the request"</span>, e)
            <span class="text-[#569CD6]">throw</span> e
        }
    }

    <span class="text-[#6A9955]">// Scheduled task that runs every second to process messages from the queue</span>
    <span class="text-[#808080]">@Scheduled</span>(fixedRate = 1000)
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">processQueue</span>() {
        <span class="text-[#569CD6]">val</span> batch = mutableListOf&lt;<span class="text-[#4EC9B0]">MobilePushRequest</span>&gt;()
        repeat(processPerSecond.toInt()) {
            <span class="text-[#569CD6]">val</span> request = queue.poll() ?: <span class="text-[#569CD6]">return</span>@repeat
            batch.add(request)
        }

        <span class="text-[#569CD6]">if</span> (batch.isNotEmpty()) {
            logger.info(<span class="text-[#CE9178]">"Processing batch of size: {}"</span>, batch.size)
            <span class="text-[#569CD6]">try</span> {
                <span class="text-[#6A9955]">// ...processing logic omitted...</span>
            } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">Exception</span>) {
                logger.error(<span class="text-[#CE9178]">"Error processing message: {}"</span>, request, e)
                <span class="text-[#6A9955]">// Send to Dead Letter Topic</span>
                sendToDLT(request, e)
            }
        }
        logger.info(<span class="text-[#CE9178]">"Batch processing complete"</span>)
    }

    <span class="text-[#569CD6]">private fun</span> <span class="text-[#DCDCAA]">sendToDLT</span>(request: <span class="text-[#4EC9B0]">MobilePushRequest</span>, exception: <span class="text-[#4EC9B0]">Exception</span>) {
        <span class="text-[#569CD6]">try</span> {
            <span class="text-[#6A9955]">// Create a wrapped message with the original request and error details</span>
            <span class="text-[#569CD6]">val</span> dltMessage = <span class="text-[#4EC9B0]">DeadLetterMessage</span>(
                originalMessage = request,
                exceptionMessage = exception.message,
                exceptionClass = exception.javaClass.name,
                timestamp = <span class="text-[#4EC9B0]">System</span>.currentTimeMillis()
            )

            <span class="text-[#6A9955]">// Send to a dedicated Dead Letter Topic</span>
            deadLetterProducer.send(<span class="text-[#CE9178]">"mobile-push-dlt"</span>, dltMessage)
            logger.info(<span class="text-[#CE9178]">"Message sent to DLT: {}"</span>, request)
        } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">Exception</span>) {
            logger.error(<span class="text-[#CE9178]">"Failed to send message to DLT: {}"</span>, request, e)
        }
    }
}</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Benefits</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Throttles message processing to prevent system overload</li>
          <li class="whitespace-nowrap mobile-wrap">Provides backpressure mechanism to handle traffic spikes</li>
          <li class="whitespace-nowrap mobile-wrap">Reduces load on downstream notification services</li>
          <li class="whitespace-nowrap mobile-wrap">Configurable rate without application restart</li>
          <li class="whitespace-nowrap mobile-wrap">No message loss - all messages are eventually processed</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Error Handling with Dead Letter Topics</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Proper error handling is crucial in any message processing system. When processing fails, we can use a Dead Letter Topic (DLT) to store messages that couldn't be processed:
        </p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin">
<span class="text-[#808080]">@Scheduled</span>(fixedRate = 1000)
<span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">processQueue</span>() {
    <span class="text-[#569CD6]">val</span> batch = mutableListOf&lt;<span class="text-[#4EC9B0]">MobilePushRequest</span>&gt;()
    repeat(processPerSecond.toInt()) {
        <span class="text-[#569CD6]">val</span> request = queue.poll() ?: <span class="text-[#569CD6]">return</span>@repeat
        batch.add(request)
    }

    <span class="text-[#569CD6]">if</span> (batch.isNotEmpty()) {
        logger.info(<span class="text-[#CE9178]">"Processing batch of size: {}"</span>, batch.size)
        <span class="text-[#569CD6]">try</span> {
            <span class="text-[#6A9955]">// ...processing logic omitted...</span>
        } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">Exception</span>) {
            logger.error(<span class="text-[#CE9178]">"Error processing message: {}"</span>, request, e)
            <span class="text-[#6A9955]">// Send to Dead Letter Topic</span>
            sendToDLT(request, e)
        }
    }
    logger.info(<span class="text-[#CE9178]">"Batch processing complete"</span>)
}

<span class="text-[#569CD6]">private fun</span> <span class="text-[#DCDCAA]">sendToDLT</span>(request: <span class="text-[#4EC9B0]">MobilePushRequest</span>, exception: <span class="text-[#4EC9B0]">Exception</span>) {
    <span class="text-[#569CD6]">try</span> {
        <span class="text-[#6A9955]">// Create a wrapped message with the original request and error details</span>
        <span class="text-[#569CD6]">val</span> dltMessage = <span class="text-[#4EC9B0]">DeadLetterMessage</span>(
            originalMessage = request,
            exceptionMessage = exception.message,
            exceptionClass = exception.javaClass.name,
            timestamp = <span class="text-[#4EC9B0]">System</span>.currentTimeMillis()
        )

        <span class="text-[#6A9955]">// Send to a dedicated Dead Letter Topic</span>
        deadLetterProducer.send(<span class="text-[#CE9178]">"mobile-push-dlt"</span>, dltMessage)
        logger.info(<span class="text-[#CE9178]">"Message sent to DLT: {}"</span>, request)
    } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">Exception</span>) {
        logger.error(<span class="text-[#CE9178]">"Failed to send message to DLT: {}"</span>, request, e)
    }
}
</code></pre>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
          With this approach, messages that fail processing are:
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Considerations</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Memory Usage:</strong> The queue uses memory, so consider the potential queue size during traffic spikes</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Application Restart:</strong> Queue contents are lost on application restart - consider persistent queues for critical notifications</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Monitoring:</strong> Implement monitoring for queue size to detect potential backlog issues</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Error Handling:</strong> Implement robust error handling to prevent queue processing from stopping</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Scaling:</strong> In clustered environments, each instance will have its own queue and rate limit</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Alternative Approaches</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Kafka Consumer Pause/Resume:</strong> Temporarily pause consumption when processing is backed up</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>External Rate Limiters:</strong> Use libraries like Resilience4j or Bucket4j</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Distributed Rate Limiting:</strong> Use Redis-based rate limiters for clustered environments</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Kafka Streams:</strong> For more complex throttling requirements</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Implementing rate limiting for Kafka consumers using an internal queue is a simple yet effective approach for controlling message processing rates. This pattern is particularly useful for high-volume notification systems where controlling the throughput is essential for system stability and downstream service protection.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          The implementation shown here provides a configurable, stable way to handle varying loads while ensuring all messages are eventually processed. For production systems, consider the additional factors mentioned in the considerations section to ensure reliability and robustness.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          When implementing your own distributed ID generation system, consider your specific requirements around sortability, predictability, and collision resistance to choose the most appropriate approach.
        </p>
      </div>
    </div>
  `
}; 