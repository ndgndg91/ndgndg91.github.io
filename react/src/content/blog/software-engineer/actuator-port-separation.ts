import type { BlogPost } from '../../../types/blog';

export const actuatorPortSeparation: BlogPost = {
    id: 'actuator-port-separation-mvc-webflux',
    category: 'software-engineer',
    title: 'Spring Actuator Port Separation: MVC and WebFlux Have Different Levels of "Isolation"',
    description: 'Analyzing the difference in isolation levels between MVC (Tomcat) and WebFlux (Netty) when separating Actuator ports in Spring Cloud Gateway, and presenting the correct approach for WebFlux environments.',
    date: '2026-01-27',
    updatedDate: '2026-01-27',
    tags: ['Spring Boot', 'Spring Cloud Gateway', 'Actuator', 'WebFlux', 'Netty', 'Tomcat', 'Event Loop', 'BlockHound'],
    image: 'actuator-port-separation.webp',
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
          <span class="ml-2 text-gray-400">Actuator Port Separation</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Spring Actuator Port Separation: MVC and WebFlux Have Different Levels of "Isolation"
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: January 27, 2026</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#problem-context" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">The Problem</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#thread-model-comparison" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">MVC vs WebFlux: Thread Model Comparison</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#mvc-thread-isolation" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">MVC (Tomcat): Thread-Level Isolation</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#webflux-event-loop" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">WebFlux (Netty): Event Loop Sharing</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#kitchen-analogy" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Analogy: Same Kitchen, Different Entrances</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#webflux-port-separation-value" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">The Real Value of Port Separation in WebFlux</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#blocking-code-detection" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">The Right Approach: BlockHound</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#conclusion" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Conclusion and Recommendations</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="problem-context">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">The Problem</h2>
        <p class="text-gray-700 dark:text-gray-400">
          While operating Spring Cloud Gateway (SCG) in an EKS environment, I separated the Actuator port (<code>management.server.port</code>) for stability. I naturally assumed that <strong>"even if the main service crashes due to traffic overload, the health check would still be alive"</strong> - just like in the Spring MVC (Tomcat) days.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          But then a question arose:
        </p>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-4">
          <p class="text-gray-800 dark:text-gray-300 font-medium italic">
            "Netty is based on Event Loops - does just changing the port actually separate the threads?"
          </p>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Starting from this question, I dug into the thread model differences between MVC and WebFlux, and what port separation means in each environment.
        </p>
      </div>

      <div class="mt-6" id="thread-model-comparison">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">MVC vs WebFlux: Fundamental Thread Model Differences</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The bottom line is: <strong>"Spring Context and server instances are separated, but in WebFlux, threads (Event Loops) are shared."</strong>
        </p>
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Characteristic</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MVC (Tomcat)</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">WebFlux (Netty)</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Thread Model</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Thread-per-Request</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Event Loop</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">On Port Separation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Separate Tomcat Connector + Thread Pool</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Separate HttpServer + <strong>Same Event Loop</strong></td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Thread-Level Isolation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes (Possible)</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">No (Not Possible)</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Context/Instance Isolation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-6" id="mvc-thread-isolation">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">MVC (Tomcat): Thread-per-Request and Thread-Level Isolation</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring MVC uses Tomcat as its default embedded server and follows the <strong>Thread-per-Request</strong> model. Each request is assigned a thread from the thread pool for processing.
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Effect of Port Separation in MVC</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Separate Connector Created:</strong> Setting <code>management.server.port</code> creates a separate Tomcat Connector.</li>
            <li class="mobile-wrap"><strong>Separate Thread Pool Allocated:</strong> Each Connector gets an independent thread pool (Executor).</li>
            <li class="mobile-wrap"><strong>Real Isolation:</strong> Even if all 200 threads on the main port (8080) are exhausted, the management port (9090)'s thread pool remains available, so health checks respond normally.</li>
          </ul>
        </div>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">MVC Actuator Port Separation Configuration (<code>application.yml</code>)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code class="language-yaml text-white"><span class="text-[#569CD6]">server:</span>
  <span class="text-[#CE9178]">port:</span> <span class="text-[#B5CEA8]">8080</span>  <span class="text-[#6A9955]"># Main application port</span>

<span class="text-[#569CD6]">management:</span>
  <span class="text-[#CE9178]">server:</span>
    <span class="text-[#CE9178]">port:</span> <span class="text-[#B5CEA8]">9090</span>  <span class="text-[#6A9955]"># Actuator dedicated port</span>
  <span class="text-[#CE9178]">endpoints:</span>
    <span class="text-[#CE9178]">web:</span>
      <span class="text-[#CE9178]">exposure:</span>
        <span class="text-[#CE9178]">include:</span> <span class="text-[#CE9178]">health,info,metrics</span></code></pre>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          With this configuration, MVC environments achieve <strong>complete thread-level isolation</strong>. Main service load does not affect Actuator responses.
        </p>
      </div>

      <div class="mt-6" id="webflux-event-loop">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">WebFlux (Netty): Event Loop and Global Resource Sharing</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring WebFlux uses Netty as its default server and follows the <strong>Event Loop</strong> model. It handles many concurrent connections with a small number of threads (usually equal to CPU cores).
        </p>
        <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4 mt-4">
          <h3 class="font-bold text-lg text-red-800 dark:text-red-300">Key Point</h3>
          <p class="text-red-700 dark:text-red-400 mt-2">
            When you separate ports in WebFlux, a separate <code>HttpServer</code> object is created and a separate Child ApplicationContext is spawned. <strong>However</strong>, Netty shares the <strong>Global Event Loop (Worker Threads)</strong> through <code>ReactorResourceFactory</code> for resource efficiency.
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">How Port Separation Actually Works in WebFlux</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Separate HttpServer:</strong> A separate Netty HttpServer instance is created for each port.</li>
            <li class="mobile-wrap"><strong>Separate ApplicationContext:</strong> A Child Context is created for the management port.</li>
            <li class="mobile-wrap"><strong>Same Event Loop Shared:</strong> But the Worker Threads (Event Loops) that actually process requests are shared!</li>
          </ul>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          <strong>Result:</strong> If a blocking call accidentally occurs in the main logic and blocks the Event Loop, the Actuator (9090) using the same Event Loop also freezes.
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Event Loop Sharing Structure in WebFlux</h3>
          </div>
          <div class="bg-white dark:bg-gray-800 p-4 rounded flex justify-center">
            <img src="/images/netty-server-context.webp" alt="Netty Server Context - Event Loop Sharing" class="max-w-full h-auto rounded-lg shadow-lg" />
          </div>
          <p class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">⚠️ Both ports share the same Event Loop!</p>
        </div>
      </div>

      <div class="mt-6" id="kitchen-analogy">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Analogy: Same Kitchen, Different Entrances</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The WebFlux situation becomes clearer with a restaurant analogy.
        </p>
        <div class="grid md:grid-cols-2 gap-4 mt-4">
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <h3 class="font-bold text-lg text-green-800 dark:text-green-300 mb-2">MVC (Tomcat) - Complete Separation</h3>
            <pre class="text-sm text-green-700 dark:text-green-400 font-mono"><code>[Front Door (8080)] → [Kitchen A] ← Chef Team A
[Back Door (9090)] → [Kitchen B] ← Chef Team B</code></pre>
            <p class="text-green-700 dark:text-green-400 mt-2 text-sm">
              → Completely separate kitchens with independent chefs
            </p>
          </div>
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
            <h3 class="font-bold text-lg text-red-800 dark:text-red-300 mb-2">WebFlux (Netty) - Only Entrances Separated</h3>
            <pre class="text-sm text-red-700 dark:text-red-400 font-mono"><code>[Front Door (8080)] ─┬→ [Same Kitchen] ← Same Chefs
[Back Door (9090)] ─┘</code></pre>
            <p class="text-red-700 dark:text-red-400 mt-2 text-sm">
              → Different entrances, but same kitchen with same chefs
            </p>
          </div>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-4">
          <p class="text-gray-800 dark:text-gray-300">
            <strong>The Result:</strong> If there are too many customers at the front door and the chefs (Threads) are overwhelmed, the staff meal request (Health Check) coming through the back door also cannot be processed.
          </p>
        </div>
      </div>

      <div class="mt-6" id="webflux-port-separation-value">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">The Real Value of Port Separation in WebFlux</h2>
        <p class="text-gray-700 dark:text-gray-400">
          So is port separation meaningless in WebFlux? <strong>No. It's still essential.</strong> (Especially in EKS environments)
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Even without performance isolation, the benefits in <strong>'security' and 'operations'</strong> are clear.
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Real Benefits of Port Separation</h3>
          <ul class="space-y-3 text-gray-700 dark:text-gray-400 mt-2">
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <div>
                <strong>Security Breach Prevention:</strong>
                <p class="text-sm mt-1">Sensitive endpoints like <code>/actuator/env</code> and <code>/actuator/heapdump</code> can be blocked from external load balancer exposure at the network level (K8s Service).</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <div>
                <strong>Clear Probe Configuration:</strong>
                <p class="text-sm mt-1">K8s Liveness Probe targets 9090, actual traffic goes to 8080, cleanly separating traffic paths.</p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="text-green-500 mr-2">✓</span>
              <div>
                <strong>Simplified Firewall Rules:</strong>
                <p class="text-sm mt-1">NetworkPolicy configuration is easier when the Actuator port is only accessible within the cluster.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="overflow-x-auto mt-4">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Isolation Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">MVC</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">WebFlux</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Thread/Performance Isolation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">No</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Network/Security Isolation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">Context/Instance Isolation</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600 dark:text-green-400">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-6" id="blocking-code-detection">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">The Right Approach: Eliminating Blocking Code with BlockHound</h2>
        <p class="text-gray-700 dark:text-gray-400">
          To prevent Gateway freezes in WebFlux, instead of relying on port separation, <strong>the right approach is to eliminate blocking code in the main logic</strong>.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          <code>BlockHound</code> is a library created by the Project Reactor team that detects blocking code running on Event Loop threads at runtime.
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Adding BlockHound Dependency (<code>build.gradle.kts</code>)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code class="language-kotlin text-white"><span class="text-[#569CD6]">dependencies</span> {
    <span class="text-[#6A9955]">// Use only in test environment</span>
    <span class="text-[#DCDCAA]">testImplementation</span>(<span class="text-[#CE9178]">"io.projectreactor.tools:blockhound:1.0.9.RELEASE"</span>)
}</code></pre>
          </div>
        </div>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">BlockHound Configuration (Test Code)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code class="language-kotlin text-white"><span class="text-[#569CD6]">import</span> reactor.blockhound.BlockHound
<span class="text-[#569CD6]">import</span> org.junit.jupiter.api.BeforeAll

<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">GatewayBlockingDetectionTest</span> {

    <span class="text-[#569CD6]">companion object</span> {
        <span class="text-[#DCDCAA]">@JvmStatic</span>
        <span class="text-[#DCDCAA]">@BeforeAll</span>
        <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">setUp</span>() {
            BlockHound.<span class="text-[#DCDCAA]">install</span>()
        }
    }

    <span class="text-[#DCDCAA]">@Test</span>
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">\`should detect blocking call\`</span>() {
        <span class="text-[#6A9955]">// BlockingOperationError is thrown if blocking code exists</span>
        Mono.<span class="text-[#DCDCAA]">fromCallable</span> {
            Thread.<span class="text-[#DCDCAA]">sleep</span>(<span class="text-[#B5CEA8]">100</span>)  <span class="text-[#6A9955]">// This code gets detected!</span>
        }.<span class="text-[#DCDCAA]">subscribeOn</span>(Schedulers.<span class="text-[#DCDCAA]">parallel</span>())
         .<span class="text-[#DCDCAA]">block</span>()
    }
}</code></pre>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Common Blocking Patterns Detected by BlockHound</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><code>Thread.sleep()</code></li>
            <li class="mobile-wrap">JDBC driver calls (when using JDBC instead of R2DBC)</li>
            <li class="mobile-wrap">Synchronous I/O with <code>InputStream</code>/<code>OutputStream</code></li>
            <li class="mobile-wrap">Waiting in <code>synchronized</code> blocks</li>
            <li class="mobile-wrap">Lock waiting with <code>ReentrantLock</code>, etc.</li>
          </ul>
        </div>
        <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mt-4">
          <p class="text-gray-800 dark:text-gray-300">
            <strong>Note:</strong> BlockHound has performance overhead, so it should <strong>only be used in test/development environments, not production</strong>.
          </p>
        </div>
      </div>

      <div class="mt-6" id="conclusion">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion and Recommendations</h2>
        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4 mt-4">
          <h3 class="font-bold text-lg text-blue-800 dark:text-blue-300">Key Takeaway</h3>
          <p class="text-blue-700 dark:text-blue-400 mt-2">
            Port separation in WebFlux is for <strong>'security/management isolation', not 'performance isolation'</strong>.
          </p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Recommendations</h3>
          <ul class="space-y-3 text-gray-700 dark:text-gray-400 mt-2">
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">1</span>
              <div>
                <strong>When using MVC:</strong> Port separation provides real thread isolation. Use it with confidence.
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">2</span>
              <div>
                <strong>When using WebFlux:</strong> Use port separation only for security/management purposes. Don't expect thread isolation.
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">3</span>
              <div>
                <strong>The right approach for WebFlux:</strong> Detect and eliminate blocking code with BlockHound.
              </div>
            </li>
            <li class="flex items-start">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm">4</span>
              <div>
                <strong>Monitoring Strategy:</strong> Monitor Actuator endpoint response times separately for early detection of Event Loop blocking.
              </div>
            </li>
          </ul>
        </div>
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">One-Liner for Interviews/Tech Sharing</h3>
          <p class="text-gray-700 dark:text-gray-300 mt-2 font-mono text-sm">
            "Separating Actuator ports creates separate Netty Server Contexts, but Event Loop Resources are shared."
          </p>
        </div>
      </div>
    </div>
    <br>
  `
};
