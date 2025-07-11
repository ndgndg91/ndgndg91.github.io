import type { BlogPost } from '../../../types/blog';

export const k8sProbesSpringBoot: BlogPost = {
  id: 'k8s-probes-spring-boot',
  category: 'software-engineer',
  title: 'Spring Boot on EKS: Optimizing Health Probes for Efficient Deployments',
  description: 'When deploying Spring Boot applications on Amazon Elastic Kubernetes Service (EKS), managing application health is crucial for reliable service operations. Kubernetes provides three types of health probes—startup, liveness, and readiness—that work together to ensure your applications start correctly, remain responsive, and handle traffic appropriately.',
  date: '2025-05-08',
  updatedDate: '2025-05-08',
  tags: ['Java', 'JVM', 'Performance', 'JIT', 'Spring Boot', 'Code Cache'],
  image: 'k8s-probes-spring-boot.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li class="whitespace-nowrap mobile-wrap"><a href="/" class="hover:text-gray-700">Home</a></li>
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
          <span class="ml-2 text-gray-400">Spring Boot & EKS Probes</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Spring Boot on EKS: Optimizing Health Probes for Efficient Deployments
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: May 8, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#k8s-probes" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Understanding Kubernetes Probes</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#springboot-actuator" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Spring Boot Actuator Setup</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#probe-optimization" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Optimizing Probe Timing</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#common-issues" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Deployment Timing Issues & Solutions</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#example-deployment" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Optimized Deployment Example</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#monitoring" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Monitoring & Tuning Deployment Times</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="introduction">
        <p class="text-gray-700 dark:text-gray-400">
          When deploying Spring Boot applications on Amazon Elastic Kubernetes Service (EKS), managing application health is crucial for reliable service operations. Kubernetes provides three types of health probes—startup, liveness, and readiness—that work together to ensure your applications start correctly, remain responsive, and handle traffic appropriately.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          However, one significant challenge is <strong>probe timing configuration</strong>. If probe settings are too conservative, deployment times become unnecessarily long, while overly aggressive settings can result in errors when the application receives traffic before it's fully ready.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          This article focuses on configuring Spring Boot Actuator with basic probe settings and optimizing probe timing to match your application's actual startup time, minimizing deployment delays while maintaining service stability.
        </p>
      </div>

      <div class="mt-6" id="k8s-probes">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Understanding Kubernetes Probes</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Kubernetes uses three distinct probe types to determine the health and availability of your containers:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Probe Types</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>Startup Probe</strong>: Determines whether the application has started successfully. Disables liveness and readiness checks until it succeeds.</li>
            <li><strong>Liveness Probe</strong>: Verifies if the application is running. If it fails, the container is restarted.</li>
            <li><strong>Readiness Probe</strong>: Checks if the container is ready to receive traffic. If it fails, the pod is removed from service endpoints.</li>
          </ul>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Each probe can be configured with the following parameters:
        </p>

        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>initialDelaySeconds</strong>: Seconds after container starts before probe begins</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>periodSeconds</strong>: How often the probe runs (default: 10 seconds)</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>timeoutSeconds</strong>: Seconds after which probe times out (default: 1 second)</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>successThreshold</strong>: Minimum consecutive successes to consider probe successful (default: 1)</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>failureThreshold</strong>: Number of failures before giving up (default: 3)</li>
        </ul>
      </div>

      <!-- Kubernetes Probe Flow Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kubernetes Probe Flow</text>

          <!-- Pod -->
          <rect x="100" y="70" width="600" height="300" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="135" y="95" font-family="Arial" font-size="16" text-anchor="start" font-weight="bold">Pod</text>

          <!-- Container -->
          <rect x="150" y="110" width="500" height="240" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="2" rx="8" ry="8"/>
          <text x="185" y="135" font-family="Arial" font-size="14" text-anchor="start" font-weight="bold">Container</text>

          <!-- Application -->
          <rect x="200" y="155" width="400" height="175" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8" ry="8"/>
          <text x="235" y="180" font-family="Arial" font-size="14" text-anchor="start" font-weight="bold">Spring Boot Application</text>

          <!-- Startup Probe -->
          <rect x="220" y="195" width="360" height="30" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="4" ry="4"/>
          <text x="400" y="215" font-family="Arial" font-size="12" text-anchor="middle">1. Startup Probe: /actuator/health/startup</text>

          <!-- Liveness Probe -->
          <rect x="220" y="240" width="360" height="30" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="4" ry="4"/>
          <text x="400" y="260" font-family="Arial" font-size="12" text-anchor="middle">2. Liveness Probe: /actuator/health/liveness</text>

          <!-- Readiness Probe -->
          <rect x="220" y="285" width="360" height="30" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="4" ry="4"/>
          <text x="400" y="305" font-family="Arial" font-size="12" text-anchor="middle">3. Readiness Probe: /actuator/health/readiness</text>

          <!-- Service Traffic -->
          <path d="M20,200 L100,200" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="95,195 100,200 95,205" fill="#333"/>
          <text x="60" y="190" font-family="Arial" font-size="10" text-anchor="middle">Traffic</text>
        </svg>
      </div>

      <div class="mt-6" id="springboot-actuator">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Spring Boot Actuator Setup</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Boot's Actuator provides health endpoints that integrate perfectly with Kubernetes probes:
        </p>

        <!-- Maven 의존성 코드 블록 - 새 디자인 적용 -->
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">1. Adding Actuator Dependency (Maven)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="actuator-dependency-maven" class="language-xml text-white"><span class="text-blue-400">&lt;dependency&gt;</span>
    <span class="text-green-300">&lt;groupId&gt;</span>org.springframework.boot<span class="text-green-300">&lt;/groupId&gt;</span>
    <span class="text-green-300">&lt;artifactId&gt;</span>spring-boot-starter-actuator<span class="text-green-300">&lt;/artifactId&gt;</span>
<span class="text-blue-400">&lt;/dependency&gt;</span></code></pre>
          </div>
        </div>

        <!-- Gradle 의존성 코드 블록 - 새 디자인 적용 -->
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Gradle Configuration</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="actuator-dependency-gradle" class="language-kotlin text-white"><span class="text-green-500">implementation</span>(<span class="text-orange-300">"org.springframework.boot:spring-boot-starter-actuator"</span>)</code></pre>
          </div>
        </div>

        <!-- YAML 구성 코드 블록 - 새 디자인 적용 -->
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">2. Configuring Health Endpoints</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="health-endpoints-config" class="language-yaml text-white"><span class="text-yellow-300">management</span>:
  <span class="text-yellow-300">endpoint</span>:
    <span class="text-yellow-300">health</span>:
      <span class="text-yellow-300">probes</span>:
        <span class="text-blue-400">enabled</span>: <span class="text-purple-300">true</span>
      <span class="text-blue-400">show-details</span>: <span class="text-purple-300">always</span>
      <span class="text-yellow-300">group</span>:
        <span class="text-yellow-300">readiness</span>:
          <span class="text-blue-400">include</span>: <span class="text-orange-300">readinessState, db, redis, diskSpace</span>
        <span class="text-yellow-300">liveness</span>:
          <span class="text-blue-400">include</span>: <span class="text-orange-300">livenessState</span>
        <span class="text-yellow-300">startup</span>:
          <span class="text-blue-400">include</span>: <span class="text-orange-300">startupState</span>
  <span class="text-yellow-300">endpoints</span>:
    <span class="text-yellow-300">web</span>:
      <span class="text-yellow-300">exposure</span>:
        <span class="text-blue-400">include</span>: <span class="text-orange-300">health</span></code></pre>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-3">With this configuration, Spring Boot provides the following endpoints:</p>
        <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
          <li><code>/actuator/health/readiness</code>: Checks if the application and dependent services are ready to handle traffic</li>
          <li><code>/actuator/health/liveness</code>: Verifies the application is responsive</li>
          <li><code>/actuator/health/startup</code>: Confirms application initialization is complete</li>
        </ul>
      </div>

      <div class="mt-6" id="probe-optimization">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Optimizing Probe Timing for Actual Startup Time</h2>
        <p class="text-gray-700 dark:text-gray-400">
          When your application has an actual startup time of around 20 seconds, it's important to optimize probe settings accordingly. Overly conservative settings unnecessarily extend deployment time, while too aggressive settings may cause errors.
        </p>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Measuring Actual Startup Time</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="startup-log" class="language-text text-white">Started Application in 19.329 seconds (JVM running for 20.412)</code></pre>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-2">
          This information serves as the baseline for your probe timing configuration.
        </p>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Startup Probe Configuration for ~20s Startup Time</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="startup-probe-config" class="language-yaml text-white"><span class="text-yellow-300">startupProbe</span>:
  <span class="text-yellow-300">httpGet</span>:
    <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/startup</span>
    <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
  <span class="text-blue-400">initialDelaySeconds</span>: <span class="text-purple-300">5</span>    <span class="text-green-500"># Start checking 5 seconds after container starts</span>
  <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">5</span>          <span class="text-green-500"># Check every 5 seconds</span>
  <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">6</span>       <span class="text-green-500"># Allow up to 6 failures (total 30 seconds)</span>
  <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">1</span>         <span class="text-green-500"># 1 second timeout for each check</span></code></pre>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-2">
          This configuration allows up to 35 seconds for startup (5s initial delay + 5s × 6 failures), providing a reasonable buffer over the typical 20-second startup time to accommodate occasional slower starts.
        </p>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Optimizing Liveness & Readiness Probes</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="liveness-readiness-config" class="language-yaml text-white"><span class="text-yellow-300">livenessProbe</span>:
  <span class="text-yellow-300">httpGet</span>:
    <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/liveness</span>
    <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
  <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">20</span>         <span class="text-green-500"># Check every 20 seconds</span>
  <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">3</span>       <span class="text-green-500"># Restart after 3 consecutive failures</span>
  <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">3</span>         <span class="text-green-500"># 3 second timeout</span>

<span class="text-yellow-300">readinessProbe</span>:
  <span class="text-yellow-300">httpGet</span>:
    <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/readiness</span>
    <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
  <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">10</span>         <span class="text-green-500"># Check every 10 seconds</span>
  <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">3</span>       <span class="text-green-500"># Remove from service after 3 failures</span>
  <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">3</span>         <span class="text-green-500"># 3 second timeout</span></code></pre>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Note the absence of <code>initialDelaySeconds</code>. Since these probes only activate after the Startup Probe succeeds, additional delays are unnecessary.
        </p>
      </div>

      <div class="mt-6" id="common-issues">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Deployment Timing Issues & Solutions</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Several common issues can affect your deployment timing when using health probes:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Issue 1: Overly Conservative Probe Settings</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Problem</strong>: When an application starts in 20 seconds but probe timeout is set to 5 minutes, deployment times are unnecessarily extended.
          </p>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Solution</strong>: Set timeouts based on actual startup time plus a reasonable buffer (e.g., 50%). For a 20-second startup time, around 30 seconds is appropriate.
          </p>
        </div>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Optimized Startup Probe Settings</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="optimized-probe-settings" class="language-yaml text-white"><span class="text-yellow-300">startupProbe</span>:
  <span class="text-green-500"># 20s startup time + 10s buffer = 30s total allowance</span>
  <span class="text-blue-400">initialDelaySeconds</span>: <span class="text-purple-300">5</span>
  <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">5</span>
  <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">5</span>  <span class="text-green-500"># 5 × 5s = 25s (plus 5s initial delay for 30s total)</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Issue 2: Startup Time Variations Under Load</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Problem</strong>: Application startup time may vary with system load or resource constraints.
          </p>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Solution</strong>:
          </p>
          <ol class="space-y-1 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-1">
            <li>Test startup times under conditions similar to production</li>
            <li>Monitor and collect statistics on application startup times</li>
            <li>Set probe timeouts based on 95th percentile startup time</li>
          </ol>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Issue 3: Dependency Initialization Delays</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Problem</strong>: External dependencies like databases and caches can affect application startup time.
          </p>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            <strong>Solution</strong>:
          </p>
          <ol class="space-y-1 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-1">
            <li>Check external dependency states in Readiness Probes</li>
            <li>Parallelize application startup and dependency initialization where possible</li>
            <li>Use asynchronous initialization patterns to reduce startup time</li>
          </ol>
        </div>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Hikari Connection Pool Configuration</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="hikari-config" class="language-yaml text-white"><span class="text-green-500"># application.yml</span>
<span class="text-yellow-300">spring</span>:
  <span class="text-yellow-300">datasource</span>:
    <span class="text-yellow-300">hikari</span>:
      <span class="text-blue-400">initialization-fail-timeout</span>: <span class="text-purple-300">0</span>  <span class="text-green-500"># Fail fast on connection failures to reduce startup time</span></code></pre>
          </div>
        </div>
      </div>

      <div class="mt-6" id="example-deployment">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Optimized Deployment Example</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Here's a complete Kubernetes deployment manifest optimized for a Spring Boot application with approximately 20 seconds startup time:
        </p>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">deployment.yaml</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="k8s-deployment" class="language-yaml text-white"><span class="text-blue-400">apiVersion</span>: <span class="text-orange-300">apps/v1</span>
<span class="text-blue-400">kind</span>: <span class="text-orange-300">Deployment</span>
<span class="text-blue-400">metadata</span>:
  <span class="text-blue-400">name</span>: <span class="text-orange-300">spring-boot-service</span>
  <span class="text-blue-400">namespace</span>: <span class="text-orange-300">production</span>
<span class="text-blue-400">spec</span>:
  <span class="text-blue-400">replicas</span>: <span class="text-purple-300">3</span>
  <span class="text-blue-400">selector</span>:
    <span class="text-blue-400">matchLabels</span>:
      <span class="text-blue-400">app</span>: <span class="text-orange-300">spring-boot-service</span>
  <span class="text-blue-400">strategy</span>:
    <span class="text-blue-400">type</span>: <span class="text-orange-300">RollingUpdate</span>
    <span class="text-blue-400">rollingUpdate</span>:
      <span class="text-blue-400">maxSurge</span>: <span class="text-purple-300">1</span>
      <span class="text-blue-400">maxUnavailable</span>: <span class="text-purple-300">0</span>  <span class="text-green-500"># Set to 0 for zero-downtime deployments</span>
  <span class="text-blue-400">template</span>:
    <span class="text-blue-400">metadata</span>:
      <span class="text-blue-400">labels</span>:
        <span class="text-blue-400">app</span>: <span class="text-orange-300">spring-boot-service</span>
    <span class="text-blue-400">spec</span>:
      <span class="text-blue-400">containers</span>:
      - <span class="text-blue-400">name</span>: <span class="text-orange-300">spring-boot-service</span>
        <span class="text-blue-400">image</span>: <span class="text-orange-300">\${ECR_REPO}/spring-boot-service:\${IMAGE_TAG}</span>
        <span class="text-blue-400">ports</span>:
        - <span class="text-blue-400">containerPort</span>: <span class="text-purple-300">8080</span>
        <span class="text-blue-400">resources</span>:
          <span class="text-blue-400">requests</span>:
            <span class="text-blue-400">cpu</span>: <span class="text-orange-300">"500m"</span>
            <span class="text-blue-400">memory</span>: <span class="text-orange-300">"512Mi"</span>
          <span class="text-blue-400">limits</span>:
            <span class="text-blue-400">cpu</span>: <span class="text-orange-300">"1000m"</span>
            <span class="text-blue-400">memory</span>: <span class="text-orange-300">"1Gi"</span>
        <span class="text-blue-400">env</span>:
        - <span class="text-blue-400">name</span>: <span class="text-orange-300">SPRING_PROFILES_ACTIVE</span>
          <span class="text-blue-400">value</span>: <span class="text-orange-300">"production"</span>
        <span class="text-green-500"># Startup Probe - optimized for ~20s startup time</span>
        <span class="text-blue-400">startupProbe</span>:
          <span class="text-blue-400">httpGet</span>:
            <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/startup</span>
            <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
          <span class="text-blue-400">initialDelaySeconds</span>: <span class="text-purple-300">5</span>    <span class="text-green-500"># Wait 5s after container starts</span>
          <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">5</span>          <span class="text-green-500"># Check every 5s</span>
          <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">6</span>       <span class="text-green-500"># Allow up to 6 failures (total 30s)</span>
          <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">1</span>

        <span class="text-green-500"># Liveness Probe - checks application responsiveness</span>
        <span class="text-blue-400">livenessProbe</span>:
          <span class="text-blue-400">httpGet</span>:
            <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/liveness</span>
            <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
          <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">20</span>
          <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">3</span>
          <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">3</span>

        <span class="text-green-500"># Readiness Probe - checks traffic readiness</span>
        <span class="text-blue-400">readinessProbe</span>:
          <span class="text-blue-400">httpGet</span>:
            <span class="text-blue-400">path</span>: <span class="text-orange-300">/actuator/health/readiness</span>
            <span class="text-blue-400">port</span>: <span class="text-purple-300">8080</span>
          <span class="text-blue-400">periodSeconds</span>: <span class="text-purple-300">10</span>
          <span class="text-blue-400">failureThreshold</span>: <span class="text-purple-300">3</span>
          <span class="text-blue-400">timeoutSeconds</span>: <span class="text-purple-300">3</span>

        <span class="text-green-500"># Graceful shutdown handling</span>
        <span class="text-blue-400">lifecycle</span>:
          <span class="text-blue-400">preStop</span>:
            <span class="text-blue-400">exec</span>:
              <span class="text-blue-400">command</span>: [<span class="text-orange-300">"/bin/sh"</span>, <span class="text-orange-300">"-c"</span>, <span class="text-orange-300">"sleep 5"</span>]  <span class="text-green-500"># Time for request draining</span>

      <span class="text-blue-400">terminationGracePeriodSeconds</span>: <span class="text-purple-300">30</span>
<span class="text-green-500">---</span>
<span class="text-blue-400">apiVersion</span>: <span class="text-orange-300">v1</span>
<span class="text-blue-400">kind</span>: <span class="text-orange-300">Service</span>
<span class="text-blue-400">metadata</span>:
  <span class="text-blue-400">name</span>: <span class="text-orange-300">spring-boot-service</span>
  <span class="text-blue-400">namespace</span>: <span class="text-orange-300">production</span>
<span class="text-blue-400">spec</span>:
  <span class="text-blue-400">selector</span>:
    <span class="text-blue-400">app</span>: <span class="text-orange-300">spring-boot-service</span>
  <span class="text-blue-400">ports</span>:
  - <span class="text-blue-400">port</span>: <span class="text-purple-300">80</span>
    <span class="text-blue-400">targetPort</span>: <span class="text-purple-300">8080</span>
  <span class="text-blue-400">type</span>: <span class="text-orange-300">ClusterIP</span></code></pre>
          </div>
        </div>
      </div>

      <div class="mt-6" id="monitoring">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Monitoring & Tuning Deployment Times</h2>
        <p class="text-gray-700 dark:text-gray-400">
          After optimizing probe settings, it's important to monitor and continuously tune deployment times:
        </p>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">1. Measuring Deployment Time</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="deployment-time-script" class="language-bash text-white"><span class="text-green-500"># Start deployment</span>
<span class="text-yellow-300">DEPLOY_START</span>=$(date +%s)
kubectl apply -f deployment.yaml

<span class="text-green-500"># Wait for deployment completion</span>
kubectl rollout status deployment/spring-boot-service -n production

<span class="text-green-500"># Deployment complete</span>
<span class="text-yellow-300">DEPLOY_END</span>=$(date +%s)
echo <span class="text-orange-300">"Deployment took $((DEPLOY_END-DEPLOY_START)) seconds"</span></code></pre>
          </div>
        </div>

        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">2. Monitoring Probe Failures</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="monitor-failures" class="language-bash text-white"><span class="text-green-500"># Check for container restarts and probe failures</span>
kubectl get events -n production | grep -E <span class="text-orange-300">'Unhealthy|Pulled|Started'</span></code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">3. Incrementally Adjusting Probe Settings</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-1">
            Gradually adjust probe settings based on your measurements. Finding the right balance between deployment speed and stability is key.
          </p>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li>If deployments are consistently successful and fast, you might reduce timeouts slightly</li>
            <li>If occasional failures occur, increase timeouts incrementally</li>
            <li>Document the correlation between startup times and probe settings for future reference</li>
          </ul>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Optimizing probe timing for Spring Boot applications on EKS is crucial for balancing deployment speed and service stability. By accurately measuring your application's actual startup time (around 20 seconds in our example) and configuring probes accordingly, you can minimize unnecessary deployment delays while maintaining reliable service operations.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The basic Spring Boot Actuator health endpoints integrate seamlessly with Kubernetes probes, and with proper timing settings, you can build an efficient deployment pipeline.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Key takeaways:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Configure probe settings based on actual startup time plus a small buffer</li>
          <li class="whitespace-nowrap mobile-wrap">Use Startup Probes to protect application initialization</li>
          <li class="whitespace-nowrap mobile-wrap">Continuously monitor and optimize deployment times and probe settings</li>
          <li class="whitespace-nowrap mobile-wrap">Find the right balance between speed and stability for your specific application</li>
        </ul>
      </div>
    </div>
  </div>

`
};