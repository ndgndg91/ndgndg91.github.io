import type { BlogPost } from '../../../types/blog';

export const springBatchCompletedTrap: BlogPost = {
  id: 'spring-batch-completed-trap',
  title: 'The Spring Batch COMPLETED Trap: Why It Doesn\'t Guarantee Business Success',
  description: 'Swallowing exceptions in Batch writers creates a silent-failure anti-pattern where a batch is marked COMPLETED even when 100% of rows fail. How to implement proper monitoring and step execution listener controls.',
  category: 'software-engineer',
  date: '2026-05-11',
  updatedDate: '2026-05-11',
  tags: ['Java', 'Spring Batch', 'Kotlin', 'Monitoring', 'Batch Processing', 'Software Design'],
  image: 'spring-batch-completed-trap.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Spring Batch COMPLETED Trap</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">The Spring Batch COMPLETED Trap: Why It Doesn\'t Guarantee Business Success</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        In Spring Batch, the status <code>COMPLETED</code> sounds reassuring. It indicates that your job ran to completion. But in production systems, this status can mask critical, widespread failures. Here is how swallowing exceptions in batch writers creates monitoring blind spots, and how to design robust batch telemetry.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Rule: Framework Status != Business Success</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In Spring Batch, a step is marked as <code>COMPLETED</code> if the reader, processor, and writer complete their execution loops without throwing uncaught exceptions to the framework.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold">
          It means the code ran. It does not mean the data was processed successfully.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If your writer catches exceptions internally (e.g., to prevent a single bad database row from aborting a 10,000-row batch), you are hiding failures from the framework. If all rows fail but the writer catches the exceptions and logs them, Spring Batch will still report:
        </p>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm font-mono mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          Read Count: 5000 / Write Count: 5000 / Status: COMPLETED
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Outage: A Silent 100% Failure</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We encountered this pattern during a routine batch run that synchronizes account status records with our main matching database. During this specific run, the matching database was temporarily unavailable.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The batch writer was configured as follows:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">fun</span> <span class="text-blue-400">myWriter</span>(): <span class="text-yellow-300">ItemWriter</span>&lt;<span class="text-yellow-300">UserAccount</span>&gt; = <span class="text-yellow-300">ItemWriter</span> { items -&gt;
    items.forEach { item -&gt;
        <span class="text-purple-400">try</span> {
            externalDatabaseService.update(item)
        } <span class="text-purple-400">catch</span> (e: <span class="text-yellow-300">Exception</span>) {
            logger.error(<span class="text-green-400">"Failed to sync account: \${item.id}"</span>, e)
            <span class="text-gray-500">// Swallow and continue to next item</span>
            <span class="text-purple-400">return</span><span class="text-purple-400">@forEach</span>
        }
    }
}
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Because the writer swallowed all exceptions, 87 sync attempts failed. Yet, the batch step successfully finished, and our Slack notifications reported: <code>Status: COMPLETED</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If operators had not happened to check the error logs for that specific hour, the fact that 87 accounts were out of sync would have gone unnoticed, potentially resulting in data discrepancies and compliance issues.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Solution: Explicit Failure Tracking</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To ensure that batches do not fail silently, we must track and propagate row-level failures.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">Step 1: Track Failures and Store in ExecutionContext</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Create a writer class that implements <code>StepExecutionListener</code> to retrieve the <code>StepExecution</code> and record failure counts in the thread-safe <code>ExecutionContext</code>:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Component</span>
<span class="text-purple-400">@StepScope</span>
<span class="text-purple-400">class</span> <span class="text-yellow-300">AccountSyncWriter</span>(
    <span class="text-purple-400">private val</span> externalDatabaseService: <span class="text-yellow-300">ExternalDatabaseService</span>
) : <span class="text-yellow-300">ItemWriter</span>&lt;<span class="text-yellow-300">UserAccount</span>&gt;, <span class="text-yellow-300">StepExecutionListener</span> {

    <span class="text-purple-400">private val</span> failedCount = <span class="text-yellow-300">AtomicInteger</span>(<span class="text-orange-400">0</span>)
    <span class="text-purple-400">private lateinit var</span> stepExecution: <span class="text-yellow-300">StepExecution</span>

    <span class="text-purple-400">override fun</span> <span class="text-blue-400">beforeStep</span>(stepExecution: <span class="text-yellow-300">StepExecution</span>) {
        <span class="text-purple-400">this</span>.stepExecution = stepExecution
    }

    <span class="text-purple-400">override fun</span> <span class="text-blue-400">write</span>(chunk: <span class="text-yellow-300">Chunk</span>&lt;<span class="text-purple-400">out</span> <span class="text-yellow-300">UserAccount</span>&gt;) {
        chunk.forEach { item -&gt;
            <span class="text-purple-400">try</span> {
                externalDatabaseService.update(item)
            } <span class="text-purple-400">catch</span> (e: <span class="text-yellow-300">Exception</span>) {
                failedCount.incrementAndGet()
                stepExecution.executionContext.putInt(<span class="text-green-400">"failedCount"</span>, failedCount.get())
                logger.error(<span class="text-green-400">"Failed to sync \${item.id}"</span>, e)
            }
        }
    }

    <span class="text-purple-400">override fun</span> <span class="text-blue-400">afterStep</span>(stepExecution: <span class="text-yellow-300">StepExecution</span>): <span class="text-yellow-300">ExitStatus?</span> {
        <span class="text-purple-400">val</span> failed = failedCount.get()
        <span class="text-purple-400">val</span> read = stepExecution.readCount
        
        <span class="text-gray-500">// Step 3: Force Custom Exit Statuses when failure threshold exceeded</span>
        <span class="text-purple-400">return when</span> {
            failed &gt; <span class="text-orange-400">0</span> &amp;&amp; failed &gt;= (read * <span class="text-orange-400">0.1</span>) -&gt; <span class="text-yellow-300">ExitStatus</span>(<span class="text-green-400">"COMPLETED_WITH_FAILURES"</span>)
            <span class="text-purple-400">else</span> -&gt; stepExecution.exitStatus
        }
    }
}
</pre>
        </div>
 
        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">Step 2: Expose failures in the Step Summary</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Add the failure count retrieved from the execution context to your notification layout:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">val</span> failedCount = stepExecution.executionContext.getInt(<span class="text-green-400">"failedCount"</span>, <span class="text-orange-400">0</span>)
<span class="text-purple-400">val</span> summaryMessage = <span class="text-green-400">"""
    *Batch Step Run Summary*
    - Read Count: \${stepExecution.readCount}
    - Write Count: \${stepExecution.writeCount}
    - Failed Count: \$failedCount
    - Status: \${stepExecution.status}
"""</span>.trimIndent()
</pre>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Resilience structures like try-catch blocks are essential to prevent minor database errors from breaking large batch jobs. However, they must be paired with explicit failure tracking. Without it, you are trading minor job restarts for silent data loss. Ensure that your monitoring systems track business success, not just framework completion.
        </p>
      </section>
    </article>
  `
};
