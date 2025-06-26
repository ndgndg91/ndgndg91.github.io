import type { BlogPost } from '../../../types/blog';

export const gracefulShutdownSpringBootK8s: BlogPost = {
    id: 'graceful-shutdown-spring-boot-kubernetes',
    category: 'software-engineer',
    title: 'Graceful Shutdown of Spring Boot Applications in Kubernetes: SIGTERM, preStopHook, and Actuator',
    description: 'Learn how to gracefully shut down Spring Boot applications in a Kubernetes environment using SIGTERM, preStopHook, terminationGracePeriodSeconds, and Spring Boot Actuator.',
    date: '2025-06-26', // Updated to current date
    updatedDate: '2025-06-26', // Updated to current date
    tags: ['Kubernetes', 'Spring Boot', 'Graceful Shutdown', 'Microservices', 'SIGTERM', 'preStopHook', 'Actuator'],
    image: 'graceful-shutdown-spring-boot-k8s.webp', // Placeholder image, you might want to create one
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
          <span class="ml-2 text-gray-400">Graceful Shutdown</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Graceful Shutdown of Spring Boot Applications in Kubernetes: SIGTERM, preStopHook, and Actuator
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: June 26, 2025</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#why-graceful-shutdown" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Why is Graceful Shutdown Important?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#kubernetes-pod-lifecycle" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Understanding Kubernetes Pod Termination Lifecycle</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#spring-boot-graceful" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Graceful Shutdown in Spring Boot: server.shutdown=graceful</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#prestop-hook" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">When is preStopHook Useful? (Primarily for sleep)</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#actuator-shutdown" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Role and Security of Actuator Shutdown (/actuator/shutdown)</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#final-recommendations" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Final Recommendations and Best Practices</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="why-graceful-shutdown">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Why is Graceful Shutdown Important?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          In modern application development using microservices architecture and container environments, especially Kubernetes, "application termination" means more than just shutting down a process. Abrupt termination can lead to serious problems like data loss, service inconsistencies, and degraded user experience.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Imagine a user sending a payment request, and the server Pod processing that request suddenly terminates.
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Potential Issues of Abrupt Termination</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Data Loss/Inconsistency:</strong> Ongoing transactions can be interrupted, leading to incomplete data in the database or loss of critical information.</li>
            <li class="mobile-wrap"><strong>Resource Leaks:</strong> Open database connections and file handles might not be properly closed, resulting in resource leaks.</li>
            <li class="mobile-wrap"><strong>Degraded User Experience:</strong> In-progress requests might fail, displaying error messages to users or temporarily interrupting service.</li>
            <li class="mobile-wrap"><strong>Reduced System Stability:</strong> Unexpected terminations can trigger alerts in monitoring systems and consume unnecessary time for incident response.</li>
          </ul>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          To prevent these issues, applications must undergo a <strong>Graceful Shutdown</strong> process, essentially announcing: "I'm about to shut down, so I'll finish what I'm doing and clean up neatly!"
        </p>
      </div>

      <div class="mt-6" id="kubernetes-pod-lifecycle">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Understanding Kubernetes Pod Termination Lifecycle</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Kubernetes follows a defined sequence when terminating a Pod. Understanding this process is key to implementing Graceful Shutdown.
        </p>
        <ol class="max-w-none space-y-3 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-3">
          <li class="mobile-wrap"><strong>Pod Termination Request and Transition to Terminating State:</strong> Kubernetes decides a Pod needs to be terminated (e.g., due to <code>kubectl delete pod</code>, deployment updates, or scaling down). The Pod changes from <code>Running</code> to <code>Terminating</code> status.</li>
          <li class="mobile-wrap"><strong>Removal of Pod IP from Service Endpoints:</strong> Almost simultaneously with the Pod entering the <code>Terminating</code> state, the Kubernetes control plane begins removing the Pod's IP address from the endpoint list of all relevant Services. This is crucial! New traffic will now no longer be routed to this Pod.</li>
          <li class="mobile-wrap"><strong>preStopHook Execution (Optional):</strong> If a <code>preStopHook</code> is defined in the Pod specification, this hook executes before the SIGTERM signal is sent to the container.
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap"><code>preStopHook</code> can be an <code>exec</code> (executing a command inside the container) or <code>httpGet</code> (sending an HTTP request).</li>
              <li class="mobile-wrap"><strong>Key Point:</strong> Kubernetes waits for the <code>preStopHook</code> to complete before sending SIGTERM.</li>
              <li class="mobile-wrap">The <code>terminationGracePeriodSeconds</code> countdown begins at this point.</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong>SIGTERM Signal Sent:</strong> Immediately after the <code>preStopHook</code> successfully completes, or if no <code>preStopHook</code> is defined, as soon as the Pod enters the <code>Terminating</code> state and is removed from endpoints, Kubernetes sends a SIGTERM signal to the container's main process (PID 1).
            <ul class="list-disc list-inside ml-4 mt-1 text-gray-600 dark:text-gray-500">
              <li class="mobile-wrap">SIGTERM is a soft termination signal, asking the application to "wrap up what you're doing and shut down gracefully."</li>
            </ul>
          </li>
          <li class="mobile-wrap"><strong><code>terminationGracePeriodSeconds</code> Wait:</strong> From the moment SIGTERM is sent, Kubernetes waits for the duration specified by <code>terminationGracePeriodSeconds</code> for the application to shut down on its own. During this period, the application should complete ongoing requests, close database connections, release resources, etc.</li>
          <li class="mobile-wrap"><strong>SIGKILL Signal Sent (Last Resort):</strong> If the application does not terminate within the <code>terminationGracePeriodSeconds</code>, Kubernetes stops waiting and forcibly sends a SIGKILL signal. SIGKILL immediately terminates the process in any situation, risking data loss or resource leaks because the application cannot complete its shutdown tasks.</li>
        </ol>
      </div>

      <div class="mt-6" id="spring-boot-graceful">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Graceful Shutdown in Spring Boot: <code>server.shutdown=graceful</code></h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Boot has built-in functionality to gracefully shut down when it receives a SIGTERM signal. Since Spring Boot 2.3, you can activate this with a simple configuration.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Add the following to <code>application.yml</code> or <code>application.properties</code>:
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Spring Boot Graceful Shutdown Configuration (<code>application.yml</code>)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre><code id="springboot-graceful-config" class="language-yaml text-white"><span class="text-[#569CD6]">server:</span>
  <span class="text-[#CE9178]">shutdown:</span> <span class="text-[#B5CEA8]">graceful</span> <span class="text-[#6A9955"># Enable graceful shutdown</span>
<span class="text-[#569CD6]">spring:</span>
  <span class="text-[#CE9178]">lifecycle:</span>
    <span class="text-[#CE9178]">timeout-per-shutdown-phase:</span> <span class="text-[#B5CEA8">30s</span> <span class="text-[#6A9955"># Optional: Max wait time per shutdown phase</span></code></pre>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          With this setting, when a Spring Boot application receives SIGTERM:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="mobile-wrap">It immediately stops accepting new requests.</li>
          <li class="mobile-wrap">It waits for currently processing requests to complete.</li>
          <li class="mobile-wrap">Once all requests are processed, it performs cleanup tasks such as shutting down Tomcat (or other web servers) and closing the Spring context.</li>
        </ul>
      </div>

      <div class="mt-6" id="prestop-hook">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">When is preStopHook Useful? (Primarily for <code>sleep</code>)</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Even with the <code>server.shutdown=graceful</code> setting, Spring Boot applications will gracefully shut down upon receiving SIGTERM. However, using a <code>preStopHook</code> enhances the certainty of <strong>Traffic Draining</strong>.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          It's common to use a short <code>sleep</code> command in <code>preStopHook</code>.
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Kubernetes Pod <code>preStopHook</code> Example</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="prestop-sleep-example" class="language-yaml"><span class="text-[#569CD6]">apiVersion:</span> <span class="text-[#CE9178]">apps/v1</span>
<span class="text-[#569CD6]">kind:</span> <span class="text-[#CE9178]">Deployment</span>
<span class="text-[#6A9955"># ... other deployment configurations ...</span>
<span class="text-[#569CD6]">spec:</span>
  <span class="text-[#CE9178]">template:</span>
    <span class="text-[#CE9178]">spec:</span>
      <span class="text-[#CE9178]">containers:</span>
      <span class="text-[#CE9178]">-</span> <span class="text-[#CE9178]">name:</span> <span class="text-[#B5CEA8">my-app-container</span>
        <span class="text-[#CE9178]">image:</span> <span class="text-[#B5CEA8">your-docker-image:latest</span>
        <span class="text-[#CE9178]">lifecycle:</span>
          <span class="text-[#CE9178]">preStop:</span>
            <span class="text-[#CE9178]">exec:</span>
              <span class="text-[#CE9178]">command:</span> <span class="text-[#CE9178]">["/bin/sh", "-c", "sleep 10"]</span> <span class="text-[#6A9955"># Wait for 10 seconds</span>
        <span class="text-[#CE9178]">terminationGracePeriodSeconds:</span> <span class="text-[#B5CEA8">60</span> <span class="text-[#6A9955"># Sufficient time for app to shut down (e.g., 60 seconds)</span></code></pre>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Why use <code>sleep</code>?
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
        <strong>Mitigate Load Balancer/Service Mesh Synchronization Delays:</strong> Even when Kubernetes removes a Pod's IP from endpoints, it can take a few seconds for external load balancers or service meshes (like Istio, Nginx Ingress) to detect this change and actually stop routing traffic to the Pod.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The <code>sleep</code> in <code>preStopHook</code> explicitly ensures this "detection delay" time is compensated, providing enough time for all new traffic to be certainly blocked from reaching the Pod before SIGTERM arrives.
        </p>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          How long should the <code>sleep</code> be? It's important to keep it short, generally recommended between 5 to 15 seconds. Too long will unnecessarily increase deployment time and reduce the time available for SIGTERM processing, increasing the risk of SIGKILL.
        </p>
      </div>

      <div class="mt-6" id="actuator-shutdown">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Role and Security of Actuator Shutdown (<code>/actuator/shutdown</code>)</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring Boot Actuator's <code>/actuator/shutdown</code> endpoint explicitly commands the application to "shut down now." You can call this endpoint with <code>curl</code> or similar in a <code>preStopHook</code> to initiate shutdown.
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">Actuator Shutdown Call in <code>preStopHook</code> (Security Warning!)</h3>
          </div>
          <div class="relative bg-gray-900 p-4 overflow-x-auto rounded">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="actuator-shutdown-example" class="language-yaml"><span class="text-[#6A9955"># Example of calling Actuator shutdown in preStopHook (Security Warning!)</span>
<span class="text-[#569CD6]">lifecycle:</span>
  <span class="text-[#CE9178]">preStop:</span>
    <span class="text-[#CE9178]">exec:</span>
      <span class="text-[#CE9178]">command:</span> <span class="text-[#CE9178]">["/bin/sh", "-c", "curl -X POST -u \${ACTUATOR_USERNAME}:\${ACTUATOR_PASSWORD} http://localhost:8080/actuator/shutdown"]</span></code></pre>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          <strong>Important: Security is a Must!</strong>
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The <code>/actuator/shutdown</code> endpoint is highly sensitive and <strong>must never be exposed externally without proper security configurations!</strong> Use Spring Security to restrict access and securely pass authentication information (e.g., using Kubernetes Secrets) when calling it from <code>preStopHook</code>.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          When to use this method? This approach might be considered in specific scenarios where fine-grained control is difficult with only SIGTERM processing, or if the application needs to initiate shutdown upon receiving an explicit external signal. However, considering the complexity of security configuration and potential risks, the <code>server.shutdown=graceful</code> and SIGTERM handling approach is generally more recommended.
        </p>
      </div>

      <div class="mt-6" id="final-recommendations">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Final Recommendations and Best Practices</h2>
        <p class="text-gray-700 dark:text-gray-400">
          For graceful shutdown of Spring Boot applications in Kubernetes, the best practices are as follows:
        </p>
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Key Best Practices</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>Absolutely enable Spring Boot's <code>server.shutdown=graceful</code>.</strong> This is the core mechanism for your application to perform graceful shutdown tasks upon receiving SIGTERM.</li>
            <li class="mobile-wrap"><strong>Consider adding a short <code>sleep</code> to <code>preStopHook</code>.</strong> This provides an additional safety measure to ensure the Pod is completely detached from service endpoints and no new traffic comes in before SIGTERM is delivered (e.g., <code>sleep 5</code> to <code>sleep 15</code>).</li>
            <li class="mobile-wrap"><strong>Set <code>terminationGracePeriodSeconds</code> sufficiently long to match your application's shutdown time.</strong> Measure the time your application needs to receive SIGTERM and complete all cleanup tasks, then set an appropriate value (typically 30 seconds to 120 seconds). The <code>preStopHook</code> duration should also be accounted for within this period.</li>
            <li class="mobile-wrap"><strong>If using Actuator shutdown, always protect it thoroughly with Spring Security or similar.</strong> Use environment variables and Kubernetes Secrets to securely manage authentication information.</li>
          </ul>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          By adopting this approach, your Spring Boot applications in a Kubernetes environment will be more stable, predictable, and capable of shutting down gracefully without data loss. This ultimately leads to a more robust and reliable microservices architecture.
        </p>
      </div>
    </div>
    <br>
  `
};