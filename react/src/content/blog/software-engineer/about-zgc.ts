import type { BlogPost } from '../../../types/blog';

export const aboutZgc: BlogPost = {
  id: 'about-zgc',
  title: 'About ZGC',
  description: 'ZGC performs high-cost operations concurrently without stopping application threads for more than 10ms. The pause time is independent of heap size, working effectively with heaps ranging from a few hundred megabytes to 16 terabytes.',
  category: 'software-engineer',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['JVM', 'Garbage Collection', 'Performance'],
  image: 'zgc.webp',
  content: `
    <div class="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div class="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
        <nav class="mb-4" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-2 text-sm text-gray-500">
            <li><a href="/" class="hover:text-gray-700">Home</a></li>
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
              <span class="ml-2 text-gray-400">About ZGC</span>
            </li>
          </ol>
        </nav>
        <header class="mb-8">
          <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
            data-section="true">
            JVM Performance
          </p>
          <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
            About ZGC
          </h1>
          <div class="text-sm text-gray-500 mt-2">Updated: March 31, 2025</div>
        </header>

        <h2 id="latest-updates" class="text-2xl font-bold mb-4 text-indigo-700">Latest Updates in JDK 24</h2>
        <div class="mb-4">
          JDK 24 was officially released in March 2024, bringing several improvements to ZGC. These enhancements continue to refine ZGC's performance characteristics and operational efficiency.
        </div>

        <h3 class="font-bold text-lg mb-2">Generational ZGC Improvements</h3>
        <div class="mb-4">
          The generational implementation of ZGC, first introduced in JDK 21, has been significantly stabilized in JDK 24. Key improvements include:
        </div>

        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2">
            <strong>Optimized Inter-Generational Reference Processing</strong> - The algorithms for handling references between generations have been refined, improving efficiency when objects in the old generation reference objects in the young generation.
          </li>
          <li class="mb-2">
            <strong>Enhanced Remembered Set Management</strong> - Improved handling of the remembered set (the data structure tracking old-to-young references) reduces overhead and improves scalability in large applications.
          </li>
          <li class="mb-2">
            <strong>More Adaptive Generation Sizing</strong> - The proportions of heap allocated to young and old generations are now more dynamically adjusted based on application behavior patterns.
          </li>
        </ul>

        <h3 class="font-bold text-lg mb-2">Memory Management Enhancements</h3>
        <div class="mb-4">
          JDK 24 introduces several improvements to ZGC's memory management capabilities:
        </div>

        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2">
            <strong>Improved Memory Return Mechanism</strong> - The process of returning unused memory to the operating system has been optimized to be less intrusive to application performance, particularly valuable in container environments where resource efficiency is critical.
          </li>
          <li class="mb-2">
            <strong>Large Heap Optimization</strong> - For very large heaps (8TB+), memory mapping efficiency has been improved, enabling better performance in memory-intensive enterprise applications.
          </li>
          <li class="mb-2">
            <strong>Reduced Memory Fragmentation</strong> - Enhanced compaction algorithms minimize fragmentation more effectively, improving memory utilization in long-running applications.
          </li>
        </ul>

        <h3 class="font-bold text-lg mb-2">Diagnostic Improvements</h3>
        <div class="mb-4">
          JDK 24 enhances ZGC's observability and diagnostic capabilities:
        </div>

        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2">
            <strong>Enhanced GC Logging</strong> - More detailed and structured logging helps identify potential issues and optimization opportunities. New log categories provide insight into specific ZGC operations.
          </li>
          <li class="mb-2">
            <strong>Extended JFR Events</strong> - Java Flight Recorder now includes additional ZGC-specific events, allowing for more granular performance analysis of garbage collection activities.
          </li>
          <li class="mb-2">
            <strong>Improved JMX Metrics</strong> - New management metrics have been added for monitoring ZGC's operation through JMX, aiding in real-time monitoring solutions.
          </li>
        </ul>

        <h3 class="font-bold text-lg mb-2">Configuration and Tuning</h3>
        <div class="mb-4">
          JDK 24 continues the trend of making ZGC more self-tuning:
        </div>

        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2">
            <strong>Further Reduced Need for Manual Thread Sizing</strong> - The automatic thread management has been improved, making <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:ConcGCThreads</code> even less necessary in most deployments.
          </li>
          <li class="mb-2">
            <strong>More Efficient Default Behavior</strong> - Out-of-the-box performance is improved, with better default settings for most common workloads.
          </li>
        </ul>

        <h3 class="font-bold text-lg mb-2">Future Direction</h3>
        <div class="mb-4">
          Looking ahead to JDK 25 and beyond, the ZGC development team is focusing on several areas:
        </div>

        <ul class="list-disc pl-6 mb-6">
          <li class="mb-2">
            <strong>Further Parallel Processing Optimization</strong> - Enhancing the scalability of ZGC on many-core systems, allowing efficient utilization of increasingly parallel hardware.
          </li>
          <li class="mb-2">
            <strong>Refined Generational Strategies</strong> - More sophisticated object aging and promotion policies to better distinguish between short-lived and long-lived objects.
          </li>
          <li class="mb-2">
            <strong>Tighter Container Integration</strong> - Improved awareness and adaptation to containerized environments, particularly in cloud-native deployments.
          </li>
        </ul>

        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 class="font-medium text-blue-800 dark:text-blue-300 mb-2">JDK 24 Upgrade Recommendation</h3>
          <p class="text-blue-700 dark:text-blue-400">
            If you're using ZGC in production environments, upgrading to JDK 24 is recommended, especially for applications that benefit from generational garbage collection. The stability and performance improvements provide meaningful benefits with minimal migration effort.
          </p>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 700">
          <!-- Background -->
          <rect width="900" height="700" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Z Garbage Collector (ZGC) Architecture</text>

          <!-- Main ZGC Container -->
          <rect x="50" y="70" width="800" height="600" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="10" ry="10"/>

          <!-- Memory Layout (Left Side) -->
          <g>
            <text x="200" y="100" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ZGC Memory Layout</text>

            <!-- Heap container -->
            <rect x="80" y="120" width="250" height="300" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>
            <text x="205" y="140" font-family="Arial" font-size="14" text-anchor="middle">Z Heap</text>

            <!-- ZPages -->
            <rect x="90" y="150" width="230" height="40" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="205" y="175" font-family="Arial" font-size="12" text-anchor="middle">ZPage (2MB / 4MB Medium)</text>

            <rect x="90" y="195" width="230" height="30" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="205" y="215" font-family="Arial" font-size="12" text-anchor="middle">ZPage (2MB Medium)</text>

            <rect x="90" y="230" width="110" height="30" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="145" y="250" font-family="Arial" font-size="12" text-anchor="middle">ZPage (Small)</text>

            <rect x="205" y="230" width="115" height="30" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="262" y="250" font-family="Arial" font-size="12" text-anchor="middle">ZPage (Small)</text>

            <rect x="90" y="265" width="230" height="60" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="205" y="295" font-family="Arial" font-size="12" text-anchor="middle">ZPage (32MB Large)</text>

            <rect x="90" y="330" width="230" height="80" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
            <text x="205" y="375" font-family="Arial" font-size="12" text-anchor="middle">ZPage (N*2MB Huge)</text>

            <!-- Colored Pointers -->
            <rect x="80" y="430" width="250" height="90" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>
            <text x="205" y="450" font-family="Arial" font-size="14" text-anchor="middle">Colored Pointers</text>

            <rect x="90" y="460" width="230" height="50" fill="#FFE7BA" stroke="#333333" stroke-width="1"/>
            <text x="205" y="480" font-family="Arial" font-size="10" text-anchor="middle">42 bits: Object Address</text>
            <text x="205" y="500" font-family="Arial" font-size="10" text-anchor="middle">4 bits: Color (Metadata)</text>
          </g>

          <!-- Phases and GC Cycle (Right Side) -->
          <g>
            <text x="600" y="100" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ZGC Phases</text>

            <!-- GC Cycle Container -->
            <rect x="400" y="120" width="420" height="300" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>

            <!-- Phase 1: Mark Start -->
            <rect x="420" y="140" width="380" height="40" fill="#f6ffed" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="165" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Pause: Mark Start</text>
            <text x="610" y="177" font-family="Arial" font-size="10" text-anchor="middle">(Short Pause - Load Barriers Activated)</text>

            <!-- Phase 2: Concurrent Mark -->
            <rect x="420" y="185" width="380" height="40" fill="#e6f7ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="210" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Concurrent Mark</text>
            <text x="610" y="222" font-family="Arial" font-size="10" text-anchor="middle">(Application Threads Continue)</text>

            <!-- Phase 3: Mark End -->
            <rect x="420" y="230" width="380" height="40" fill="#f6ffed" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="255" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Pause: Mark End</text>
            <text x="610" y="267" font-family="Arial" font-size="10" text-anchor="middle">(Short Pause - Process References)</text>

            <!-- Phase 4: Concurrent Process Non-Strong References -->
            <rect x="420" y="275" width="380" height="40" fill="#e6f7ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="300" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Concurrent Process Non-Strong References</text>
            <text x="610" y="312" font-family="Arial" font-size="10" text-anchor="middle">(Weak, Soft, Phantom, JNI References)</text>

            <!-- Phase 5: Concurrent Reset -->
            <rect x="420" y="320" width="380" height="40" fill="#e6f7ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="345" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Concurrent Reset & Remap</text>
            <text x="610" y="357" font-family="Arial" font-size="10" text-anchor="middle">(Reset Metadata, Remap Physical Memory)</text>

            <!-- Phase 6: Concurrent Compaction -->
            <rect x="420" y="365" width="380" height="40" fill="#e6f7ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
            <text x="610" y="390" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Concurrent Compaction</text>
            <text x="610" y="402" font-family="Arial" font-size="10" text-anchor="middle">(Relocate Objects & Update References)</text>

            <!-- Color Legend - FIXED TEXT POSITIONING -->
            <rect x="400" y="430" width="420" height="150" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>
            <text x="610" y="450" font-family="Arial" font-size="14" text-anchor="middle">ZGC Features</text>

            <circle cx="420" cy="470" r="6" fill="#f6ffed"/>
            <text x="440" y="474" font-family="Arial" font-size="12" text-anchor="start">Pause Phases (STW): &lt;10ms regardless of heap size</text>

            <circle cx="420" cy="495" r="6" fill="#e6f7ff"/>
            <text x="440" y="499" font-family="Arial" font-size="12" text-anchor="start">Concurrent Phases: Application continues while GC works</text>

            <!-- Moved down these two items to avoid overlap -->
            <circle cx="420" cy="520" r="6" fill="#FFE7BA"/>
            <text x="440" y="524" font-family="Arial" font-size="12" text-anchor="start">Load Barriers with Colored Pointers</text>

            <circle cx="420" cy="545" r="6" fill="#bae7ff"/>
            <text x="440" y="549" font-family="Arial" font-size="12" text-anchor="start">Region-based Memory Management</text>
          </g>
        </svg>

        <div class="mt-6 prose dark:prose-invert">
          <h1 id="z-garbage-collector" class="text-3xl font-bold mb-4">Z Garbage Collector</h1>
          <div class="mb-4">Z Garbage Collector was introduced as an experimental feature in JDK 11 and was officially released in JDK 15. It is also available in JDK 21.</div>
          <div class="mb-4">ZGC performs high-cost operations concurrently without stopping application threads for more than 10ms. The pause time is independent of heap size, working effectively with heaps ranging from a few hundred megabytes to 16 terabytes.</div>

          <div class="mb-4">For JDK 11 to JDK 15, ZGC is activated by using both the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UnlockExperimentalVMOptions</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseZGC</code> options. For JDK 15 and later, only the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseZGC</code> option is needed.</div>

          <div class="mb-4">Like G1 GC, ZGC is a concurrent garbage collector that uses the following key features:</div>

          <ul class="list-disc pl-6 mb-6">
            <li>Concurrent</li>
            <li>Region-based</li>
            <li>Compacting</li>
            <li>NUMA-aware</li>
            <li>Using colored pointers</li>
            <li>Using load barriers</li>
            <li>Using store barriers (in the generational mode)</li>
          </ul>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 800">
            <!-- Background -->
            <rect width="900" height="800" fill="#f8f9fa" rx="10" ry="10"/>

            <!-- Title -->
            <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Generational ZGC (JDK 21+)</text>

            <!-- Main Container -->
            <rect x="50" y="70" width="800" height="670" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="10" ry="10"/>

            <!-- Memory Layout -->
            <g>
              <text x="450" y="100" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Generational ZGC Memory Layout</text>

              <!-- Heap Overview -->
              <rect x="100" y="120" width="700" height="180" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>

              <!-- Young Generation -->
              <rect x="120" y="140" width="320" height="140" fill="#91caff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
              <text x="280" y="160" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Young Generation</text>

              <!-- Young Gen Components -->
              <rect x="140" y="170" width="280" height="40" fill="#bae7ff" stroke="#333333" stroke-width="1"/>
              <text x="280" y="195" font-family="Arial" font-size="14" text-anchor="middle">Eden Space</text>

              <rect x="140" y="220" width="130" height="40" fill="#d6e4ff" stroke="#333333" stroke-width="1"/>
              <text x="205" y="245" font-family="Arial" font-size="14" text-anchor="middle">Survivor 1</text>

              <rect x="290" y="220" width="130" height="40" fill="#d6e4ff" stroke="#333333" stroke-width="1"/>
              <text x="355" y="245" font-family="Arial" font-size="14" text-anchor="middle">Survivor 2</text>

              <!-- Old Generation -->
              <rect x="460" y="140" width="320" height="140" fill="#69b1ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
              <text x="620" y="160" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Old Generation</text>

              <!-- Old Gen Components -->
              <rect x="480" y="180" width="280" height="80" fill="#4096ff" stroke="#333333" stroke-width="1"/>
              <text x="620" y="225" font-family="Arial" font-size="14" text-anchor="middle">Long-lived Objects</text>

              <!-- Arrow from Young to Old (Promotion) -->
              <path d="M 400 220 L 440 220 L 440 200 L 470 200" stroke="#ff4d4f" stroke-width="2" fill="none" marker-end="url(#redArrow)" stroke-dasharray="5,3"/>
              <text x="440" y="180" font-family="Arial" font-size="12" fill="#ff4d4f" text-anchor="middle">Promotion</text>

              <!-- ZPages within the heap -->
              <text x="450" y="320" font-family="Arial" font-size="14" text-anchor="middle" font-style="italic">Both generations are composed of ZPages (2MB, 4MB, 32MB, etc.)</text>
            </g>

            <!-- Generational Collection Cycle -->
            <g>
              <text x="450" y="350" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Generational Collection Cycle</text>

              <!-- Collection Cycles Container -->
              <rect x="100" y="370" width="700" height="300" fill="#ffffff" stroke="#333333" stroke-width="1" rx="5" ry="5"/>

              <!-- Minor Collection Cycle -->
              <g>
                <rect x="120" y="380" width="320" height="180" fill="#f6ffed" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
                <text x="280" y="400" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Minor Collection (Young Gen)</text>

                <circle cx="140" cy="425" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="160" y="430" font-family="Arial" font-size="12" text-anchor="start">1. Young generation fills up</text>

                <circle cx="140" cy="455" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="160" y="460" font-family="Arial" font-size="12" text-anchor="start">2. Collect garbage in young generation</text>

                <circle cx="140" cy="485" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="160" y="490" font-family="Arial" font-size="12" text-anchor="start">3. Promote survivors to old generation</text>

                <text x="360" y="430" font-family="Arial" font-size="12" text-anchor="middle" font-style="italic" fill="#52c41a">Frequent, Quick</text>
                <text x="280" y="520" font-family="Arial" font-size="12" text-anchor="middle" fill="#333333">Store Barriers track references</text>
                <text x="280" y="545" font-family="Arial" font-size="12" text-anchor="middle" fill="#333333">from old to young generation</text>
              </g>

              <!-- Major Collection Cycle -->
              <g>
                <rect x="460" y="380" width="320" height="180" fill="#fff2e8" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
                <text x="620" y="400" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Major Collection (Full Heap)</text>

                <circle cx="480" cy="425" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="500" y="430" font-family="Arial" font-size="12" text-anchor="start">1. Old generation fills up</text>

                <circle cx="480" cy="455" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="500" y="460" font-family="Arial" font-size="12" text-anchor="start">2. Collect garbage across entire heap</text>

                <circle cx="480" cy="485" r="10" fill="#e6f7ff" stroke="#000000"/>
                <text x="500" y="490" font-family="Arial" font-size="12" text-anchor="start">3. Compact memory if needed</text>

                <text x="720" y="430" font-family="Arial" font-size="12" text-anchor="middle" font-style="italic" fill="#fa8c16">Less Frequent, More Thorough</text>
                <text x="620" y="520" font-family="Arial" font-size="12" text-anchor="middle" fill="#333333">Load Barriers ensure correctness</text>
                <text x="620" y="545" font-family="Arial" font-size="12" text-anchor="middle" fill="#333333">during concurrent relocation</text>
              </g>

              <!-- Arrow between Minor and Major -->
              <path d="M 390 440 L 410 440 L 430 440 L 450 440" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#blueArrow)"/>
              <text x="430" y="430" font-family="Arial" font-size="12" fill="#1890ff" text-anchor="middle">Triggers</text>
              <text x="420" y="455" font-family="Arial" font-size="10" fill="#1890ff" text-anchor="middle">When old gen fills</text>
            </g>

            <!-- Key Benefits -->
            <g>
              <rect x="100" y="580" width="700" height="60" fill="#f0f5ff" stroke="#2f54eb" stroke-width="1" rx="5" ry="5"/>
              <text x="450" y="600" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Key Benefits of Generational ZGC</text>

              <text x="200" y="625" font-family="Arial" font-size="14" text-anchor="middle">Better GC Efficiency</text>
              <text x="450" y="625" font-family="Arial" font-size="14" text-anchor="middle">Lower Latency</text>
              <text x="700" y="625" font-family="Arial" font-size="14" text-anchor="middle">Improved Throughput</text>
            </g>

            <!-- Arrow Definitions -->
            <defs>
              <marker id="redArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#ff4d4f"/>
              </marker>
              <marker id="blueArrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#1890ff"/>
              </marker>
            </defs>
          </svg>

          <h2 id="configuration" class="text-2xl font-bold mb-4 text-indigo-700">Configuration & Tuning</h2>
          <div class="mb-4">Like G1 GC, ZGC requires minimal configuration and adapts automatically during application execution. ZGC dynamically resizes generations, adjusts the number of GC threads, and modifies tenuring thresholds. The primary tuning point is increasing the maximum heap size (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xmx</code>).</div>

          <div class="mb-4">ZGC has two versions: generational and non-generational. The non-generational version is legacy and doesn't use the generation concept during execution. The generational version was released with JDK 21 and is recommended for use.</div>

          <div class="mb-4">The generational version uses both <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseZGC</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+ZGenerational</code> options.</div>

          <div class="mb-4">The non-generational version uses only the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseZGC</code> option.</div>

          <h2 id="heap-size"class="text-2xl font-bold mb-4 text-indigo-700">Setting Heap Size</h2>

          <h3 class="font-bold text-lg mb-2">Headroom</h3>
          <div class="mb-4">JVM Heap Headroom refers to the free space between the memory allocated for storing actively used data and the maximum heap size (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xmx</code>). This buffer allows the system to create more objects or process more data while helping reduce GC latency.</div>

          <div class="mb-4">Without headroom, Out of Memory (OOM) errors can occur, but having too much free space wastes system resources. Monitoring and managing JVM Heap Headroom is essential for performance optimization and stability, preventing memory-related issues while ensuring efficient execution.</div>

          <div class="mb-4">The most important tuning option for ZGC is setting <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">the maximum heap size with the -Xmx</code> option. Since ZGC is a concurrent collector, you must choose a heap size that provides sufficient headroom for memory allocation while the service operates during GC activity and can accommodate the application's live-set. The headroom size depends on the application's allocation rate and live-set size. Generally, providing more heap memory to ZGC is beneficial, but excessive heap sizes are not recommended, so finding the right balance is important.</div>

          <p class="mb-4">Another heap size-related option in ZGC is <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:SoftMaxHeapSize</code>, which sets a soft limit on how large the heap can grow. ZGC tries not to exceed this limit but may grow up to the maximum heap size if necessary. This exceeds the soft limit only when needed to prevent the application from pausing while waiting for GC to reclaim memory. For example, with <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xmx5g -XX:SoftMaxHeapSize=4g</code>, ZGC typically uses up to 4GB but can temporarily use up to 5GB.</p>

          <h2 id="gc-threads" class="text-2xl font-bold mb-4 text-indigo-700">Setting Concurrent GC Threads</h2>
          <div class="mb-4">When using the non-generational version, concurrent GC threads can be tuned with <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:ConcGCThreads=&lt;number&gt;</code>. ZGC has heuristics to automatically set the thread count, which generally works well but may need adjustment based on application characteristics. This option fundamentally determines how much CPU time to allocate to GC. Setting too many threads can cause GC to take excessive CPU time from the application, leading to performance degradation. Setting too few can cause the application to allocate garbage faster than GC can collect it.</div>

          <div class="mb-4">From JDK 17 onward, ZGC dynamically expands and shrinks the number of concurrent GC threads, eliminating the need to configure this option.</div>

          <div class="mb-4">With the release of the generational version in JDK 21, the need to set concurrent GC threads has been further reduced.</div>

          <div class="mb-4">If your application requires minimized GC delays and fast response times, ensure CPU utilization does not exceed 70%.</div>

          <h2 id="returning-memory" class="text-2xl font-bold mb-4 text-indigo-700">Returning Unused Memory to the Operating System</h2>
          <div class="mb-4">By default, ZGC uncommits unused memory and returns it to the OS. This can negatively impact application thread latency. You can disable this feature with the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:-ZUncommit</code> option. Additionally, memory is not uncommitted below the minimum heap size (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xms</code>). Setting <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xmx</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xms</code> to the same value implicitly disables this default behavior.</div>

          <div class="mb-4">You can configure the uncommit delay with <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:ZUncommitDelay=&lt;seconds&gt;</code> (default 300 seconds). This specifies how long memory must remain unused before becoming eligible for uncommitting. By default, memory unused for 300 seconds (5 minutes) is uncommitted and returned to the OS.</div>

          <div class="mb-4">When an application is running, memory committing or uncommitting by GC can negatively impact application thread latency. For faster response times, set <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xmx</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-Xms</code> to the same value. Also, use the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+AlwaysPreTouch</code> option (supported from JDK 14) to move memory to pages. However, this forces all allocated heap memory pages to be pre-mapped to physical memory when the JVM starts, which can cause problems in container-based cloud environments if it uses more memory than allocated to the container.</div>

          <div class="mb-4">On Linux, uncommitting unused memory requires the fallocate(2) function that supports FALLOC_FL_PUNCH_HOLE, first introduced in kernel 3.5 (for tmpfs) and 4.3 (for hugetlbfs).</div>

          <h2 id="large-pages" class="text-2xl font-bold mb-4 text-indigo-700">Using Large Pages</h2>
          <div class="mb-4">Enabling large pages typically provides better throughput, latency, and startup time. However, configuration is complex and requires root privileges, so it's disabled by default. Setup instructions are available at <a href="https://wiki.openjdk.org/display/zgc/Main#Main-JDK17" class="text-blue-600 hover:underline">https://wiki.openjdk.org/display/zgc/Main#Main-JDK17</a>.</div>

          <h2 id="numa" class="text-2xl font-bold mb-4 text-indigo-700">Enabling NUMA (Non-Uniform Memory Access) Support</h2>
          <div class="mb-4">By default, NUMA support is enabled, but it can be automatically disabled if the JVM detects that memory can only be used from a single NUMA node. This setting typically doesn't require attention. However, if you want to explicitly override the JVM's decision, you can manually enable or disable it using <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseNUMA</code> or <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:-UseNUMA</code>. When running on NUMA machines (e.g., a multi-socket x86 machine), having this option enabled can provide noticeable performance improvements.</div>

          <h2 class="text-2xl font-bold mb-4 text-indigo-700">Conclusion</h2>
          <div class="mb-4">
            ZGC represents a significant advancement in Java garbage collection technology, focusing on low-latency while still maintaining good throughput. It's particularly well-suited for applications that:
          </div>

          <ul class="list-disc pl-6 mb-6">
            <li>Need consistent performance with minimal pauses</li>
            <li>Work with large heaps (multi-GB to TB scale)</li>
            <li>Have strict response time requirements</li>
            <li>Run on modern multi-core systems</li>
          </ul>

          <div class="mb-4">
            With the introduction of the generational version in JDK 21, ZGC continues to evolve, becoming more efficient and requiring less manual tuning. This follows the general trend in JVM development toward more adaptive, self-tuning components that minimize the need for developers to become garbage collection experts.
          </div>

          <div class="mb-4">
            When migrating to ZGC from other collectors like G1 or Parallel GC, start with the default settings and monitor your application's performance metrics. In most cases, minimal tuning will be required beyond setting appropriate heap size limits. For latency-sensitive applications, remember to consider both maximum heap size and the relationships between minimum and maximum values to control memory uncommitting behavior.
          </div>

          <div class="mb-4">
            If you're running Java applications with high-throughput requirements that also need predictable, low pause times, ZGC should be among your top considerations for garbage collection strategies in modern JVM deployments.
          </div>
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h4 class="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-300">References</h4>
            <div class="space-y-1">
              <div class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <a href="https://openjdk.org/projects/zgc/" class="text-blue-600 hover:underline dark:text-blue-400">https://openjdk.org/projects/zgc/</a>
              </div>
              <div class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <a href="https://wiki.openjdk.org/display/zgc/Main" class="text-blue-600 hover:underline dark:text-blue-400">https://wiki.openjdk.org/display/zgc/Main</a>
              </div>
              <div class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <a href="https://docs.oracle.com/en/java/javase/11/gctuning/z-garbage-collector1.html#GUID-A5A42691-095E-47BA-B6DC-FB4E5FAA43D0" class="text-blue-600 hover:underline dark:text-blue-400">https://docs.oracle.com/en/java/javase/11/gctuning/z-garbage-collector1.html#GUID-A5A42691-095E-47BA-B6DC-FB4E5FAA43D0</a>
              </div>
              <div class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <a href="https://www.baeldung.com/jvm-zgc-garbage-collector" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/jvm-zgc-garbage-collector</a>
              </div>
              <div class="flex items-start">
                <span class="text-blue-600 dark:text-blue-400 mr-2">•</span>
                <a href="https://en.wikipedia.org/wiki/Non-uniform_memory_access" class="text-blue-600 hover:underline dark:text-blue-400">https://en.wikipedia.org/wiki/Non-uniform_memory_access</a>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  `
}; 