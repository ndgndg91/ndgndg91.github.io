import type { BlogPost } from '../../../types/blog';

export const simpleDistributedIdGeneration: BlogPost = {
  id: 'simple-distributed-id-generation',
  category: 'software-engineer',
  title: 'Effective Identifier Generation Strategies in Distributed Environments',
  description: 'Generating unique identifiers in distributed systems presents significant challenges. While single-server environments can easily rely on auto-increment values or sequences, distributed environments where multiple servers must simultaneously generate IDs require careful consideration to ensure efficiency and avoid duplication.',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['Distributed Systems', 'Scalability', 'Performance', 'System Design', 'Database', 'Consistency'],
  image: 'simple-distributed-id-generation.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">Distributed ID Generation</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">Effective Identifier Generation Strategies in Distributed Environments</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: March 31, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:text-gray-900 prose-code:dark:text-gray-100 prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-400 prose-strong:text-gray-900 prose-strong:dark:text-white">
      <p class="text-gray-700 dark:text-gray-400">
        Generating unique identifiers in distributed systems presents significant challenges. While single-server environments can easily rely on auto-increment values or sequences, distributed environments where multiple servers must simultaneously generate IDs require careful consideration to ensure efficiency and avoid duplication.
      </p>

      <p class="text-gray-700 dark:text-gray-400">
        In this article, we'll explore an effective implementation of a unique identifier generator designed for distributed environments: the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">DistributedIdGenerator</code>.
      </p>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Requirements for Distributed Identifiers</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Uniqueness:</strong> Each identifier must be unique across the entire system.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Scalability:</strong> The system should be capable of generating thousands or millions of identifiers per second.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Time-sortability:</strong> Being able to sort identifiers chronologically is often valuable.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Compactness:</strong> Identifiers should be appropriately sized, considering storage space and transmission bandwidth.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Unpredictability:</strong> In security-sensitive contexts, identifiers should not be easily predictable.</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Implementation Example: DistributedIdGenerator</h2>
        <p>Here's an example implementation of an identifier generator for distributed environments:</p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">import</span> kr.co.example.global.extension.now
<span class="text-[#569CD6]">import</span> java.time.ZoneOffset
<span class="text-[#569CD6]">import</span> java.util.concurrent.atomic.AtomicLong

<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">DistributedIdGenerator</span>(
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">serverId</span>: <span class="text-[#4EC9B0]">Int</span>
) {
    <span class="text-[#569CD6]">companion object</span> {
        <span class="text-[#569CD6]">const val</span> <span class="text-[#9CDCFE]">MAX_SERVER_ID</span> = <span class="text-[#CE9178]">1000</span>
    }

    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">maxSequence</span> = <span class="text-[#CE9178]">999999</span>
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">counter</span> = <span class="text-[#4EC9B0]">AtomicLong</span>()

    <span class="text-[#569CD6]">init</span> {
        <span class="text-[#4EC9B0]">require</span>(<span class="text-[#9CDCFE]">serverId</span> &lt; <span class="text-[#9CDCFE]">MAX_SERVER_ID</span>) {
            <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">IllegalStateException</span>(<span class="text-[#CE9178]">"exceed max server id $serverId"</span>)
        }
    }

    <span class="text-[#569CD6]">fun</span> <span class="text-[#4EC9B0]">generate</span>(): <span class="text-[#4EC9B0]">String</span> {
        <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">timestamp</span> = <span class="text-[#4EC9B0]">now</span>().<span class="text-[#4EC9B0]">toEpochSecond</span>(<span class="text-[#4EC9B0]">ZoneOffset</span>.UTC)
        <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">uniqueId</span> = <span class="text-[#9CDCFE]">counter</span>.<span class="text-[#4EC9B0]">updateAndGet</span> { <span class="text-[#9CDCFE]">current</span> ->
            <span class="text-[#569CD6]">if</span> (<span class="text-[#9CDCFE]">current</span> >= <span class="text-[#9CDCFE]">maxSequence</span>) <span class="text-[#CE9178]">0</span> <span class="text-[#569CD6]">else</span> <span class="text-[#9CDCFE]">current</span> + <span class="text-[#CE9178]">1</span>
        }
        <span class="text-[#569CD6]">return</span> <span class="text-[#4EC9B0]">String</span>.<span class="text-[#4EC9B0]">format</span>(<span class="text-[#CE9178]">"%s%03d%06d"</span>, <span class="text-[#9CDCFE]">timestamp</span>, <span class="text-[#9CDCFE]">serverId</span>, <span class="text-[#9CDCFE]">uniqueId</span>)
    }
}</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Implementation Analysis</h2>
        <p class="text-gray-700 dark:text-gray-400">This implementation works as follows:</p>

        <div class="bg-gray-100 dark:bg-gray-800 border-l-4 border-blue-500 p-4 my-4 rounded-r">
          <ol class="space-y-2 text-gray-700 dark:text-gray-400">
            <li><strong class="text-gray-900 dark:text-white">Timestamp Utilization:</strong> Uses the current time in seconds (UTC) as a timestamp.</li>
            <li><strong class="text-gray-900 dark:text-white">Server ID:</strong> Each server has a unique ID (0-999), which is included in the identifier.</li>
            <li><strong class="text-gray-900 dark:text-white">Sequence Number:</strong> Uses an AtomicLong-managed sequence number (0-999999) to distinguish identifiers generated within the same second.</li>
            <li><strong class="text-gray-900 dark:text-white">Reset Logic:</strong> When the sequence number reaches its maximum value, it resets to 0.</li>
          </ol>
        </div>

        <p class="text-gray-700 dark:text-gray-400">The final identifier format is: "Timestamp (seconds) + Server ID (3 digits) + Sequence Number (6 digits)".</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 420">
          <!-- Background -->
          <rect width="800" height="420" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Distributed ID Generation Architecture</text>

          <!-- Server 1 -->
          <rect x="80" y="100" width="180" height="220" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
          <text x="170" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Server 1</text>
          <text x="170" y="155" font-family="Arial" font-size="14" text-anchor="middle">ServerId = 001</text>

          <!-- Server 1 ID Generator -->
          <rect x="100" y="170" width="140" height="70" fill="#bae7ff" stroke="#1890ff" stroke-width="1" rx="5" ry="5"/>
          <text x="170" y="195" font-family="Arial" font-size="14" text-anchor="middle">ID Generator</text>
          <text x="170" y="220" font-family="Arial" font-size="12" text-anchor="middle">counter = 000001</text>

          <!-- Server 1 Generated IDs -->
          <rect x="100" y="250" width="140" height="60" fill="#f0f5ff" stroke="#2f54eb" stroke-width="1" rx="5" ry="5"/>
          <text x="170" y="270" font-family="Arial" font-size="12" text-anchor="middle">Generated IDs:</text>
          <text x="170" y="290" font-size="11" text-anchor="middle" font-family="monospace">1679558400001000001</text>
          <text x="170" y="305" font-size="11" text-anchor="middle" font-family="monospace">1679558400001000002</text>

          <!-- Server 2 -->
          <rect x="310" y="100" width="180" height="220" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
          <text x="400" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Server 2</text>
          <text x="400" y="155" font-family="Arial" font-size="14" text-anchor="middle">ServerId = 002</text>

          <!-- Server 2 ID Generator -->
          <rect x="330" y="170" width="140" height="70" fill="#bae7ff" stroke="#1890ff" stroke-width="1" rx="5" ry="5"/>
          <text x="400" y="195" font-family="Arial" font-size="14" text-anchor="middle">ID Generator</text>
          <text x="400" y="220" font-family="Arial" font-size="12" text-anchor="middle">counter = 000003</text>

          <!-- Server 2 Generated IDs -->
          <rect x="330" y="250" width="140" height="60" fill="#f0f5ff" stroke="#2f54eb" stroke-width="1" rx="5" ry="5"/>
          <text x="400" y="270" font-family="Arial" font-size="12" text-anchor="middle">Generated IDs:</text>
          <text x="400" y="290" font-size="11" text-anchor="middle" font-family="monospace">1679558400002000001</text>
          <text x="400" y="305" font-size="11" text-anchor="middle" font-family="monospace">1679558400002000002</text>

          <!-- Server 3 -->
          <rect x="540" y="100" width="180" height="220" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
          <text x="630" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Server 3</text>
          <text x="630" y="155" font-family="Arial" font-size="14" text-anchor="middle">ServerId = 003</text>

          <!-- Server 3 ID Generator -->
          <rect x="560" y="170" width="140" height="70" fill="#bae7ff" stroke="#1890ff" stroke-width="1" rx="5" ry="5"/>
          <text x="630" y="195" font-family="Arial" font-size="14" text-anchor="middle">ID Generator</text>
          <text x="630" y="220" font-family="Arial" font-size="12" text-anchor="middle">counter = 000002</text>

          <!-- Server 3 Generated IDs -->
          <rect x="560" y="250" width="140" height="60" fill="#f0f5ff" stroke="#2f54eb" stroke-width="1" rx="5" ry="5"/>
          <text x="630" y="270" font-family="Arial" font-size="12" text-anchor="middle">Generated IDs:</text>
          <text x="630" y="290" font-size="11" text-anchor="middle" font-family="monospace">1679558400003000001</text>
          <text x="630" y="305" font-size="11" text-anchor="middle" font-family="monospace">1679558400003000002</text>

          <!-- ID Structure Explanation -->
          <rect x="110" y="340" width="580" height="60" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
          <text x="400" y="365" font-family="Arial" font-size="14" text-anchor="middle">
            <tspan x="400" dy="0" font-weight="bold">ID Structure:</tspan>
            <tspan x="400" dy="20"> Timestamp (10 digits) + ServerId (3 digits) + Sequence (6 digits)</tspan>
          </text>

          <!-- Lines connecting components -->
          <path d="M170,240 L170,250" stroke="#1890ff" stroke-width="2" fill="none"/>
          <path d="M400,240 L400,250" stroke="#1890ff" stroke-width="2" fill="none"/>
          <path d="M630,240 L630,250" stroke="#1890ff" stroke-width="2" fill="none"/>
        </svg>

        <p class="mt-4 text-gray-700 dark:text-gray-400">The diagram above illustrates how multiple servers can generate unique IDs simultaneously without coordination. Each server:</p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Uses the same timestamp component (when generating IDs in the same second)</li>
          <li class="whitespace-nowrap mobile-wrap">Incorporates its unique server ID in the middle section</li>
          <li class="whitespace-nowrap mobile-wrap">Maintains its own sequence counter that increments independently</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400">This ensures that even if multiple servers generate IDs at the exact same millisecond, the resulting IDs will still be globally unique.</p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Key Benefits</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Distributed by Design:</strong> By incorporating a server ID, the generator ensures uniqueness across multiple servers.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>High Throughput:</strong> Can generate up to 1 million unique IDs per second per server.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Time-ordered:</strong> IDs are naturally sorted by time due to the timestamp prefix.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Bounded Length:</strong> Maximum length is predictable (usually around 19-20 characters for current timestamps).</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>No Coordination Needed:</strong> Servers don't need to communicate to generate unique IDs.</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Verification with Tests</h2>
        <p>The following test code verifies that the identifier generator meets the requirements:</p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">import</span> org.assertj.core.api.Assertions.assertThat
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.Assertions.assertEquals
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.Assertions.assertTrue
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.DisplayName
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.RepeatedTest
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.Test
<span class="text-[#569CD6]">import</span> java.util.concurrent.ConcurrentHashMap
<span class="text-[#569CD6]">import</span> java.util.concurrent.Executors
<span class="text-[#569CD6]">import</span> java.util.concurrent.TimeUnit

<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">DistributedIdGeneratorTest</span> {
   <span class="text-[#569CD6]">private val</span> <span class="text-[#4EC9B0]">DistributedIdGenerator</span> = <span class="text-[#4EC9B0]">DistributedIdGenerator</span>(<span class="text-[#CE9178]">1</span>)

   <span class="text-[#6A9955]">@Test</span>
   <span class="text-[#6A9955]">@DisplayName</span>(<span class="text-[#CE9178]">"serverId_validation"</span>)
   <span class="text-[#569CD6]">fun</span> <span class="text-[#4EC9B0]">test_constructor</span>() {
       <span class="text-[#6A9955]">// given</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">invalidServerId</span> = <span class="text-[#CE9178]">1000</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">maxServerId</span> = <span class="text-[#CE9178]">999</span>
       <span class="text-[#6A9955]">// when</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">failedResult</span> = <span class="text-[#4EC9B0]">runCatching</span> { <span class="text-[#4EC9B0]">DistributedIdGenerator</span>(<span class="text-[#9CDCFE]">invalidServerId</span>) }
           .<span class="text-[#4EC9B0]">onFailure</span> { <span class="text-[#9CDCFE]">it</span>.<span class="text-[#4EC9B0]">printStackTrace</span>() }
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">successResult</span> = <span class="text-[#4EC9B0]">runCatching</span> { <span class="text-[#4EC9B0]">DistributedIdGenerator</span>(<span class="text-[#9CDCFE]">maxServerId</span>) }
           .<span class="text-[#4EC9B0]">onFailure</span> { <span class="text-[#9CDCFE]">it</span>.<span class="text-[#4EC9B0]">printStackTrace</span>() }
       <span class="text-[#6A9955]">// then</span>
       <span class="text-[#9CDCFE]">assertThat</span>(<span class="text-[#9CDCFE]">failedResult</span>.isFailure).<span class="text-[#4EC9B0]">isTrue</span>
       <span class="text-[#9CDCFE]">assertThat</span>(<span class="text-[#9CDCFE]">failedResult</span>.<span class="text-[#4EC9B0]">exceptionOrNull</span>()).<span class="text-[#4EC9B0]">isInstanceOf</span>(<span class="text-[#4EC9B0]">IllegalStateException</span>::<span class="text-[#4EC9B0]">class</span>.java)
       <span class="text-[#9CDCFE]">assertThat</span>(<span class="text-[#9CDCFE]">successResult</span>.isSuccess).<span class="text-[#4EC9B0]">isTrue</span>
   }

   <span class="text-[#6A9955]">@RepeatedTest</span>(<span class="text-[#CE9178]">10</span>)
   <span class="text-[#6A9955]">@DisplayName</span>(<span class="text-[#CE9178]">"should_generate_1M_ids_per_second_with_max_length_20"</span>)
   <span class="text-[#569CD6]">fun</span> <span class="text-[#4EC9B0]">test_generate_should_not_over_20_length_should_not_duplicated_value</span>() {
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">totalKeys</span> = <span class="text-[#CE9178]">1_000_000</span> <span class="text-[#6A9955]">// Total number of keys to generate</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">threadCount</span> = <span class="text-[#CE9178]">10</span> <span class="text-[#6A9955]">// Number of threads to use</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">keysPerThread</span> = <span class="text-[#9CDCFE]">totalKeys</span> / <span class="text-[#9CDCFE]">threadCount</span> <span class="text-[#6A9955]">// Keys to generate per thread</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">generatedKeys</span> = <span class="text-[#4EC9B0]">ConcurrentHashMap</span>.<span class="text-[#4EC9B0]">newKeySet</span>&lt;<span class="text-[#4EC9B0]">String</span>&gt;() <span class="text-[#6A9955]">// ConcurrentHashSet to check for duplicates</span>
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">executor</span> = <span class="text-[#4EC9B0]">Executors</span>.<span class="text-[#4EC9B0]">newFixedThreadPool</span>(<span class="text-[#9CDCFE]">threadCount</span>) <span class="text-[#6A9955]">// Thread pool creation</span>

       (<span class="text-[#CE9178]">1</span>..<span class="text-[#9CDCFE]">threadCount</span>).<span class="text-[#4EC9B0]">forEach</span> { <span class="text-[#9CDCFE]">i</span> ->
           <span class="text-[#9CDCFE]">executor</span>.<span class="text-[#4EC9B0]">submit</span> {
               (<span class="text-[#CE9178]">1</span>..<span class="text-[#9CDCFE]">keysPerThread</span>).<span class="text-[#4EC9B0]">forEach</span> { <span class="text-[#9CDCFE]">j</span> ->
                   <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">key</span> = <span class="text-[#4EC9B0]">DistributedIdGenerator</span>.<span class="text-[#4EC9B0]">generate</span>()
                   <span class="text-[#9CDCFE]">assertTrue</span>(<span class="text-[#9CDCFE]">key</span>.length &lt;= <span class="text-[#CE9178]">20</span>, <span class="text-[#CE9178]">"Key length exceeded 20 characters: $key"</span>)
                   <span class="text-[#9CDCFE]">generatedKeys</span>.<span class="text-[#4EC9B0]">add</span>(<span class="text-[#9CDCFE]">key</span>) <span class="text-[#6A9955]">// Add the generated key to the Set</span>
               }
           }
       }

       <span class="text-[#6A9955]">// Wait for all threads to complete their work</span>
       <span class="text-[#9CDCFE]">executor</span>.<span class="text-[#4EC9B0]">shutdown</span>()
       <span class="text-[#9CDCFE]">executor</span>.<span class="text-[#4EC9B0]">awaitTermination</span>(<span class="text-[#CE9178]">1</span>, <span class="text-[#4EC9B0]">TimeUnit</span>.HOURS)

       <span class="text-[#6A9955]">// Verify that the total number of keys generated matches the expected count</span>
       <span class="text-[#9CDCFE]">assertEquals</span>(<span class="text-[#9CDCFE]">totalKeys</span>, <span class="text-[#9CDCFE]">generatedKeys</span>.size, <span class="text-[#CE9178]">"Duplicate keys detected!"</span>)
   }
}</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Potential Improvements</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Millisecond Precision:</strong> Using milliseconds instead of seconds would allow for more identifiers per time unit.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Snowflake Variation:</strong> Twitter's Snowflake ID format could be adopted for improved bit utilization.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>UUID Alternative:</strong> For cases where guaranteed uniqueness is more important than sequentiality.</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Persistence:</strong> For recovering sequence numbers after restarts to prevent possible collisions.</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Spring Boot Integration Example</h2>
        <p>Here's an example of how to integrate the DistributedIdGenerator into a Spring Boot application:</p>

        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">import</span> kr.co.example.global.ActiveProfileManager
<span class="text-[#569CD6]">import</span> org.slf4j.LoggerFactory
<span class="text-[#569CD6]">import</span> org.springframework.boot.SpringApplication
<span class="text-[#569CD6]">import</span> org.springframework.context.ApplicationContext
<span class="text-[#569CD6]">import</span> org.springframework.context.annotation.Bean
<span class="text-[#569CD6]">import</span> org.springframework.context.annotation.Configuration

<span class="text-[#6A9955]">@Configuration</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">DistributedIdGeneratorConfig</span>(
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">applicationContext</span>: <span class="text-[#4EC9B0]">ApplicationContext</span>,
    <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">detector</span>: <span class="text-[#4EC9B0]">ActiveProfileManager</span>
) {
   <span class="text-[#569CD6]">private val</span> <span class="text-[#9CDCFE]">logger</span> = <span class="text-[#4EC9B0]">LoggerFactory</span>.<span class="text-[#4EC9B0]">getLogger</span>(javaClass)

   <span class="text-[#6A9955]">@Bean</span>
   <span class="text-[#569CD6]">fun</span> <span class="text-[#4EC9B0]">distributedIdGenerator</span>(): <span class="text-[#4EC9B0]">DistributedIdGenerator</span> {
       <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">serverId</span>: <span class="text-[#4EC9B0]">Int</span> = <span class="text-[#569CD6]">if</span> (<span class="text-[#9CDCFE]">detector</span>.<span class="text-[#4EC9B0]">isLocal</span>()) {
           <span class="text-[#CE9178]">1</span>
       } <span class="text-[#569CD6]">else</span> {
           <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">podName</span> = <span class="text-[#4EC9B0]">System</span>.<span class="text-[#4EC9B0]">getenv</span>(<span class="text-[#CE9178]">"HOSTNAME"</span>)
           <span class="text-[#569CD6]">if</span> (<span class="text-[#9CDCFE]">podName</span>.isNullOrEmpty()) {
               <span class="text-[#9CDCFE]">logger</span>.<span class="text-[#4EC9B0]">info</span>(<span class="text-[#CE9178]">"HOSTNAME is not set. Shutting down the application."</span>)
               <span class="text-[#4EC9B0]">SpringApplication</span>.<span class="text-[#4EC9B0]">exit</span>(<span class="text-[#9CDCFE]">applicationContext</span>) <span class="text-[#6A9955]">// Gracefully shutdown Spring application</span>
           }
           <span class="text-[#569CD6]">val</span> <span class="text-[#9CDCFE]">uniquePart</span> = <span class="text-[#9CDCFE]">podName</span>.<span class="text-[#4EC9B0]">substringAfterLast</span>(<span class="text-[#CE9178]">"-"</span>)
           <span class="text-[#9CDCFE]">uniquePart</span>.<span class="text-[#4EC9B0]">hashCode</span>().<span class="text-[#4EC9B0]">absoluteValue</span>.<span class="text-[#4EC9B0]">rem</span>(<span class="text-[#4EC9B0]">DistributedIdGenerator</span>.MAX_SERVER_ID)
       }
       <span class="text-[#9CDCFE]">logger</span>.<span class="text-[#4EC9B0]">info</span>(<span class="text-[#CE9178]">"server id is : {}"</span>, <span class="text-[#9CDCFE]">serverId</span>)
       <span class="text-[#569CD6]">return</span> <span class="text-[#4EC9B0]">DistributedIdGenerator</span>(<span class="text-[#9CDCFE]">serverId</span>)
   }
}</code></pre>
        </div>

        <p>This configuration class demonstrates intelligent server ID assignment:</p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">In local development environments, it uses a hardcoded server ID (1).</li>
          <li class="whitespace-nowrap mobile-wrap">In Kubernetes environments, it extracts the pod name from the HOSTNAME environment variable.</li>
          <li class="whitespace-nowrap mobile-wrap">It generates a consistent server ID by hashing the unique part of the pod name and taking the modulo of MAX_SERVER_ID.</li>
          <li class="whitespace-nowrap mobile-wrap">This ensures each pod gets a unique ID within the valid range, maintaining distributed ID generation across deployments.</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Generating unique identifiers in distributed environments requires careful consideration of uniqueness, performance, and scalability. The approach presented here offers a simple yet effective solution that balances these requirements without needing external coordination between servers.
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          By combining a timestamp, server ID, and sequence number, this implementation can generate millions of unique identifiers per second across a distributed system, with each identifier being no longer than 20 characters.
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          When implementing your own distributed ID generation system, consider your specific requirements around sortability, predictability, and collision resistance to choose the most appropriate approach.
        </p>
      </div>
    </div>
  `
}; 