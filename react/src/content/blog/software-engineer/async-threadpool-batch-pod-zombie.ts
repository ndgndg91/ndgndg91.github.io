import type { BlogPost } from '../../../types/blog';

export const asyncThreadpoolBatchPodZombie: BlogPost = {
  id: 'async-threadpool-batch-pod-zombie',
  title: 'Fixing an OOM Only to Create Zombie Batch Pods: The JVM Non-Daemon Thread Trap',
  description: 'How replacing Spring\'s default SimpleAsyncTaskExecutor with a bounded ThreadPoolTaskExecutor to fix an OOM caused our CronJob pods to never terminate, creating connection leaks and database exhaustion.',
  category: 'software-engineer',
  date: '2026-07-13',
  updatedDate: '2026-07-13',
  tags: ['JVM', 'Spring Boot', 'Spring Batch', 'Threading', 'Kubernetes', 'Thread Pool', 'Incident Report'],
  image: 'async-threadpool-batch-pod-zombie.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">JVM Non-Daemon Thread Trap</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Fixing an OOM Only to Create Zombie Batch Pods: The JVM Non-Daemon Thread Trap</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Performance tuning is full of unintended side effects. When we fixed a memory leak (OOM) in our batch application by introducing a bounded thread pool, we ended up causing a much worse production issue: our Kubernetes CronJob pods stopped dying. Here is how a basic JVM rule—non-daemon threads block JVM termination—can silently turn your containerized batch processes into database-exhausting zombies.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Outage: Running but Completed</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our batch system schedules daily maintenance tasks (such as sending bulk notification messages or compiling records) using Kubernetes CronJobs.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A few days after shipping a performance improvement, our database administrator flagged a critical alarm: <strong>"Database connections for the batch user have surged to 100% capacity."</strong>
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We checked the Kubernetes cluster and found that multiple pods from the previous days\' runs were still in the <code>Running</code> state. Looking at the logs of those pods, the batch job had actually finished hours or days ago:
        </p>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm font-mono mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          [Main Thread] INFO  o.s.b.c.l.support.SimpleJobLauncher - Job: [SimpleJob: [name=dailySyncJob]] completed successfully with status: [COMPLETED]
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The business logic had finished, but the process was refused to exit. Because the pods remained active, they kept holding onto their database connection pools. As new CronJobs spawned daily, connection leaks accumulated until the database connection pool was fully exhausted.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Trigger: Bounding the Thread Pool</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The trigger was a fix we had deployed to solve a thread leak.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To send bulk notifications asynchronously, the batch job relied on Spring\'s <code>@Async</code> annotation. By default, if you do not declare a custom executor, Spring falls back to using <code>SimpleAsyncTaskExecutor</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold">
          SimpleAsyncTaskExecutor does not reuse threads. It spawns a new thread for every single task.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During peak notification windows, this created thousands of concurrent threads, resulting in the dreaded <code>java.lang.OutOfMemoryError: unable to create native thread</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To resolve this, we configured a custom, bounded <code>ThreadPoolTaskExecutor</code>:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Bean</span>
<span class="text-purple-400">fun</span> <span class="text-blue-400">asyncExecutor</span>(): <span class="text-yellow-300">Executor</span> {
    <span class="text-purple-400">val</span> executor = <span class="text-yellow-300">ThreadPoolTaskExecutor</span>()
    executor.corePoolSize = <span class="text-orange-400">10</span>
    executor.maxPoolSize = <span class="text-orange-400">20</span>
    executor.queueCapacity = <span class="text-orange-400">1000</span>
    executor.initialize()
    <span class="text-purple-400">return</span> executor
}
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This successfully solved the OOM. But it introduced the zombie pod problem.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Root Cause: Non-Daemon Threads and JVM Lifecycle</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To understand why the process refused to die, we must look at how the Java Virtual Machine (JVM) decides to terminate.
        </p>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          The JVM terminates only when all active threads are **daemon** threads. If even a single **non-daemon** thread remains active, the JVM will stay alive.
        </blockquote>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Comparing our two executors explained the behavioral shift:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>SimpleAsyncTaskExecutor (Legacy):</strong> Spawns threads on-demand, but those threads terminate immediately after their short task completes. Once the batch job finished, all spawned threads died, the main thread returned, and the JVM exited cleanly.</li>
          <li><strong>ThreadPoolTaskExecutor (New):</strong> Maintains its core pool of 10 threads permanently active in memory, waiting for new work. In Java, threads created by a thread pool default to being **non-daemon** threads. Because these 10 core threads remained alive, the JVM never met its termination condition, causing the pod to stay in the <code>Running</code> state.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We confirmed this by taking a thread dump (<code>jstack</code>) of a zombie pod. The dump showed our async executor threads sitting in a <code>waiting on condition</code> state, blocking JVM shutdown:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
"asyncExecutor-1" #24 prio=5 os_prio=0 cpu=12.5ms elapsed=86400s tid=0x00007f... nid=0x1e waiting on condition
  java.lang.Thread.State: WAITING (parking)
    at sun.misc.Unsafe.park(Native Method)
    - parking to wait for  &lt;0x00000007...&gt; (a java.util.concurrent.locks.AbstractQueuedSynchronizer$ConditionObject)
</pre>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. The Fix: Thread Lifecycle Management</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          For batch and CLI-like short-lived processes, you have two primary ways to resolve this thread pool lifecycle issue.
        </p>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">Option A: Enable Daemon Threads</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If your asynchronous tasks are safe to abort during JVM exit, configure the thread pool to create daemon threads. Since daemon threads do not block JVM termination, the process will exit cleanly when the main thread completes:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Bean</span>
<span class="text-purple-400">fun</span> <span class="text-blue-400">asyncExecutor</span>(): <span class="text-yellow-300">Executor</span> {
    <span class="text-purple-400">val</span> executor = <span class="text-yellow-300">ThreadPoolTaskExecutor</span>()
    executor.corePoolSize = <span class="text-orange-400">10</span>
    executor.maxPoolSize = <span class="text-orange-400">20</span>
    <span class="text-orange-400">executor.setDaemon(true)</span>  <span class="text-green-500">// Threads will not block JVM exit</span>
    executor.initialize()
    <span class="text-purple-400">return</span> executor
}
</pre>
        </div>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-6">Option B: Graceful Shutdown (Recommended)</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If your tasks must complete before the application shuts down to avoid data corruption, enable graceful shutdown on the executor. This tells Spring to shut down the executor when the context closes, waiting for active tasks to finish before terminating:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Bean</span>
<span class="text-purple-400">fun</span> <span class="text-blue-400">asyncExecutor</span>(): <span class="text-yellow-300">Executor</span> {
    <span class="text-purple-400">val</span> executor = <span class="text-yellow-300">ThreadPoolTaskExecutor</span>()
    executor.corePoolSize = <span class="text-orange-400">10</span>
    executor.maxPoolSize = <span class="text-orange-400">20</span>
    <span class="text-orange-400">executor.setWaitForTasksToCompleteOnShutdown(true)</span>
    <span class="text-orange-400">executor.setAwaitTerminationSeconds(60)</span>
    executor.initialize()
    <span class="text-purple-400">return</span> executor
}
</pre>
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Alternatively, you can manage this globally in Spring Boot using configuration properties:
        </p>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm font-mono mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          spring.task.execution.shutdown.await-termination=true<br/>
          spring.task.execution.shutdown.await-termination-period=60s
        </div>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Switching from raw on-demand thread creation (like SimpleAsyncTaskExecutor) to managed thread pools (like ThreadPoolTaskExecutor) is the right architectural decision to prevent OutOfMemory issues. However, in short-lived processes like batch jobs or CLI commands, you must remember that a thread pool introduces permanent non-daemon threads. Always ensure that your thread pool lifecycle is explicitly managed, otherwise, your performance fix might result in persistent database connection leaks.
        </p>
      </section>
    </article>
  `
};
