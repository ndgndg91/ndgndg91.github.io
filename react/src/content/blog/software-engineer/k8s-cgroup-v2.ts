import type { BlogPost } from '../../../types/blog';

export const k8sCgroupV2: BlogPost = {
    id: 'k8s-cgroup-v2-jvm-memory',
    category: 'software-engineer',
    title: 'Understanding Kubernetes cgroup v2 & Deep Dive into JVM Pod Memory Issues',
    description: 'Explore the shift from cgroup v1 to v2 in Kubernetes and dive deep into how this architectural change triggers severe Out-Of-Memory (OOM) issues in JVM-based applications, along with practical solutions.',
    date: '2026-05-01',
    updatedDate: '2026-05-01',
    tags: ['Kubernetes', 'Linux', 'cgroup v2', 'JVM', 'Spring Boot', 'OOM', 'Memory Management'],
    image: 'cgroup.webp',
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
          <span class="ml-2 text-gray-400">cgroup v2 & JVM OOM</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Understanding Kubernetes cgroup v2 & Deep Dive into JVM Pod Memory Issues
      </h1>
      <div class="text-sm text-gray-500 mt-2">Published: May 1, 2026</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-cgroup" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is cgroup?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#v1-vs-v2" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">cgroup v1 vs v2: The Paradigm Shift</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#k8s-adoption" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Why Kubernetes Moved to cgroup v2</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#jvm-memory-crisis" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">The JVM Memory Crisis in cgroup v2</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#solutions" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Solutions and Best Practices</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-cgroup">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is cgroup?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          <strong>cgroups</strong> (control groups) is a Linux kernel feature that limits, accounts for, and isolates the resource usage (CPU, memory, disk I/O, network) of a collection of processes. Without cgroups, containerization technologies like Docker and Kubernetes would not exist. When you define <code>resources.limits.memory</code> in a Kubernetes Pod spec, the kubelet ultimately translates this request into cgroup configurations on the host operating system.
        </p>
      </div>

      <div class="mt-6" id="v1-vs-v2">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">cgroup v1 vs v2: The Paradigm Shift</h2>
        <p class="text-gray-700 dark:text-gray-400">
          For years, cgroup v1 served as the backbone of container orchestration. However, its architecture was notoriously fragmented. In v1, different resources (CPU, Memory, Block I/O) had their own independent hierarchies. A process could belong to one group for CPU and a completely different group for Memory, making holistic resource management incredibly complex and prone to inconsistencies.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          <strong>cgroup v2</strong> solves this by introducing a <strong>Unified Hierarchy</strong>.
        </p>

        <!-- SVG Graphic: cgroup v1 vs v2 -->
        <div class="my-8 flex justify-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
          <svg viewBox="0 0 800 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <!-- cgroup v1 -->
            <g transform="translate(50, 50)">
              <rect x="0" y="0" width="300" height="300" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
              <text x="150" y="30" font-family="sans-serif" font-size="18" font-weight="bold" fill="#334155" text-anchor="middle">cgroup v1 (Fragmented)</text>
              
              <!-- CPU Hierarchy -->
              <rect x="20" y="60" width="120" height="100" rx="5" fill="#e0f2fe" stroke="#7dd3fc" stroke-width="2"/>
              <text x="80" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#0369a1" text-anchor="middle">CPU Controller</text>
              <circle cx="50" cy="130" r="15" fill="#38bdf8"/>
              <text x="50" y="135" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">P1</text>
              <circle cx="110" cy="130" r="15" fill="#38bdf8"/>
              <text x="110" y="135" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">P2</text>

              <!-- Memory Hierarchy -->
              <rect x="160" y="60" width="120" height="100" rx="5" fill="#fce7f3" stroke="#f9a8d4" stroke-width="2"/>
              <text x="220" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#be185d" text-anchor="middle">Mem Controller</text>
              <circle cx="190" cy="130" r="15" fill="#f472b6"/>
              <text x="190" y="135" font-family="sans-serif" font-size="12" fill="white" text-anchor="middle">P1</text>

              <!-- Disconnected paths -->
              <path d="M80 160 C80 200, 220 200, 220 160" stroke="#ef4444" stroke-width="2" fill="none" stroke-dasharray="5,5"/>
              <text x="150" y="210" font-family="sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">Difficult to track cross-resource usage</text>
            </g>

            <!-- Arrow -->
            <path d="M 380 200 L 420 200 L 410 190 M 420 200 L 410 210" stroke="#94a3b8" stroke-width="3" fill="none"/>

            <!-- cgroup v2 -->
            <g transform="translate(450, 50)">
              <rect x="0" y="0" width="300" height="300" rx="10" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>
              <text x="150" y="30" font-family="sans-serif" font-size="18" font-weight="bold" fill="#334155" text-anchor="middle">cgroup v2 (Unified)</text>
              
              <!-- Unified Hierarchy -->
              <rect x="50" y="60" width="200" height="200" rx="5" fill="#dcfce7" stroke="#86efac" stroke-width="2"/>
              <text x="150" y="90" font-family="sans-serif" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">Unified Controller</text>
              
              <g transform="translate(80, 130)">
                <rect x="0" y="0" width="140" height="100" rx="5" fill="#ffffff" stroke="#22c55e" stroke-width="1"/>
                <text x="70" y="20" font-family="sans-serif" font-size="12" font-weight="bold" fill="#166534" text-anchor="middle">Process 1</text>
                <text x="70" y="45" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">- CPU Limit Applied</text>
                <text x="70" y="65" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">- Memory Limit Applied</text>
                <text x="70" y="85" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">- IO Limit Applied</text>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div class="mt-6" id="k8s-adoption">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Why Kubernetes Moved to cgroup v2</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Kubernetes officially announced GA (General Availability) for cgroup v2 in version 1.25. The shift wasn't just a version bump; it unlocked significant architectural benefits:
        </p>
        <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
          <li class="mobile-wrap"><strong>Memory QoS (Quality of Service):</strong> cgroup v1 only supported hard memory limits (kill the process if it goes over). cgroup v2 introduces <code>memory.high</code> and <code>memory.low</code>, allowing soft throttling and protection before invoking the lethal OOM killer.</li>
          <li class="mobile-wrap"><strong>Safe OOM Handling:</strong> Improved kernel awareness means the OS can more intelligently reclaim memory from page caches before ruthlessly killing application containers.</li>
          <li class="mobile-wrap"><strong>eBPF Integration:</strong> Advanced networking and observability tools based on eBPF (like Cilium) heavily rely on the unified structure of cgroup v2 to track packets down to the exact container process.</li>
        </ul>
      </div>

      <div class="mt-8" id="jvm-memory-crisis">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white text-red-600 dark:text-red-400">The JVM Memory Crisis in cgroup v2</h2>
        <p class="text-gray-700 dark:text-gray-400">
          While cgroup v2 is fantastic for the Linux ecosystem, it created a massive headache for Java engineers migrating their Spring Boot applications.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Historically, the JVM used a feature called <code>UseContainerSupport</code> (enabled by default since Java 10, and backported to 8u191). This flag tells the JVM: <em>"Hey, you are running inside a container. Don't look at the physical host's memory to set your Heap size. Instead, look at the cgroup limits."</em>
        </p>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4 mb-6">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">The Path Discrepancy</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            The problem lies in <strong>how</strong> the JVM finds that limit.
          </p>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li class="mobile-wrap"><strong>cgroup v1 path:</strong> <code>/sys/fs/cgroup/memory/memory.limit_in_bytes</code></li>
            <li class="mobile-wrap"><strong>cgroup v2 path:</strong> <code>/sys/fs/cgroup/memory.max</code></li>
          </ul>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Older versions of the JVM (like initial releases of Java 11) were hardcoded to read the v1 path. When a Pod with an older JVM is scheduled on a Kubernetes node running cgroup v2 (like Ubuntu 22.04 or Amazon Linux 2023), it cannot find <code>memory.limit_in_bytes</code>.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3 font-semibold text-red-600 dark:text-red-400">
          What happens when the JVM can't find the container limit? It falls back to reading the underlying Host Node's physical RAM.
        </p>

        <!-- SVG Graphic: JVM Memory Issue -->
        <div class="my-8 flex justify-center bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-inner">
          <svg viewBox="0 0 800 450" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="hostRam" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#cbd5e1" />
                <stop offset="100%" stop-color="#94a3b8" />
              </linearGradient>
            </defs>

            <!-- Background Node -->
            <rect x="50" y="50" width="700" height="350" rx="10" fill="url(#hostRam)" stroke="#64748b" stroke-width="2"/>
            <text x="400" y="80" font-family="sans-serif" font-size="20" font-weight="bold" fill="#0f172a" text-anchor="middle">Kubernetes Worker Node (64GB RAM)</text>
            <text x="400" y="105" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">OS running cgroup v2</text>

            <!-- Pod Constraint Box -->
            <rect x="100" y="130" width="600" height="240" rx="5" fill="#f8fafc" stroke="#3b82f6" stroke-width="3" stroke-dasharray="10,5"/>
            <text x="400" y="155" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1d4ed8" text-anchor="middle">Pod Definition: resources.limits.memory = 2GB</text>

            <!-- JVM Container -->
            <rect x="150" y="180" width="500" height="170" rx="5" fill="#ffffff" stroke="#ef4444" stroke-width="3"/>
            <text x="400" y="210" font-family="sans-serif" font-size="16" font-weight="bold" fill="#b91c1c" text-anchor="middle">Old JVM Container (e.g., Java 11.0.8)</text>

            <!-- Search paths -->
            <g transform="translate(170, 240)">
              <text x="0" y="0" font-family="sans-serif" font-size="13" fill="#334155">1. Looks for: /sys/fs/cgroup/memory/memory.limit_in_bytes</text>
              <text x="390" y="0" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ef4444">❌ Not Found (v2 used)</text>
              
              <text x="0" y="30" font-family="sans-serif" font-size="13" fill="#334155">2. Old JVM doesn't know about /sys/fs/cgroup/memory.max</text>

              <text x="0" y="60" font-family="sans-serif" font-size="13" font-weight="bold" fill="#d97706">3. Fallback: Reads Host RAM (64GB)</text>
              <text x="0" y="85" font-family="sans-serif" font-size="15" font-weight="bold" fill="#b91c1c">4. Sets Max Heap Size = 16GB (25% of 64GB Host RAM)</text>
            </g>

            <!-- Explosion Graphic -->
            <path d="M 580 320 L 600 280 L 620 310 L 650 270 L 660 320 L 700 310 L 670 350 Z" fill="#fef08a" stroke="#eab308" stroke-width="2"/>
            <text x="640" y="315" font-family="sans-serif" font-size="14" font-weight="bold" fill="#b91c1c" text-anchor="middle">OOMKilled!</text>

            <!-- Explanation text -->
            <text x="400" y="420" font-family="sans-serif" font-size="14" fill="#334155" text-anchor="middle">Result: JVM attempts to use 16GB. Pod limit is 2GB. Kubelet instantly OOMKills the Pod.</text>
          </svg>
        </div>

        <p class="text-gray-700 dark:text-gray-400 mt-3">
          If your node has 64GB of RAM, the default JVM behavior (MaxRAMPercentage=25%) will set the Heap to 16GB. However, the Kubernetes Pod is rigidly constrained to 2GB by cgroup v2. As soon as the application receives traffic and the JVM attempts to allocate memory beyond 2GB, the Linux kernel's OOM killer instantly terminates the container (OOMKilled status 137).
        </p>
      </div>

      <div class="mt-6" id="solutions">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Solutions and Best Practices</h2>
        <p class="text-gray-700 dark:text-gray-400">
          If you are moving to a modern Kubernetes environment, you must ensure your JVM is cgroup v2 aware.
        </p>
        
        <ol class="max-w-none space-y-4 text-gray-700 list-decimal list-inside dark:text-gray-400 mt-4">
          <li class="mobile-wrap">
            <strong>Upgrade your JVM Version (The Best Solution)</strong>
            <br/>
            cgroup v2 support was officially introduced in <strong>Java 15</strong> (via <a href="https://bugs.openjdk.org/browse/JDK-8230305" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">JDK-8230305</a>).
            Fortunately, it was backported to LTS versions. You must be running at least:
            <ul class="list-disc list-inside ml-6 mt-2 text-gray-600 dark:text-gray-500">
              <li>Java 8u372 or higher</li>
              <li>Java 11.0.16 or higher</li>
              <li>Java 17+ (Supported natively)</li>
            </ul>
          </li>
          <li class="mobile-wrap">
            <strong>Explicitly Set -Xmx (The Mitigation)</strong>
            <br/>
            If you absolutely cannot upgrade your JDK version immediately, you must hardcode the maximum heap size in your Docker entrypoint or JVM arguments to prevent it from reading the host memory:
            <br/>
            <code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mt-2 inline-block text-sm">-Xmx1500m</code> (e.g., leaving 500MB for non-heap native memory in a 2GB Pod).
          </li>
          <li class="mobile-wrap">
            <strong>Check your Node environment</strong>
            <br/>
            You can verify if your Kubernetes node is running cgroup v2 by running this command inside a pod or on the node:
            <div class="bg-gray-900 p-4 rounded-lg mt-2 overflow-x-auto text-sm text-gray-100">
              <pre><code># Check the filesystem type of the cgroup mount
stat -fc %T /sys/fs/cgroup/</code></pre>
            </div>
            If the output is <code>cgroup2fs</code>, you are running v2. If it is <code>tmpfs</code>, you are likely still on v1.
          </li>
        </ol>
        
        <p class="text-gray-700 dark:text-gray-400 mt-8 font-medium">
          As Cloud Providers like AWS EKS, GCP GKE, and Azure AKS default their latest node AMIs to OS versions that exclusively use cgroup v2 (like Amazon Linux 2023), understanding this interaction is no longer optional for Java engineers. Ensure your base Docker images rely on up-to-date JVM patches to prevent catastrophic production outages.
        </p>
      </div>
    </div>
    <br>
    `
};
