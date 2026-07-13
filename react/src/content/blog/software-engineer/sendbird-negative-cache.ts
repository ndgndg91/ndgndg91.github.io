import type { BlogPost } from '../../../types/blog';

export const sendbirdNegativeCache: BlogPost = {
  id: 'optimizing-external-api-negative-cache',
  title: 'Optimizing External API Consumption with Negative Caching',
  description: 'When 98% of outbound calls fail with 400 Bad Request because users aren\'t registered on the downstream chat platform, how do you protect your latency? A look into negative caching and cache eviction strategies.',
  category: 'software-engineer',
  date: '2026-07-07',
  updatedDate: '2026-07-07',
  tags: ['Caching', 'Redis', 'Performance Tuning', 'Resilience', 'API Design', 'Spring Boot'],
  image: 'sendbird-negative-cache.webp',
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Negative Caching</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Optimizing External API Consumption with Negative Caching</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        We often design caching systems to store successful database queries and API responses. But what happens when the majority of your external API calls are expected to fail, and those failures are both normal and slow? This post covers how we used <strong>Negative Caching</strong> to eliminate 65,000 failed third-party API calls a day and recover critical response latency.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Trigger: A 98% Error Rate</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our application features a social timeline tab where users can view posts. To support blocking, the backend must check a third-party chat platform\'s API (<code>GET /v3/users/{user_id}/block</code>) to filter out posts from blocked users.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          During an audit of our APM dashboards, we noticed a massive spike in outbound API errors. Over <strong>98.4% of calls</strong> (roughly 65,000 requests per day) to the chat platform were failing with an HTTP 400 Bad Request. Digging into the details, the API response was always:
        </p>
        <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-sm font-mono mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
          HTTP 400: {"error": true, "code": 400301, "message": "User not found."}
        </div>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Because the application caught this exception and fell back to returning an empty block list, the front-end never saw the failure. The system continued to function, but every check for an unregistered user paid a 56ms latency tax, accounting for 71% of our total timeline response time.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Cause: Lazy User Registration</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Why were the users not found?
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Our system registers users on the third-party chat platform **lazily**. A user is only registered when they physically tap on the chat tab for the first time. However, the social timeline tab is open to all logged-in users. Since 98% of our active users had never opened the chat tab, they did not exist in the chat database. Checking their block list was guaranteed to fail.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Solution: Negative Caching</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The obvious fix was to call a "check user existence" API first. But that is still an outbound network call, which would not solve the latency issue.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100 font-semibold">
          Instead, we implemented Negative Caching (caching the non-existence of a resource).
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The flow works as follows:
        </p>
        <ol class="list-decimal pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li>Before calling the external API, check our local Redis cache for a negative marker: <code>unregistered:{userId}</code>.</li>
          <li>If the marker exists, skip the API call and immediately return an empty block list (saving 50ms+).</li>
          <li>If the marker does not exist, call the external API.</li>
          <li>If the API returns a <code>400301</code> error, write the negative marker to Redis with a TTL of 7 days.</li>
        </ol>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Here is the basic implementation in Kotlin:
        </p>
        <div class="my-6">
<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
<span class="text-purple-400">fun</span> <span class="text-blue-400">findBlockedUsers</span>(userId: <span class="text-yellow-300">String</span>): <span class="text-yellow-300">List</span>&lt;<span class="text-yellow-300">String</span>&gt; {
    <span class="text-purple-400">if</span> (redisTemplate.hasKey(<span class="text-green-400">"chat:unregistered:\$userId"</span>)) {
        <span class="text-purple-400">return</span> emptyList()
    }

    <span class="text-purple-400">return try</span> {
        chatClient.getBlockedUsers(userId)
    } <span class="text-purple-400">catch</span> (e: <span class="text-yellow-300">ChatApiException</span>) {
        <span class="text-purple-400">if</span> (e.errorCode == <span class="text-orange-400">400301</span>) {
            redisTemplate.opsForValue().set(
                <span class="text-green-400">"chat:unregistered:\$userId"</span>,
                <span class="text-green-400">"true"</span>,
                <span class="text-yellow-300">Duration</span>.ofDays(<span class="text-orange-400">7</span>)
            )
            <span class="text-purple-400">return</span> emptyList()
        }
        <span class="text-orange-400">throw</span> e
    }
}
</pre>
        </div>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. Cache Eviction and Consistency</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Negative caching introduces consistency risks: what happens if a user is created in the chat system, but their negative marker is still active in Redis? They will be unable to block or be blocked correctly for 7 days.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          To maintain consistency, we must evict the negative cache key during user registration events:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Chat Connection:</strong> When the client SDK successfully connects to the chat platform (the primary registration path), evict the Redis key.</li>
          <li><strong>Block Command:</strong> If a user attempts to block another user, clear both users\' negative cache keys before executing the command.</li>
          <li><strong>TTL Fallback:</strong> The 7-day TTL acts as a safety net in case of failed evict commands.</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          API optimization is not just about caching success. In architectures that rely heavily on lazy initialization or third-party platforms, caching failures (negative caching) is often the most effective way to eliminate network overhead. By pairing negative caching with a robust eviction strategy, we eliminated 95% of our outbound error noise and recovered significant system latency.
        </p>
      </section>
    </article>
  `
};
