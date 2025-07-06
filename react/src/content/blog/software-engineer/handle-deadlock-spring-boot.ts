import type { BlogPost } from '../../../types/blog';

export const springBootDeadlockHandling: BlogPost = {
    id: 'spring-boot-rdbms-deadlock-handling',
    category: 'software-engineer', // Or change to the appropriate category
    title: 'Effectively Handling RDBMS Transaction Deadlocks in Spring Boot',
    description: 'Learn strategies and implementation methods to prevent, detect, and recover from RDBMS transaction deadlocks in Spring Boot applications.',
    date: '2025-07-06', // Current date
    updatedDate: '2025-07-06', // Current date
    tags: ['Spring Boot', 'RDBMS', 'Transaction', 'Deadlock', 'Concurrency', 'Optimistic Locking', 'Retry'],
    image: 'deadlock-spring-boot.webp', // Change to an appropriate image filename
    content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li class="whitespace-nowrap mobile-wrap"><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
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
          <span class="ml-2 text-gray-400">RDBMS Deadlock Handling</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Effectively Handling RDBMS Transaction Deadlocks in Spring Boot
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: July 06, 2025</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-deadlock" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is a Deadlock?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#deadlock-prevention" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Deadlock Prevention</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#deadlock-detection-recovery" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Deadlock Detection and Recovery</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#monitoring-analysis" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Monitoring and Analysis</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#conclusion" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Conclusion and Recommendations</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-deadlock">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is a Deadlock?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          In database transactions, a <strong>deadlock</strong> occurs when two or more transactions are stuck in a perpetual waiting state, each waiting for the other to release a resource that it holds. This can severely degrade system responsiveness and, in severe cases, lead to application outages. It's like two people trying to pass through a narrow corridor, each blocking the other, and neither can move forward.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          In Spring Boot applications utilizing RDBMS, the likelihood of deadlocks increases in high-concurrency environments. Therefore, having an effective strategy to handle them is crucial.
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Common Deadlock Scenarios</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Circular Wait:</strong> Transaction A locks resource X and waits for resource Y, while Transaction B locks resource Y and waits for resource X.</li>
            <li class="mobile-wrap"><strong>Unnecessary Lock Holding:</strong> A transaction holds locks on too many resources or holds them for too long.</li>
            <li class="mobile-wrap"><strong>Missing Indexes/Inefficient Queries:</strong> Queries execute inefficiently, leading to locks on unnecessarily large numbers of rows, or prolonged lock durations.</li>
          </ul>
        </div>
      </div>

      <div class="mt-6" id="deadlock-prevention">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Deadlock Prevention</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The most ideal approach is to design your system to prevent deadlocks from occurring in the first place. Consider the following strategies:
        </p>
        <ol class="max-w-none space-y-3 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-3">
          <li class="mobile-wrap"><strong>Consistent Lock Ordering:</strong> When locking multiple resources (e.g., rows in different tables), ensure all transactions **always acquire locks in the same predefined order**. For instance, if you need to update both 'Product' and 'Order' tables, always lock 'Product' first, then 'Order'.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">This breaks the circular wait condition, making it one of the most effective ways to prevent deadlocks.</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong>Minimize Transaction Scope:</strong> Keep transactions as short as possible. Acquire locks only on the necessary data, and process non-critical operations (e.g., external API calls, complex business logic) outside the transaction.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">This reduces lock contention, lowering the chance of deadlocks and improving system throughput.</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong>Utilize Indexes and Optimize Queries:</strong> Poorly performing queries cause transactions to run longer, holding locks for extended periods, which increases deadlock potential. Set up appropriate indexes and optimize queries to access only the required data efficiently.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">Regularly review query performance using <code>EXPLAIN</code> analysis.</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong>Leverage Optimistic Locking:</strong> Unlike pessimistic locking, which locks data upon reading to prevent other transactions from accessing it, optimistic locking doesn't acquire locks when data is read. Instead, it checks for data modifications (e.g., using a version column) at the time of update to detect conflicts.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">This is effective in reducing deadlock potential in high-concurrency environments. Note that a retry mechanism might be necessary if a conflict is detected.</li>
              <li class="mobile-wrap">Spring Data JPA allows easy implementation of optimistic locking via the @Version annotation.</li>
            </ul>
          </li>
        </ol>
      </div>

      <div class="mt-6" id="deadlock-detection-recovery">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Deadlock Detection and Recovery</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Preventing deadlocks completely can be challenging. Thus, having a strategy to detect and safely recover from them when they do occur is equally important.
        </p>
        <ol class="max-w-none space-y-3 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-3">
          <li class="mobile-wrap"><strong>Utilize RDBMS Deadlock Detection Features:</strong> Most RDBMS (MySQL, PostgreSQL, Oracle, SQL Server, etc.) have built-in mechanisms to detect deadlocks. When a deadlock is detected, the RDBMS will select one of the involved transactions as a **'victim'** and forcibly rollback that transaction.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">The rolled-back transaction will throw a specific exception at the application level (e.g., JDBC's <code>SQLDeadlockException</code>, JPA/Hibernate's <code>PessimisticLockingFailureException</code>, or Spring's <code>DeadlockLoserDataAccessException</code>).</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong>Implement Spring Transaction Retry Logic:</strong> Since a transaction rolled back due to a deadlock will throw an exception, you can implement retry logic at the application level to catch this exception and retry the transaction.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap"><strong>Spring's <code>@Retryable</code> Annotation:</strong> The <code>spring-retry</code> library allows you to easily apply retry logic in an AOP fashion.</li>
              <li class="mobile-wrap">It's crucial to include a **backoff** (delay) when retrying. Retrying immediately might lead to another deadlock.</li>
              <li class="mobile-wrap"><strong>Retry Limit:</strong> Set a maximum number of retry attempts to prevent infinite loops.</li>
            </ul>
          </li>
        </ol>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          **Spring <code>@Retryable</code> Example:**
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Deadlock Retry using <code>@Retryable</code></h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="retryable-example" class="language-java text-white">
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">org.springframework.dao.DeadlockLoserDataAccessException</span>;
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">org.springframework.retry.annotation.Backoff</span>;
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">org.springframework.retry.annotation.Retryable</span>;
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">org.springframework.stereotype.Service</span>;
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">org.springframework.transaction.annotation.Transactional</span>;
<span class="text-[#89D3C3]">import</span> <span class="text-[#9CDCFE]">lombok.RequiredArgsConstructor</span>;

<span class="text-[#89D3C3]">@Service</span>
<span class="text-[#89D3C3]">@RequiredArgsConstructor</span>
<span class="text-[#569CD6]">public</span> <span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">OrderService</span> {

    <span class="text-[#569CD6]">private</span> <span class="text-[#569CD6]">final</span> <span class="text-[#4EC9B0]">OrderRepository</span> <span class="text-[#9CDCFE]">orderRepository</span>;
    <span class="text-[#569CD6]">private</span> <span class="text-[#569CD6]">final</span> <span class="text-[#4EC9B0]">ProductRepository</span> <span class="text-[#9CDCFE]">productRepository</span>;

    <span class="text-[#89D3C3">@Retryable</span>(<span class="text-[#9CDCFE">value</span> <span class="text-[#D4D4D4]">=</span> { <span class="text-[#9CDCFE]">DeadlockLoserDataAccessException.class</span> },
               <span class="text-[#9CDCFE">maxAttempts</span> <span class="text-[#D4D4D4]">=</span> <span class="text-[#B5CEA8]">3</span>,
               <span class="text-[#9CDCFE">backoff</span> <span class="text-[#D4D4D4]">=</span> <span class="text-[#89D3C3">@Backoff</span>(<span class="text-[#9CDCFE">delay</span> <span class="text-[#D4D4D4]">=</span> <span class="text-[#B5CEA8]">1000</span>)) <span class="text-[#6A9955">// Retry 3 times on Deadlock, with 1-second delay</span>
    <span class="text-[#89D3C3">@Transactional</span>
    <span class="text-[#569CD6]">public</span> <span class="text-[#569CD6]">void</span> <span class="text-[#DCDCAA]">processOrderAndDeductStock</span>(<span class="text-[#4EC9B0]">Long</span> <span class="text-[#9CDCFE]">orderId</span>, <span class="text-[#4EC9B0]">Long</span> <span class="text-[#9CDCFE]">productId</span>, <span class="text-[#4EC9B0]">int</span> <span class="text-[#9CDCFE]">quantity</span>) {
        <span class="text-[#6A9955">// 1. Change order status (Update ORDER table)</span>
        <span class="text-[#9CDCFE]">orderRepository.findById</span>(<span class="text-[#9CDCFE]">orderId</span>).<span class="text-[#DCDCAA]">ifPresent</span>(<span class="text-[#9CDCFE]">order</span> <span class="text-[#D4D4D4]">--></span> {
            <span class="text-[#9CDCFE]">order.setStatus</span>(<span class="text-[#CE9178">"PROCESSED"</span>);
            <span class="text-[#9CDCFE]">orderRepository.save</span>(<span class="text-[#9CDCFE]">order</span>);
        });

        <span class="text-[#6A9955">// 2. Decrease product stock (Update PRODUCT table)</span>
        <span class="text-[#9CDCFE]">productRepository.findById</span>(<span class="text-[#9CDCFE]">productId</span>).<span class="text-[#DCDCAA]">ifPresent</span>(<span class="text-[#9CDCFE]">product</span> <span class="text-[#D4D4D4]">--></span> {
            <span class="text-[#569CD6]">if</span> (<span class="text-[#9CDCFE]">product.getStock</span>() <span class="text-[#D4D4D4]"><</span> <span class="text-[#9CDCFE]">quantity</span>) {
                <span class="text-[#569CD6]">throw</span> <span class="text-[#569CD6]">new</span> <span class="text-[#4EC9B0]">RuntimeException</span>(<span class="text-[#CE9178]">"Insufficient stock"</span>);
            }
            <span class="text-[#9CDCFE]">product.setStock</span>(<span class="text-[#9CDCFE]">product.getStock</span>() <span class="text-[#D4D4D4]">-</span> <span class="text-[#9CDCFE]">quantity</span>);
            <span class="text-[#9CDCFE]">productRepository.save</span>(<span class="text-[#9CDCFE]">product</span>);
        });

        <span class="text-[#6A9955">// In this example, locks are attempted in ORDER -> PRODUCT order.</span>
        <span class="text-[#6A9955">// If another transaction attempts locks in PRODUCT -> ORDER order, a deadlock can occur.</span>
    }
}
            </code></pre>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          In the example above, <code>DeadlockLoserDataAccessException</code> is a Spring-provided abstract exception that covers database-specific deadlock exceptions.
        </p>
      </div>

      <div class="mt-6" id="monitoring-analysis">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Monitoring and Analysis</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Deadlocks are often difficult to detect during development, making continuous monitoring in production environments crucial.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          <strong>RDBMS Log Analysis:</strong> Most databases log information related to deadlocks. Regularly review these logs to identify deadlock frequency, involved transactions, and locked resources.
        </p>
        <p class="text-gray-600 dark:text-gray-500 ml-4 mt-1">
          MySQL: Check <code>SHOW ENGINE INNODB STATUS;</code> or error logs.
        </p>
        <p class="text-gray-600 dark:text-gray-500 ml-4 mt-1">
          PostgreSQL: Review <code>pg_locks</code> view and log files.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          <strong>Utilize Performance Monitoring Tools:</strong> Use APM (Application Performance Management) tools (e.g., New Relic, Dynatrace, ELK stack) or database monitoring tools to track transaction wait times, lock contention, and respond quickly to anomalies.
        </p>
        <p class="text-gray-600 dark:text-gray-500 ml-4 mt-1">
          Pay close attention to metrics like increased transaction failure rates and average response times.
        </p>
      </div>

      <div class="mt-6" id="conclusion">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion and Recommendations</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Key strategies for effectively handling RDBMS deadlocks in Spring Boot applications include:
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Key Recommendations</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Prioritize Prevention Strategies:</strong> Focus significant effort on prevention techniques like consistent lock ordering, minimizing transaction scope, and query optimization with proper indexing.</li>
            <li class="mobile-wrap"><strong>Actively Consider Optimistic Locking:</strong> In highly concurrent sections, optimistic locking using the <code>@Version</code> annotation can significantly reduce deadlock probability.</li>
            <li class="mobile-wrap"><strong>Implement Retry Logic:</strong> When the RDBMS detects and rolls back a deadlock, it's essential to implement a retry mechanism for transactions using features like Spring's <code>@Retryable</code>. Be sure to configure appropriate retry attempts and backoff delays.</li>
            <li class="mobile-wrap"><strong>Continuous Monitoring:</strong> Continuously monitor deadlock occurrences and patterns in production environments, and when necessary, perform query tuning or code improvements to eliminate the root causes of deadlocks.</li>
          </ul>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Deadlocks are complex concurrency issues that can be challenging to eliminate entirely. However, by combining the prevention, detection, and recovery strategies outlined above, you can significantly enhance the stability and reliability of your Spring Boot applications.
        </p>
      </div>
    </div>
    <br>
  `
};