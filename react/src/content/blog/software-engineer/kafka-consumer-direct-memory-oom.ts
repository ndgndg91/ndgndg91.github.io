import type { BlogPost } from '../../../types/blog';

export const kafkaConsumerDirectMemoryOom: BlogPost = {
  id: 'kafka-consumer-direct-memory-oom',
  title: 'Troubleshooting Kafka Consumer: Solving Direct Memory OOM',
  description: 'A deep dive into diagnosing and resolving java.lang.OutOfMemoryError: Direct buffer memory issues in Kafka consumer applications by analyzing internal Kafka client code.',
  category: 'software-engineer',
  date: '2026-04-16',
  updatedDate: '2026-04-16',
  tags: ['Kafka', 'JVM', 'Memory Management', 'Direct Memory', 'Spring Kafka', 'Zero-Copy'],
  image: 'kafka-consumer-direct-oom.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">Kafka Consumer Direct Memory OOM</span>
        </li>
      </ol>
    </nav>

    <header class="mb-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 dark:text-gray-300 uppercase">
        Kafka & JVM Performance
      </div>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        Troubleshooting Kafka Consumer: Solving Direct Memory OOM
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Published: April 16, 2026</div>
    </header>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">The Mysterious Crash</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Our production logs were suddenly flooded with <code class="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-1 rounded">java.lang.OutOfMemoryError: Direct buffer memory</code>. 
        Surprisingly, the <strong>Heap memory (Xmx)</strong> was only at 40% usage. Standard tools like <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">jmap</code> or <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">VisualVM</code> showed no signs of typical object leaks.
      </p>
      
      <!-- Visual Representation -->
      <div class="my-8 flex flex-col items-center">
        <img src="/images/comparison-oom.webp" alt="Heap Memory vs Direct Memory Comparison" class="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-full h-auto" />
        <p class="mt-3 text-sm text-gray-500 italic text-center">Comparison of Heap Memory vs. Direct Memory Usage during OOM events</p>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        In a cloud environment, this error often manifests because the JVM attempts to allocate native memory for I/O operations, but the host system (or the container limits) cannot fulfill the request.
      </p>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Why Kafka Uses Direct Memory</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Kafka is built for speed, and its primary optimization strategy is <strong>Zero-Copy</strong>. To minimize the CPU cost of data transfer, Kafka avoids copying buffers between the kernel space and the user space.
      </p>
      
      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100 italic">The Performance Choice: NIO & DirectByteBuffer</h3>
        <p class="text-blue-800 dark:text-blue-200">
          When using standard Heap buffers, the JVM must copy the data to an intermediate "temporary" direct buffer before passing it to the OS. By using <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">ByteBuffer.allocateDirect()</code>, Kafka writes directly to the native memory, allowing the OS to access it via DMA (Direct Memory Access).
        </p>
      </div>
      
      <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold mt-6">
        Let's look at where this happens in the Kafka Client source:
      </p>

      <div class="mb-4">
        <a href="https://github.com/apache/kafka/blob/trunk/clients/src/main/java/org/apache/kafka/common/network/NetworkReceive.java" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          View NetworkReceive.java on GitHub
        </a>
      </div>

      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500">// org.apache.kafka.common.network.NetworkReceive.java</span>
<span class="text-blue-400">public</span> <span class="text-blue-400">long</span> <span class="text-yellow-400">readFrom</span>(ScatteringByteChannel channel) <span class="text-blue-400">throws</span> IOException {
    <span class="text-blue-400">int</span> read = <span class="text-blue-400">0</span>;
    <span class="text-blue-400">if</span> (size.hasRemaining()) {
        <span class="text-blue-400">int</span> bytesRead = channel.read(size);
        <span class="text-blue-400">if</span> (bytesRead &lt; <span class="text-blue-400">0</span>) <span class="text-blue-400">throw</span> <span class="text-blue-400">new</span> EOFException();
        read += bytesRead;
        <span class="text-blue-400">if</span> (!size.hasRemaining()) {
            <span class="text-blue-400">this</span>.buffer = ByteBuffer.allocateDirect(<span class="text-blue-400">this</span>.requestedBufferSize);
            <span class="text-gray-500">// Direct Memory allocation happens here!</span>
        }
    }
    <span class="text-gray-500">// ... further processing</span>
}</pre>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        In the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">NetworkReceive</code> class, the buffer is allocated using <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">allocateDirect</code> once the size of the incoming packet is determined. This ensures that the message data is read directly into native memory.
      </p>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">The Spring Kafka Flow</h2>
      <p class="mb-4">
        Even though we use <strong>Spring Kafka</strong>, the memory management is inherited from the underlying Kafka client. 
      </p>
      
      <ol class="list-decimal pl-5 space-y-3">
        <li>
          <strong>KafkaMessageListenerContainer</strong> triggers the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">poll()</code> loop in a separate thread.
        </li>
        <li>
          The <strong>KafkaConsumer</strong> calls the <strong>Fetcher</strong> to retrieve records.
        </li>
        <li>
          The <strong>NetworkClient</strong> manages the <strong>Selector</strong>, which uses NIO Channels to read bytes into <strong>Direct Byte Buffers</strong>.
        </li>
      </ol>

      <!-- NIO Layer Visualization -->
      <div class="my-8 flex flex-col items-center">
        <img src="/images/spring-kafka-consumer-nio-layer.webp" alt="Spring Kafka Consumer and NIO Layer" class="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg max-w-full h-auto" />
        <p class="mt-3 text-sm text-gray-500 italic text-center">Spring Kafka Container -> Kafka Consumer -> NIO Network Layer Architecture</p>
      </div>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Identifying the Root Cause</h2>
      <p class="mb-4">
        In my case, the OOM was not caused by a memory leak, but by <strong>buffer accumulation</strong>.
      </p>
      
      <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 my-6">
        <h4 class="font-bold text-yellow-900 dark:text-yellow-100 mb-2">The Catalyst: Compression & SSL</h4>
        <p class="text-yellow-800 dark:text-yellow-200">
          When messages are compressed (Snappy/Zstd) or encrypted (SSL), Kafka needs extra direct buffers for the <strong>intermediate transformation</strong>. If <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">max.poll.records</code> is large, these buffers can quickly exceed the JVM's <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">MaxDirectMemorySize</code>.
        </p>
      </div>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">The Mathematics of Direct Memory</h2>
      <p class="mb-4">
        In a containerized environment, setting <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">-XX:MaxDirectMemorySize</code> should not be guesswork. We need to calculate the <strong>Theoretical Peak Usage</strong> based on our consumer configuration.
      </p>

      <div class="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6 font-mono text-sm">
        <p class="text-indigo-600 dark:text-indigo-400 font-bold mb-2">// Formula for Direct Memory Sizing</p>
        <p>Total Direct Memory ≈ (Concurrency × fetch.max.bytes) × Overhead_Factor + Safety_Margin</p>
      </div>

      <ul class="list-disc pl-5 space-y-3 mb-6">
        <li>
          <strong>Concurrency:</strong> The number of consumer threads (in Spring Kafka, this is the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">concurrency</code> setting of the Listener Container).
        </li>
        <li>
          <strong>fetch.max.bytes:</strong> The maximum amount of data the server should return for a fetch request (Consumer-level config).
        </li>
        <li>
          <strong>Overhead_Factor:</strong> 
          <ul class="list-circle pl-5 mt-2 text-sm space-y-1">
            <li>1.0 for raw network I/O.</li>
            <li>+1.0 if using <strong>Compression</strong> (Decompression happens in a separate direct buffer).</li>
            <li>+1.0 if using <strong>SSL/TLS</strong> (Decryption requires another layer of buffering).</li>
          </ul>
        </li>
        <li>
          <strong>Safety Margin:</strong> Usually 20-30% to account for metadata, internal Kafka client overhead, and unexpected network bursts.
        </li>
      </ul>
      
      <p class="mb-4">
        For example, if you have 3 consumer threads, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">fetch.max.bytes</code> set to 50MB, and you use Snappy compression over SSL, your calculation would be: <br/>
        <span class="italic text-indigo-600 dark:text-indigo-400">(3 × 50MB) × 3.0 (I/O + Decomp + SSL) = 450MB.</span> <br/>
        With a 20% safety margin, you should set <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">-XX:MaxDirectMemorySize=540m</code>.
      </p>
    </section>

    <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">The Solution: Tuning at the Consumer Level</h2>
      
      <h3 class="text-xl font-bold mb-3">1. Limit and Monitor Direct Memory</h3>
      <p class="mb-4">
        By default, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">-XX:MaxDirectMemorySize</code> matches the Heap size. In a container with 2GB RAM, if you set <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">-Xmx1536m</code>, you only have 512MB left for the OS, Metaspace, and Direct Memory.
      </p>
      
      <h3 class="text-xl font-bold mb-3 mt-6">2. Kafka Consumer Optimization</h3>
      <p class="mb-4">
        These parameters are configured at the <strong>Kafka Consumer level</strong>. Reducing the fetch size allows the client to reuse smaller buffers more frequently, lowering the peak direct memory pressure.
      </p>
      <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-xs font-mono">
<span class="text-gray-500"># spring application.yml (Consumer-level properties)</span>
spring:
  kafka:
    consumer:
      properties:
        fetch.max.bytes: <span class="text-green-400">1048576</span> <span class="text-gray-500"># 1MB per fetch</span>
        max.partition.fetch.bytes: <span class="text-green-400">1048576</span>
        max.poll.records: <span class="text-green-400">100</span></pre>
    </section>

    <section class="mb-8 text-gray-900 dark:text-gray-100">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Summary</h2>
      <p class="mb-4">
        Direct Memory OOM in Kafka consumers is a classic example of performance optimizations leaking into operational complexity. By understanding the <strong>Zero-Copy</strong> mechanism and the underlying <strong>NIO allocation</strong>, we can move from guesswork to precise tuning.
      </p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Always set <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">-XX:MaxDirectMemorySize</code> explicitly in Kubernetes.</li>
        <li>Monitor <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">java_nio_buffer_count</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded">java_nio_buffer_used_bytes</code> metrics.</li>
        <li>Scale the consumer's fetch size based on the message volume, not just the throughput goals.</li>
      </ul>
    </section>
  `
};
