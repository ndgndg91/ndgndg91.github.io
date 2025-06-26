import type { BlogPost } from '../../../types/blog';

export const handleFloatingPoint: BlogPost = {
  id: 'handle-floating-point',
  category: 'software-engineer',
  title: 'Solving Floating-Point Precision Issues',
  description: 'When developing financial applications or systems requiring precise calculations, floating-point precision issues can lead to critical bugs. These problems occur in JVM-based languages like Kotlin, and deciding how to store and process values, especially when interacting with databases, is a crucial design decision.',
  date: '2025-04-10',
  updatedDate: '2025-04-10',
  tags: ['Kotlin', 'Floating-point', 'Precision', 'BigDecimal', 'Database', 'Financial', 'Best-practices'],
  image: 'handle-floating-point.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">Solving Floating-Point Precision Issues</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">Solving Floating-Point Precision Issues with Kotlin</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: April 23, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:text-gray-900 prose-code:dark:text-gray-100 prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-400 prose-strong:text-gray-900 prose-strong:dark:text-white">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">
          Understanding Floating-Point Precision Problems
        </h2>
        <p class="text-gray-700 dark:text-gray-400">
          When developing financial applications or systems requiring precise calculations, floating-point precision issues can lead to critical bugs.
          These problems occur in JVM-based languages like Kotlin, and deciding how to store and process values, especially when interacting with databases, is a crucial design decision.
        </p>
        <ul class="w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Precision loss due to binary floating-point representation limitations</li>
          <li class="whitespace-nowrap mobile-wrap">Accumulation of rounding errors</li>
          <li class="whitespace-nowrap mobile-wrap">Type conversion issues when storing and retrieving from databases</li>
          <li class="whitespace-nowrap mobile-wrap">Accuracy requirements in currency and financial calculations</li>
        </ul>
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Floating-point problem example:</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="floating-point-problem-example" class="language-kotlin"><span class="text-[#808080]">fun</span> <span class="text-[#DCDCAA]">main</span>() {
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">a</span> = <span class="text-[#B5CEA8]">0.1</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">b</span> = <span class="text-[#B5CEA8]">0.2</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">sum</span> = <span class="text-[#9CDCFE]">a</span> + <span class="text-[#9CDCFE]">b</span>

    println(<span class="text-[#CE9178]">"0.1 + 0.2 = $sum"</span>)
    println(<span class="text-[#CE9178]">"Is sum equal to 0.3? \${sum == 0.3}"</span>)
}</code></pre>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
          The result of the above code is:
        </p>
        <div class="bg-gray-100 rounded-md p-4 dark:bg-gray-800">
          <code class="text-gray-800 dark:text-gray-300">
            0.1 + 0.2 = 0.30000000000000004<br>
            Is sum equal to 0.3? false
          </code>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
          The fact that 0.1 plus 0.2 doesn't equal exactly 0.3 is due to the limitations of binary floating-point representation. These issues can cause serious errors in financial applications.
        </p>

      <div class="mt-8">
          <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Solving Precision Issues with Integer Conversion</h2>
        <p class="text-gray-800 dark:text-gray-400">
          The first approach is to multiply floating-point values by a specific factor (typically a power of 10) to convert them to integers before storing in the database.
          This method is particularly effective when dealing with values that have a fixed number of decimal places, such as currency.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-precision-issue-with-integer-conversion" class="language-kotlin"><span class="text-[#808080]">import</span> javax.persistence.Column
<span class="text-[#808080]">import</span> javax.persistence.Entity
<span class="text-[#808080]">import</span> javax.persistence.Id

<span class="text-[#808080]">// Entity to store money information</span>
<span class="text-[#569CD6]">@Entity</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">Money</span>(
    <span class="text-[#569CD6]">@Id</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">id</span>: <span class="text-[#4EC9B0]">Long</span>,

    <span class="text-[#808080]">// Store amount as integer (100x the original value)</span>
    <span class="text-[#569CD6]">@Column</span>(name = <span class="text-[#CE9178]">"amount_in_cents"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amountInCents</span>: <span class="text-[#4EC9B0]">Long</span>
) {
    <span class="text-[#808080]">// Calculate actual amount (integer → decimal)</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amount</span>: <span class="text-[#4EC9B0]">Double</span>
        <span class="text-[#569CD6]">get</span>() = <span class="text-[#9CDCFE]">amountInCents</span> / <span class="text-[#B5CEA8]">100.0</span>

    <span class="text-[#569CD6]">companion</span> <span class="text-[#569CD6]">object</span> {
        <span class="text-[#808080]">// Convert decimal value to storage integer</span>
        <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">fromAmount</span>(id: <span class="text-[#4EC9B0]">Long</span>, amount: <span class="text-[#4EC9B0]">Double</span>): <span class="text-[#4EC9B0]">Money</span> {
            <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amountInCents</span> = (amount * <span class="text-[#B5CEA8]">100</span>).toLong()
            <span class="text-[#569CD6]">return</span> <span class="text-[#4EC9B0]">Money</span>(id, <span class="text-[#9CDCFE]">amountInCents</span>)
        }
    }
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Usage Example:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-integer-conversion-example"><span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">main</span>() {
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">moneyRepository</span> = <span class="text-[#808080]">// repository implementation</span>

    <span class="text-[#808080]">// Store $10.99 (converted to 1099 cents)</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">money</span> = <span class="text-[#4EC9B0]">Money</span>.fromAmount(<span class="text-[#B5CEA8]">1L</span>, <span class="text-[#B5CEA8]">10.99</span>)
    <span class="text-[#9CDCFE]">moneyRepository</span>.save(<span class="text-[#9CDCFE]">money</span>)

    <span class="text-[#808080]">// Retrieve stored amount</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">retrieved</span> = <span class="text-[#9CDCFE]">moneyRepository</span>.findById(<span class="text-[#B5CEA8]">1L</span>).get()
    println(<span class="text-[#CE9178]">"Stored amount: \${retrieved.amount}"</span>)

    <span class="text-[#808080]">// Perform accurate calculations</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">money1</span> = <span class="text-[#4EC9B0]">Money</span>.fromAmount(<span class="text-[#B5CEA8]">2L</span>, <span class="text-[#B5CEA8]">0.1</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">money2</span> = <span class="text-[#4EC9B0]">Money</span>.fromAmount(<span class="text-[#B5CEA8]">3L</span>, <span class="text-[#B5CEA8]">0.2</span>)

    <span class="text-[#808080]">// Calculate in cents then convert</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">sumInCents</span> = <span class="text-[#9CDCFE]">money1</span>.amountInCents + <span class="text-[#9CDCFE]">money2</span>.amountInCents
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">sum</span> = <span class="text-[#9CDCFE]">sumInCents</span> / <span class="text-[#B5CEA8]">100.0</span>

    println(<span class="text-[#CE9178]">"0.1 + 0.2 = $sum"</span>)  <span class="text-[#808080]">// Prints exactly 0.3</span>
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Advantages:</h3>
          <ul class="w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Simple and intuitive implementation</li>
          <li class="whitespace-nowrap mobile-wrap">Integer operations are fast and efficient</li>
          <li class="whitespace-nowrap mobile-wrap">Efficiently processed in most databases</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Disadvantages:</h3>
          <ul class="w-full space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Only supports fixed decimal places (e.g., cents or 2 decimal places)</li>
          <li class="whitespace-nowrap mobile-wrap">May exceed Long range for very large values</li>
          <li class="whitespace-nowrap mobile-wrap">Conversion logic must always be kept in mind in code</li>
        </ul>
      </div>

      <div class="mt-8">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Solving Precision Issues with BigDecimal</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The second approach leverages the BigDecimal class provided by Java/Kotlin to solve precision issues.
          BigDecimal offers exact decimal representation and naturally maps to the DECIMAL type in databases.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-with-big-decimal"><span class="text-[#808080]">import</span> java.math.BigDecimal
<span class="text-[#808080]">import</span> java.math.RoundingMode
<span class="text-[#808080]">import</span> javax.persistence.Column
<span class="text-[#808080]">import</span> javax.persistence.Entity
<span class="text-[#808080]">import</span> javax.persistence.Id

<span class="text-[#569CD6]">@Entity</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">Product</span>(
    <span class="text-[#569CD6]">@Id</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">id</span>: <span class="text-[#4EC9B0]">Long</span>,

    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">name</span>: <span class="text-[#4EC9B0]">String</span>,

    <span class="text-[#808080]">// Maps to DECIMAL type</span>
    <span class="text-[#569CD6]">@Column</span>(precision = <span class="text-[#B5CEA8]">19</span>, scale = <span class="text-[#B5CEA8]">4</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">price</span>: <span class="text-[#4EC9B0]">BigDecimal</span>
)

<span class="text-[#808080]">// Extension function for price calculations</span>
<span class="text-[#569CD6]">fun</span> <span class="text-[#4EC9B0]">BigDecimal</span>.<span class="text-[#DCDCAA]">applyTax</span>(taxRate: <span class="text-[#4EC9B0]">BigDecimal</span>): <span class="text-[#4EC9B0]">BigDecimal</span> {
    <span class="text-[#569CD6]">return</span> <span class="text-[#569CD6]">this</span>.multiply(taxRate.add(<span class="text-[#4EC9B0]">BigDecimal</span>.ONE))
        .setScale(<span class="text-[#B5CEA8]">2</span>, <span class="text-[#4EC9B0]">RoundingMode</span>.HALF_UP)
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Usage Example:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                    </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-with-big-decimal-example"><span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">main</span>() {
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">productRepository</span> = <span class="text-[#808080]">// repository implementation</span>

    <span class="text-[#808080]">// Exact decimal representation</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">price</span> = <span class="text-[#4EC9B0]">BigDecimal</span>(<span class="text-[#B5CEA8]">"10.99"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">product</span> = <span class="text-[#4EC9B0]">Product</span>(<span class="text-[#B5CEA8]">1L</span>, <span class="text-[#B5CEA8]">"Refrigerator"</span>, <span class="text-[#9CDCFE]">price</span>)
    <span class="text-[#9CDCFE]">productRepository</span>.save(<span class="text-[#9CDCFE]">product</span>)

    <span class="text-[#808080]">// Precise decimal operations</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">num1</span> = <span class="text-[#4EC9B0]">BigDecimal</span>(<span class="text-[#B5CEA8]">"0.1"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">num2</span> = <span class="text-[#4EC9B0]">BigDecimal</span>(<span class="text-[#B5CEA8]">"0.2"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">sum</span> = <span class="text-[#9CDCFE]">num1</span>.add(<span class="text-[#9CDCFE]">num2</span>)

    println(<span class="text-[#B5CEA8]">"0.1 + 0.2 = $sum"</span>)
    println(<span class="text-[#B5CEA8]">"Is sum equal to 0.3? \${sum.compareTo(BigDecimal(\"0.3\")) == 0}"</span>)

    <span class="text-[#808080]">// Calculate 10% tax</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">taxRate</span> = <span class="text-[#4EC9B0]">BigDecimal</span>(<span class="text-[#B5CEA8]">"0.1"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">priceWithTax</span> = <span class="text-[#9CDCFE]">price</span>.applyTax(<span class="text-[#9CDCFE]">taxRate</span>)

    println(<span class="text-[#B5CEA8]">"Price with tax: $priceWithTax"</span>)
}</code></pre>
        </div>

          <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 dark:bg-gray-800 dark:border-yellow-500">
          <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-yellow-400 dark:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm text-yellow-700 dark:text-gray-300">
                  <strong class="dark:text-white">Important Note:</strong> Always create BigDecimal from String rather than double literals to avoid precision issues before they even start. Using <code class="dark:text-gray-300">BigDecimal(0.1)</code> would inherit the double's imprecision, while <code class="dark:text-gray-300">BigDecimal("0.1")</code> maintains exact precision.
              </p>
            </div>
          </div>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Advantages:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Provides arbitrary precision for decimal calculations</li>
          <li class="whitespace-nowrap mobile-wrap">Directly maps to database DECIMAL types</li>
          <li class="whitespace-nowrap mobile-wrap">Includes built-in rounding control</li>
          <li class="whitespace-nowrap mobile-wrap">Best option for financial calculations</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Disadvantages:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Operations are slower than primitive number types</li>
          <li class="whitespace-nowrap mobile-wrap">Immutable objects create more garbage collection pressure</li>
          <li class="whitespace-nowrap mobile-wrap">More verbose API compared to primitive operations</li>
        </ul>
      </div>

      <div class="mt-8">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">String Storage Approach</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The third approach is storing numeric values as strings in the database. This method ensures perfect preservation of the original value, but requires conversion for mathematical operations.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-string-storage-approach"><span class="text-[#808080]">import</span> java.math.BigDecimal
<span class="text-[#808080]">import</span> javax.persistence.Column
<span class="text-[#808080]">import</span> javax.persistence.Entity
<span class="text-[#808080]">import</span> javax.persistence.Id

<span class="text-[#569CD6]">@Entity</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">StringAmount</span>(
    <span class="text-[#569CD6]">@Id</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">id</span>: <span class="text-[#4EC9B0]">Long</span>,

    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">description</span>: <span class="text-[#4EC9B0]">String</span>,

    <span class="text-[#808080]">// Store the exact value as a string</span>
    <span class="text-[#569CD6]">@Column</span>(name = <span class="text-[#B5CEA8]">"amount_value"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amountValue</span>: <span class="text-[#4EC9B0]">String</span>
) {
    <span class="text-[#808080]">// Convert to BigDecimal when needed for calculations</span>
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">toBigDecimal</span>(): <span class="text-[#4EC9B0]">BigDecimal</span> = <span class="text-[#4EC9B0]">BigDecimal</span>(<span class="text-[#9CDCFE]">amountValue</span>)

    <span class="text-[#808080]">// Helper for addition with another StringAmount</span>
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">add</span>(other: <span class="text-[#4EC9B0]">StringAmount</span>): <span class="text-[#4EC9B0]">String</span> {
        <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">result</span> = <span class="text-[#4EC9B0]">this</span>.toBigDecimal().add(other.toBigDecimal())
        <span class="text-[#569CD6]">return</span> <span class="text-[#9CDCFE]">result</span>.toString()
    }

    <span class="text-[#808080]">// Helper for multiplication</span>
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">multiply</span>(factor: <span class="text-[#4EC9B0]">String</span>): <span class="text-[#4EC9B0]">String</span> {
        <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">result</span> = <span class="text-[#4EC9B0]">this</span>.toBigDecimal().multiply(<span class="text-[#4EC9B0]">BigDecimal</span>(factor))
        <span class="text-[#569CD6]">return</span> <span class="text-[#9CDCFE]">result</span>.toString()
    }
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Usage Example:</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="solving-string-storage-approache-example"><span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">main</span>() {
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amountRepository</span> = <span class="text-[#808080]">// repository implementation</span>

    <span class="text-[#808080]">// Store exact decimal values as strings</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amount1</span> = <span class="text-[#4EC9B0]">StringAmount</span>(<span class="text-[#B5CEA8]">1L</span>, <span class="text-[#B5CEA8]">"Payment"</span>, <span class="text-[#B5CEA8]">"0.1"</span>)
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">amount2</span> = <span class="text-[#4EC9B0]">StringAmount</span>(<span class="text-[#B5CEA8]">2L</span>, <span class="text-[#B5CEA8]">"Refund"</span>, <span class="text-[#B5CEA8]">"0.2"</span>)

    <span class="text-[#9CDCFE]">amountRepository</span>.save(<span class="text-[#9CDCFE]">amount1</span>)
    <span class="text-[#9CDCFE]">amountRepository</span>.save(<span class="text-[#9CDCFE]">amount2</span>)

    <span class="text-[#808080]">// Calculate sum by converting to BigDecimal</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">sum</span> = <span class="text-[#9CDCFE]">amount1</span>.add(<span class="text-[#9CDCFE]">amount2</span>)
    println(<span class="text-[#B5CEA8]">"0.1 + 0.2 = $sum"</span>)  <span class="text-[#808080]">// Exactly "0.3"</span>

    <span class="text-[#808080]">// Even extremely precise values maintain their exact representation</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">preciseAmount</span> = <span class="text-[#4EC9B0]">StringAmount</span>(
        <span class="text-[#B5CEA8]">3L</span>,
        <span class="text-[#B5CEA8]">"Scientific measurement"</span>,
        <span class="text-[#B5CEA8]">"0.1234567890123456789012345678901234567890"</span>
    )
    <span class="text-[#9CDCFE]">amountRepository</span>.save(<span class="text-[#9CDCFE]">preciseAmount</span>)

    <span class="text-[#808080]">// Retrieve with full precision intact</span>
    <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">retrieved</span> = <span class="text-[#9CDCFE]">amountRepository</span>.findById(<span class="text-[#B5CEA8]">3L</span>).get()
    println(<span class="text-[#B5CEA8]">"Retrieved value: \${retrieved.amountValue}"</span>)
}</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Advantages:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Perfect preservation of original value with unlimited precision</li>
          <li class="whitespace-nowrap mobile-wrap">No information loss during storage or retrieval</li>
          <li class="whitespace-nowrap mobile-wrap">Simple implementation with string data types</li>
          <li class="whitespace-nowrap mobile-wrap">Works well for values with extreme precision requirements</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Disadvantages:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Requires conversion to numeric types for calculations</li>
          <li class="whitespace-nowrap mobile-wrap">More storage space required for large numbers</li>
          <li class="whitespace-nowrap mobile-wrap">Less efficient for numeric indexing and sorting in databases</li>
          <li class="whitespace-nowrap mobile-wrap">Need for validation to ensure stored strings are valid numbers</li>
        </ul>
      </div>

      <div class="mt-8">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion and Best Practices</h2>
        <p class="text-gray-700 dark:text-gray-400">
          When dealing with floating-point precision issues in Kotlin, choose the approach that best aligns with your specific requirements:
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Decision Matrix:</h3>
        <div class="bg-gray-100 rounded-md p-4 dark:bg-gray-800">
            <ul class="w-full space-y-3 text-gray-700 list-none list-inside dark:text-gray-400">
            <li><strong>Use the Integer Conversion Approach when:</strong> Working with fixed decimal places (like money) and performance is critical</li>
            <li><strong>Use the BigDecimal Approach when:</strong> Working with financial calculations or when database precision types align with your needs</li>
            <li><strong>Use the String Storage Approach when:</strong> Maximum precision is required and the values may have arbitrary decimal places</li>
          </ul>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Best Practices:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Always create BigDecimal from strings, not from floating-point literals</li>
          <li class="whitespace-nowrap mobile-wrap">Document your precision strategy clearly in your codebase</li>
          <li class="whitespace-nowrap mobile-wrap">Use appropriate scale and rounding modes for financial calculations</li>
          <li class="whitespace-nowrap mobile-wrap">Write comprehensive tests specifically targeting precision issues</li>
          <li class="whitespace-nowrap mobile-wrap">Consider creating domain-specific types for handling important numeric values</li>
        </ul>

          <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 dark:bg-gray-800 dark:border-blue-500">
          <div class="flex">
            <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-blue-400 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3">
                <p class="text-sm text-blue-700 dark:text-gray-300">
                  <strong class="dark:text-white">Remember:</strong> The choice of precision strategy isn't just a technical decision—it can have real financial and business implications. Take time to understand your requirements and choose the appropriate solution for your specific use case.
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
};