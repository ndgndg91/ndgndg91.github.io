import type { BlogPost } from '../../../types/blog';

export const jvmWorkerOomTroubleshooting: BlogPost = {
  id: 'jvm-worker-oom-troubleshooting',
  title: 'Preventing OOM in Large Data Rendering Workers: Chunking and PDF Merging',
  description: 'How loading 4 years of history into memory caused our JVM workers to run out of heap, and how we solved it using paginated chunking and PDF merging.',
  category: 'software-engineer',
  date: '2026-07-01',
  updatedDate: '2026-07-01',
  tags: ['JVM', 'Memory Management', 'PDF Rendering', 'Troubleshooting', 'Kotlin', 'OOM'],
  image: 'jvm-worker-oom-troubleshooting.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Worker OOM Troubleshooting</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Preventing OOM in Large Data Rendering Workers: Chunking and PDF Merging</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Batch workers that process and render documents often run into memory limits when dealing with power users. When our document generation worker suffered repeated crashes on large accounts, the root cause was a combination of open-ended lists and rendering-library limitations. This post walks through the diagnostics, the chunk-based rendering solution, and a secondary consumer idempotency issue it exposed.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Symptom: Unhealthy Readiness Probes</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our document generation worker (a Kotlin/JVM service running on Kubernetes) began restarting repeatedly. The K8s events showed:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
Warning  Unhealthy  Readiness probe failed: /actuator/health/readiness: context deadline exceeded
Normal   Killing    Container failed liveness probe, will be restarted
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The pod logs showed that fetching the dataset was taking an enormous amount of time, while the actual rendering step was relatively fast:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
create-template-context: success (220765 ms)   &larr; 3 minutes and 40 seconds
render-html: success (6038 ms)                  &larr; 6 seconds
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Because the JVM was configured with <code>-XX:+ExitOnOutOfMemoryError</code>, the container was terminating immediately when it ran out of heap space. During the crash, the JVM became unresponsive, causing the Kubernetes liveness probe to timeout and trigger a container kill.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Root Cause: Triple In-Memory Copies</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our worker allows users to export up to 4 years of transaction history. For highly active accounts, this can include hundreds of thousands of transactions.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The service code was performing the following steps:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>It split the query into 90-day chunks, fetched the records, and accumulated them into a single, open-ended <code>MutableList</code> (Copy 1).</li>
          <li>It mapped these records to UI display items (Copy 2).</li>
          <li>It split the items into pages for Thymeleaf layout templates (Copy 3).</li>
          <li>Finally, the PDF rendering library (<code>openhtmltopdf</code>) converted the entire HTML DOM into a single, massive PDF document.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Having three distinct copies of hundreds of thousands of objects in the JVM heap, combined with the heavy memory footprint of the HTML-to-PDF rendering engine (which builds the entire layout DOM in memory), easily exceeded the 10GB JVM heap limit (<code>-Xmx10240m</code>) and crashed the process.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Solution: Chunked PDF Rendering and Merging</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Because the PDF rendering library does not support streaming layout output, we could not simply stream the HTML to a file. We had to keep the memory footprint bounded.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold">
          The solution was to render the document in paginated chunks and merge them using PDFBox.
        </p>
        
        <div class="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-xl border border-gray-200 dark:border-gray-700 my-6">
          <p class="text-gray-900 dark:text-gray-100 font-semibold mb-2">New Generation Pipeline:</p>
          <ol class="list-decimal pl-5 space-y-2 text-gray-800 dark:text-gray-200">
            <li>Fetch the transaction history using a database cursor or Kotlin <code>Sequence</code> (avoiding loading everything into a list).</li>
            <li>Group the items into chunks of N pages (e.g., 50 pages per chunk).</li>
            <li>Render each chunk to a separate, temporary PDF file on disk. This keeps the in-memory HTML DOM size small and predictable.</li>
            <li>Use Apache PDFBox\'s <code>PDFMergerUtility</code> to merge the temporary PDF files into the final output document.</li>
            <li>Clean up the temporary files.</li>
          </ol>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This pattern capped our memory usage. The memory complexity dropped from O(N) where N is the total history length, to O(1) in terms of heap space, as the maximum heap usage was limited to the size of a single 50-page chunk.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. Secondary Discovery: The Duplicate Event Trap</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During our investigation of the OOM crashes, we uncovered an interesting user complaint: "Sometimes, I receive a success email for my document, followed immediately by a failure email, and my document download status is marked as failed."
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The log analysis revealed the following sequence:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
02:19:35.263 worker [Attempt 1] EVENT_RECV (messageId=a303feee)
02:19:35.270 worker [Attempt 1] calls /api/fetch -> returns 200 OK
02:22:45.582 worker [Attempt 1] PDF generated successfully
02:22:45.644 worker [Attempt 1] calls /api/complete -> returns 200 OK (Sends Success Email)
02:22:45.650 worker [Attempt 2] EVENT_RECV (messageId=a303feee) *Re-delivered*
02:22:45.654 worker [Attempt 2] calls /api/fetch -> returns 500 (Status is already COMPLETED)
02:22:45.665 worker [Attempt 2] fails with FeignException
02:22:45.688 worker [Attempt 2] calls /api/fail -> returns 200 OK (Sends Failure Email & marks failed)
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          <strong>What happened:</strong> Because the generation took over 3 minutes, the Kafka broker sometimes assumed the consumer was dead and initiated a consumer group rebalance. This caused the message to be re-delivered to another worker.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          <strong>The fix:</strong> We updated the worker and the server API to be idempotent:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>If the API returns a status showing the job is already completed, the worker skips processing and immediately acknowledges the Kafka offset.</li>
          <li>The server refuses to overwrite a <code>COMPLETED</code> status with a <code>FAILED</code> status.</li>
        </ul>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          <strong>Tip:</strong> To prevent Kafka rebalances on long-running operations, you should also increase <code>max.poll.interval.ms</code> or decouple the Kafka consumer thread from the actual processing thread by passing the task to a background thread pool while keeping the consumer thread polling.
        </blockquote>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          When building batch workers, memory constraints require careful layout design. Avoid loading entire datasets into memory. Splitting documents into logical chunks, rendering them individually, and merging them at the file system level is a highly effective way to keep memory usage flat. Furthermore, because long-running tasks are prone to network timeouts and re-deliveries, ensuring that your task processor is idempotent is critical to preventing race conditions.
        </p>
      </section>
    </article>
  `
};
