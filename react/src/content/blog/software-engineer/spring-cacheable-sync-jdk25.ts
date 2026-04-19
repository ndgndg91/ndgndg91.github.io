import type { BlogPost } from '../../../types/blog';

export const springCacheableSyncJdk25: BlogPost = {
  id: 'spring-cacheable-sync-jdk25',
  title: 'Spring Redis @Cacheable(sync=true): The Distributed Lock Misconception and the Salvation of JDK 25',
  description: 'Debunking the myth that sync=true enables distributed locks in Spring Redis, exploring its true local-lock nature in EKS architectures, and unveiling how JDK 25 resolves the infamous Virtual Thread Pinning nightmare.',
  category: 'software-engineer',
  date: '2026-04-19',
  updatedDate: '2026-04-19',
  tags: ['Spring Boot', 'Redis', 'Caching', 'Virtual Threads', 'Java 25', 'Kubernetes', 'EKS', 'Architecture'],
  image: 'spring-cacheable-sync-jdk25.png',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Spring Redis @Cacheable(sync=true) Misconception</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Spring Redis \`@Cacheable(sync=true)\`: The Distributed Lock Misconception and the Salvation of JDK 25</h1>
      
      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        Does enabling <code>sync=true</code> miraculously grant you a Redis Distributed Lock? Uncovering the architectural realities of Spring Caching in EKS and how the newly released JDK 25 rescues Virtual Threads.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. Introduction: "Doesn't this enable a Redis Distributed Lock?"</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          When teams gather to debate cache optimization strategies, a notoriously persistent myth invariably surfaces. It centers around the <code>sync = true</code> flag within Spring's <code>@Cacheable</code> annotation.
        </p>

        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">@Cacheable</span>(cacheNames = [<span class="text-green-400">"marketData"</span>], key = <span class="text-green-400">"#ticker"</span>, <span class="text-blue-300">sync</span> = <span class="text-orange-400">true</span>)
<span class="text-purple-400">fun</span> <span class="text-blue-400">getMarketPrice</span>(ticker: <span class="text-yellow-300">String</span>): <span class="text-yellow-300">MarketPrice</span> {
    <span class="text-gray-500">// Heavy DB or External API Call</span>
}
</pre>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          A vast majority of engineers harbor the sheer expectation that flipping this option on will seamlessly exploit Redis's native capabilities to enforce a <strong>Distributed Lock</strong>. Let me start with the conclusion: <strong>This is completely false.</strong>
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Today, we will dissect the definitive operational mechanics of <code>sync=true</code>, its practical boundaries within massive Kubernetes (EKS) architectures, and how the terrifying "Pinning" phobia that plagued JDK 21 has been historically annihilated in JDK 25.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Reality of <code>sync=true</code>: It is merely a Local Lock</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          If you peer deeply into the core implementation of Spring Data Redis (specifically <code>RedisCache.java</code>), you will discover an undeniable truth: <code>sync=true</code> never issues a lock command to the Redis server. Instead, it exclusively performs <strong>synchronization utilizing JVM-internal <code>synchronized</code> blocks (or intrinsic Lock objects)</strong>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In architectural terms, the <strong>Scope of the Lock</strong> is fundamentally different:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong><code>sync=true</code>: Current JVM Instance</strong> (Queuing occurs strictly isolated within your single local server process).</li>
          <li><strong>Redisson (Distributed Lock): Redis Cluster Global</strong> (Mutex spans across all servers globally).</li>
        </ul>

        <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-300 mt-8">🚀 The EKS Scalability Scenario</h3>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Imagine our microservice is horizontally scaled to <strong>20 Pods</strong> living on an EKS cluster. The heavily requested ticker cache (e.g., BTC/USD price) suddenly expires. Instantaneously, 1,000 concurrent user requests strike the cluster. What happens?
        </p>

        <div class="overflow-x-auto my-6">
          <table class="w-full text-sm text-left border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
              <tr>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Category</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700"><code>sync=false</code> (Default)</th>
                <th scope="col" class="px-6 py-3 border-b border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200"><code>sync=true</code> (Local Lock)</th>
                <th scope="col" class="px-6 py-3 border-b dark:border-gray-700">Redisson (Distributed Lock)</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Behavior</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300 bg-red-50/50 dark:bg-red-900/10">No concurrency control whatsoever.</td>
                <td class="px-6 py-4 font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Exactly 1 thread per Pod queries the DB.</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Exactly 1 thread globally across all 20 Pods queries the DB.</td>
              </tr>
              <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Database Load</td>
                <td class="px-6 py-4 font-bold text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-900/20">Up to 1,000 queries (Lethal DB Spike 💀)</td>
                <td class="px-6 py-4 font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/80 dark:bg-indigo-900/20">Max 20 queries (Equal to Pod Count)</td>
                <td class="px-6 py-4 font-bold text-green-600 dark:text-green-400">Strictly 1 query</td>
              </tr>
              <tr class="bg-white dark:bg-gray-900">
                <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">Verdict</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Extremely Dangerous (Cache Stampede)</td>
                <td class="px-6 py-4 font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10">Highly Efficient ROI (Recommended)</td>
                <td class="px-6 py-4 text-gray-700 dark:text-gray-300">Complex Implementation & High Network Overhead</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In 99% of business cases, modern databases can effortlessly absorb a redundant burst of 20 identical queries. Consequently, injecting the bloated complexity of Redisson is functionally overkill. Merely attaching <code>sync=true</code> executes a remarkably elegant and pragmatic obliteration of the deadly <strong>Cache Stampede</strong>.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The JDK 21 Nightmare: Virtual Thread Pinning</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Truth be told, engineers historically recoiled from <code>sync=true</code> for a drastically different, more terrifying reason: compatibility clashes with <strong>Java Virtual Threads (Project Loom)</strong>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          As stated, Spring strictly wields the <code>synchronized</code> keyword behind the veil of <code>sync=true</code>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In the <strong>JDK 21 (LTS)</strong> era, if a heavy Blocking I/O operation (like executing a sluggish DB query) erupted whilst trapped inside a <code>synchronized</code> block, the Virtual Thread suffered from a lethal pathology known as <strong>'Pinning'</strong>. It aggressively monopolized the underlying OS Carrier Thread, refusing to unmount.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This single architectural quirk obliterated the entire performance premise of Virtual Threads, plummeting throughput to catastrophic lows. Consequently, developers were tragically coerced into stripping away elegant annotations and redundantly hard-coding raw <code>ReentrantLock</code> barricades.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. JDK 25(JEP 491): Salvation Has Arrived</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          However, this is 2026, and we are commanding the power of <strong>JDK 25</strong>.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Fueled by the monumental architectural breakthroughs seamlessly integrated since JDK 24 via <strong><a href="https://openjdk.org/jeps/491" target="_blank" class="text-indigo-600 hover:underline dark:text-indigo-400">JEP 491: Synchronize Virtual Threads without Pinning</a></strong>, the entire paradigm has shifted. The JVM itself has evolved to grant <code>synchronized</code> blocks absolute, native harmony with Virtual Threads.
        </p>

        <ul class="list-none pl-0 space-y-4 mb-6">
          <li class="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
            <span class="font-bold text-red-700 dark:text-red-400 flex items-center mb-2">❌ The Past (JDK 21):</span>
            <span class="text-gray-800 dark:text-gray-200">Encountering <code>synchronized</code> triggered brutal Pinning &rarr; Carrier Thread Pool exhaustion &rarr; Complete System Asphyxiation.</span>
          </li>
          <li class="bg-green-50 dark:bg-green-900/10 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
            <span class="font-bold text-green-700 dark:text-green-400 flex items-center mb-2">✅ The Present (JDK 25):</span>
            <span class="text-gray-800 dark:text-gray-200">Blocking I/O inside <code>synchronized</code> now flawlessly <strong>Unmounts</strong> the Virtual Thread &rarr; Zero blocked OS Threads. <strong>Functions exactly like pure Non-blocking logic!</strong></span>
          </li>
        </ul>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          In essence, you no longer possess a single reason to audit whether Spring Boot transitioned its internal codebase to <code>ReentrantLock</code>. The JVM natively guarantees perfect thread-scheduler optimization. <strong>You can unapologetically deploy <code>sync=true</code> with absolute peace of mind.</strong>
        </p>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Conclusion & Actionable TL;DR</h2>
        
        <div class="bg-indigo-50 dark:bg-indigo-900/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800 mt-4 shadow-sm">
          <ol class="list-decimal pl-5 space-y-4 text-indigo-900 dark:text-indigo-200 marker:font-bold">
            <li><strong><code>@Cacheable(sync=true)</code> is NOT a Distributed Lock.</strong> It is strictly a JVM-scoped Local Lock.</li>
            <li>In replicated EKS configurations, acknowledge that <strong>database hits will scale linearly with your Pod Count</strong> during a cache miss. (However, 20 queries are exponentially safer than 1,000).</li>
            <li>The dreaded Virtual Thread Pinning trauma of the JDK 21 era has been <strong>architecturally cured in JDK 25</strong> via JEP 491.</li>
            <li><strong>Action Items:</strong>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>For standard Cache-Aside reads (e.g., fetching <code>MarketPrice</code> or <code>UserProfiles</code>), aggressively attach <code>sync=true</code>.</li>
                <li>Reserve the titanic complexity of <strong>Redisson</strong> exclusively for scenarios dictating absolute global consistency (e.g., High-concurrency ticket reservations or inventory deductions).</li>
              </ul>
            </li>
          </ol>
        </div>
        
      </section>
    </article>
  `
};
