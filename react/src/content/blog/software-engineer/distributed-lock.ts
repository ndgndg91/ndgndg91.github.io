import type { BlogPost } from '../../../types/blog';

export const distributedLockRedis: BlogPost = {
  id: 'distributed-lock',
  category: 'software-engineer',
  title: 'Distributed Locks in Spring Boot: Implementation Options and Best Practices',
  description: 'Distributed locks are synchronization mechanisms used in distributed systems to prevent multiple processes, services, or servers from concurrently executing critical sections of code or accessing shared resources simultaneously.',
  date: '2025-05-03',
  updatedDate: '2025-05-03',
  tags: ['Distributed System','Spring Boot','Redis','Concurrency','ShedLock','Redisson','Distributed Lock','Synchronization','Spring Boot'],
  image: 'distributed-lock-redis.webp',
  content:`
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li class="whitespace-nowrap mobile-wrap"><a href="/" class="hover:text-gray-700">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list.html" class="ml-2 hover:text-gray-700">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-400">Distributed Locks</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Distributed Locks in Spring Boot: Implementation Options and Best Practices
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: May 5, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-are-distributed-locks" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What are Distributed Locks?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#when-to-use" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">When to Use Distributed Locks</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#redis-based" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Redis-Based Implementation</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#implementation-options" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Implementation Options</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#spring-integration" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Spring Integration</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#shedlock" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">ShedLock</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#redisson" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Redisson</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#bean-processor" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Custom Bean Post Processor</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#comparison" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Comparison of Approaches</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#best-practices" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Best Practices</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-are-distributed-locks">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What are Distributed Locks?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Distributed locks are synchronization mechanisms used in distributed systems to prevent multiple processes, services, or servers from concurrently executing critical sections of code or accessing shared resources simultaneously.
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Provides mutually exclusive access in distributed environments</li>
          <li class="whitespace-nowrap mobile-wrap">Helps prevent race conditions across multiple application instances</li>
          <li class="whitespace-nowrap mobile-wrap">Ensures integrity of shared resources and data consistency</li>
          <li class="whitespace-nowrap mobile-wrap">Critical for horizontally scaled applications</li>
          <li class="whitespace-nowrap mobile-wrap">Typically implemented using an external, shared data store</li>
        </ul>
      </div>

      <!-- Core Concept Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 800 350" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="800" height="350" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Distributed Lock Architecture</text>

          <!-- Application Instances -->
          <rect x="100" y="80" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="160" y="115" font-family="Arial" font-size="14" text-anchor="middle">App Instance 1</text>

          <rect x="100" y="160" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="160" y="195" font-family="Arial" font-size="14" text-anchor="middle">App Instance 2</text>

          <rect x="100" y="240" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="160" y="275" font-family="Arial" font-size="14" text-anchor="middle">App Instance 3</text>

          <!-- Lock Server -->
          <rect x="400" y="140" width="140" height="80" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8" ry="8"/>
          <text x="470" y="170" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Redis</text>
          <text x="470" y="190" font-family="Arial" font-size="12" text-anchor="middle">Lock Storage</text>

          <!-- Shared Resource -->
          <rect x="650" y="140" width="120" height="80" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8" ry="8"/>
          <text x="710" y="170" font-family="Arial" font-size="14" text-anchor="middle">Shared</text>
          <text x="710" y="190" font-family="Arial" font-size="14" text-anchor="middle">Resource</text>

          <!-- Connection Lines -->
          <!-- Instance 1 -> Redis -->
          <path d="M220,110 L400,160" stroke="#1976d2" stroke-width="2" />
          <polygon points="395,151 400,160 393,164" fill="#1976d2"/>
          <text x="300" y="115" font-family="Arial" font-size="10" text-anchor="middle" fill="#1976d2">Acquire Lock</text>

          <!-- Instance 2 -> Redis (failed) -->
          <path d="M220,180 L400,180" stroke="#ef5350" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="300" y="170" font-family="Arial" font-size="10" text-anchor="middle" fill="#ef5350">Lock Attempt (Failed)</text>

          <!-- Instance 3 -> Redis (waiting) -->
          <path d="M220,250 L400,200" stroke="#ff9800" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="300" y="255" font-family="Arial" font-size="10" text-anchor="middle" fill="#ff9800">Waiting for Lock</text>

          <!-- Redis -> Resource -->
          <path d="M540,180 L650,180" stroke="#388e3c" stroke-width="2" />
          <polygon points="642,177 650,180 643,184" fill="#388e3c"/>
          <text x="595" y="170" font-family="Arial" font-size="10" text-anchor="middle" fill="#388e3c">Protected Access</text>

          <!-- Lock Status Indicators -->
          <circle cx="80" cy="110" r="8" fill="#4caf50"/>
          <text x="65" y="114" font-family="Arial" font-size="10" text-anchor="end">Has Lock</text>

          <circle cx="80" cy="190" r="8" fill="#f44336"/>
          <text x="65" y="194" font-family="Arial" font-size="10" text-anchor="end">Denied</text>

          <circle cx="80" cy="270" r="8" fill="#ff9800"/>
          <text x="65" y="274" font-family="Arial" font-size="10" text-anchor="end">Waiting</text>

          <!-- Legend -->
          <rect x="150" y="310" width="500" height="25" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="1" rx="5" ry="5"/>
          <text x="400" y="327" font-family="Arial" font-size="12" text-anchor="middle">Only one application instance can access the resource at a time</text>
        </svg>
      </div>

      <div class="mt-6" id="when-to-use">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">When to Use Distributed Locks</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Distributed locks are essential in several scenarios where multiple application instances need coordinated access to shared resources:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Scheduled Tasks</strong> - Prevent duplicate execution of scheduled jobs across multiple nodes</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Resource-Intensive Operations</strong> - Ensure only one instance performs heavy computation</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Batch Processing</strong> - Coordinate batch processing to avoid duplicate work</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Database Migrations</strong> - Ensure only one instance runs schema updates</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Cache Invalidation</strong> - Coordinate cache refresh operations</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Finite Resources</strong> - Manage limited connections or third-party API quotas</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Critical Business Logic</strong> - Prevent race conditions in critical operations like payment processing</li>
        </ul>
      </div>

      <div class="mt-6" id="redis-based">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Redis-Based Implementation</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Redis is one of the most popular choices for implementing distributed locks due to its speed, simplicity, and built-in features:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">In-memory data store with persistence options</li>
          <li class="whitespace-nowrap mobile-wrap">Atomic operations critical for lock reliability</li>
          <li class="whitespace-nowrap mobile-wrap">Support for key expiration (automatic lock release)</li>
          <li class="whitespace-nowrap mobile-wrap">Widely used and supported in the Spring ecosystem</li>
          <li class="whitespace-nowrap mobile-wrap">High performance with low latency</li>
          <li class="whitespace-nowrap mobile-wrap">Scalable through Redis Cluster</li>
        </ul>

        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The basic Redis distributed lock algorithm (Redlock) uses the following principles:
        </p>

        <div class="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-yellow-800 dark:text-yellow-200">⚠️ Important Note on Redlock</h3>
          <p class="text-yellow-700 dark:text-yellow-300 mt-2">
            While we mention the Redlock algorithm, it's crucial to understand that Redlock is specifically designed for multi-instance Redis environments. Using Redlock principles with a single Redis instance does not provide the reliability guarantees that the algorithm is designed for. In single-instance Redis environments, lock reliability cannot be guaranteed during Redis failures or network partitions.
          </p>
          <p class="text-yellow-700 dark:text-yellow-300 mt-2">
            For production systems requiring high reliability, consider using either a Redis Cluster with proper Redlock implementation, or alternative distributed coordination systems like Zookeeper or etcd.
          </p>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Redis Distributed Lock Algorithm</h3>
          <ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-400 mt-3">
            <li class="whitespace-nowrap mobile-wrap">Acquire lock using SET with NX (set-if-not-exists) and expiration time</li>
            <li class="whitespace-nowrap mobile-wrap">Generate unique lock identifier to ensure only lock owner can release it</li>
            <li class="whitespace-nowrap mobile-wrap">Execute the critical section if lock is acquired</li>
            <li class="whitespace-nowrap mobile-wrap">Release the lock using a Lua script to ensure atomic check-and-delete</li>
            <li class="whitespace-nowrap mobile-wrap">Include auto-expiry as a safety mechanism for failed processes</li>
          </ol>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Redis Lock Basic Implementation</h3>
          <div class="bg-red-50 dark:bg-red-900 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-red-800 dark:text-red-200">⚠️ Critical: Safe Lock Release</h3>
            <p class="text-red-700 dark:text-red-300 mt-2">
              Using a simple <code>DEL</code> command to release locks is dangerous and can lead to serious concurrency issues. Always use a Lua script that atomically verifies the lock owner before deletion to ensure that only the process that acquired the lock can release it.
            </p>
            <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
    <pre><code class="language-lua text-white"><span class="text-green-300">-- NEVER use simple DEL for release:</span>
<span class="text-blue-400">DEL</span> lock:myresource <span class="text-green-300">-- UNSAFE: Any client can delete the lock!</span>

<span class="text-green-300">-- ALWAYS use atomic check-and-delete:</span>
<span class="text-blue-400">if</span> redis.<span class="text-yellow-300">call</span>(<span class="text-orange-300">"GET"</span>, <span class="text-blue-400">KEYS</span>[1]) == <span class="text-blue-400">ARGV</span>[1] <span class="text-blue-400">then</span>
    <span class="text-blue-400">return</span> redis.<span class="text-yellow-300">call</span>(<span class="text-orange-300">"DEL"</span>, <span class="text-blue-400">KEYS</span>[1])
<span class="text-blue-400">else</span>
    <span class="text-blue-400">return</span> 0
<span class="text-blue-400">end</span></code></pre>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            This Lua script ensures that only the lock owner (identified by the unique_value) can release the lock.
          </p>
        </div>
      </div>

      <div class="mt-6" id="implementation-options">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Implementation Options in Spring Boot</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Boot offers several ways to implement distributed locks. Let's explore the four main approaches, each with its own strengths and use cases.
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Spring Integration</strong> - Provides comprehensive messaging solutions with distributed lock abstractions</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>ShedLock</strong> - A lightweight library specifically designed for preventing duplicate scheduled task execution</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Redisson</strong> - A Redis client that offers various distributed objects and services</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Custom Bean Post Processor</strong> - Implementing distributed locks with custom annotations</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          In the following sections, we'll examine each of these implementation options in detail, with code examples and analysis of their pros and cons.
        </p>
      </div>

      <div class="mt-6" id="spring-integration">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">1. Spring Integration</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Integration provides a comprehensive messaging solution that includes distributed lock abstractions, particularly useful for applications already using Spring Integration.
        </p>

        <div class="my-8">
          <svg viewBox="0 0 800 250" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="800" height="250" fill="#f8f9fa" rx="10" ry="10"/>

            <!-- Title -->
            <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Spring Integration Lock Architecture</text>

            <!-- Spring Context -->
            <rect x="50" y="60" width="700" height="160" fill="#f1f8e9" stroke="#7cb342" stroke-width="2" stroke-dasharray="5,5" rx="8" ry="8"/>
            <text x="120" y="80" font-family="Arial" font-size="14" font-weight="bold">Spring Application Context</text>

            <!-- Scheduler -->
            <rect x="80" y="100" width="150" height="50" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" ry="5"/>
            <text x="155" y="130" font-family="Arial" font-size="14" text-anchor="middle">Scheduler</text>

            <!-- Redis Connection Factory -->
            <rect x="500" y="100" width="200" height="50" fill="#ffecb3" stroke="#ffa000" stroke-width="2" rx="5" ry="5"/>
            <text x="600" y="130" font-family="Arial" font-size="14" text-anchor="middle">RedisConnectionFactory</text>

            <!-- Lock Registry -->
            <rect x="320" y="100" width="150" height="50" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5" ry="5"/>
            <text x="395" y="130" font-family="Arial" font-size="14" text-anchor="middle">RedisLockRegistry</text>

            <!-- Service -->
            <rect x="200" y="170" width="200" height="40" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5" ry="5"/>
            <text x="300" y="195" font-family="Arial" font-size="14" text-anchor="middle">DistributedTaskService</text>

            <!-- Arrows -->
            <path d="M155,150 L155,170 L200,170" stroke="#1976d2" stroke-width="2" fill="none" />
            <polygon points="193,167 200,170 193,174" fill="#1976d2" stroke="#1976d2" stroke-width="1"/>

            <path d="M395,150 L395,170" stroke="#388e3c" stroke-width="2" />
            <polygon points="392,162 395,170 398,162" fill="#388e3c" stroke="#388e3c" stroke-width="1"/>

            <path d="M468,100 L500,100" stroke="#ffa000" stroke-width="2" />
            <polygon points="493,97 500,100 493,104" fill="#ffa000" stroke="#ffa000" stroke-width="1"/>
          </svg>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Maven Dependencies</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="spring-integration-dependencies" class="language-xml text-white"><span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework.integration<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-integration-core<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework.integration<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-integration-redis<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework.boot<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-boot-starter-data-redis<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Configuration</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="spring-integration-config" class="language-java text-white"><span class="text-yellow-500">@Configuration</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">RedisLockConfiguration</span> {

    <span class="text-yellow-500">@Bean</span>
    <span class="text-blue-400">public</span> RedisLockRegistry <span class="text-yellow-300">redisLockRegistry</span>(RedisConnectionFactory redisConnectionFactory) {
        <span class="text-blue-400">return new</span> <span class="text-purple-300">RedisLockRegistry</span>(
            redisConnectionFactory,
            <span class="text-orange-300">"lock-registry"</span>,
            30000); <span class="text-green-300">// 30s expiry</span>
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Usage Example</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="spring-integration-usage" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">DistributedTaskService</span> {

    <span class="text-blue-400">private final</span> RedisLockRegistry redisLockRegistry;

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">DistributedTaskService</span>(RedisLockRegistry redisLockRegistry) {
        <span class="text-blue-400">this</span>.redisLockRegistry = redisLockRegistry;
    }

    <span class="text-yellow-500">@Scheduled</span>(fixedRate = 60000)
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">scheduledTask</span>() {
        Lock lock = redisLockRegistry.<span class="text-yellow-300">obtain</span>(<span class="text-orange-300">"scheduled-task-lock"</span>);

        <span class="text-blue-400">boolean</span> acquired = <span class="text-blue-400">false</span>;
        <span class="text-blue-400">try</span> {
            acquired = lock.<span class="text-yellow-300">tryLock</span>(2, TimeUnit.<span class="text-purple-300">SECONDS</span>);
            <span class="text-blue-400">if</span> (acquired) {
                <span class="text-green-300">// Critical section - only one instance will execute this</span>
                <span class="text-yellow-300">performTask</span>();
            } <span class="text-blue-400">else</span> {
                <span class="text-green-300">// Lock not acquired, handle accordingly</span>
                log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Task already running on another instance"</span>);
            }
        } <span class="text-blue-400">catch</span> (InterruptedException e) {
            Thread.<span class="text-yellow-300">currentThread</span>().<span class="text-yellow-300">interrupt</span>();
        } <span class="text-blue-400">finally</span> {
            <span class="text-blue-400">if</span> (acquired) {
                lock.<span class="text-yellow-300">unlock</span>();
            }
        }
    }

    <span class="text-blue-400">private void</span> <span class="text-yellow-300">performTask</span>() {
        <span class="text-green-300">// Task implementation</span>
        log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Executing critical task at {}"</span>, Instant.<span class="text-yellow-300">now</span>());
    }
}</code></pre>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-bold text-xl text-gray-800 dark:text-gray-200">Advantages and Disadvantages</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold text-green-800 dark:text-green-200">Advantages</h4>
              <ul class="space-y-1 text-green-700 dark:text-green-300 list-disc list-inside">
                <li>Integrates well with Spring ecosystem</li>
                <li>Standard Java Lock interface</li>
                <li>Supports multiple lock registry implementations</li>
                <li>Built-in lease time management</li>
                <li>Good for applications already using Spring Integration</li>
              </ul>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 dark:text-red-200">Disadvantages</h4>
              <ul class="space-y-1 text-red-700 dark:text-red-300 list-disc list-inside">
                <li>Spring Integration is a heavy dependency</li>
                <li>Manual lock handling is error-prone</li>
                <li>No declarative annotation-based locking</li>
                <li>Less flexible lock customization</li>
                <li>Error recovery requires careful implementation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="shedlock">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">2. ShedLock</h2>
        <p class="text-gray-700 dark:text-gray-400">
          ShedLock is a lightweight library specifically designed to prevent duplicate execution of scheduled tasks in distributed environments. It's particularly well-suited for scheduled tasks and offers a simple, annotation-based approach.
        </p>

        <div class="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-yellow-800 dark:text-yellow-200">ShedLock Limitations</h3>
          <p class="text-yellow-700 dark:text-yellow-300 mt-2">
            It's important to understand that ShedLock is specifically designed for coordinating scheduled tasks across multiple instances and is not intended as a general-purpose distributed lock mechanism. ShedLock focuses on preventing concurrent execution of scheduled methods rather than providing locks for arbitrary code blocks.
          </p>
          <p class="text-yellow-700 dark:text-yellow-300 mt-2">
            If you need distributed locks for general application logic, consider using Redisson or Spring Integration instead. Using ShedLock outside its intended use case may lead to unexpected behavior or decreased reliability.
          </p>
        </div>

        <div class="my-8">
          <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="800" height="280" fill="#f8f9fa" rx="10" ry="10"/>

            <!-- Title -->
            <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ShedLock Architecture</text>

            <!-- Spring Context -->
            <rect x="50" y="60" width="700" height="190" fill="#f1f8e9" stroke="#7cb342" stroke-width="2" stroke-dasharray="5,5" rx="8" ry="8"/>
            <text x="120" y="80" font-family="Arial" font-size="14" font-weight="bold">Spring Application Context</text>

            <!-- Redis Provider -->
            <rect x="550" y="100" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5" ry="5"/>
            <text x="625" y="130" font-family="Arial" font-size="14" text-anchor="middle">Redis</text>
            <text x="625" y="150" font-family="Arial" font-size="12" text-anchor="middle">LockProvider</text>

            <!-- ShedLock Core -->
            <rect x="350" y="100" width="150" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="5" ry="5"/>
            <text x="425" y="130" font-family="Arial" font-size="14" text-anchor="middle">ShedLock</text>
            <text x="425" y="150" font-family="Arial" font-size="12" text-anchor="middle">LockManager</text>

            <!-- Scheduler -->
            <rect x="100" y="100" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" ry="5"/>
            <text x="175" y="130" font-family="Arial" font-size="14" text-anchor="middle">Spring</text>
            <text x="175" y="150" font-family="Arial" font-size="12" text-anchor="middle">TaskScheduler</text>

            <!-- Scheduled Task -->
            <rect x="200" y="200" width="250" height="40" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5" ry="5"/>
            <text x="330" y="225" font-family="Arial" font-size="14" text-anchor="middle">@ScheduledLock Tasks</text>

            <!-- Arrows -->
            <path d="M250,130 L350,130" stroke="#388e3c" stroke-width="2" />
            <polygon points="343,127 350,130 343,134" fill="#388e3c"/>
            <text x="300" y="120" font-family="Arial" font-size="10" text-anchor="middle">Intercepts</text>

            <path d="M500,130 L550,130" stroke="#f57c00" stroke-width="2" />
            <polygon points="543,127 550,130 543,134" fill="#f57c00"/>
            <text x="525" y="120" font-family="Arial" font-size="10" text-anchor="middle">Uses</text>

            <path d="M175,160 L175,200 L195,200" stroke="#1976d2" stroke-width="2" fill="none"/>
            <polygon points="193,197 200,200 193,204" fill="#1976d2"/>
            <text x="145" y="180" font-family="Arial" font-size="10" text-anchor="middle">Schedules</text>

            <path d="M425,160 L425,195" stroke="#388e3c" stroke-width="2" />
            <polygon points="422,192 425,200 428,192" fill="#388e3c"/>
            <text x="465" y="190" font-family="Arial" font-size="10" text-anchor="middle">Manages Locks</text>
          </svg>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Maven Dependencies</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="shedlock-dependencies" class="language-xml text-white"><span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>net.javacrumbs.shedlock<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>shedlock-spring<span class="text-blue-400">&lt;/artifactId&gt;</span>
    <span class="text-blue-400">&lt;version&gt;</span>4.43.0<span class="text-blue-400">&lt;/version&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>net.javacrumbs.shedlock<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>shedlock-provider-redis-spring<span class="text-blue-400">&lt;/artifactId&gt;</span>
    <span class="text-blue-400">&lt;version&gt;</span>4.43.0<span class="text-blue-400">&lt;/version&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Configuration</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="shedlock-config" class="language-java text-white"><span class="text-yellow-500">@Configuration</span>
<span class="text-yellow-500">@EnableScheduling</span>
<span class="text-yellow-500">@EnableSchedulerLock</span>(defaultLockAtMostFor = <span class="text-orange-300">"10m"</span>)
<span class="text-blue-400">public class</span> <span class="text-yellow-300">SchedulerConfiguration</span> {

    <span class="text-yellow-500">@Bean</span>
    <span class="text-blue-400">public</span> LockProvider <span class="text-yellow-300">lockProvider</span>(RedisConnectionFactory connectionFactory) {
        <span class="text-blue-400">return new</span> <span class="text-purple-300">RedisLockProvider</span>(connectionFactory, <span class="text-orange-300">"shedlock:"</span>);
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Usage Example</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="shedlock-usage" class="language-java text-white"><span class="text-yellow-500">@Component</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">ScheduledTasks</span> {

    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(ScheduledTasks.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Scheduled</span>(fixedRate = 60000)
    <span class="text-yellow-500">@SchedulerLock</span>(
        name = <span class="text-orange-300">"scheduledTaskName"</span>,
        lockAtLeastFor = <span class="text-orange-300">"10s"</span>,
        lockAtMostFor = <span class="text-orange-300">"50s"</span>
    )
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">scheduledTask</span>() {
        <span class="text-green-300">// This task will only run on one instance at a time</span>
        <span class="text-green-300">// If another instance tries to execute it while locked,</span>
        <span class="text-green-300">// the task will be skipped silently</span>
        log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Executing scheduled task at {}"</span>, Instant.<span class="text-yellow-300">now</span>());

        <span class="text-green-300">// Task implementation</span>
        <span class="text-yellow-300">performTask</span>();
    }

    <span class="text-blue-400">private void</span> <span class="text-yellow-300">performTask</span>() {
        <span class="text-green-300">// Implementation of the actual task</span>
        <span class="text-blue-400">try</span> {
            <span class="text-green-300">// Simulate work</span>
            Thread.<span class="text-yellow-300">sleep</span>(5000);
            log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Task completed successfully"</span>);
        } <span class="text-blue-400">catch</span> (InterruptedException e) {
            Thread.<span class="text-yellow-300">currentThread</span>().<span class="text-yellow-300">interrupt</span>();
            log.<span class="text-yellow-300">error</span>(<span class="text-orange-300">"Task interrupted"</span>, e);
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-bold text-xl text-gray-800 dark:text-gray-200">Lock Parameters Explained</h3>
          <ul class="space-y-1 text-gray-700 dark:text-gray-400 list-disc list-inside mt-2">
            <li><strong>name</strong>: Unique identifier for the lock (mandatory)</li>
            <li><strong>lockAtMostFor</strong>: Maximum time the lock will be held, even if the task doesn't complete (safety measure)</li>
            <li><strong>lockAtLeastFor</strong>: Minimum time the lock will be held, preventing task execution on other nodes</li>
          </ul>
        </div>

        <div class="mt-4">
          <h3 class="font-bold text-xl text-gray-800 dark:text-gray-200">Advantages and Disadvantages</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold text-green-800 dark:text-green-200">Advantages</h4>
              <ul class="space-y-1 text-green-700 dark:text-green-300 list-disc list-inside">
                <li>Simple, declarative annotation-based approach</li>
                <li>Lightweight with minimal dependencies</li>
                <li>No need for manual lock handling</li>
                <li>Multiple storage backends (Redis, JDBC, MongoDB, etc.)</li>
                <li>Specialized for scheduled tasks</li>
                <li>Very easy to implement and configure</li>
              </ul>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 dark:text-red-200">Disadvantages</h4>
              <ul class="space-y-1 text-red-700 dark:text-red-300 list-disc list-inside">
                <li>Limited to scheduled tasks only</li>
                <li>Fails silently (skips execution rather than waiting)</li>
                <li>No built-in support for lock extension</li>
                <li>Less granular control over lock behavior</li>
                <li>Not suitable for interactive or real-time operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="redisson">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">3. Redisson</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Redisson is a powerful Redis client for Java that offers various distributed objects and services, including robust distributed lock implementations. It provides advanced features like automatic lock renewal, fair locks, read/write locks, and semaphores.
        </p>

        <div class="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-blue-800 dark:text-blue-200">Redisson's Pub/Sub Lock Mechanism</h3>
          <p class="text-blue-700 dark:text-blue-300 mt-2">
            One of Redisson's key advantages is its efficient implementation using Redis Pub/Sub messaging. Unlike naive polling approaches, when a lock is released, Redisson publishes a message to notify waiting clients immediately. This provides several benefits:
          </p>
          <ul class="space-y-1 text-blue-700 dark:text-blue-300 list-disc list-inside ml-4 mt-2">
            <li>Reduced latency for lock acquisition by waiting clients</li>
            <li>Lower CPU consumption compared to continuous polling</li>
            <li>Decreased Redis server load with fewer GET operations</li>
            <li>More efficient network utilization</li>
          </ul>
          <p class="text-blue-700 dark:text-blue-300 mt-2">
            This efficient notification system makes Redisson particularly well-suited for scenarios where locks may be held for variable durations or where quick handover of locks between processes is important.
          </p>
        </div>

        <div class="my-8">
          <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="800" height="280" fill="#f8f9fa" rx="10" ry="10"/>

            <!-- Title -->
            <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Redisson Lock Architecture</text>

            <!-- Lock Types -->
            <rect x="50" y="60" width="700" height="190" fill="#f1f8e9" stroke="#7cb342" stroke-width="2" stroke-dasharray="5,5" rx="8" ry="8"/>
            <text x="120" y="80" font-family="Arial" font-size="14" font-weight="bold">Redisson Distributed Locks</text>

            <!-- Redis Server -->
            <rect x="520" y="110" width="180" height="120" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8" ry="8"/>
            <text x="610" y="130" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Redis Server</text>

            <!-- Lock Data Inside Redis -->
            <rect x="540" y="150" width="140" height="30" fill="#ffecb3" stroke="#ffa000" stroke-width="1" rx="4" ry="4"/>
            <text x="610" y="170" font-family="Arial" font-size="12" text-anchor="middle">Lock Data</text>

            <rect x="540" y="190" width="140" height="30" fill="#ffecb3" stroke="#ffa000" stroke-width="1" rx="4" ry="4"/>
            <text x="610" y="210" font-family="Arial" font-size="12" text-anchor="middle">Watchdog Thread</text>

            <!-- Redisson Client -->
            <rect x="100" y="110" width="380" height="120" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8" ry="8"/>
            <text x="290" y="130" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Redisson Client</text>

            <!-- Lock Types -->
            <rect x="120" y="150" width="100" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="170" y="170" font-family="Arial" font-size="12" text-anchor="middle">RLock</text>

            <rect x="120" y="190" width="100" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="170" y="210" font-family="Arial" font-size="12" text-anchor="middle">RFairLock</text>

            <rect x="230" y="150" width="120" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="290" y="170" font-family="Arial" font-size="12" text-anchor="middle">RReadWriteLock</text>

            <rect x="230" y="190" width="120" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="290" y="210" font-family="Arial" font-size="12" text-anchor="middle">RMultiLock</text>

            <rect x="360" y="150" width="100" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="410" y="170" font-family="Arial" font-size="12" text-anchor="middle">RSemaphore</text>

            <rect x="360" y="190" width="100" height="30" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="4" ry="4"/>
            <text x="410" y="210" font-family="Arial" font-size="7" text-anchor="middle">RPermitExpirableSemaphore</text>

            <!-- Arrows -->
            <path d="M480,170 L520,170" stroke="#f57c00" stroke-width="2" />
            <polygon points="512,167 520,170 513,174" fill="#f57c00"/>
            <text x="500" y="160" font-family="Arial" font-size="7" text-anchor="middle">Lua Scripts</text>
          </svg>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Maven Dependencies</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-dependencies" class="language-xml text-white"><span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.redisson<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>redisson<span class="text-blue-400">&lt;/artifactId&gt;</span>
    <span class="text-blue-400">&lt;version&gt;</span>3.20.0<span class="text-blue-400">&lt;/version&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-green-300">&lt;!-- Or use the Spring Boot starter --&gt;</span>
<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.redisson<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>redisson-spring-boot-starter<span class="text-blue-400">&lt;/artifactId&gt;</span>
    <span class="text-blue-400">&lt;version&gt;</span>3.20.0<span class="text-blue-400">&lt;/version&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Configuration</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-config" class="language-java text-white"><span class="text-yellow-500">@Configuration</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">RedissonConfig</span> {

    <span class="text-yellow-500">@Bean</span>
    <span class="text-blue-400">public</span> RedissonClient <span class="text-yellow-300">redissonClient</span>() {
        Config config = <span class="text-blue-400">new</span> <span class="text-purple-300">Config</span>();

        <span class="text-green-300">// Single Redis server configuration</span>
        config.<span class="text-yellow-300">useSingleServer</span>()
              .<span class="text-yellow-300">setAddress</span>(<span class="text-orange-300">"redis://localhost:6379"</span>)
              .<span class="text-yellow-300">setConnectionPoolSize</span>(64)
              .<span class="text-yellow-300">setConnectionMinimumIdleSize</span>(10)
              .<span class="text-yellow-300">setConnectTimeout</span>(10000);

        <span class="text-green-300">// For Redis Cluster</span>
        <span class="text-green-300">// config.useClusterServers().addNodeAddress("redis://host1:6379", "redis://host2:6379");</span>

        <span class="text-blue-400">return</span> Redisson.<span class="text-yellow-300">create</span>(config);
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Basic Lock Usage</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-basic-usage" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">RedissonLockService</span> {

    <span class="text-blue-400">private final</span> RedissonClient redissonClient;
    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(RedissonLockService.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">RedissonLockService</span>(RedissonClient redissonClient) {
        <span class="text-blue-400">this</span>.redissonClient = redissonClient;
    }

    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeWithLock</span>(String lockName, Runnable task) {
        RLock lock = redissonClient.<span class="text-yellow-300">getLock</span>(lockName);

        <span class="text-blue-400">try</span> {
            <span class="text-green-300">// Try to acquire lock with 10s wait time and 30s lease time</span>
            <span class="text-blue-400">boolean</span> isLocked = lock.<span class="text-yellow-300">tryLock</span>(10, 30, TimeUnit.<span class="text-purple-300">SECONDS</span>);

            <span class="text-blue-400">if</span> (isLocked) {
                <span class="text-blue-400">try</span> {
                    log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Lock acquired, executing task {}"</span>, lockName);
                    task.<span class="text-yellow-300">run</span>();
                } <span class="text-blue-400">finally</span> {
                    lock.<span class="text-yellow-300">unlock</span>();
                    log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Lock released for {}"</span>, lockName);
                }
            } <span class="text-blue-400">else</span> {
                log.<span class="text-yellow-300">warn</span>(<span class="text-orange-300">"Failed to acquire lock for {}"</span>, lockName);
            }
        } <span class="text-blue-400">catch</span> (InterruptedException e) {
            Thread.<span class="text-yellow-300">currentThread</span>().<span class="text-yellow-300">interrupt</span>();
            log.<span class="text-yellow-300">error</span>(<span class="text-orange-300">"Lock acquisition interrupted for {}"</span>, lockName, e);
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Advanced Lock Types</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-advanced-usage" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">AdvancedLockService</span> {

    <span class="text-blue-400">private final</span> RedissonClient redissonClient;

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">AdvancedLockService</span>(RedissonClient redissonClient) {
        <span class="text-blue-400">this</span>.redissonClient = redissonClient;
    }

    <span class="text-green-300">// Fair lock - guarantees order of acquisition</span>
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeFairLock</span>(String lockName, Runnable task) {
        RLock fairLock = redissonClient.<span class="text-yellow-300">getFairLock</span>(lockName);
        <span class="text-yellow-300">executeWithLock</span>(fairLock, task);
    }

    <span class="text-green-300">// Read lock - allows multiple readers but exclusive writers</span>
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeReadLock</span>(String lockName, Runnable task) {
        RReadWriteLock rwLock = redissonClient.<span class="text-yellow-300">getReadWriteLock</span>(lockName);
        RLock readLock = rwLock.<span class="text-yellow-300">readLock</span>();
        <span class="text-yellow-300">executeWithLock</span>(readLock, task);
    }

    <span class="text-green-300">// Write lock - exclusive access</span>
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeWriteLock</span>(String lockName, Runnable task) {
        RReadWriteLock rwLock = redissonClient.<span class="text-yellow-300">getReadWriteLock</span>(lockName);
        RLock writeLock = rwLock.<span class="text-yellow-300">writeLock</span>();
        <span class="text-yellow-300">executeWithLock</span>(writeLock, task);
    }

    <span class="text-green-300">// Multi lock - acquires multiple locks atomically</span>
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeMultiLock</span>(List&lt;String&gt; lockNames, Runnable task) {
        RLock[] locks = lockNames.<span class="text-yellow-300">stream</span>()
            .<span class="text-yellow-300">map</span>(name -> redissonClient.<span class="text-yellow-300">getLock</span>(name))
            .<span class="text-yellow-300">toArray</span>(RLock[]::new);

        RLock multiLock = redissonClient.<span class="text-yellow-300">getMultiLock</span>(locks);
        <span class="text-yellow-300">executeWithLock</span>(multiLock, task);
    }

    <span class="text-blue-400">private void</span> <span class="text-yellow-300">executeWithLock</span>(RLock lock, Runnable task) {
        <span class="text-blue-400">try</span> {
            <span class="text-blue-400">boolean</span> isLocked = lock.<span class="text-yellow-300">tryLock</span>(10, 30, TimeUnit.<span class="text-purple-300">SECONDS</span>);
            <span class="text-blue-400">if</span> (isLocked) {
                <span class="text-blue-400">try</span> {
                    task.<span class="text-yellow-300">run</span>();
                } <span class="text-blue-400">finally</span> {
                    lock.<span class="text-yellow-300">unlock</span>();
                }
            }
        } <span class="text-blue-400">catch</span> (InterruptedException e) {
            Thread.<span class="text-yellow-300">currentThread</span>().<span class="text-yellow-300">interrupt</span>();
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Auto-Renewing Lock with Watchdog</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-watchdog" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">WatchdogLockService</span> {

    <span class="text-blue-400">private final</span> RedissonClient redissonClient;
    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(WatchdogLockService.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">WatchdogLockService</span>(RedissonClient redissonClient) {
        <span class="text-blue-400">this</span>.redissonClient = redissonClient;
    }

    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeLongRunningTask</span>(String lockName, Runnable task) {
        RLock lock = redissonClient.<span class="text-yellow-300">getLock</span>(lockName);

        <span class="text-blue-400">try</span> {
            <span class="text-green-300">// When no leaseTime is provided, the Watchdog automatically extends the lock</span>
            <span class="text-green-300">// Default watchdog timeout is 30 seconds</span>
            lock.<span class="text-yellow-300">lock</span>();

            log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Lock acquired with watchdog for {}"</span>, lockName);

            <span class="text-blue-400">try</span> {
                <span class="text-green-300">// Execute long-running task</span>
                <span class="text-green-300">// The lock will be automatically extended until explicitly unlocked</span>
                task.<span class="text-yellow-300">run</span>();
            } <span class="text-blue-400">finally</span> {
                lock.<span class="text-yellow-300">unlock</span>();
                log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Lock released for {}"</span>, lockName);
            }
        } <span class="text-blue-400">catch</span> (Exception e) {
            log.<span class="text-yellow-300">error</span>(<span class="text-orange-300">"Error in long-running task for {}"</span>, lockName, e);
            <span class="text-blue-400">throw</span> e;
        }
    }

    <span class="text-green-300">// You can also customize the watchdog timeout</span>
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">executeWithCustomWatchdog</span>(String lockName, Runnable task) {
        Config config = <span class="text-blue-400">new</span> <span class="text-purple-300">Config</span>();
        config.<span class="text-yellow-300">setLockWatchdogTimeout</span>(60000); <span class="text-green-300">// 1 minute</span>
        RedissonClient customClient = Redisson.<span class="text-yellow-300">create</span>(config);

        RLock lock = customClient.<span class="text-yellow-300">getLock</span>(lockName);
        <span class="text-blue-400">try</span> {
            lock.<span class="text-yellow-300">lock</span>();
            task.<span class="text-yellow-300">run</span>();
        } <span class="text-blue-400">finally</span> {
            lock.<span class="text-yellow-300">unlock</span>();
            customClient.<span class="text-yellow-300">shutdown</span>();
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Annotation-Based Locking</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redisson-annotation" class="language-java text-white"><span class="text-green-300">// Configuration</span>
<span class="text-yellow-500">@Configuration</span>
<span class="text-yellow-500">@EnableAspectJAutoProxy</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">RedissonLockAspectConfig</span> {

    <span class="text-yellow-500">@Bean</span>
    <span class="text-blue-400">public</span> LockAspect <span class="text-yellow-300">lockAspect</span>(RedissonClient redissonClient) {
        <span class="text-blue-400">return new</span> <span class="text-purple-300">LockAspect</span>(redissonClient);
    }
}

<span class="text-green-300">// Custom annotation</span>
<span class="text-yellow-500">@Target</span>(ElementType.<span class="text-purple-300">METHOD</span>)
<span class="text-yellow-500">@Retention</span>(RetentionPolicy.<span class="text-purple-300">RUNTIME</span>)
<span class="text-blue-400">public @interface</span> <span class="text-yellow-300">RedissonLocked</span> {
    String name();                   <span class="text-green-300">// Lock name</span>
    boolean fair() <span class="text-blue-400">default</span> <span class="text-blue-400">false</span>;    <span class="text-green-300">// Use fair lock</span>
    long waitTime() <span class="text-blue-400">default</span> 10L;    <span class="text-green-300">// Seconds to wait for lock</span>
    long leaseTime() <span class="text-blue-400">default</span> -1L;   <span class="text-green-300">// -1 for watchdog, otherwise seconds</span>
}

<span class="text-green-300">// Lock aspect</span>
<span class="text-yellow-500">@Aspect</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">LockAspect</span> {

    <span class="text-blue-400">private final</span> RedissonClient redissonClient;

    <span class="text-blue-400">public</span> <span class="text-yellow-300">LockAspect</span>(RedissonClient redissonClient) {
        <span class="text-blue-400">this</span>.redissonClient = redissonClient;
    }

    <span class="text-yellow-500">@Around</span>(<span class="text-orange-300">"@annotation(redissonLocked)"</span>)
    <span class="text-blue-400">public</span> Object <span class="text-yellow-300">aroundLock</span>(ProceedingJoinPoint joinPoint, RedissonLocked redissonLocked) <span class="text-blue-400">throws</span> Throwable {
        String lockName = redissonLocked.<span class="text-yellow-300">name</span>();
        RLock lock = redissonLocked.<span class="text-yellow-300">fair</span>() ?
                redissonClient.<span class="text-yellow-300">getFairLock</span>(lockName) :
                redissonClient.<span class="text-yellow-300">getLock</span>(lockName);

        <span class="text-blue-400">boolean</span> locked = <span class="text-blue-400">false</span>;
        <span class="text-blue-400">try</span> {
            <span class="text-blue-400">if</span> (redissonLocked.<span class="text-yellow-300">leaseTime</span>() == -1) {
                locked = lock.<span class="text-yellow-300">tryLock</span>(redissonLocked.<span class="text-yellow-300">waitTime</span>(), TimeUnit.<span class="text-purple-300">SECONDS</span>);
            } <span class="text-blue-400">else</span> {
                locked = lock.<span class="text-yellow-300">tryLock</span>(redissonLocked.<span class="text-yellow-300">waitTime</span>(),
                            redissonLocked.<span class="text-yellow-300">leaseTime</span>(), TimeUnit.<span class="text-purple-300">SECONDS</span>);
            }

            <span class="text-blue-400">if</span> (locked) {
                <span class="text-blue-400">return</span> joinPoint.<span class="text-yellow-300">proceed</span>();
            } <span class="text-blue-400">else</span> {
                <span class="text-blue-400">throw new</span> <span class="text-purple-300">RuntimeException</span>(<span class="text-orange-300">"Failed to acquire lock: "</span> + lockName);
            }
        } <span class="text-blue-400">finally</span> {
            <span class="text-blue-400">if</span> (locked) {
                lock.<span class="text-yellow-300">unlock</span>();
            }
        }
    }
}

<span class="text-green-300">// Usage example</span>
<span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">AnnotatedLockService</span> {

    <span class="text-yellow-500">@RedissonLocked</span>(name = <span class="text-orange-300">"critical-operation"</span>, fair = <span class="text-blue-400">true</span>, waitTime = 5, leaseTime = 30)
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">criticalOperation</span>() {
        <span class="text-green-300">// This method will be protected by a distributed lock</span>
        <span class="text-green-300">// with 5s wait time and 30s lease time</span>
    }

    <span class="text-yellow-500">@RedissonLocked</span>(name = <span class="text-orange-300">"long-running-task"</span>, leaseTime = -1)
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">longRunningTask</span>() {
        <span class="text-green-300">// This method will use watchdog for automatic lock renewal</span>
    }
}</code></pre>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-bold text-xl text-gray-800 dark:text-gray-200">Advantages and Disadvantages</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold text-green-800 dark:text-green-200">Advantages</h4>
              <ul class="space-y-1 text-green-700 dark:text-green-300 list-disc list-inside">
                <li>Advanced lock capabilities (fair locks, read/write locks, etc.)</li>
                <li>Automatic lock renewal through Watchdog mechanism</li>
                <li>Support for Redis Cluster</li>
                <li>Excellent performance and reliability</li>
                <li>Comprehensive API for distributed operations</li>
                <li>Low-level control over lock behavior</li>
                <li>Robust Lua script-based implementation</li>
              </ul>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 dark:text-red-200">Disadvantages</h4>
              <ul class="space-y-1 text-red-700 dark:text-red-300 list-disc list-inside">
                <li>Heavier dependency than simpler solutions</li>
                <li>Steeper learning curve</li>
                <li>No built-in annotation support (requires custom implementation)</li>
                <li>Configuration can be complex</li>
                <li>May be overkill for simple locking requirements</li>
                <li>More resource-intensive than other solutions</li>
                <li>Troubleshooting can be challenging due to complexity</li>
                <li>Additional Redis dependency if not already using Redis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6" id="bean-processor">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">4. Custom Bean Post Processor</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The fourth approach involves creating a custom annotation and a Bean Post Processor to apply distributed locks in a declarative way. This method offers a flexible, lightweight, and customizable solution that can be tailored to specific requirements.
        </p>

        <div class="my-8">
          <svg viewBox="0 0 800 280" xmlns="http://www.w3.org/2000/svg">
            <!-- Background -->
            <rect width="800" height="280" fill="#f8f9fa" rx="10" ry="10"/>

            <!-- Title -->
            <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Custom Bean Post Processor Architecture</text>

            <!-- Spring Context -->
            <rect x="50" y="60" width="700" height="190" fill="#f1f8e9" stroke="#7cb342" stroke-width="2" stroke-dasharray="5,5" rx="8" ry="8"/>
            <text x="120" y="80" font-family="Arial" font-size="14" font-weight="bold">Spring Application Context</text>

            <!-- Redis -->
            <rect x="550" y="100" width="150" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="5" ry="5"/>
            <text x="625" y="130" font-family="Arial" font-size="14" text-anchor="middle">Redis</text>
            <text x="625" y="150" font-family="Arial" font-size="12" text-anchor="middle">Lock Storage</text>

            <!-- Components -->
            <rect x="70" y="100" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" ry="5"/>
            <text x="145" y="130" font-family="Arial" font-size="14" text-anchor="middle">@DistributedLock</text>
            <text x="145" y="150" font-family="Arial" font-size="12" text-anchor="middle">Custom Annotation</text>

            <rect x="250" y="100" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="5" ry="5"/>
            <text x="325" y="130" font-family="Arial" font-size="13" text-anchor="middle">LockBeanPostProcessor</text>
            <text x="325" y="150" font-family="Arial" font-size="12" text-anchor="middle">Processes Beans</text>

            <rect x="430" y="100" width="90" height="60" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5" ry="5"/>
            <text x="475" y="130" font-family="Arial" font-size="14" text-anchor="middle">Proxy</text>
            <text x="475" y="150" font-family="Arial" font-size="12" text-anchor="middle">Generation</text>

            <!-- Service -->
            <rect x="200" y="190" width="200" height="40" fill="#e1f5fe" stroke="#0288d1" stroke-width="2" rx="5" ry="5"/>
            <text x="300" y="215" font-family="Arial" font-size="14" text-anchor="middle">Service with Locked Methods</text>

            <!-- Arrows -->
            <path d="M220,130 L250,130" stroke="#1976d2" stroke-width="2" />
            <polygon points="242,127 250,130 243,134" fill="#1976d2"/>

            <path d="M400,130 L430,130" stroke="#1976d2" stroke-width="2" />
            <polygon points="422,127 430,130 423,134" fill="#1976d2"/>

            <path d="M520,130 L550,130" stroke="#f57c00" stroke-width="2" />
            <polygon points="542,127 550,130 543,134" fill="#f57c00"/>

            <path d="M300,160 L300,190" stroke="#0288d1" stroke-width="2" />
            <polygon points="297,182 300,190 303,182" fill="#0288d1"/>
            <text x="345" y="175" font-family="Arial" font-size="10" text-anchor="middle">Enhanced Proxy</text>
          </svg>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-4">
          This approach involves creating a custom annotation to mark methods that need locking, then using Spring's Bean Post Processor mechanism to create proxies around these methods. These proxies handle the distributed lock acquisition and release before and after the method execution.
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Maven Dependencies</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="bean-processor-dependencies" class="language-xml text-white"><span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework.boot<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-boot-starter-data-redis<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-aop<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span>

<span class="text-green-300">&lt;!-- For CGLIB proxies --&gt;</span>
<span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-blue-400">&lt;groupId&gt;</span>org.springframework<span class="text-blue-400">&lt;/groupId&gt;</span>
    <span class="text-blue-400">&lt;artifactId&gt;</span>spring-context<span class="text-blue-400">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Step 1: Create Custom Annotation</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="custom-annotation" class="language-java text-white"><span class="text-yellow-500">@Target</span>({ElementType.<span class="text-purple-300">METHOD</span>})
<span class="text-yellow-500">@Retention</span>(RetentionPolicy.<span class="text-purple-300">RUNTIME</span>)
<span class="text-yellow-500">@Documented</span>
<span class="text-blue-400">public @interface</span> <span class="text-yellow-300">DistributedLock</span> {

    <span class="text-green-300">/**
     * Lock name. If empty, the method name will be used.
     * Can use SpEL expressions. For example, "#productId" will be resolved
     * to the method parameter named "productId"
     */</span>
    String name() <span class="text-blue-400">default</span> <span class="text-orange-300">""</span>;

    <span class="text-green-300">/**
     * Timeout in milliseconds for acquiring the lock.
     * If the lock cannot be acquired within this time, the method will throw exception.
     */</span>
    long timeout() <span class="text-blue-400">default</span> 5000;

    <span class="text-green-300">/**
     * Lock expiration time in milliseconds.
     * After this time, the lock will be automatically released.
     */</span>
    long expiration() <span class="text-blue-400">default</span> 30000;

    <span class="text-green-300">/**
     * Whether to retry acquiring the lock if failed.
     */</span>
    <span class="text-blue-400">boolean</span> retry() <span class="text-blue-400">default</span> <span class="text-blue-400">false</span>;

    <span class="text-green-300">/**
     * Action to take if lock acquisition fails.
     */</span>
    LockAction failureAction() <span class="text-blue-400">default</span> LockAction.<span class="text-purple-300">EXCEPTION</span>;

    <span class="text-green-300">/**
     * Actions that can be taken when lock acquisition fails
     */</span>
    <span class="text-blue-400">enum</span> <span class="text-yellow-300">LockAction</span> {
        <span class="text-green-300">/** Throw exception */</span>
        EXCEPTION,

        <span class="text-green-300">/** Skip method execution */</span>
        SKIP,

        <span class="text-green-300">/** Execute anyway (useful for non-critical operations) */</span>
        EXECUTE_ANYWAY
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Step 2: Create Redis Lock Service</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="redis-lock-service" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">RedisLockService</span> {

    <span class="text-blue-400">private final</span> StringRedisTemplate redisTemplate;
    <span class="text-blue-400">private static final</span> String LOCK_PREFIX = <span class="text-orange-300">"distributed:lock:"</span>;
    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(RedisLockService.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">RedisLockService</span>(StringRedisTemplate redisTemplate) {
        <span class="text-blue-400">this</span>.redisTemplate = redisTemplate;
    }

    <span class="text-blue-400">public boolean</span> <span class="text-yellow-300">acquireLock</span>(String lockName, String lockValue, long expirationMs) {
        String key = LOCK_PREFIX + lockName;
        Boolean result = redisTemplate.<span class="text-yellow-300">opsForValue</span>()
            .<span class="text-yellow-300">setIfAbsent</span>(key, lockValue, Duration.<span class="text-yellow-300">ofMillis</span>(expirationMs));

        <span class="text-blue-400">return</span> Boolean.<span class="text-purple-300">TRUE</span>.<span class="text-yellow-300">equals</span>(result);
    }

    <span class="text-blue-400">public boolean</span> <span class="text-yellow-300">releaseLock</span>(String lockName, String lockValue) {
        String key = LOCK_PREFIX + lockName;
        String script = <span class="text-orange-300">"if redis.call('get', KEYS[1]) == ARGV[1] then "</span> +
                       <span class="text-orange-300">"return redis.call('del', KEYS[1]) else return 0 end"</span>;

        <span class="text-green-300">// Execute the Lua script atomically</span>
        Long result = redisTemplate.<span class="text-yellow-300">execute</span>(
            <span class="text-blue-400">new</span> <span class="text-purple-300">DefaultRedisScript</span>&lt;>(script, Long.<span class="text-blue-400">class</span>),
            Collections.<span class="text-yellow-300">singletonList</span>(key),
            lockValue
        );

        <span class="text-blue-400">return</span> Long.<span class="text-yellow-300">valueOf</span>(1L).<span class="text-yellow-300">equals</span>(result);
    }

    <span class="text-blue-400">public boolean</span> <span class="text-yellow-300">tryAcquireLock</span>(String lockName, String lockValue, long timeoutMs, long expirationMs) {
        <span class="text-blue-400">long</span> deadline = System.<span class="text-yellow-300">currentTimeMillis</span>() + timeoutMs;
        <span class="text-blue-400">boolean</span> acquired = <span class="text-blue-400">false</span>;

        <span class="text-blue-400">while</span> (!acquired && System.<span class="text-yellow-300">currentTimeMillis</span>() &lt; deadline) {
            acquired = <span class="text-yellow-300">acquireLock</span>(lockName, lockValue, expirationMs);

            <span class="text-blue-400">if</span> (!acquired) {
                <span class="text-blue-400">try</span> {
                    Thread.<span class="text-yellow-300">sleep</span>(100); <span class="text-green-300">// Small delay before retry</span>
                } <span class="text-blue-400">catch</span> (InterruptedException e) {
                    Thread.<span class="text-yellow-300">currentThread</span>().<span class="text-yellow-300">interrupt</span>();
                    <span class="text-blue-400">return</span> <span class="text-blue-400">false</span>;
                }
            }
        }

        <span class="text-blue-400">return</span> acquired;
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Step 3: Create Expression Evaluator for Dynamic Lock Names</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="expression-evaluator" class="language-java text-white"><span class="text-yellow-500">@Component</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">ExpressionEvaluator</span> {

    <span class="text-blue-400">private final</span> ExpressionParser parser = <span class="text-blue-400">new</span> <span class="text-purple-300">SpelExpressionParser</span>();

    <span class="text-blue-400">public</span> String <span class="text-yellow-300">evaluate</span>(String expression, Method method, Object[] args) {
        <span class="text-blue-400">if</span> (!expression.<span class="text-yellow-300">contains</span>(<span class="text-orange-300">"#"</span>)) {
            <span class="text-blue-400">return</span> expression;
        }

        EvaluationContext context = <span class="text-blue-400">new</span> <span class="text-purple-300">StandardEvaluationContext</span>();
        Parameter[] parameters = method.<span class="text-yellow-300">getParameters</span>();

        <span class="text-blue-400">for</span> (<span class="text-blue-400">int</span> i = 0; i &lt; parameters.length; i++) {
            context.<span class="text-yellow-300">setVariable</span>(parameters[i].<span class="text-yellow-300">getName</span>(), args[i]);
        }

        <span class="text-blue-400">return</span> parser.<span class="text-yellow-300">parseExpression</span>(expression).<span class="text-yellow-300">getValue</span>(context, String.<span class="text-blue-400">class</span>);
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Step 4: Create Bean Post Processor</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="bean-post-processor" class="language-java text-white"><span class="text-yellow-500">@Component</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">DistributedLockBeanPostProcessor</span> <span class="text-blue-400">implements</span> BeanPostProcessor {

    <span class="text-blue-400">private final</span> RedisLockService lockService;
    <span class="text-blue-400">private final</span> ExpressionEvaluator expressionEvaluator;
    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(DistributedLockBeanPostProcessor.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">DistributedLockBeanPostProcessor</span>(RedisLockService lockService, ExpressionEvaluator expressionEvaluator) {
        <span class="text-blue-400">this</span>.lockService = lockService;
        <span class="text-blue-400">this</span>.expressionEvaluator = expressionEvaluator;
    }

    <span class="text-yellow-500">@Override</span>
    <span class="text-blue-400">public</span> Object <span class="text-yellow-300">postProcessAfterInitialization</span>(Object bean, String beanName) <span class="text-blue-400">throws</span> BeansException {
        Class<?> targetClass = AopUtils.<span class="text-yellow-300">getTargetClass</span>(bean);

        <span class="text-blue-400">if</span> (!<span class="text-yellow-300">hasDistributedLockMethods</span>(targetClass)) {
            <span class="text-blue-400">return</span> bean;
        }

        ProxyFactory proxyFactory = <span class="text-blue-400">new</span> <span class="text-purple-300">ProxyFactory</span>(bean);
        proxyFactory.<span class="text-yellow-300">addAdvice</span>(<span class="text-blue-400">new</span> <span class="text-purple-300">DistributedLockInterceptor</span>(lockService, expressionEvaluator));

        <span class="text-blue-400">return</span> proxyFactory.<span class="text-yellow-300">getProxy</span>();
    }

    <span class="text-blue-400">private boolean</span> <span class="text-yellow-300">hasDistributedLockMethods</span>(Class<?> clazz) {
        Method[] methods = ReflectionUtils.<span class="text-yellow-300">getAllDeclaredMethods</span>(clazz);
        <span class="text-blue-400">for</span> (Method method : methods) {
            <span class="text-blue-400">if</span> (method.<span class="text-yellow-300">isAnnotationPresent</span>(DistributedLock.<span class="text-blue-400">class</span>)) {
                <span class="text-blue-400">return</span> <span class="text-blue-400">true</span>;
            }
        }
        <span class="text-blue-400">return</span> <span class="text-blue-400">false</span>;
    }

    <span class="text-blue-400">private class</span> <span class="text-yellow-300">DistributedLockInterceptor</span> <span class="text-blue-400">implements</span> MethodInterceptor {

        <span class="text-blue-400">private final</span> RedisLockService lockService;
        <span class="text-blue-400">private final</span> ExpressionEvaluator expressionEvaluator;

        <span class="text-blue-400">public</span> <span class="text-yellow-300">DistributedLockInterceptor</span>(RedisLockService lockService, ExpressionEvaluator expressionEvaluator) {
            <span class="text-blue-400">this</span>.lockService = lockService;
            <span class="text-blue-400">this</span>.expressionEvaluator = expressionEvaluator;
        }

        <span class="text-yellow-500">@Override</span>
        <span class="text-blue-400">public</span> Object <span class="text-yellow-300">invoke</span>(MethodInvocation invocation) <span class="text-blue-400">throws</span> Throwable {
            Method method = invocation.<span class="text-yellow-300">getMethod</span>();

            <span class="text-blue-400">if</span> (!method.<span class="text-yellow-300">isAnnotationPresent</span>(DistributedLock.<span class="text-blue-400">class</span>)) {
                <span class="text-blue-400">return</span> invocation.<span class="text-yellow-300">proceed</span>();
            }

            DistributedLock annotation = method.<span class="text-yellow-300">getAnnotation</span>(DistributedLock.<span class="text-blue-400">class</span>);
            String lockName = <span class="text-yellow-300">getLockName</span>(annotation, method, invocation.<span class="text-yellow-300">getArguments</span>());
            String lockValue = UUID.<span class="text-yellow-300">randomUUID</span>().<span class="text-yellow-300">toString</span>();
            <span class="text-blue-400">boolean</span> lockAcquired = <span class="text-blue-400">false</span>;

            <span class="text-blue-400">try</span> {
                <span class="text-blue-400">if</span> (annotation.<span class="text-yellow-300">retry</span>()) {
                    lockAcquired = lockService.<span class="text-yellow-300">tryAcquireLock</span>(lockName, lockValue,
                                                      annotation.<span class="text-yellow-300">timeout</span>(), annotation.<span class="text-yellow-300">expiration</span>());
                } <span class="text-blue-400">else</span> {
                    lockAcquired = lockService.<span class="text-yellow-300">acquireLock</span>(lockName, lockValue, annotation.<span class="text-yellow-300">expiration</span>());
                }

                <span class="text-blue-400">if</span> (lockAcquired) {
                    <span class="text-blue-400">return</span> invocation.<span class="text-yellow-300">proceed</span>();
                } <span class="text-blue-400">else</span> {
                    <span class="text-blue-400">switch</span> (annotation.<span class="text-yellow-300">failureAction</span>()) {
                        <span class="text-blue-400">case</span> EXCEPTION:
                            <span class="text-blue-400">throw new</span> <span class="text-purple-300">DistributedLockAcquisitionException</span>(
                                <span class="text-orange-300">"Failed to acquire distributed lock: "</span> + lockName);
                        <span class="text-blue-400">case</span> SKIP:
                            log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Skipping method execution due to lock acquisition failure: {}"</span>, lockName);
                            <span class="text-blue-400">return</span> <span class="text-blue-400">null</span>;
                        <span class="text-blue-400">case</span> EXECUTE_ANYWAY:
                            log.<span class="text-yellow-300">warn</span>(<span class="text-orange-300">"Executing method despite lock acquisition failure: {}"</span>, lockName);
                            <span class="text-blue-400">return</span> invocation.<span class="text-yellow-300">proceed</span>();
                        <span class="text-blue-400">default</span>:
                            <span class="text-blue-400">throw new</span> <span class="text-purple-300">IllegalStateException</span>(<span class="text-orange-300">"Unknown failure action: "</span> + annotation.<span class="text-yellow-300">failureAction</span>());
                    }
                }
            } <span class="text-blue-400">finally</span> {
                <span class="text-blue-400">if</span> (lockAcquired) {
                    lockService.<span class="text-yellow-300">releaseLock</span>(lockName, lockValue);
                }
            }
        }

        <span class="text-blue-400">private</span> String <span class="text-yellow-300">getLockName</span>(DistributedLock annotation, Method method, Object[] args) {
            String lockName = annotation.<span class="text-yellow-300">name</span>();

            <span class="text-blue-400">if</span> (StringUtils.<span class="text-yellow-300">isEmpty</span>(lockName)) {
                <span class="text-blue-400">return</span> method.<span class="text-yellow-300">getDeclaringClass</span>().<span class="text-yellow-300">getSimpleName</span>() + <span class="text-orange-300">"."</span> + method.<span class="text-yellow-300">getName</span>();
            }

            <span class="text-blue-400">return</span> expressionEvaluator.<span class="text-yellow-300">evaluate</span>(lockName, method, args);
        }
    }

    <span class="text-blue-400">public static class</span> <span class="text-yellow-300">DistributedLockAcquisitionException</span> <span class="text-blue-400">extends</span> RuntimeException {
        <span class="text-blue-400">public</span> <span class="text-yellow-300">DistributedLockAcquisitionException</span>(String message) {
            <span class="text-blue-400">super</span>(message);
        }
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Step 5: Usage Example</h3>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded mt-2">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
      <pre><code id="usage-example" class="language-java text-white"><span class="text-yellow-500">@Service</span>
<span class="text-blue-400">public class</span> <span class="text-yellow-300">ProductService</span> {

    <span class="text-blue-400">private final</span> ProductRepository productRepository;
    <span class="text-blue-400">private static final</span> Logger log = LoggerFactory.<span class="text-yellow-300">getLogger</span>(ProductService.<span class="text-blue-400">class</span>);

    <span class="text-yellow-500">@Autowired</span>
    <span class="text-blue-400">public</span> <span class="text-yellow-300">ProductService</span>(ProductRepository productRepository) {
        <span class="text-blue-400">this</span>.productRepository = productRepository;
    }

    <span class="text-green-300">// Simple lock using method name</span>
    <span class="text-yellow-500">@DistributedLock</span>(timeout = 2000, expiration = 10000)
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">updateInventory</span>() {
        log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Updating inventory..."</span>);
        <span class="text-green-300">// Implementation</span>
    }

    <span class="text-green-300">// Lock with dynamic name based on method parameter</span>
    <span class="text-yellow-500">@DistributedLock</span>(name = <span class="text-orange-300">"product:#productId"</span>, retry = <span class="text-blue-400">true</span>)
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">updateProductStock</span>(String productId, int quantity) {
        log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Updating stock for product {} with quantity {}"</span>, productId, quantity);

        <span class="text-green-300">// Critical section - ensure only one thread updates stock for this product</span>
        Product product = productRepository.<span class="text-yellow-300">findById</span>(productId);
        product.<span class="text-yellow-300">setStockQuantity</span>(product.<span class="text-yellow-300">getStockQuantity</span>() + quantity);
        productRepository.<span class="text-yellow-300">save</span>(product);
    }

    <span class="text-green-300">// Lock with custom failure handling</span>
    <span class="text-yellow-500">@DistributedLock</span>(
        name = <span class="text-orange-300">"daily-report"</span>,
        failureAction = DistributedLock.LockAction.<span class="text-purple-300">SKIP</span>,
        expiration = 60000
    )
    <span class="text-blue-400">public void</span> <span class="text-yellow-300">generateDailyReport</span>() {
        log.<span class="text-yellow-300">info</span>(<span class="text-orange-300">"Generating daily report..."</span>);
        <span class="text-green-300">// Implementation</span>
    }
}</code></pre>
          </div>
        </div>

        <div class="mt-4">
          <h3 class="font-bold text-xl text-gray-800 dark:text-gray-200">Advantages and Disadvantages</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <h4 class="font-bold text-green-800 dark:text-green-200">Advantages</h4>
              <ul class="space-y-1 text-green-700 dark:text-green-300 list-disc list-inside">
                <li>Fully customizable to specific needs</li>
                <li>Declarative, annotation-based approach</li>
                <li>Support for dynamic lock names using SpEL</li>
                <li>Flexible failure handling strategies</li>
                <li>No additional library dependencies</li>
                <li>Lightweight with low overhead</li>
                <li>Can work with any Redis client</li>
              </ul>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <h4 class="font-bold text-red-800 dark:text-red-200">Disadvantages</h4>
              <ul class="space-y-1 text-red-700 dark:text-red-300 list-disc list-inside">
                <li>Requires custom implementation and maintenance</li>
                <li>No built-in support for advanced features (e.g., fair locks)</li>
                <li>Potential for errors in lock management</li>
                <li>Needs thorough testing for reliability</li>
                <li>Lacks community support of established libraries</li>
                <li>May require deeper understanding of Spring AOP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div class="mt-6" id="comparison">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Comparison of Approaches</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Now that we've explored the four main approaches to implementing distributed locks in Spring Boot, let's compare them across various dimensions to help you choose the right solution for your needs.
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4 overflow-x-auto">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200 mb-4">Feature Comparison</h3>
          <table class="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700">
            <thead>
            <tr>
              <th class="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">Feature</th>
              <th class="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">Spring Integration</th>
              <th class="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">ShedLock</th>
              <th class="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">Redisson</th>
              <th class="py-3 px-4 bg-gray-100 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b dark:border-gray-600">Custom BPP</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Complexity</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Medium</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Medium-High</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">High</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Setup Effort</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Medium</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">High</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Annotation Support</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">No</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Yes</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">No (Manual)</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">Yes</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Flexibility</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Medium</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">High</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">High</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Scope of Usage</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">General Purpose</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Scheduled Tasks Only</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">General Purpose</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">General Purpose</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Advanced Features</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Limited</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Limited</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Extensive</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">Customizable</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Lock Renewal</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">No</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">No</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Yes (Watchdog)</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">Needs Custom Implementation</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Storage Options</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Redis, Zookeeper, JDBC</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Redis, JDBC, MongoDB, etc.</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Redis</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">Depends on Implementation</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Dependencies</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Spring Integration</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">ShedLock</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Redisson</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">None (Standard Spring)</td>
            </tr>
            <tr>
              <td class="py-2 px-4 text-sm text-gray-800 dark:text-gray-200 border-r dark:border-gray-600 font-medium">Maintenance</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400 border-r dark:border-gray-600">Low</td>
              <td class="py-2 px-4 text-sm text-gray-600 dark:text-gray-400">High</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">When to Choose Each Approach</h3>

          <div class="mt-3">
            <h4 class="font-bold text-md text-gray-800 dark:text-gray-200">Choose Spring Integration when:</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 mt-1">
              <li>You're already using Spring Integration in your project</li>
              <li>You need a simple solution with standard Java Lock interface</li>
              <li>You prefer using well-established Spring components</li>
              <li>You don't mind manual lock handling in code</li>
            </ul>
          </div>

          <div class="mt-3">
            <h4 class="font-bold text-md text-gray-800 dark:text-gray-200">Choose ShedLock when:</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 mt-1">
              <li>You only need locks for scheduled tasks</li>
              <li>You prefer a simple, annotation-based approach</li>
              <li>You want minimal setup effort</li>
              <li>You need database-backed locks (JDBC, MongoDB, etc.)</li>
              <li>You prefer skipping execution over waiting for lock acquisition</li>
            </ul>
          </div>

          <div class="mt-3">
            <h4 class="font-bold text-md text-gray-800 dark:text-gray-200">Choose Redisson when:</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 mt-1">
              <li>You need advanced lock features (fair locks, read/write locks, etc.)</li>
              <li>You have long-running tasks requiring lock renewal</li>
              <li>You're already using Redis extensively</li>
              <li>You need high reliability and performance</li>
              <li>You value a mature, actively maintained library</li>
              <li>You need multiple lock types (MultiLock, ReadWriteLock, etc.)</li>
            </ul>
          </div>

          <div class="mt-3">
            <h4 class="font-bold text-md text-gray-800 dark:text-gray-200">Choose Custom Bean Post Processor when:</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 mt-1">
              <li>You have specific requirements not met by other solutions</li>
              <li>You prefer complete control over the implementation</li>
              <li>You want to minimize external dependencies</li>
              <li>You need custom lock behavior (dynamic naming, failure handling, etc.)</li>
              <li>You're comfortable with Spring AOP and Bean Post Processors</li>
              <li>You're willing to maintain the implementation yourself</li>
            </ul>
          </div>
        </div>

        <div class="mt-6" id="best-practices">
          <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Best Practices</h2>
          <p class="text-gray-700 dark:text-gray-400">
            Regardless of the distributed lock implementation you choose, following these best practices will help ensure a robust and reliable solution:
          </p>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">1. Lock Granularity</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Be specific with lock names to avoid unnecessary contention. Use fine-grained locks when possible, instead of coarse-grained locks.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Lock specific to a product</span>
<span class="text-yellow-500">@DistributedLock</span>(name = <span class="text-orange-300">"product:"</span> + <span class="text-orange-300">"#productId"</span>)
<span class="text-blue-400">public void</span> <span class="text-yellow-300">updateProductStock</span>(String productId, int quantity) {
    <span class="text-green-300">// Implementation</span>
}</code></pre>
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Too broad, causes unnecessary contention</span>
<span class="text-yellow-500">@DistributedLock</span>(name = <span class="text-orange-300">"inventory"</span>)
<span class="text-blue-400">public void</span> <span class="text-yellow-300">updateProductStock</span>(String productId, int quantity) {
    <span class="text-green-300">// Implementation</span>
}</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">2. Lock Timeouts</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Set appropriate timeouts for both lock acquisition and expiration. Balance between preventing deadlocks and giving enough time for operations to complete.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Reasonable timeouts based on operation duration</span>
<span class="text-blue-400">boolean</span> acquired = lock.<span class="text-yellow-300">tryLock</span>(5, TimeUnit.<span class="text-purple-300">SECONDS</span>); <span class="text-green-300">// Wait up to 5s</span>
<span class="text-blue-400">if</span> (acquired) {
    <span class="text-blue-400">try</span> {
        <span class="text-green-300">// Critical section</span>
    } <span class="text-blue-400">finally</span> {
        lock.<span class="text-yellow-300">unlock</span>();
    }
}</code></pre>
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Indefinite waiting can cause application hanging</span>
lock.<span class="text-yellow-300">lock</span>(); <span class="text-green-300">// Will wait forever - dangerous!</span>
<span class="text-blue-400">try</span> {
    <span class="text-green-300">// Critical section</span>
} <span class="text-blue-400">finally</span> {
    lock.<span class="text-yellow-300">unlock</span>();
}</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">3. Error Handling</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Always release locks in a finally block to prevent deadlocks. Handle lock acquisition failures gracefully.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-blue-400">boolean</span> acquired = <span class="text-blue-400">false</span>;
<span class="text-blue-400">try</span> {
    acquired = lock.<span class="text-yellow-300">tryLock</span>(5, TimeUnit.<span class="text-purple-300">SECONDS</span>);
    <span class="text-blue-400">if</span> (acquired) {
        <span class="text-green-300">// Critical section</span>
    } <span class="text-blue-400">else</span> {
        <span class="text-green-300">// Handle lock acquisition failure</span>
        log.<span class="text-yellow-300">warn</span>(<span class="text-orange-300">"Could not acquire lock"</span>);
    }
} <span class="text-blue-400">catch</span> (Exception e) {
    log.<span class="text-yellow-300">error</span>(<span class="text-orange-300">"Error while processing with lock"</span>, e);
} <span class="text-blue-400">finally</span> {
    <span class="text-blue-400">if</span> (acquired) {
        <span class="text-blue-400">try</span> {
            lock.<span class="text-yellow-300">unlock</span>();
        } <span class="text-blue-400">catch</span> (Exception e) {
            log.<span class="text-yellow-300">error</span>(<span class="text-orange-300">"Error releasing lock"</span>, e);
        }
    }
}</code></pre>
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// No error handling, can lead to zombie locks</span>
lock.<span class="text-yellow-300">lock</span>();
<span class="text-green-300">// Critical section that might throw exception</span>
processData(); <span class="text-green-300">// If this throws, lock is never released!</span>
lock.<span class="text-yellow-300">unlock</span>();</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">4. Lock Naming</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Use consistent naming conventions for locks. Consider prefixing locks with application or module name to avoid conflicts.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Clear, hierarchical naming convention</span>
String lockName = <span class="text-orange-300">"app:order:processing:"</span> + orderId;
RLock lock = redissonClient.<span class="text-yellow-300">getLock</span>(lockName);</code></pre>
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Generic names can cause conflicts</span>
String lockName = <span class="text-orange-300">"processing"</span>;
RLock lock = redissonClient.<span class="text-yellow-300">getLock</span>(lockName);</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">5. Redis Configuration</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              For production environments, consider using Redis Cluster for high availability or Redis Sentinel for failover protection. Properly configure connection pools and timeouts.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// High availability configuration</span>
Config config = <span class="text-blue-400">new</span> <span class="text-purple-300">Config</span>();
config.<span class="text-yellow-300">useClusterServers</span>()
      .<span class="text-yellow-300">setScanInterval</span>(2000)
      .<span class="text-yellow-300">addNodeAddress</span>(<span class="text-orange-300">"redis://node1:6379"</span>, <span class="text-orange-300">"redis://node2:6379"</span>)
      .<span class="text-yellow-300">setRetryAttempts</span>(3)
      .<span class="text-yellow-300">setRetryInterval</span>(1500);

RedissonClient redisson = Redisson.<span class="text-yellow-300">create</span>(config);</code></pre>
              </div>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// Single point of failure, no retry configuration</span>
Config config = <span class="text-blue-400">new</span> <span class="text-purple-300">Config</span>();
config.<span class="text-yellow-300">useSingleServer</span>()
      .<span class="text-yellow-300">setAddress</span>(<span class="text-orange-300">"redis://localhost:6379"</span>);

RedissonClient redisson = Redisson.<span class="text-yellow-300">create</span>(config);</code></pre>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">6. Testing</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Thoroughly test distributed locking logic, including edge cases like timeout, lock expiration, process crashes, etc.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <p class="text-green-700 dark:text-green-300">
                Use integration tests with embedded Redis and simulate various failure scenarios. Consider using tools like Toxiproxy to simulate network issues.
              </p>
            </div>
            <div class="bg-red-50 dark:bg-red-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-red-800 dark:text-red-200">❌ Bad Practice</h4>
              <p class="text-red-700 dark:text-red-300">
                Testing only the happy path, not considering failure cases, or relying solely on unit tests without integration tests.
              </p>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
            <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">7. Monitoring and Alerting</h3>
            <p class="text-gray-600 dark:text-gray-400 mt-2">
              Implement monitoring for lock acquisition times, failures, and zombie locks. Set up alerting for unusual lock behavior.
            </p>
            <div class="bg-green-50 dark:bg-green-900 p-3 rounded-lg mt-2">
              <h4 class="font-bold text-green-800 dark:text-green-200">✅ Good Practice</h4>
              <div class="relative bg-gray-900 p-3 overflow-x-auto rounded mt-2">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre><code class="language-java text-white"><span class="text-green-300">// With metrics tracking</span>
Timer.Sample sample = Timer.<span class="text-yellow-300">start</span>(registry);
<span class="text-blue-400">try</span> {
    <span class="text-blue-400">boolean</span> acquired = lock.<span class="text-yellow-300">tryLock</span>(5, TimeUnit.<span class="text-purple-300">SECONDS</span>);

    <span class="text-blue-400">if</span> (acquired) {
        <span class="text-green-300">// Critical section</span>
    } <span class="text-blue-400">else</span> {
        meterRegistry.<span class="text-yellow-300">counter</span>(<span class="text-orange-300">"lock.acquisition.failure"</span>,
                    <span class="text-orange-300">"lockName"</span>, lockName).<span class="text-yellow-300">increment</span>();
    }
} <span class="text-blue-400">finally</span> {
    sample.<span class="text-yellow-300">stop</span>(meterRegistry.<span class="text-yellow-300">timer</span>(<span class="text-orange-300">"lock.acquisition.time"</span>,
                                         <span class="text-orange-300">"lockName"</span>, lockName));
}</code></pre>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mt-6">
          <h3 class="font-bold text-lg text-blue-800 dark:text-blue-200">Conclusion</h3>
          <p class="text-blue-700 dark:text-blue-300 mt-2">
            Distributed locks are essential for coordinating operations in horizontally scaled applications. When choosing an implementation, consider your specific requirements, existing infrastructure, and the pros and cons of each approach. Remember that distributed locks add complexity to your system, so use them judiciously and follow best practices to ensure reliability.
          </p>
          <p class="text-blue-700 dark:text-blue-300 mt-2">
            For most applications, ShedLock offers the easiest solution for scheduled tasks, while Redisson provides the most comprehensive feature set for general-purpose locking needs. Spring Integration is a good middle ground if you're already using the framework, and a custom implementation gives you maximum flexibility at the cost of maintenance overhead.
          </p>
        </div>
      </div>


    </div>
  </div>
<br>
`
};
