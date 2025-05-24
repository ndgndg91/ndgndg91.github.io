import type { BlogPost } from '../../../types/blog';

export const RequestContextHolder: BlogPost = {
  id: 'request-context-holder',
  category: 'software-engineer',
  title: 'RequestContextHolder in Spring Boot: Access and Applications',
  description: 'RequestContextHolder is a powerful utility class in Spring Framework that provides access to the current HTTP request and response objects through a thread-local storage mechanism.',
  date: '2025-05-01',
  updatedDate: '2025-05-01',
  tags: ['Spring Boot', 'RequestContextHolder', 'ThreadLocal', 'Java', 'HTTP Request'],
  image: '/request-context-holder.webp',
  content: `
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
          <span class="ml-2 text-gray-400">RequestContextHolder</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        RequestContextHolder in Spring Boot: Access and Applications
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: May 1, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-rch" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is RequestContextHolder?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#how-it-works" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">How It Works</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#accessing-request" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Accessing Current Request</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#common-use-cases" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Common Use Cases</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#distributed-tracing" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Distributed Tracing</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#pitfalls" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Pitfalls and Considerations</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#best-practices" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Best Practices</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-rch">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is RequestContextHolder?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          RequestContextHolder is a powerful utility class in Spring Framework that provides access to the current HTTP request and response objects through a thread-local storage mechanism:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Part of Spring Web's core infrastructure (<code>org.springframework.web.context.request</code>)</li>
          <li class="whitespace-nowrap mobile-wrap">Offers static methods for retrieving the current ServletRequestAttributes</li>
          <li class="whitespace-nowrap mobile-wrap">Provides access to HttpServletRequest, HttpServletResponse, and HttpSession objects</li>
          <li class="whitespace-nowrap mobile-wrap">Works automatically in Spring's request processing chain</li>
          <li class="whitespace-nowrap mobile-wrap">Enables accessing request data from anywhere in your application</li>
        </ul>
      </div>

      <!-- Core Concept Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="800" height="300" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">RequestContextHolder Architecture</text>

          <!-- Incoming Request -->
          <path d="M50,150 L120,150" stroke="#333" stroke-width="2" />
          <polygon points="110,145 120,150 110,155" fill="#333"/>
          <text x="75" y="140" font-family="Arial" font-size="12" text-anchor="middle">HTTP Request</text>

          <!-- DispatcherServlet -->
          <rect x="120" y="120" width="150" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="195" y="155" font-family="Arial" font-size="14" text-anchor="middle">DispatcherServlet</text>

          <!-- ThreadLocal Store -->
          <rect x="340" y="80" width="160" height="140" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8" ry="8"/>
          <text x="420" y="105" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">ThreadLocal Storage</text>
          <text x="420" y="130" font-family="Arial" font-size="12" text-anchor="middle">RequestContextHolder</text>
          <rect x="360" y="140" width="120" height="30" fill="#e8f5e9" stroke="#388e3c" stroke-width="1" rx="5" ry="5"/>
          <text x="420" y="160" font-family="Arial" font-size="10" text-anchor="middle">ServletRequestAttributes</text>
          <rect x="370" y="180" width="100" height="25" fill="#e1f5fe" stroke="#0288d1" stroke-width="1" rx="5" ry="5"/>
          <text x="420" y="197" font-family="Arial" font-size="10" text-anchor="middle">HttpServletRequest</text>

          <!-- Application Components -->
          <rect x="550" y="60" width="120" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8" ry="8"/>
          <text x="610" y="85" font-family="Arial" font-size="12" text-anchor="middle">Controllers</text>

          <rect x="550" y="120" width="120" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8" ry="8"/>
          <text x="610" y="145" font-family="Arial" font-size="12" text-anchor="middle">Services</text>

          <rect x="550" y="180" width="120" height="40" fill="#f3e5f5" stroke="#7b1fa2" stroke-width="2" rx="8" ry="8"/>
          <text x="610" y="205" font-family="Arial" font-size="12" text-anchor="middle">Utilities</text>

          <!-- Connection Lines -->
          <path d="M270,150 L335,150" stroke="#333" stroke-width="2" />
          <polygon points="330,145 340,150 330,155" fill="#333"/>
          <text x="305" y="140" font-family="Arial" font-size="7" text-anchor="middle">Bind to ThreadLocal</text>

          <path d="M500,80 L550,80" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="540,75 550,80 540,85" fill="#333"/>

          <path d="M500,140 L550,140" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="540,135 550,140 540,145" fill="#333"/>

          <path d="M500,200 L550,200" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
          <polygon points="540,195 550,200 540,205" fill="#333"/>

          <text x="525" y="60" font-family="Arial" font-size="10" text-anchor="middle">Access</text>
          <text x="525" y="225" font-family="Arial" font-size="7" text-anchor="middle">From Anywhere</text>

          <!-- Thread Boundary -->
          <rect x="100" y="240" width="570" height="30" fill="#f5f5f5" stroke="#9e9e9e" stroke-width="1" rx="5" ry="5" stroke-dasharray="5,5"/>
          <text x="385" y="260" font-family="Arial" font-size="12" text-anchor="middle">Current Thread Boundary (Thread-local scope)</text>
        </svg>
      </div>

      <div class="mt-6" id="how-it-works">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">How It Works</h2>
        <p class="text-gray-700 dark:text-gray-400">
          RequestContextHolder leverages Java's ThreadLocal mechanism to store request context information:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">When a request enters Spring's <code>DispatcherServlet</code>, it binds the request to the current thread</li>
          <li class="whitespace-nowrap mobile-wrap">The request is wrapped in a <code>ServletRequestAttributes</code> object and stored in ThreadLocal storage</li>
          <li class="whitespace-nowrap mobile-wrap">Any code executing in the same thread can access this context information</li>
          <li class="whitespace-nowrap mobile-wrap">When the request is complete, Spring cleans up the ThreadLocal to prevent memory leaks</li>
          <li class="whitespace-nowrap mobile-wrap">Uses <code>inheritable ThreadLocal</code> for potential propagation to child threads</li>
        </ul>
      </div>

      <div class="mt-6" id="accessing-request">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Accessing Current Request</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Spring offers two primary methods for retrieving the current request context:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Method 1: getCurrentRequest() (Non-null)</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="get-current-request" class="language-java"><span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.context.request.RequestContextHolder</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.context.request.ServletRequestAttributes</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">javax.servlet.http.HttpServletRequest</span>;

<span class="text-[#808080]">public</span> HttpServletRequest <span class="text-[#DCDCAA]">getCurrentRequest</span>() {
    ServletRequestAttributes attributes = (ServletRequestAttributes)
        RequestContextHolder.<span class="text-[#DCDCAA]">currentRequestAttributes</span>();
    <span class="text-[#808080]">return</span> attributes.<span class="text-[#DCDCAA]">getRequest</span>();
}</code></pre>
          </div>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            This approach throws an <code>IllegalStateException</code> if called outside of a request context.
          </p>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Method 2: getRequestOptional() (Null-safe)</h3>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="get-request-optional" class="language-java"><span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.context.request.RequestContextHolder</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.context.request.ServletRequestAttributes</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">javax.servlet.http.HttpServletRequest</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.util.Optional</span>;

<span class="text-[#808080]">public</span> Optional&lt;HttpServletRequest&gt; <span class="text-[#DCDCAA]">getRequestOptional</span>() {
    <span class="text-[#808080]">return</span> Optional.<span class="text-[#DCDCAA]">ofNullable</span>(RequestContextHolder.<span class="text-[#DCDCAA]">getRequestAttributes</span>())
        .<span class="text-[#DCDCAA]">filter</span>(ServletRequestAttributes.<span class="text-[#808080]">class</span>::<span class="text-[#DCDCAA]">isInstance</span>)
        .<span class="text-[#DCDCAA]">map</span>(ServletRequestAttributes.<span class="text-[#808080]">class</span>::<span class="text-[#DCDCAA]">cast</span>)
        .<span class="text-[#DCDCAA]">map</span>(ServletRequestAttributes::<span class="text-[#DCDCAA]">getRequest</span>);
}</code></pre>
          </div>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            This approach safely returns an Optional, making it suitable for contexts where a request might not be available.
          </p>
        </div>
      </div>

      <div class="mt-6" id="common-use-cases">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Common Use Cases</h2>
        <p class="text-gray-700 dark:text-gray-400">
          RequestContextHolder enables numerous practical applications across Spring applications:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">1. Accessing Request Headers & Parameters</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Retrieve request metadata from anywhere in your application without parameter passing:
          </p>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="accessing-request-headers-and-parameters" class="language-java"><span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">getClientIP</span>() {
    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
        .<span class="text-[#DCDCAA]">currentRequestAttributes</span>()).<span class="text-[#DCDCAA]">getRequest</span>();

    String clientIP = request.<span class="text-[#DCDCAA]">getHeader</span>(<span class="text-[#CE9178]">"X-Forwarded-For"</span>);
    <span class="text-[#808080]">if</span> (clientIP == <span class="text-[#808080]">null</span> || clientIP.<span class="text-[#DCDCAA]">isEmpty</span>()) {
        clientIP = request.<span class="text-[#DCDCAA]">getRemoteAddr</span>();
    }
    <span class="text-[#808080]">return</span> clientIP;
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">2. User Context & Authentication Information</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Access authentication details or user context in service layers:
          </p>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="user-context-and-authentication-info" class="language-java"><span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.security.core.Authentication</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.security.core.context.SecurityContextHolder</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.security.core.userdetails.UserDetails</span>;

<span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">getCurrentUsername</span>() {
    Authentication authentication = SecurityContextHolder.<span class="text-[#DCDCAA]">getContext</span>().<span class="text-[#DCDCAA]">getAuthentication</span>();
    <span class="text-[#808080]">if</span> (authentication != <span class="text-[#808080]">null</span> && authentication.<span class="text-[#DCDCAA]">isAuthenticated</span>()) {
        <span class="text-[#808080]">return</span> authentication.<span class="text-[#DCDCAA]">getName</span>();
    }
    <span class="text-[#808080]">return</span> <span class="text-[#CE9178]">"anonymous"</span>;
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">3. Locale & Internationalization</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Access user's locale for internationalization purposes:
          </p>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="local-and-i18n" class="language-java"><span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.context.i18n.LocaleContextHolder</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.util.Locale</span>;

<span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">getLocalizedMessage</span>(String messageKey) {
    Locale userLocale = LocaleContextHolder.<span class="text-[#DCDCAA]">getLocale</span>();
    <span class="text-[#808080]">return</span> messageSource.<span class="text-[#DCDCAA]">getMessage</span>(messageKey, <span class="text-[#808080]">null</span>, userLocale);
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">4. Request-Scoped Auditing</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Add audit information to operations performed within a request:
          </p>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="request-scoped-auditing" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">AuditingService</span> {

    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">logOperation</span>(String operation, String entityType, String entityId) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
            .<span class="text-[#DCDCAA]">currentRequestAttributes</span>()).<span class="text-[#DCDCAA]">getRequest</span>();

        String username = <span class="text-[#DCDCAA]">getCurrentUsername</span>();
        String clientIP = request.<span class="text-[#DCDCAA]">getRemoteAddr</span>();
        String userAgent = request.<span class="text-[#DCDCAA]">getHeader</span>(<span class="text-[#CE9178]">"User-Agent"</span>);
        String requestId = request.<span class="text-[#DCDCAA]">getHeader</span>(<span class="text-[#CE9178]">"X-Request-ID"</span>);

        <span class="text-[#6A9955]">// Log or store audit record</span>
        auditRepository.<span class="text-[#DCDCAA]">save</span>(<span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">AuditEntry</span>(username, operation, entityType,
            entityId, clientIP, userAgent, requestId, Instant.<span class="text-[#DCDCAA]">now</span>()));
    }
}</code></pre>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">5. Request URL Building</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Construct absolute URLs based on the current request:
          </p>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="request-url-building" class="language-java"><span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">buildAbsoluteUrl</span>(String relativePath) {
    HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
        .<span class="text-[#DCDCAA]">currentRequestAttributes</span>()).<span class="text-[#DCDCAA]">getRequest</span>();

    String scheme = request.<span class="text-[#DCDCAA]">getScheme</span>();
    String serverName = request.<span class="text-[#DCDCAA]">getServerName</span>();
    <span class="text-[#808080]">int</span> serverPort = request.<span class="text-[#DCDCAA]">getServerPort</span>();
    String contextPath = request.<span class="text-[#DCDCAA]">getContextPath</span>();

    <span class="text-[#6A9955]">// Build URL, handling standard ports (80/443)</span>
    StringBuilder url = <span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">StringBuilder</span>();
    url.<span class="text-[#DCDCAA]">append</span>(scheme).<span class="text-[#DCDCAA]">append</span>(<span class="text-[#CE9178]">"://"</span>).<span class="text-[#DCDCAA]">append</span>(serverName);

    <span class="text-[#808080]">if</span> ((scheme.<span class="text-[#DCDCAA]">equals</span>(<span class="text-[#CE9178]">"http"</span>) && serverPort != 80) ||
        (scheme.<span class="text-[#DCDCAA]">equals</span>(<span class="text-[#CE9178]">"https"</span>) && serverPort != 443)) {
        url.<span class="text-[#DCDCAA]">append</span>(<span class="text-[#CE9178]">":"</span>).<span class="text-[#DCDCAA]">append</span>(serverPort);
    }

    <span class="text-[#808080]">if</span> (contextPath != <span class="text-[#808080]">null</span> && !contextPath.<span class="text-[#DCDCAA]">isEmpty</span>()) {
        url.<span class="text-[#DCDCAA]">append</span>(contextPath);
    }

    <span class="text-[#808080]">if</span> (!relativePath.<span class="text-[#DCDCAA]">startsWith</span>(<span class="text-[#CE9178]">"/"</span>)) {
        url.<span class="text-[#DCDCAA]">append</span>(<span class="text-[#CE9178]">"/"</span>);
    }
    url.<span class="text-[#DCDCAA]">append</span>(relativePath);

    <span class="text-[#808080]">return</span> url.<span class="text-[#DCDCAA]">toString</span>();
}</code></pre>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Additional Use Cases</h2>
      <p class="text-gray-700 dark:text-gray-400">
        Beyond the common applications, RequestContextHolder enables several advanced scenarios:
      </p>
      <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
        <li class="whitespace-nowrap mobile-wrap"><strong>Tenant Identification</strong> - Extract and propagate tenant IDs in multi-tenant applications</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Rate Limiting</strong> - Track request rates per user or client for rate limiting</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Request Correlation</strong> - Correlate logs, metrics, and traces across system boundaries</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Feature Toggles</strong> - Apply feature flags based on request attributes</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Contextual Caching</strong> - Adapt cache behavior based on request properties</li>
      </ul>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Multi-Tenant Context Using RequestContextHolder</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="multi-tenant-context-using" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">TenantContext</span> {

    <span class="text-[#808080]">private static final</span> String TENANT_HEADER = <span class="text-[#CE9178]">"X-Tenant-ID"</span>;
    <span class="text-[#808080]">private static final</span> ThreadLocal&lt;String&gt; CURRENT_TENANT = <span class="text-[#808080]">new</span> ThreadLocal&lt;&gt;();

    <span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">getCurrentTenant</span>() {
        <span class="text-[#808080]">if</span> (CURRENT_TENANT.<span class="text-[#DCDCAA]">get</span>() == <span class="text-[#808080]">null</span>) {
            <span class="text-[#6A9955]">// Try to extract from request</span>
            <span class="text-[#DCDCAA]">extractFromRequest</span>();
        }
        <span class="text-[#808080]">return</span> CURRENT_TENANT.<span class="text-[#DCDCAA]">get</span>();
    }

    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">setCurrentTenant</span>(String tenantId) {
        CURRENT_TENANT.<span class="text-[#DCDCAA]">set</span>(tenantId);
    }

    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">clear</span>() {
        CURRENT_TENANT.<span class="text-[#DCDCAA]">remove</span>();
    }

    <span class="text-[#808080]">private void</span> <span class="text-[#DCDCAA]">extractFromRequest</span>() {
        <span class="text-[#808080]">try</span> {
            ServletRequestAttributes attributes = (ServletRequestAttributes)
                RequestContextHolder.<span class="text-[#DCDCAA]">getRequestAttributes</span>();

            <span class="text-[#808080]">if</span> (attributes != <span class="text-[#808080]">null</span>) {
                HttpServletRequest request = attributes.<span class="text-[#DCDCAA]">getRequest</span>();
                String tenantId = request.<span class="text-[#DCDCAA]">getHeader</span>(TENANT_HEADER);

                <span class="text-[#808080]">if</span> (tenantId != <span class="text-[#808080]">null</span> && !tenantId.<span class="text-[#DCDCAA]">isEmpty</span>()) {
                    CURRENT_TENANT.<span class="text-[#DCDCAA]">set</span>(tenantId);
                }
            }
        } <span class="text-[#808080]">catch</span> (Exception e) {
            <span class="text-[#6A9955]">// Safely handle case where no request is available</span>
        }
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Creating a Filter for Automatic Processing</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Set up a filter to automatically handle trace IDs for all requests:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="creating-filter-automatic-processing" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">TraceIdFilter</span> <span class="text-[#808080]">implements</span> Filter {

    <span class="text-[#808080]">private static final</span> String TRACE_ID_HEADER = <span class="text-[#CE9178]">"X-Trace-ID"</span>;

    <span class="text-[#808080]">@Autowired</span>
    <span class="text-[#808080]">private</span> TraceIdHolder traceIdHolder;

    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">doFilter</span>(ServletRequest request, ServletResponse response, FilterChain chain)
            <span class="text-[#808080]">throws</span> IOException, ServletException {

        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        <span class="text-[#6A9955]">// Try to extract trace ID from incoming request</span>
        String traceId = httpRequest.<span class="text-[#DCDCAA]">getHeader</span>(TRACE_ID_HEADER);

        <span class="text-[#6A9955]">// If no trace ID exists, generate a new one</span>
        <span class="text-[#808080]">if</span> (traceId == <span class="text-[#808080]">null</span> || traceId.<span class="text-[#DCDCAA]">isEmpty</span>()) {
            traceId = traceIdHolder.<span class="text-[#DCDCAA]">generateTraceId</span>();
        } <span class="text-[#808080]">else</span> {
            traceIdHolder.<span class="text-[#DCDCAA]">extractAndSetTraceId</span>(httpRequest);
        }

        <span class="text-[#6A9955]">// Add the trace ID to the response headers for debugging</span>
        httpResponse.<span class="text-[#DCDCAA]">setHeader</span>(TRACE_ID_HEADER, traceId);

        <span class="text-[#808080]">try</span> {
            <span class="text-[#6A9955]">// Continue the filter chain with trace ID in context</span>
            chain.<span class="text-[#DCDCAA]">doFilter</span>(request, response);
        } <span class="text-[#808080]">finally</span> {
            <span class="text-[#6A9955]">// Clean up thread local to prevent memory leaks</span>
            traceIdHolder.<span class="text-[#DCDCAA]">clear</span>();
        }
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">ThreadLocal Memory Leaks</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          ThreadLocal variables can cause memory leaks if not properly managed:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="thread-local-memory-leak" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">ThreadLocalCleanupFilter</span> <span class="text-[#808080]">implements</span> Filter {

    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">doFilter</span>(ServletRequest request, ServletResponse response, FilterChain chain)
            <span class="text-[#808080]">throws</span> IOException, ServletException {
        <span class="text-[#808080]">try</span> {
            chain.<span class="text-[#DCDCAA]">doFilter</span>(request, response);
        } <span class="text-[#808080]">finally</span> {
            <span class="text-[#6A9955]">// Clear all ThreadLocal resources</span>
            RequestContextHolder.<span class="text-[#DCDCAA]">resetRequestAttributes</span>();
            SecurityContextHolder.<span class="text-[#DCDCAA]">clearContext</span>();
            MDC.<span class="text-[#DCDCAA]">clear</span>();
            <span class="text-[#6A9955]">// Clear any custom ThreadLocal variables</span>
            CustomThreadLocal.<span class="text-[#DCDCAA]">clear</span>();
        }
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Spring Security Integration</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          When using RequestContextHolder with Spring Security, consider these patterns:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="spring-security-integration" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">SecurityContextAwareService</span> {

    <span class="text-[#808080]">public</span> UserDetails <span class="text-[#DCDCAA]">getCurrentUser</span>() {
        <span class="text-[#808080]">try</span> {
            <span class="text-[#6A9955]">// Get authentication from SecurityContextHolder</span>
            Authentication authentication = SecurityContextHolder.<span class="text-[#DCDCAA]">getContext</span>().<span class="text-[#DCDCAA]">getAuthentication</span>();
            <span class="text-[#808080]">if</span> (authentication != <span class="text-[#808080]">null</span> && authentication.<span class="text-[#DCDCAA]">isAuthenticated</span>()) {
                <span class="text-[#808080]">return</span> (UserDetails) authentication.<span class="text-[#DCDCAA]">getPrincipal</span>();
            }
        } <span class="text-[#808080]">catch</span> (Exception e) {
            <span class="text-[#6A9955]">// Handle security context not available</span>
            log.<span class="text-[#DCDCAA]">warn</span>(<span class="text-[#CE9178]">"Security context not available"</span>, e);
        }
        <span class="text-[#808080]">return</span> <span class="text-[#808080]">null</span>;
    }

    <span class="text-[#808080]">public</span> String <span class="text-[#DCDCAA]">getCurrentUsername</span>() {
        UserDetails user = <span class="text-[#DCDCAA]">getCurrentUser</span>();
        <span class="text-[#808080]">return</span> user != <span class="text-[#808080]">null</span> ? user.<span class="text-[#DCDCAA]">getUsername</span>() : <span class="text-[#CE9178]">"anonymous"</span>;
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Async Processing with CompletableFuture</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Handle context propagation in async operations:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="async-processing-with-completable-future" class="language-java"><span class="text-[#808080]">@Service</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">AsyncService</span> {

    <span class="text-[#808080]">@Async</span>
    <span class="text-[#808080]">public</span> CompletableFuture&lt;String&gt; <span class="text-[#DCDCAA]">processAsync</span>() {
        <span class="text-[#6A9955]">// Capture current context</span>
        RequestAttributes context = RequestContextHolder.<span class="text-[#DCDCAA]">currentRequestAttributes</span>();
        SecurityContext securityContext = SecurityContextHolder.<span class="text-[#DCDCAA]">getContext</span>();

        <span class="text-[#808080]">return</span> CompletableFuture.<span class="text-[#DCDCAA]">supplyAsync</span>(() -> {
            <span class="text-[#808080]">try</span> {
                <span class="text-[#6A9955]">// Set context in async thread</span>
                RequestContextHolder.<span class="text-[#DCDCAA]">setRequestAttributes</span>(context);
                SecurityContextHolder.<span class="text-[#DCDCAA]">setContext</span>(securityContext);

                <span class="text-[#6A9955]">// Perform async operation</span>
                <span class="text-[#808080]">return</span> <span class="text-[#DCDCAA]">doAsyncWork</span>();
            } <span class="text-[#808080]">finally</span> {
                <span class="text-[#6A9955]">// Clean up context</span>
                RequestContextHolder.<span class="text-[#DCDCAA]">resetRequestAttributes</span>();
                SecurityContextHolder.<span class="text-[#DCDCAA]">clearContext</span>();
            }
        });
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Async Configuration with Context Propagation</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Configure async execution to properly handle context propagation:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="async-configuration-with-context-propagation" class="language-java"><span class="text-[#808080]">@Configuration</span>
<span class="text-[#808080]">@EnableAsync</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">AsyncConfig</span> <span class="text-[#808080]">implements</span> AsyncConfigurer {

    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public</span> Executor <span class="text-[#DCDCAA]">getAsyncExecutor</span>() {
        ThreadPoolTaskExecutor executor = <span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">ThreadPoolTaskExecutor</span>();
        executor.<span class="text-[#DCDCAA]">setCorePoolSize</span>(5);
        executor.<span class="text-[#DCDCAA]">setMaxPoolSize</span>(10);
        executor.<span class="text-[#DCDCAA]">setQueueCapacity</span>(25);
        executor.<span class="text-[#DCDCAA]">setThreadNamePrefix</span>(<span class="text-[#CE9178]">"Async-"</span>);
        executor.<span class="text-[#DCDCAA]">setTaskDecorator</span>(<span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">ContextCopyingDecorator</span>());
        executor.<span class="text-[#DCDCAA]">initialize</span>();
        <span class="text-[#808080]">return</span> executor;
    }

    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public</span> AsyncUncaughtExceptionHandler <span class="text-[#DCDCAA]">getAsyncUncaughtExceptionHandler</span>() {
        <span class="text-[#808080]">return</span> <span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">SimpleAsyncUncaughtExceptionHandler</span>();
    }
}

<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">ContextCopyingDecorator</span> <span class="text-[#808080]">implements</span> TaskDecorator {
    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public</span> Runnable <span class="text-[#DCDCAA]">decorate</span>(Runnable runnable) {
        RequestAttributes context = RequestContextHolder.<span class="text-[#DCDCAA]">currentRequestAttributes</span>();
        SecurityContext securityContext = SecurityContextHolder.<span class="text-[#DCDCAA]">getContext</span>();
        Map&lt;String, String&gt; mdcContext = MDC.<span class="text-[#DCDCAA]">getCopyOfContextMap</span>();

        <span class="text-[#808080]">return</span> () -> {
            <span class="text-[#808080]">try</span> {
                RequestContextHolder.<span class="text-[#DCDCAA]">setRequestAttributes</span>(context);
                SecurityContextHolder.<span class="text-[#DCDCAA]">setContext</span>(securityContext);
                <span class="text-[#808080]">if</span> (mdcContext != <span class="text-[#808080]">null</span>) {
                    MDC.<span class="text-[#DCDCAA]">setContextMap</span>(mdcContext);
                }
                runnable.<span class="text-[#DCDCAA]">run</span>();
            } <span class="text-[#808080]">finally</span> {
                RequestContextHolder.<span class="text-[#DCDCAA]">resetRequestAttributes</span>();
                SecurityContextHolder.<span class="text-[#DCDCAA]">clearContext</span>();
                MDC.<span class="text-[#DCDCAA]">clear</span>();
            }
        };
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Handling Nested Async Operations</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Manage context propagation in nested async operations:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="handling-nested-async-operations" class="language-java"><span class="text-[#808080]">@Service</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">NestedAsyncService</span> {

    <span class="text-[#808080]">@Autowired</span>
    <span class="text-[#808080]">private</span> AsyncService asyncService;

    <span class="text-[#808080]">@Async</span>
    <span class="text-[#808080]">public</span> CompletableFuture&lt;List&lt;String&gt;&gt; <span class="text-[#DCDCAA]">processNestedAsync</span>() {
        <span class="text-[#6A9955]">// Capture context at the top level</span>
        RequestAttributes context = RequestContextHolder.<span class="text-[#DCDCAA]">currentRequestAttributes</span>();
        SecurityContext securityContext = SecurityContextHolder.<span class="text-[#DCDCAA]">getContext</span>();

        <span class="text-[#808080]">return</span> CompletableFuture.<span class="text-[#DCDCAA]">supplyAsync</span>(() -> {
            <span class="text-[#808080]">try</span> {
                <span class="text-[#6A9955]">// Set context for the first level</span>
                RequestContextHolder.<span class="text-[#DCDCAA]">setRequestAttributes</span>(context);
                SecurityContextHolder.<span class="text-[#DCDCAA]">setContext</span>(securityContext);

                <span class="text-[#6A9955]">// Create multiple async tasks</span>
                List&lt;CompletableFuture&lt;String&gt;&gt; futures = <span class="text-[#808080]">new</span> <span class="text-[#DCDCAA]">ArrayList</span>&lt;&gt;();
                <span class="text-[#808080]">for</span> (<span class="text-[#808080]">int</span> i = 0; i &lt; 3; i++) {
                    futures.<span class="text-[#DCDCAA]">add</span>(asyncService.<span class="text-[#DCDCAA]">processAsync</span>());
                }

                <span class="text-[#6A9955]">// Wait for all tasks to complete</span>
                <span class="text-[#808080]">return</span> futures.<span class="text-[#DCDCAA]">stream</span>()
                    .<span class="text-[#DCDCAA]">map</span>(CompletableFuture::<span class="text-[#DCDCAA]">join</span>)
                    .<span class="text-[#DCDCAA]">collect</span>(Collectors.<span class="text-[#DCDCAA]">toList</span>());
            } <span class="text-[#808080]">finally</span> {
                <span class="text-[#6A9955]">// Clean up context</span>
                RequestContextHolder.<span class="text-[#DCDCAA]">resetRequestAttributes</span>();
                SecurityContextHolder.<span class="text-[#DCDCAA]">clearContext</span>();
            }
        });
    }
}</code></pre>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
        <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Async Exception Handling</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Handle exceptions in async operations while maintaining context:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="async-exception-handling" class="language-java"><span class="text-[#808080]">@Component</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">AsyncExceptionHandler</span> <span class="text-[#808080]">implements</span> AsyncUncaughtExceptionHandler {

    <span class="text-[#808080]">private static final</span> Logger logger = LoggerFactory.<span class="text-[#DCDCAA]">getLogger</span>(AsyncExceptionHandler.<span class="text-[#808080]">class</span>);

    <span class="text-[#808080]">@Override</span>
    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">handleUncaughtException</span>(Throwable ex, Method method, Object... params) {
        <span class="text-[#808080]">try</span> {
            <span class="text-[#6A9955]">// Try to get request context for logging</span>
            RequestAttributes context = RequestContextHolder.<span class="text-[#DCDCAA]">getRequestAttributes</span>();
            <span class="text-[#808080]">if</span> (context <span class="text-[#808080]">instanceof</span> ServletRequestAttributes) {
                HttpServletRequest request = ((ServletRequestAttributes) context).<span class="text-[#DCDCAA]">getRequest</span>();
                logger.<span class="text-[#DCDCAA]">error</span>(<span class="text-[#CE9178]">"Async error in {} for request {}: {}"</span>,
                    method.<span class="text-[#DCDCAA]">getName</span>(),
                    request.<span class="text-[#DCDCAA]">getRequestURI</span>(),
                    ex.<span class="text-[#DCDCAA]">getMessage</span>(),
                    ex);
            } <span class="text-[#808080]">else</span> {
                logger.<span class="text-[#DCDCAA]">error</span>(<span class="text-[#CE9178]">"Async error in {}: {}"</span>,
                    method.<span class="text-[#DCDCAA]">getName</span>(),
                    ex.<span class="text-[#DCDCAA]">getMessage</span>(),
                    ex);
            }
        } <span class="text-[#808080]">catch</span> (Exception e) {
            logger.<span class="text-[#DCDCAA]">error</span>(<span class="text-[#CE9178]">"Error handling async exception: {}"</span>, e.<span class="text-[#DCDCAA]">getMessage</span>(), e);
        }
    }
}</code></pre>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
      <p class="text-gray-700 dark:text-gray-400">
        RequestContextHolder is a powerful mechanism in Spring Boot applications that enables access to HTTP request information from anywhere in your application. By leveraging this tool effectively, you can:
      </p>
      <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
        <li class="whitespace-nowrap mobile-wrap">Reduce method parameter bloat by accessing request data from service layers</li>
        <li class="whitespace-nowrap mobile-wrap">Implement cross-cutting concerns like distributed tracing and logging</li>
        <li class="whitespace-nowrap mobile-wrap">Support multi-tenant applications and contextual processing</li>
        <li class="whitespace-nowrap mobile-wrap">Build more maintainable and modular applications</li>
      </ul>
      <p class="text-gray-700 dark:text-gray-400 mt-3">
        When using RequestContextHolder, always be mindful of thread boundaries, proper cleanup, and appropriate abstraction to avoid common pitfalls. With careful implementation, it's a valuable tool in any Spring developer's toolkit.
      </p>
    </div>
  </div>
  <br>
    `
};