import type {BlogPost} from '../../../types/blog';

export const r2dbcConnPool: BlogPost = {
    id: 'r2dbc-conn-pool',
    category: 'software-engineer',
    title: 'Understanding R2DBC Connection Pool',
    description: 'R2DBC connection pooling implements a fundamentally different approach compared to traditional JDBC connection pools like HikariCP, especially in how it handles idle connections and pool initialization.',
    date: '2025-04-21',
    updatedDate: '2025-04-21',
    tags: ['R2DBC', 'Database', 'Performance', 'Spring', 'Reactive', 'Connection'],
    image: '/r2dbc-conn-pool.webp',
    content: `
<nav class="mb-4" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li><a href="/" class="hover:text-gray-700">Home</a></li>
        <li class="flex items-center">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <a href="/blog/software-engineer/list" class="ml-2 hover:text-gray-700">Software Engineer</a>
        </li>
        <li class="flex items-center">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
            <span class="ml-2 text-gray-400">R2DBC Connection Pool</span>
        </li>
    </ol>
</nav>
<header class="mb-8">
    <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
    </p>
    <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Understanding R2DBC Connection Pool
    </h1>
    <div class="text-sm text-gray-500 mt-2">Updated: April 21, 2025</div>
</header>
<div class="mt-6 prose dark:prose-invert">
    <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">
            R2DBC vs HikariCP Connection Management
        </h2>
        <p class="text-gray-700 dark:text-gray-400">
            R2DBC connection pooling implements a similar approach to traditional JDBC connection pools like HikariCP,
            with some notable differences in connection handling philosophy.
        </p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">R2DBC <strong>does support</strong> minimum idle connections (min idle)</li>
            <li class="whitespace-nowrap mobile-wrap">R2DBC follows a reactive programming model while maintaining connection availability</li>
            <li class="whitespace-nowrap mobile-wrap">Connections are maintained according to the configured minimum idle setting</li>
            <li class="whitespace-nowrap mobile-wrap">This design balances reactive programming principles with practical performance needs</li>
        </ul>
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">
            Connection Strategy Comparison:
        </h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">HikariCP: Maintains minimum connections (minimumIdle)</li>
            <li class="whitespace-nowrap mobile-wrap">R2DBC: Also maintains minimum connections through minIdle configuration</li>
        </ul>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460">
        <rect width="900" height="460" fill="#f8f9fa" rx="10" ry="10"/>

        <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">
            R2DBC vs HikariCP Connection Pool
        </text>

        <!-- R2DBC Box -->
        <rect x="50" y="80" width="380" height="280" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="240" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">R2DBC Connection Pool</text>

        <!-- HikariCP Box -->
        <rect x="470" y="80" width="380" height="280" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="660" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">HikariCP Connection Pool</text>

        <!-- R2DBC Features -->
        <rect x="70" y="130" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="155" font-family="Arial" font-size="16" text-anchor="middle">initialSize (initial connections)</text>

        <rect x="70" y="180" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="205" font-family="Arial" font-size="16" text-anchor="middle">maxSize (maximum connections)</text>

        <rect x="70" y="230" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="255" font-family="Arial" font-size="16" text-anchor="middle">minIdle (minimum idle connections)</text>

        <rect x="70" y="280" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="305" font-family="Arial" font-size="16" text-anchor="middle">Reactive connection management</text>

        <!-- HikariCP Features -->
        <rect x="490" y="130" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="155" font-family="Arial" font-size="16" text-anchor="middle">maximumPoolSize</text>

        <rect x="490" y="180" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="205" font-family="Arial" font-size="16" text-anchor="middle">minimumIdle</text>

        <rect x="490" y="230" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="255" font-family="Arial" font-size="16" text-anchor="middle">idleTimeout</text>

        <rect x="490" y="280" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="305" font-family="Arial" font-size="16" text-anchor="middle">Traditional JDBC approach</text>

        <!-- Bottom text -->
        <text x="240" y="380" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Reactive philosophy with min idle</text>
        <text x="660" y="380" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Traditional JDBC approach</text>

        <!-- Connection strategy note -->
        <text x="450" y="420" font-family="Arial" font-size="16" text-anchor="middle" font-style="italic">Both R2DBC and HikariCP support maintaining minimum idle connections</text>
    </svg>

    <div class="mt-6">
        <h2 class="mb-2 text-3xl sm:text-2xl tracking-tight text-gray-900 dark:text-white break-words">io.r2dbc.pool.ConnectionPool Configuration</h2>
        <p class="text-gray-800 dark:text-gray-400">
            The <code class="inline-code">ConnectionPool</code> in R2DBC provides several configuration options for managing the
            lifecycle of database connections, including support for minimum idle connections.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Key configuration parameters:</h3>
        <ul class="max-w-md space-y-1 text-gray-800 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap"><strong>initialSize = 10:</strong> Creates 10 connections when the pool is initialized</li>
            <li class="whitespace-nowrap mobile-wrap"><strong>maxSize = 10:</strong> Maximum number of connections in the pool is 10</li>
            <li class="whitespace-nowrap mobile-wrap"><strong>minIdle:</strong> Sets the minimum number of idle connections to maintain in the pool</li>
            <li class="whitespace-nowrap mobile-wrap"><strong>maxIdleTime = Duration.ofMinutes(30):</strong> Connections may be removed after 30 minutes of inactivity</li>
            <li class="whitespace-nowrap mobile-wrap"><strong>maxLifeTime = null:</strong> No maximum lifetime set for connections (unlimited)</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation example:</h3>
        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white">
<pre class="whitespace-pre-wrap"><code><span class="text-purple-400">ConnectionPoolConfiguration</span> <span class="text-blue-300">configuration</span> = <span class="text-purple-400">ConnectionPoolConfiguration</span>.<span class="text-yellow-400">builder</span>(connectionFactory)
    .<span class="text-yellow-400">initialSize</span>(<span class="text-pink-400">10</span>)
.<span class="text-yellow-400">maxSize</span>(<span class="text-pink-400">10</span>)
.<span class="text-yellow-400">minIdle</span>(<span class="text-pink-400">5</span>)
.<span class="text-yellow-400">maxIdleTime</span>(<span class="text-purple-400">Duration</span>.<span class="text-yellow-400">ofMinutes</span>(<span class="text-pink-400">30</span>))
.<span class="text-yellow-400">build</span>();

    <span class="text-purple-400">ConnectionPool</span> <span class="text-blue-300">pool</span> = <span class="text-purple-400">new</span> <span class="text-yellow-400">ConnectionPool</span>(configuration);</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Implementation details:</h3>
        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white">
<pre class="whitespace-pre-wrap"><code><span class="text-gray-400">// R2DBC implementation code showing minIdle support</span>
<span class="text-purple-400">int</span> <span class="text-blue-300">cpuCount</span> = <span class="text-purple-400">Runtime</span>.<span class="text-yellow-400">getRuntime</span>().<span class="text-yellow-400">availableProcessors</span>();
    <span class="text-purple-400">PoolBuilder</span>&lt;<span class="text-blue-300">Connection</span>, <span class="text-blue-300">PoolConfig</span>&lt;<span class="text-blue-300">Connection</span>&gt;&gt; <span class="text-blue-300">builder</span> = <span class="text-purple-400">PoolBuilder</span>.<span class="text-yellow-400">from</span>(allocator)
    .<span class="text-yellow-400">clock</span>(configuration.<span class="text-yellow-400">getClock</span>())
.<span class="text-yellow-400">metricsRecorder</span>(metricsRecorder)
    .<span class="text-yellow-400">evictionPredicate</span>(evictionPredicate)
    .<span class="text-yellow-400">destroyHandler</span>(<span class="text-purple-400">Connection</span>::close)
.<span class="text-yellow-400">sizeBetween</span>(<span class="text-purple-400">Math</span>.<span class="text-yellow-400">min</span>(configuration.<span class="text-yellow-400">getMinIdle</span>(), cpuCount), cpuCount)
.<span class="text-yellow-400">idleResourceReuseMruOrder</span>();

    <span class="text-purple-400">if</span> (maxSize != -<span class="text-pink-400">1</span> && initialSize &lt;= <span class="text-pink-400">0</span>) {
builder.<span class="text-yellow-400">sizeBetween</span>(<span class="text-purple-400">Math</span>.<span class="text-yellow-400">max</span>(configuration.<span class="text-yellow-400">getMinIdle</span>(), initialSize), maxSize);
} <span class="text-purple-400">else</span> {
builder.<span class="text-yellow-400">sizeBetween</span>(<span class="text-purple-400">Math</span>.<span class="text-yellow-400">max</span>(configuration.<span class="text-yellow-400">getMinIdle</span>(), initialSize),
maxSize == -<span class="text-pink-400">1</span> ? <span class="text-purple-400">Integer</span>.<span class="text-blue-300">MAX_VALUE</span> : maxSize);
}</code></pre>
        </div>
    </div>

    <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Connection Eviction Behavior</h2>
        <p class="text-gray-700 dark:text-gray-400">
            Understanding how R2DBC manages connection eviction is important for optimizing pool performance.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Key eviction behaviors:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">maxIdleTime and maxLifeTime operate independently</li>
            <li class="whitespace-nowrap mobile-wrap">When maxLifeTime is reached, the connection is terminated regardless of maxIdleTime</li>
            <li class="whitespace-nowrap mobile-wrap">With maxIdleTime set to 30 minutes, idle connections exceeding this time are removed</li>
            <li class="whitespace-nowrap mobile-wrap">If either condition (idle time or lifetime) is met, the connection will be evicted</li>
            <li class="whitespace-nowrap mobile-wrap">Eviction will not reduce the pool below the configured minIdle value</li>
        </ul>

        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white mt-4">
<pre class="whitespace-pre-wrap"><code><span class="text-gray-400">// Create eviction predicate that checks maxIdleTime and maxLifeTime.</span>
<span class="text-gray-400">// This is because "PoolBuilder#evictionIdle()" and "PoolBuilder#evictionPredicate()" cannot be used together in</span>
<span class="text-gray-400">// current implementation. (&lt;https://github.com/reactor/reactor-pool/issues/33>)</span>
<span class="text-gray-400">// To workaround the issue, here defines an evictionPredicate that performs both maxIdleTime and maxLifeTime check.</span>
<span class="text-purple-400">BiPredicate</span>&lt;<span class="text-blue-300">Connection</span>, <span class="text-blue-300">PooledRefMetadata</span>&gt; <span class="text-blue-300">evictionPredicate</span> = (<span class="text-yellow-400">connection</span>, <span class="text-yellow-400">metadata</span>) -> {
    <span class="text-purple-400">if</span> (<span class="text-blue-300">maxIdleTime</span>.isZero() || <span class="text-blue-300">maxLifeTime</span>.isZero()) {
        <span class="text-gray-400">// evict immediately</span>
    <span class="text-purple-400">return</span> <span class="text-cyan-400">true</span>;
}
<span class="text-purple-400">boolean</span> <span class="text-blue-300">isIdleTimeExceeded</span> = !<span class="text-blue-300">maxIdleTime</span>.isNegative() && <span class="text-yellow-400">metadata</span>.idleTime() >= <span class="text-blue-300">maxIdleTime</span>.toMillis();
    <span class="text-purple-400">boolean</span> <span class="text-blue-300">isLifeTimeExceeded</span> = !<span class="text-blue-300">maxLifeTime</span>.isNegative() && <span class="text-yellow-400">metadata</span>.lifeTime() >= <span class="text-blue-300">maxLifeTime</span>.toMillis();
    <span class="text-purple-400">return</span> <span class="text-blue-300">isIdleTimeExceeded</span> || <span class="text-blue-300">isLifeTimeExceeded</span>;
};</code></pre>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
            This code demonstrates how R2DBC implements the eviction predicate that determines when connections should be removed
            from the pool. The eviction occurs if either the idle time or lifetime thresholds are exceeded, while maintaining the minimum
            idle connections specified.
        </p>
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 450">
        <!-- Background -->
        <rect width="800" height="450" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">R2DBC Connection Lifecycle</text>

        <!-- Connection Pool -->
        <rect x="50" y="80" width="700" height="150" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="10" ry="10"/>
        <text x="400" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Connection Pool (maxSize = 10, minIdle = 5)</text>

        <!-- Active connections -->
        <rect x="70" y="130" width="180" height="80" fill="#91d5ff" stroke="#1890ff" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="170" font-family="Arial" font-size="14" text-anchor="middle">Active Connections</text>

        <!-- Idle connections -->
        <rect x="290" y="130" width="180" height="80" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="380" y="170" font-family="Arial" font-size="14" text-anchor="middle">Idle Connections</text>
        <text x="380" y="190" font-family="Arial" font-size="12" text-anchor="middle">(Maintained by minIdle)</text>

        <!-- Potential connections -->
        <rect x="510" y="130" width="180" height="80" fill="#f5f5f5" stroke="#d9d9d9" stroke-width="1" rx="5" ry="5"/>
        <text x="600" y="170" font-family="Arial" font-size="14" text-anchor="middle">Potential Connections</text>
        <text x="600" y="190" font-family="Arial" font-size="12" text-anchor="middle">(Created on demand)</text>

        <!-- Arrows and events -->
        <path d="M380,250 L380,300" stroke="#52c41a" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="410" y="270" font-family="Arial" font-size="12" text-anchor="start">maxIdleTime exceeded</text>
        <text x="410" y="285" font-family="Arial" font-size="12" text-anchor="start">(if above minIdle)</text>

        <path d="M160,250 L160,300" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="190" y="270" font-family="Arial" font-size="12" text-anchor="start">maxLifeTime exceeded</text>

        <path d="M600,250 L600,300" stroke="#d9d9d9" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="630" y="270" font-family="Arial" font-size="12" text-anchor="start">Created when needed</text>

        <!-- Eviction box -->
        <rect x="80" y="300" width="650" height="50" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="450" y="330" font-family="Arial" font-size="14" text-anchor="middle">Connection Eviction (when idle time or lifetime exceeded, respecting minIdle)</text>

        <!-- Connection Request -->
        <path d="M700,150 L750,150" stroke="#d9d9d9" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <text x="780" y="130" font-family="Arial" font-size="12" text-anchor="middle">New</text>
        <text x="780" y="145" font-family="Arial" font-size="12" text-anchor="middle">Connection</text>
        <text x="780" y="160" font-family="Arial" font-size="12" text-anchor="middle">Request</text>

        <!-- Note about min idle -->
        <text x="400" y="400" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Minimum idle connections maintained</text>
        <text x="400" y="425" font-family="Arial" font-size="14" text-anchor="middle">R2DBC maintains minimum idle connections while following reactive principles</text>

        <!-- Arrow Marker -->
        <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" fill="#595959"/>
            </marker>
        </defs>
    </svg>

    <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Reactive Approach and Pool Sizing</h2>
        <p class="text-gray-700 dark:text-gray-400">
            R2DBC's connection pool design balances reactive programming principles with practical connection management,
            providing both efficiency and availability.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Connection Acquisition Strategy:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">initialSize creates connections at startup</li>
            <li class="whitespace-nowrap mobile-wrap">minIdle ensures a minimum number of connections are maintained</li>
            <li class="whitespace-nowrap mobile-wrap">New connections are established as needed up to maxSize</li>
            <li class="whitespace-nowrap mobile-wrap">This approach provides both resource efficiency and connection availability guarantees</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Recommendations for Configuration:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">Set initialSize based on expected baseline connection needs</li>
            <li class="whitespace-nowrap mobile-wrap">Configure minIdle to ensure a minimum level of connection availability</li>
            <li class="whitespace-nowrap mobile-wrap">Set maxSize based on peak connection requirements</li>
            <li class="whitespace-nowrap mobile-wrap">Tune maxIdleTime to balance resource utilization with connection reuse</li>
        </ul>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div class="ml-3">
                    <p class="text-sm text-yellow-700">
                        <strong>Important Note:</strong> R2DBC's support for minimum idle connections ensures consistent availability with minimal latency,
                        providing a similar guarantee to what traditional connection pools like HikariCP offer.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
            R2DBC connection pool combines a reactive design philosophy with practical connection management features
            similar to traditional JDBC connection pools like HikariCP. Key features include:
        </p>

        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 mt-4">
            <li class="whitespace-nowrap mobile-wrap">Support for minimum idle connections through the minIdle setting</li>
            <li class="whitespace-nowrap mobile-wrap">Connection eviction based on either idle time or total lifetime</li>
            <li class="whitespace-nowrap mobile-wrap">Resource-efficient approach that aligns with reactive programming principles</li>
            <li class="whitespace-nowrap mobile-wrap">Provides connection availability guarantees similar to traditional connection pools</li>
        </ul>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
            This document confirms that R2DBC does support a minimum idle connection feature similar to HikariCP's minimumIdle.
            While still following reactive programming principles, R2DBC provides the ability to maintain a minimum pool of connections
            for consistent availability and performance.
        </p>
    </div>
</div>
`
};