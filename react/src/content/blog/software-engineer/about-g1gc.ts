import type { BlogPost } from '../../../types/blog';

export const aboutG1gc: BlogPost = {
  id: 'about-g1gc',
  title: 'About G1 GC',
  description: 'G1 GC has been available since Java 7 and was designated as the default garbage collector in Java 9. It is suitable for multi-processor machines with large memory.',
  category: 'software-engineer',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['JVM', 'Garbage Collection', 'Performance'],
  image: 'g1gc.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <a href="/blog/software-engineer/list.html" class="ml-2 hover:text-gray-700 dark:hover:text-gray-300">Software Engineer</a>
        </li>
        <li class="flex items-center">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <span class="ml-2 text-gray-400 dark:text-gray-500">About G1 GC</span>
        </li>
      </ol>
    </nav>

    <header class="mb-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 dark:text-gray-300 uppercase">
        JVM Performance
      </div>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        About G1 GC
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: March 31, 2024</div>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Introduction to G1 GC</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 GC has been available since Java 7 and was designated as the default garbage collector in Java 9. It is suitable for multi-processor machines with large memory.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        It attempts to achieve the configured target stop-the-world time with high probability. The goal is to make the pause time as predictable and short as possible.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 aims for high throughput while minimizing the need for user configuration. The goal is to prevent developers from spending too much time optimizing performance.
      </p>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Target Applications</h3>
        <ul class="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
          <li>Environments with heap sizes from a few GB to a maximum of 10GB</li>
          <li>Environments where object allocation and promotion rates can vary significantly in real-time</li>
          <li>Environments where a significant level of fragmentation may occur in the heap</li>
          <li>Cases requiring predictable stop-the-world times not exceeding hundreds of milliseconds</li>
        </ul>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 GC replaces the CMS (Concurrent Mark-Sweep) garbage collector.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        It divides the heap into multiple regions and aims to achieve high performance by processing these regions concurrently during garbage collection.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Activating G1 GC</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        As the default garbage collector, no special configuration is required. It can be explicitly enabled through <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+UseG1GC</code>.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Basic Concepts</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Like other garbage collectors, G1 uses the concept of generational memory lifecycle with young and old generations. It performs garbage collection incrementally using multiple threads. To improve throughput, some garbage collection tasks can proceed while the application is running, while some critical tasks cause stop-the-world pauses.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Heap Layout</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 divides the heap into a set of equally-sized heap regions, each consisting of contiguous ranges of virtual memory. Regions are the unit of memory allocation and reclamation. At any time, a region can be empty or allocated to the young generation or old generation. When a memory request comes in, the memory manager allocates free regions. The memory manager assigns free regions to generations and returns free regions to the application so that the application can allocate to these regions.
      </p>

      <div class="relative bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
        <div class="grid grid-cols-12 gap-1">
          <!-- Eden regions (red) -->
          <div class="col-span-2 h-12 bg-red-400 rounded flex items-center justify-center text-white">Eden</div>
          <div class="col-span-2 h-12 bg-red-400 rounded"></div>
          <!-- Old regions (blue) -->
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <!-- Survivor region (red with S) -->
          <div class="col-span-2 h-12 bg-red-400 rounded flex items-center justify-center text-white font-bold">S</div>
          <!-- Old regions (blue) -->
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>

          <!-- Second row -->
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <!-- Eden regions (red) -->
          <div class="col-span-2 h-12 bg-red-400 rounded"></div>
          <!-- Huge object spanning multiple regions (blue with H) -->
          <div class="col-span-6 h-12 bg-blue-400 rounded flex items-center justify-center text-white font-bold">H</div>

          <!-- Third row -->
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <!-- Eden regions (red) -->
          <div class="col-span-2 h-12 bg-red-400 rounded"></div>
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <!-- Survivor region (red with S) -->
          <div class="col-span-2 h-12 bg-red-400 rounded flex items-center justify-center text-white font-bold">S</div>
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
          <div class="col-span-2 h-12 bg-blue-400 rounded"></div>
        </div>
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
          <div class="flex items-center mb-1">
            <div class="w-4 h-4 bg-red-400 mr-2"></div>
            <span>Young Generation (Eden and Survivor regions)</span>
          </div>
          <div class="flex items-center">
            <div class="w-4 h-4 bg-blue-400 mr-2"></div>
            <span>Old Generation</span>
          </div>
        </div>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The young generation consists of eden regions (red) and survivor regions (red with "S" written). Unlike other garbage collectors that provide the same functionality with adjacent spaces, G1 GC has the distinction of placing memory in a non-contiguous pattern.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The old generation is represented by the blue regions in the figure. Large objects like "H" can occupy multiple regions.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Applications always allocate to the eden regions of the young generation. Exceptionally, very large objects may be allocated directly to the old generation.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 GC pauses can reclaim space from the entire young generation and can also return space from the old generation. During pauses, G1 uses aging to copy objects to other regions of the heap. Objects that were in the young generation are copied to survivor or old regions, and objects that were in old regions are copied to other old regions.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Garbage Collection Cycle</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        At a high level, G1 alternates between two phases as shown in the image below:
      </p>
      <ol class="list-decimal pl-5 mb-4 text-gray-900 dark:text-gray-100">
        <li>Young-Only Phase</li>
        <li>Space Reclamation Phase</li>
      </ol>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
        <h3 class="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-100">1. Young-only phase</h3>
        <p class="mb-2 text-indigo-800 dark:text-indigo-200">
          This begins with the process of promoting objects to the old generation. The transition between the young-only phase and the space-reclamation phase occurs when the old generation's memory occupancy reaches a specific threshold (the Initiating Heap Occupancy threshold). At this point, G1 schedules an Initial Mark young-only collection instead of a regular young-only collection.
        </p>

        <div class="pl-4 border-l-2 border-indigo-300 dark:border-indigo-600 my-3">
          <h4 class="font-semibold text-indigo-800 dark:text-indigo-200">Initial Mark</h4>
          <p class="text-sm text-indigo-700 dark:text-indigo-300">
            Starts the marking process along with a regular young-only collection. Concurrent Marking determines which live objects in the old generation to keep for the next space-reclamation phase. Regular young collections can continue while marking is in progress. Marking ends with two stop-the-world pauses called Remark and Cleanup.
          </p>
        </div>

        <div class="pl-4 border-l-2 border-indigo-300 dark:border-indigo-600 my-3">
          <h4 class="font-semibold text-indigo-800 dark:text-indigo-200">Remark</h4>
          <p class="text-sm text-indigo-700 dark:text-indigo-300">
            The Remark pause finalizes marking by performing global reference processing and class unloading. Between Remark and Cleanup, G1 concurrently calculates a summary of the liveness information, which is finally used to modify internal data structures during the Cleanup pause.
          </p>
        </div>

        <div class="pl-4 border-l-2 border-indigo-300 dark:border-indigo-600 my-3">
          <h4 class="font-semibold text-indigo-800 dark:text-indigo-200">Cleanup</h4>
          <p class="text-sm text-indigo-700 dark:text-indigo-300">
            This pause reclaims completely empty regions and determines whether the space-reclamation phase will follow. If the space-reclamation phase follows, the young-only phase ends with a single young-only collection.
          </p>
        </div>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
        <h3 class="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-100">2. Space-reclamation phase</h3>
        <p class="mb-2 text-indigo-800 dark:text-indigo-200">
          This consists of Mixed collections that cause objects to move from both young generation regions and old generation regions. This phase ends when G1 determines that it cannot free up sufficient space in the old generation. After space-reclamation ends, the collection cycle starts again with another young-only phase. As a backup, if the application runs out of memory while collecting liveness information, G1, like other garbage collectors, performs an in-place stop-the-world full heap compaction (Full GC).
        </p>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Garbage-First Internals</h2>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Determining Initial Heap Occupancy (IHOP)</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        This is the threshold at which Initial Mark collection is triggered and is determined as a percentage of the old generation size. G1 uses this concept to predict latency. G1 determines the optimal IHOP by observing how long marking takes during a marking cycle and how much memory is allocated to the old generation. This feature is called Adaptive IHOP. When adaptive IHOP is active, the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:InitiatingHeapOccupancyPercent</code> option sets the initial value as a percentage of the current old generation size (default 45%) when there haven't been enough observations to make a good threshold prediction. The <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:-G1UseAdaptiveIHOP</code> option is used to disable this feature. When disabled, the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:InitiatingHeapOccupancyPercent</code> value always determines the threshold. Internally, Adaptive IHOP tries to set the IHOP so that the first mixed GC of the space-reclamation phase starts when the old generation occupancy is at the current maximum old generation size minus the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1HeapReservePercent</code> value as an additional buffer.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Marking</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 marking uses an algorithm called Snapshot-At-The-Beginning (SATB). It creates a virtual snapshot of the heap at the time of the Initial Mark pause, when all objects that were alive are excluded from marking and survive. This means that objects that become garbage during marking are still considered live for the space-reclamation phase. This may result in some additional memory misuse compared to other garbage collectors, but SATB offers potentially lower latency during the Remark pause. Objects that are conservatively considered alive during marking will be reclaimed in subsequent markings.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Out of Memory Situations</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Evacuation may fail when an application continues to operate while using too much memory, making the heap somewhat tight. G1 attempts to complete collection by leaving already moved objects moved and unmoved objects in place, adjusting only the references between objects. Evacuation failure can cause additional overhead but generally proceeds as quickly as a normal young collection. After a collection that ends with evacuation failure, G1 resumes the application as normal without additional measures. G1 assumes that evacuation failure occurred as collection was nearing completion. That is, most objects were already successfully moved, and there is enough space for the application to continue running until marking completes and space-reclamation begins. If this assumption does not hold, G1 will eventually schedule a very slow Full GC that performs in-place compaction on the entire heap.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Humongous Objects</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Objects that are larger than half a region are considered "humongous". Such objects are allocated directly in the old generation, in one or more contiguous regions. The first region is marked with a "starts humongous" tag, and the last region is marked with a "continues humongous" tag. Any dead humongous object is freed at the end of the marking cycle, during the cleanup phase, or during a full garbage collection cycle.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Young-Only Phase Generation Sizing</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        During the young-only phase, the collection set, that is, the set of regions to be collected, consists only of young generation regions. G1 always adjusts the size of the young generation at the end of a young-only collection. G1 observes actual pause times over the long term. G1 adjusts the young generation size to achieve the pause time goal set by <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:MaxGCPauseTimeMillis</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:PauseTimeIntervalMillis</code>. G1 also considers how long pause times have taken for similar-sized young generations, how many objects have moved to other regions during collection, and how related they are to each other. G1 adjusts the size of the young generation to achieve the target pause time within the limits set by <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1NewSizePercent</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1MaxNewSizePercent</code>.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Space-Reclamation Phase Generation Sizing</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Space-reclamation proceeds with the goal of reclaiming as much space as possible from the old generation during a gc pause. The young generation size is set to the minimum allowed, typically determined by the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1NewSizePercent</code> option. G1 continues to add old generation regions without exceeding the target pause time. G1 adds old generation regions in order of reclamation efficiency, starting with the most efficient regions and determining the final set of regions to reclaim based on the remaining pause time.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1MixedGCCountTarget</code> option sets the length of the space-reclamation phase. This setting determines the minimum number of old generation regions to reclaim per collection. Candidate regions for reclamation are all old generation regions with occupancy lower than <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1MixedGCLiveThresholdPercent</code> at the start of the space-reclamation phase. The space-reclamation phase ends when the amount of reclaimable space remaining in the candidate regions is less than the percentage set by <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:G1HeapWastePercent</code>.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">Differences from Other Garbage Collectors</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Parallel GC compacts and reclaims the old generation in its entirety, while G1 GC proceeds incrementally with short collections over multiple passes. This allows G1 to achieve shorter pause times by sacrificing throughput.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Similar to CMS GC, G1 GC performs old generation space-reclamation concurrently. However, CMS GC cannot compact the old generation, which eventually leads to a long Full GC.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        G1 may incur more overhead in throughput than other garbage collectors because it performs collections concurrently.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Due to this mode of operation, G1 increases efficiency through special mechanisms:
      </p>
      <ul class="list-disc pl-5 mb-4 text-gray-900 dark:text-gray-100">
        <li>G1 can reclaim large completely empty regions in the old generation from any collection. This allows for allocating large amounts of memory. This feature is enabled by default and can be disabled via the <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:-G1EagerReclaimHumongousObjects</code> option.</li>
        <li>G1 can eliminate string duplicates concurrently. This feature is disabled by default and can be enabled via <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">-XX:+G1EnableStringDeduplication</code>.</li>
      </ul>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">JDK 24 Updates for G1 GC</h3>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        JDK 24, released in March 2025, includes several improvements to G1 GC. While not tied to specific major JEPs (JDK Enhancement Proposals), these changes enhance G1's performance and reliability:
      </p>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Key G1 GC Improvements in JDK 24</h3>
        <ul class="list-disc pl-5 space-y-2 text-blue-800 dark:text-blue-200">
          <li>
            <strong>Enhanced Adaptive IHOP Algorithm</strong>
            <p class="text-sm ml-4 mt-1">Refinements to the algorithm for determining when to start concurrent marking, leading to better prediction and fewer unexpected pauses.</p>
          </li>
          <li>
            <strong>Improved Humongous Object Handling</strong>
            <p class="text-sm ml-4 mt-1">Better management of large objects to reduce fragmentation and decrease the likelihood of full GC events.</p>
          </li>
          <li>
            <strong>Optimized Remembered Set Scanning</strong>
            <p class="text-sm ml-4 mt-1">Improved efficiency of remembered set scanning during garbage collection, reducing pause times in applications with large heaps.</p>
          </li>
          <li>
            <strong>Region Allocation Performance</strong>
            <p class="text-sm ml-4 mt-1">Optimized the process of allocating new regions during garbage collection, reducing latency spikes in high-throughput applications.</p>
          </li>
          <li>
            <strong>Evacuation Failure Handling</strong>
            <p class="text-sm ml-4 mt-1">Fixed issues where G1 evacuation failures could lead to suboptimal memory utilization, potentially causing more frequent garbage collections.</p>
          </li>
        </ul>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Additionally, JDK 24 includes general GC improvements that benefit G1:
      </p>

      <ul class="list-disc pl-5 mb-6 space-y-1 text-gray-900 dark:text-gray-100">
        <li><strong>Better Container Adaptation:</strong> Improved detection and response to containerized environments, particularly valuable for cloud deployments.</li>
        <li><strong>Reduced CPU Overhead:</strong> Optimizations to lower CPU usage during concurrent GC operations, allowing more resources for the application.</li>
      </ul>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        These improvements make G1 GC in JDK 24 more efficient, predictable, and less intrusive to application performance, particularly for large-scale enterprise applications with significant memory requirements.
      </p>

      <h3 class="text-xl font-bold mb-3 mt-6 text-gray-900 dark:text-gray-100">References</h3>
      <ul class="list-disc pl-5 mb-4 space-y-1 text-gray-900 dark:text-gray-100">
        <li><a href="https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm" class="text-blue-600 hover:underline dark:text-blue-400">https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector.htm</a></li>
        <li><a href="https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector-tuning.htm#GUID-90E30ACA-8040-432E-B3A0-1E0440AB556A" class="text-blue-600 hover:underline dark:text-blue-400">https://docs.oracle.com/javase/9/gctuning/garbage-first-garbage-collector-tuning.htm#GUID-90E30ACA-8040-432E-B3A0-1E0440AB556A</a></li>
      </ul>
    </section>
  `
}; 