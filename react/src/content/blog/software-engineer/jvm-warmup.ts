import type { BlogPost } from '../../../types/blog';

export const jvmWarmup: BlogPost = {
  id: 'jvm-warmup',
  title: 'About JVM Warm-up',
  description: 'When a JVM process starts, all required classes are loaded into memory by the class loader through three stages. This process is based on lazy loading.',
  category: 'software-engineer',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['Java', 'JVM', 'Performance'],
  image: 'jvm-warmup.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">JVM Warm-up</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">About JVM Warm-up</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: March 31, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 680">
        <!-- Background -->
        <rect width="800" height="600" fill="#f8f9fa" rx="10" ry="10"/>
        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">JVM Architecture</text>
        <!-- Main JVM Container -->
        <rect x="50" y="60" width="700" height="480" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="10" ry="10"/>
        <text x="400" y="85" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Java Virtual Machine</text>
        <!-- Class Loader Subsystem -->
        <rect x="70" y="100" width="200" height="160" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="170" y="120" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Class Loader Subsystem</text>
        <!-- Class Loaders -->
        <rect x="80" y="130" width="180" height="120" fill="#fff2e8" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <rect x="90" y="140" width="160" height="30" fill="#fff7e6" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="160" font-family="Arial" font-size="12" text-anchor="middle">Bootstrap Class Loader</text>
        <rect x="90" y="175" width="160" height="30" fill="#fff7e6" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="195" font-family="Arial" font-size="12" text-anchor="middle">Extension Class Loader</text>
        <rect x="90" y="210" width="160" height="30" fill="#fff7e6" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="230" font-family="Arial" font-size="12" text-anchor="middle">Application Class Loader</text>
        <!-- Runtime Data Area -->
        <rect x="290" y="100" width="440" height="230" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="5" ry="5"/>
        <text x="510" y="120" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Runtime Data Area</text>
        <!-- Method Area -->
        <rect x="300" y="130" width="200" height="90" fill="#d6e4ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="150" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Method Area</text>
        <text x="400" y="170" font-family="Arial" font-size="12" text-anchor="middle">Runtime Constant Pool</text>
        <text x="400" y="190" font-family="Arial" font-size="12" text-anchor="middle">Field and Method Data</text>
        <text x="400" y="210" font-family="Arial" font-size="12" text-anchor="middle">Method Code</text>
        <!-- Heap -->
        <rect x="520" y="130" width="200" height="90" fill="#d6e4ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="620" y="150" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Heap</text>
        <text x="620" y="170" font-family="Arial" font-size="12" text-anchor="middle">Young Generation (Eden, S0, S1)</text>
        <text x="620" y="190" font-family="Arial" font-size="12" text-anchor="middle">Old Generation</text>
        <text x="620" y="210" font-family="Arial" font-size="12" text-anchor="middle">Objects & Arrays</text>
        <!-- Java Stack, PC Register, Native Method Stack -->
        <rect x="300" y="230" width="128" height="90" fill="#d6e4ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="364" y="250" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Java Stack</text>
        <text x="364" y="270" font-family="Arial" font-size="12" text-anchor="middle">Frame Data</text>
        <text x="364" y="290" font-family="Arial" font-size="12" text-anchor="middle">Local Variables</text>
        <text x="364" y="310" font-family="Arial" font-size="12" text-anchor="middle">Operand Stack</text>
        <rect x="436" y="230" width="128" height="90" fill="#d6e4ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="500" y="250" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">PC Registers</text>
        <text x="500" y="270" font-family="Arial" font-size="12" text-anchor="middle">Per Thread</text>
        <text x="500" y="290" font-family="Arial" font-size="12" text-anchor="middle">Current Instruction</text>
        <text x="500" y="310" font-family="Arial" font-size="12" text-anchor="middle">Address</text>
        <rect x="572" y="230" width="148" height="90" fill="#d6e4ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="646" y="250" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Native Method Stack</text>
        <text x="646" y="270" font-family="Arial" font-size="12" text-anchor="middle">Native Method Info</text>
        <text x="646" y="290" font-family="Arial" font-size="12" text-anchor="middle">Native Method Parameters</text>
        <text x="646" y="310" font-family="Arial" font-size="12" text-anchor="middle">Return Values</text>
        <!-- Execution Engine -->
        <rect x="70" y="270" width="200" height="160" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="170" y="290" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Execution Engine</text>
        <!-- Interpreter, JIT Compiler, GC -->
        <rect x="80" y="300" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="320" font-family="Arial" font-size="14" text-anchor="middle">Interpreter</text>
        <rect x="80" y="335" width="180" height="55" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="355" font-family="Arial" font-size="14" text-anchor="middle">JIT Compiler</text>
        <text x="120" y="375" font-family="Arial" font-size="12" text-anchor="middle">C1 (Client)</text>
        <text x="220" y="375" font-family="Arial" font-size="12" text-anchor="middle">C2 (Server)</text>
        <rect x="80" y="395" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="170" y="415" font-family="Arial" font-size="14" text-anchor="middle">Garbage Collector</text>
        <!-- Native Method Interface -->
        <rect x="290" y="350" width="440" height="70" fill="#fff0f6" stroke="#eb2f96" stroke-width="2" rx="5" ry="5"/>
        <text x="510" y="370" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Java Native Interface (JNI)</text>
        <text x="510" y="390" font-family="Arial" font-size="12" text-anchor="middle">Interface between Java and Native Libraries</text>
        <text x="510" y="410" font-family="Arial" font-size="12" text-anchor="middle">Enables JVM to call and be called by Native Applications/Libraries</text>
        <!-- Native Method Libraries -->
        <rect x="290" y="430" width="440" height="100" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
        <text x="510" y="450" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Native Method Libraries</text>
        <rect x="300" y="470" width="130" height="50" fill="#efdbff" stroke="#722ed1" stroke-width="1" rx="3" ry="3"/>
        <text x="365" y="495" font-family="Arial" font-size="12" text-anchor="middle">C/C++ Libraries</text>
        <rect x="445" y="470" width="130" height="50" fill="#efdbff" stroke="#722ed1" stroke-width="1" rx="3" ry="3"/>
        <text x="510" y="495" font-family="Arial" font-size="12" text-anchor="middle">Native OS Libraries</text>
        <rect x="590" y="470" width="130" height="50" fill="#efdbff" stroke="#722ed1" stroke-width="1" rx="3" ry="3"/>
        <text x="655" y="495" font-family="Arial" font-size="12" text-anchor="middle">Other Native Code</text>
        <!-- Flow Arrows with Labels -->
        <path d="M270,170 L290,170" stroke="#000000" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <text x="280" y="160" font-family="Arial" font-size="10" text-anchor="middle">1</text>
        <path d="M170,260 L170,270" stroke="#000000" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <text x="180" y="265" font-family="Arial" font-size="10" text-anchor="middle">2</text>
        <path d="M270,320 L290,320" stroke="#000000" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <text x="280" y="310" font-family="Arial" font-size="10" text-anchor="middle">3</text>
        <path d="M220,315 C250,315 270,330 290,360" stroke="#000000" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <text x="250" y="335" font-family="Arial" font-size="10" text-anchor="middle">4</text>
        <path d="M180,395 C220,380 300,320 520,190" stroke="#52c41a" stroke-width="1.5" fill="none" stroke-dasharray="5,3" marker-end="url(#greenhead)"/>
        <text x="280" y="360" font-family="Arial" font-size="10" fill="#52c41a" text-anchor="middle">GC direct memory management</text>
        <path d="M510,420 L510,430" stroke="#000000" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)"/>
        <text x="520" y="425" font-family="Arial" font-size="10" text-anchor="middle">5</text>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#000000"/>
          </marker>
          <marker id="greenhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#52c41a"/>
          </marker>
        </defs>
        <rect x="2" y="550" width="796" height="120" fill="#ffffff" stroke="#d9d9d9" stroke-width="1" rx="5" ry="5"/>
        <text x="10" y="570" font-family="Arial" font-size="12" text-anchor="start">1: Load classes</text>
        <text x="10" y="585" font-family="Arial" font-size="12" text-anchor="start">2: Start execution</text>
        <text x="10" y="600" font-family="Arial" font-size="12" text-anchor="start">3: Access data</text>
        <text x="10" y="615" font-family="Arial" font-size="12" text-anchor="start">4: Native method calls via JNI</text>
        <text x="10" y="630" font-family="Arial" font-size="12" text-anchor="start">5: Access native libraries</text>
        <text x="10" y="645" font-family="Arial" font-size="12" text-anchor="start" fill="#52c41a">GC directly manages heap memory without using JNI (dashed green line)</text>
        <text x="10" y="660" font-family="Arial" font-size="12" text-anchor="start">JVM is platform independent but JVM implementation is platform specific. The Native Method Interface and Libraries interact with the host OS.</text>
      </svg>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Class Loading</h2>
        <p class="text-gray-700 dark:text-gray-400">When a JVM process starts, all required classes are loaded into memory by the class loader through three stages. This process is based on lazy loading.</p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Bootstrap Class Loading: The Bootstrap Class Loader loads Java classes. It loads essential classes like <b>java.lang.Object</b> from <b>JRE/lib/rt.jar</b>.</li>
          <li class="whitespace-nowrap mobile-wrap">Extension Class Loading: The ExtClassLoader is responsible for all JAR files in the java.ext.dirs path. These are JAR files manually added by developers, not those in Gradle or Maven-based applications.</li>
          <li class="whitespace-nowrap mobile-wrap">Application Class Loading: The AppClassLoader loads all classes in the application class path.</li>
        </ul>
      </div>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Execution Engine</h2>
        <p class="text-gray-700 dark:text-gray-400">Java is a hybrid language that uses both an interpreter and a compiler. When you compile your code with javac, it generates platform-independent bytecode. The JVM then interprets this bytecode at runtime. Frequently executed code is converted to native code by the JIT (Just-In-Time) compiler to improve performance. This converted code is then used directly in subsequent executions (hotspot).</p>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">C1 - Client Compiler</h3>
        <p class="text-gray-700 dark:text-gray-400">Prioritizes fast startup and responsiveness. While it has a lower level of optimization compared to C2, it has a shorter compilation time, resulting in faster initial execution and better user experience. It applies simple optimizations to quickly convert code to native.</p>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">C2 - Server Compiler</h3>
        <p class="text-gray-700 dark:text-gray-400">Focuses on performance optimization rather than speed. It takes longer to compile than C1 but applies deeper optimizations to maximize long-term execution speed. It analyzes code execution patterns at runtime to apply advanced optimizations.</p>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Tiered Compilation</h3>
        <p class="text-gray-700 dark:text-gray-400">Enabled by default since Java 8, and it is recommended to use the default settings.</p>
        <p class="text-gray-700 dark:text-gray-400 mt-4">The C2 compiler requires more memory and time than C1 but generates more optimized native code. Tiered Compilation was first introduced in Java 7 and aims to achieve both fast startup and long-term performance improvement by utilizing both C1 and C2.</p>
        <p class="text-gray-700 dark:text-gray-400">The interpreter collects profiling information about methods and provides it to the compiler, and C1 generates a compiled version based on this information. Methods that are frequently used during the application lifecycle are loaded into the native cache.</p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400">
        <rect width="600" height="400" fill="white"/>
        <line x1="80" y1="320" x2="550" y2="320" stroke="black" stroke-width="2"/>
        <line x1="80" y1="50" x2="80" y2="320" stroke="black" stroke-width="2"/>
        <text x="550" y="350" font-family="Arial" font-size="16" text-anchor="end">Time</text>
        <text x="40" y="150" font-family="Arial" font-size="16" text-anchor="middle" transform="rotate(-90, 40, 150)">Performance</text>
        <text x="80" y="340" font-family="Arial" font-size="12" text-anchor="middle">Startup</text>
        <text x="215" y="340" font-family="Arial" font-size="12" text-anchor="middle">Compilation</text>
        <text x="385" y="340" font-family="Arial" font-size="12" text-anchor="middle">Compilation</text>
        <line x1="215" y1="50" x2="215" y2="320" stroke="black" stroke-width="1" stroke-dasharray="5,5"/>
        <line x1="385" y1="50" x2="385" y2="320" stroke="black" stroke-width="1" stroke-dasharray="5,5"/>
        <polyline points="80,280 215,280 225,190 385,190 395,100 550,100" fill="none" stroke="#1a56db" stroke-width="3"/>
        <text x="147" y="245" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">Interpreted</text>
        <text x="147" y="260" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">and Profiled</text>
        <text x="300" y="165" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">C1 Compiled</text>
        <text x="300" y="180" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">and Profiled</text>
        <text x="470" y="75" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">C2 Compiled</text>
        <text x="470" y="90" font-family="Arial" font-size="12" fill="#1a56db" text-anchor="middle">and Non-Profiled</text>
      </svg>
      <div class="mt-6">
        <p class="text-gray-700 dark:text-gray-400">When the application starts, the JVM interprets all bytecode and profiles it. The JIT compiler uses this profiling data to identify hotspots.</p>
        <p class="text-gray-700 dark:text-gray-400">First, the JIT compiler quickly converts frequently executed code to native code using C1, and then C2 applies additional optimizations based on the profiling information generated by the interpreter and C1. This process takes longer than C1.</p>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Code Cache</h3>
        <p class="text-gray-700 dark:text-gray-400">
          This is a memory area where the JVM stores all bytecode compiled into native code. Tiered Compilation
          increases the amount of code in the code cache area by 4 times.
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          After Java 9, the code cache was divided into three areas to improve locality and reduce memory fragmentation:
        </p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Non-method segment - JVM internal related code (about 5MB,
            adjustable via -XX:NonNMethodCodeHeapSize)
          </li>
          <li class="whitespace-nowrap mobile-wrap">The profiled-code segment - Code compiled by C1, which may have a
            short lifespan (default ~122MB, adjustable via -XX:ProfiledCodeHeapSize)
          </li>
          <li class="whitespace-nowrap mobile-wrap">The non-profiled segment - Code compiled by C2, which may have a
            longer lifespan (default ~122MB, adjustable via -XX:NonProfiledCodeHeapSize)
          </li>
        </ul>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Deoptimization</h3>
        <p class="text-gray-700 dark:text-gray-400">
          There's a possibility that code compiled by C2 might not be optimized. In such cases, the JVM temporarily
          rolls back to interpretation mode. For example, when profile information doesn't match the actual method
          execution.
        </p>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Compilation Levels</h3>
        <p class="text-gray-700 dark:text-gray-400">
          The interpreter and JIT compiler have five levels:
        </p>
      </div>

      <div class="mt-6">
        <h4 class="inline-block mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Level 0 - Interpreted Code</h4>
        <p class="text-gray-700 dark:text-gray-400">
          At this stage, the JVM interprets all Java code. It reads and executes bytecode line by line, resulting in
          lower performance compared to compiled languages at this stage.
        </p>
      </div>

      <div class="mt-6">
        <h4 class="inline-block mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Level 1 - Simple C1 Compiled
          Code</h4>
        <p class="text-gray-700 dark:text-gray-400">
          The JVM compiles methods deemed non-critical using C1 without collecting profiling information. This typically
          applies to very simple or low-complexity methods. These methods aren't expected to show significant
          performance improvements even with further optimization by C2. The main purpose is to speed up execution,
          allowing code to run with minimal overhead. Since profiling information isn't collected, the JVM doesn't
          decide on additional optimization for code running at this level. This reduces system resource usage and
          ensures fast execution for simple methods.
        </p>
      </div>

      <div class="mt-6">
        <h4 class="inline-block mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Level 2 - Limited C1 Compiled
          Code</h4>
        <p class="text-gray-700 dark:text-gray-400">
          C1 analyzes code through lightweight profiling. The JVM uses this stage when the C2 Queue is full. Since C2
          performs extensive optimizations requiring significant time and resources, it temporarily uses C1 with
          lightweight profiling to improve performance without waiting.
        </p>
      </div>

      <div class="mt-6">
        <h4 class="inline-block mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Level 3 - Full C1 Compiled
          Code</h4>
        <p class="text-gray-700 dark:text-gray-400">
          After running code compiled at level 2 for some time, the JVM collects more runtime data and compiles it with
          full profiling through C1 at this stage. This includes more comprehensive data collection than lightweight
          profiling, allowing identification of complex patterns and optimization opportunities. It collects detailed
          execution metrics for more complex optimizations that C2 will perform.
        </p>
      </div>

      <div class="mt-6">
        <h4 class="inline-block mb-2 text-lg tracking-tight text-gray-900 dark:text-white">Level 4 - C2 Compiled
          Code</h4>
        <p class="text-gray-700 dark:text-gray-400">
          When the C2 Queue is available and important hotspots are identified based on full profiling from level 3,
          this stage proceeds. C2 applies optimization techniques to generate native code. This is the final stage and
          aims to maximize execution efficiency based on insights gained from extensive profiling data.
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 400">
        <!-- Background -->
        <rect width="900" height="400" fill="white"/>

        <!-- Start Circle -->
        <circle cx="60" cy="90" r="30" stroke="black" stroke-width="1" fill="white"/>

        <!-- Run arrow to Interpreter -->
        <line x1="90" y1="90" x2="180" y2="90" stroke="black" stroke-width="1"/>
        <polygon points="180,90 170,85 170,95" fill="black"/>
        <text x="135" y="80" font-family="Arial" font-size="14" text-anchor="middle">Run</text>

        <!-- Interpreter Box -->
        <rect x="180" y="60" width="120" height="60" fill="white" stroke="black" stroke-width="1"/>
        <text x="240" y="90" font-family="Arial" font-size="14" text-anchor="middle">Interpreter</text>

        <!-- Profiling Circle for Interpreter -->
        <circle cx="240" cy="30" r="25" fill="#cccccc" stroke="black" stroke-width="1"/>
        <text x="240" y="35" font-family="Arial" font-size="12" text-anchor="middle">Profiling</text>

        <!-- Line from Interpreter to Profiling -->
        <line x1="240" y1="60" x2="240" y2="55" stroke="black" stroke-width="1"/>

        <!-- Generate code quickly arrow -->
        <line x1="300" y1="90" x2="400" y2="90" stroke="black" stroke-width="1"/>
        <polygon points="400,90 390,85 390,95" fill="black"/>
        <text x="350" y="75" font-family="Arial" font-size="14" text-anchor="middle">Generate</text>
        <text x="350" y="110" font-family="Arial" font-size="14" text-anchor="middle">code quickly</text>

        <!-- C1 Box -->
        <rect x="400" y="60" width="120" height="60" fill="white" stroke="black" stroke-width="1"/>
        <text x="460" y="90" font-family="Arial" font-size="14" text-anchor="middle">C1</text>

        <!-- Profiling Circle for C1 -->
        <circle cx="460" cy="30" r="25" fill="#cccccc" stroke="black" stroke-width="1"/>
        <text x="460" y="35" font-family="Arial" font-size="12" text-anchor="middle">Profiling</text>

        <!-- Line from C1 to Profiling -->
        <line x1="460" y1="60" x2="460" y2="55" stroke="black" stroke-width="1"/>

        <!-- Generate highly optimized code arrow -->
        <line x1="520" y1="90" x2="650" y2="90" stroke="black" stroke-width="1"/>
        <polygon points="650,90 640,85 640,95" fill="black"/>
        <text x="585" y="75" font-family="Arial" font-size="14" text-anchor="middle">Generate highly</text>
        <text x="585" y="110" font-family="Arial" font-size="14" text-anchor="middle">optimized code</text>

        <!-- C2 Box -->
        <rect x="650" y="60" width="120" height="60" fill="white" stroke="black" stroke-width="1"/>
        <text x="710" y="90" font-family="Arial" font-size="14" text-anchor="middle">C2</text>

        <!-- Deoptimization Path - aligned with Interpreter's y-axis -->
        <rect x="180" y="200" rx="20" ry="20" width="120" height="40" fill="#cccccc" stroke="black" stroke-width="1"/>
        <text x="240" y="225" font-family="Arial" font-size="14" text-anchor="middle">Deoptimization</text>

        <!-- Improved Code Cache Cylinder -->
        <!-- Bottom ellipse (drawn first for layering) -->
        <ellipse cx="460" cy="300" rx="55" ry="20" fill="#d4e6f1" stroke="black" stroke-width="1"/>

        <!-- Cylinder body -->
        <rect x="405" y="220" width="110" height="80" fill="#d4e6f1" stroke="black" stroke-width="1"/>

        <!-- Top ellipse (drawn last to overlay properly) -->
        <ellipse cx="460" cy="220" rx="55" ry="20" fill="#d4e6f1" stroke="black" stroke-width="1"/>

        <!-- Side lines -->
        <line x1="405" y1="220" x2="405" y2="300" stroke="black" stroke-width="1"/>
        <line x1="515" y1="220" x2="515" y2="300" stroke="black" stroke-width="1"/>

        <!-- Label text - moved to cylinder body -->
        <text x="460" y="255" font-family="Arial" font-size="16" text-anchor="middle">Code</text>
        <text x="460" y="275" font-family="Arial" font-size="16" text-anchor="middle">Cache</text>

        <!-- Save compiled code from C1 -->
        <line x1="460" y1="120" x2="460" y2="200" stroke="black" stroke-width="1"/>
        <polygon points="460,200 455,190 465,190" fill="black"/>
        <text x="475" y="160" font-family="Arial" font-size="14" text-anchor="start">Save</text>
        <text x="475" y="180" font-family="Arial" font-size="14" text-anchor="start">compiled code</text>

        <!-- Save compiled code from C2 -->
        <line x1="710" y1="120" x2="710" y2="160" stroke="black" stroke-width="1"/>
        <line x1="710" y1="160" x2="515" y2="220" stroke="black" stroke-width="1"/>
        <polygon points="515,220 520,210 525,220" fill="black"/>
        <text x="720" y="160" font-family="Arial" font-size="14" text-anchor="start">Save</text>
        <text x="720" y="180" font-family="Arial" font-size="14" text-anchor="start">compiled code</text>

        <!-- Improved Arrow from Code Cache to Deoptimization -->
        <line x1="405" y1="250" x2="340" y2="250" stroke="black" stroke-width="1"/>
        <line x1="340" y1="250" x2="300" y2="225" stroke="black" stroke-width="1"/>
        <polygon points="300,225 308,223 306,232" fill="black"/>
        <text x="350" y="280" font-family="Arial" font-size="14" text-anchor="middle">Deoptimize</text>
        <text x="350" y="300" font-family="Arial" font-size="14" text-anchor="middle">compiled code</text>

        <!-- Arrow from Deoptimization to Interpreter -->
        <line x1="240" y1="200" x2="240" y2="120" stroke="black" stroke-width="1"/>
        <polygon points="240,120 235,130 245,130" fill="black"/>
        <text x="180" y="160" font-family="Arial" font-size="14" text-anchor="end">Interpret and</text>
        <text x="180" y="180" font-family="Arial" font-size="14" text-anchor="end">profile</text>
      </svg>

      <div class="mt-6">
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          The JVM continues with interpretation until reaching the Tier3CompileThreshold. After that, C1 compiles the
          method and continues profiling. Finally, C2 compiles when reaching the Tier4CompileThreshold. The JVM may
          decide to deoptimize C2-compiled code, in which case the process starts again from the beginning.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">JVM Warming Up</h2>
        <p class="text-gray-700 dark:text-gray-400">
          After class loading completes, important classes used during process startup enter the JVM cache for faster
          operation during runtime. Other classes go into the JVM cache on a per-request basis when requested.
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          Due to lazy class loading and Just In Time compilation, the first request in a Java web application has a
          slower average response time.
        </p>

        <p class="text-gray-700 dark:text-gray-400">
          To improve the slow response in the first request, all classes need to be pre-loaded into the JVM cache. This
          process is called JVM warming up.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Manual Implementation</h2>
        <p class="text-gray-700 dark:text-gray-400">
          This involves writing a custom class loader that directly uses classes used at application startup. For web
          applications, you can make the application send API requests to itself. In Spring Boot applications, you can
          use CommandLineRunner or ApplicationRunner to make internal calls during the Spring lifecycle process.
        </p>

        <ol class="max-w-md space-y-1 text-gray-700 list-decimal list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">ApplicationStartEvent</li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationEnvironmentPreparedEvent</li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationContextInitializedEvent</li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationPreparedEvent</li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationStartEvent</li>
          <li class="whitespace-nowrap mobile-wrap">AvailabilityChangeEvent(LivenessState.CORRECT)</li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationRunner, CommandLineRunner execution
            <ul class="ml-5 space-y-1 list-disc">
              <li class="whitespace-nowrap mobile-wrap">You can preload classes used in the application through internal
                calls to load them into the native cache.
              </li>
            </ul>
          </li>
          <li class="whitespace-nowrap mobile-wrap">ApplicationReadyEvent(ReadinessState.ACCEPTING_TRAFFIC)</li>
        </ol>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">References</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.baeldung.com/java-classloaders" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/java-classloaders</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.baeldung.com/java-compiled-interpreted" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/java-compiled-interpreted</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.baeldung.com/jvm-code-cache" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/jvm-code-cache</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.baeldung.com/java-jvm-warmup" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/java-jvm-warmup</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ClassLoader.html" class="text-blue-600 hover:underline dark:text-blue-400">https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/ClassLoader.html</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.ibm.com/docs/en/was-nd/8.5.5?topic=offload-java-virtual-machine-cache-custom-properties" class="text-blue-600 hover:underline dark:text-blue-400">https://www.ibm.com/docs/en/was-nd/8.5.5?topic=offload-java-virtual-machine-cache-custom-properties</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.baeldung.com/jvm-tiered-compilation" class="text-blue-600 hover:underline dark:text-blue-400">https://www.baeldung.com/jvm-tiered-compilation</a></li>
        </ul>
      </div>
    </div>
  `
};