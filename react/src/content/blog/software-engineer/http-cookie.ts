import type { BlogPost } from '../../../types/blog';

export const httpCookie: BlogPost = {
  id: 'http-cookie',
  category: 'software-engineer',
  title: 'HTTP Cookie: The Core Mechanism of Web State Management',
  description: 'Explore the fundamentals of HTTP Cookies, their security attributes, and how they are used in modern web development.',
  date: '2025-05-26',
  updatedDate: '2025-05-26',
  tags: ['HTTP', 'Cookie', 'Web Security', 'Session Management', 'Web Development', 'Browser', 'Security'],
  image: 'http-cookie.webp',
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
          <span class="ml-2 text-gray-400">HTTP Cookie</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        HTTP Cookie: The Core Mechanism of Web State Management
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: May 26, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-cookie" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is HTTP Cookie?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#cookie-structure" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Cookie Structure</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#cookie-attributes" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Cookie Attributes</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#cookie-types" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Cookie Types</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#security-considerations" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Security Considerations</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#modern-alternatives" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Modern Alternatives</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#implementation" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Implementation Examples</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-cookie">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is HTTP Cookie?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          An HTTP cookie (also known as web cookie or browser cookie) is a small piece of data that a server sends to a user's web browser. The browser stores it and sends it back with later requests to the same server.
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">HTTP is a stateless protocol, so cookies are needed to remember state information</li>
          <li class="whitespace-nowrap mobile-wrap">Used for user authentication, shopping carts, user preferences, and more</li>
          <li class="whitespace-nowrap mobile-wrap">Core mechanism for maintaining state between server and client</li>
          <li class="whitespace-nowrap mobile-wrap">Standardized in RFC 6265</li>
        </ul>
      </div>

      <!-- Cookie Flow Diagram -->
    <div class="my-8">
      <svg viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
        <!-- Background -->
        <rect width="1000" height="600" fill="#f8f9fa" rx="10" ry="10"/>
        
        <!-- Title -->
        <text x="500" y="40" font-family="Arial" font-size="20" text-anchor="middle" font-weight="bold">HTTP Cookie Flow</text>
        
        <!-- Client Browser -->
        <rect x="80" y="100" width="200" height="400" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
        <text x="180" y="130" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Client Browser</text>
        
        <!-- Server -->
        <rect x="720" y="100" width="200" height="400" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="820" y="130" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Web Server</text>
        
        <!-- Step 1: Initial Request -->
        <line x1="280" y1="180" x2="720" y2="180" stroke="#333" stroke-width="2"/>
        <polygon points="710,175 720,180 710,185" fill="#333"/>
        <text x="500" y="170" font-family="Arial" font-size="14" text-anchor="middle">1. Initial HTTP Request</text>
        <text x="500" y="195" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">GET /login HTTP/1.1</text>
        
        <!-- Step 2: Response with Set-Cookie -->
        <line x1="720" y1="250" x2="280" y2="250" stroke="#333" stroke-width="2"/>
        <polygon points="290,245 280,250 290,255" fill="#333"/>
        <text x="500" y="240" font-family="Arial" font-size="14" text-anchor="middle">2. Response with Set-Cookie Header</text>
        <text x="500" y="265" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Set-Cookie: sessionId=abc123; HttpOnly; Secure</text>
        
        <!-- Browser stores cookie -->
        <rect x="90" y="290" width="180" height="40" fill="#f0f8ff" stroke="#4169e1" stroke-width="1" rx="5" ry="5"/>
        <text x="180" y="315" font-family="Arial" font-size="12" text-anchor="middle">Cookie Storage</text>
        
        <!-- Step 3: Subsequent Request with Cookie -->
        <line x1="280" y1="380" x2="720" y2="380" stroke="#52c41a" stroke-width="2"/>
        <polygon points="710,375 720,380 710,385" fill="#52c41a"/>
        <text x="500" y="370" font-family="Arial" font-size="14" text-anchor="middle" fill="#52c41a">3. Subsequent Request with Cookie</text>
        <text x="500" y="395" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Cookie: sessionId=abc123</text>
        
        <!-- Step 4: Server Response -->
        <line x1="720" y1="450" x2="280" y2="450" stroke="#52c41a" stroke-width="2"/>
        <polygon points="290,445 280,450 290,455" fill="#52c41a"/>
        <text x="500" y="440" font-family="Arial" font-size="14" text-anchor="middle" fill="#52c41a">4. Server Response</text>
        <text x="500" y="465" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">HTTP/1.1 200 OK</text>
      </svg>
    </div>

      <div class="mt-6" id="cookie-structure">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Cookie Structure</h2>
      <p class="text-gray-700 dark:text-gray-400">
        HTTP Cookies consist of a name-value pair and several attributes:
      </p>
      
      <div class="relative group mt-4">
        <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="cookie-structure-example" class="language-http"><span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">name=value; Domain=example.com; Path=/; Expires=Wed, 09 Jun 2021 10:18:14 GMT; Secure; HttpOnly; SameSite=Strict</span></code></pre>
      </div>

      <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
        <li class="whitespace-nowrap mobile-wrap"><strong>name=value</strong>: The core data of the cookie</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Domain</strong>: Specifies the domain to which the cookie is sent</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Path</strong>: Specifies the path within the domain</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Expires/Max-Age</strong>: Cookie expiration time</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>Secure</strong>: Only sent over HTTPS</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>HttpOnly</strong>: Blocks JavaScript access</li>
        <li class="whitespace-nowrap mobile-wrap"><strong>SameSite</strong>: Prevents CSRF attacks</li>
      </ul>
    </div>

      <div class="mt-6" id="cookie-attributes">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Cookie Attributes Detailed Analysis</h2>
        
        <div class="mt-5">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Domain Attribute</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Specifies the domain to which the cookie will be sent. If not set, it defaults to the current domain only.
          </p>
          <div class="relative group mt-3">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="domain-attribute-examples" class="language-http"><span class="text-[#6A9955]">// Valid only on current host</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123</span>

<span class="text-[#6A9955]">// Valid on example.com and all subdomains</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; Domain=example.com</span>

<span class="text-[#6A9955]">// Valid only on specific subdomain</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; Domain=api.example.com</span></code></pre>
          </div>
        </div>

        <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Path Attribute</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Specifies the URL path for which the cookie should be sent.
        </p>
        <div class="relative group mt-3">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="path-attribute-examples" class="language-http"><span class="text-[#6A9955]">// Sent with all paths</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; Path=/</span>

<span class="text-[#6A9955]">// Sent only with /admin path and sub-paths</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">adminToken=xyz789; Path=/admin</span>

<span class="text-[#6A9955]">// Sent only with specific API path</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">apiKey=api123; Path=/api/v1</span></code></pre>
        </div>
      </div>

      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Expires and Max-Age</h3>
        <p class="text-gray-700 dark:text-gray-400 mt-2">
          Determine the cookie's lifetime. Without both attributes, the cookie becomes a session cookie.
        </p>
        <div class="relative group mt-3">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="expiration-examples" class="language-http"><span class="text-[#6A9955]">// Session cookie (deleted when browser closes)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123</span>

<span class="text-[#6A9955]">// Using Expires (absolute time)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">rememberMe=true; Expires=Wed, 09 Jun 2026 10:18:14 GMT</span>

<span class="text-[#6A9955]">// Using Max-Age (relative time in seconds)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">token=xyz789; Max-Age=3600</span> <span class="text-[#6A9955]">// 1 hour</span>

<span class="text-[#6A9955]">// Deleting cookie (set to past time)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT</span></code></pre>
        </div>
      </div>

        <div class="mt-5">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">SameSite Attribute</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            An important security attribute that prevents CSRF attacks by controlling when cookies are sent with cross-site requests.
          </p>
          <div class="relative group mt-3">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="samesite-examples" class="language-http"><span class="text-[#6A9955]">// Strict: Only sent with same-site requests</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; SameSite=Strict</span>

<span class="text-[#6A9955]">// Lax: Allows cross-site requests for top-level navigation</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; SameSite=Lax</span>

<span class="text-[#6A9955]">// None: Sent with all cross-site requests (Secure required)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">trackingId=xyz789; SameSite=None; Secure</span></code></pre>
          </div>
        </div>
      </div>

      <div class="mt-6" id="security-considerations">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Security Considerations</h2>
      
      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Major Security Threats</h3>
        
        <div class="mt-4">
          <h4 class="text-xl font-medium text-gray-900 dark:text-white">1. Session Hijacking</h4>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Attack where an attacker steals a user's session cookie and impersonates them.
          </p>
          <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
            <li class="whitespace-nowrap mobile-wrap">Use HTTPS (Secure attribute)</li>
            <li class="whitespace-nowrap mobile-wrap">Prevent XSS with HttpOnly attribute</li>
            <li class="whitespace-nowrap mobile-wrap">Regular session token regeneration</li>
            <li class="whitespace-nowrap mobile-wrap">IP address validation</li>
          </ul>
        </div>

        <div class="mt-4">
          <h4 class="text-xl font-medium text-gray-900 dark:text-white">2. Cross-Site Request Forgery (CSRF)</h4>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Attack where malicious sites send unwanted requests using the user's credentials.
          </p>
          <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
            <li class="whitespace-nowrap mobile-wrap">Use SameSite attribute</li>
            <li class="whitespace-nowrap mobile-wrap">Implement CSRF tokens</li>
            <li class="whitespace-nowrap mobile-wrap">Validate Referer header</li>
            <li class="whitespace-nowrap mobile-wrap">Double Submit Cookie pattern</li>
          </ul>
        </div>

        <div class="mt-4">
          <h4 class="text-xl font-medium text-gray-900 dark:text-white">3. Cross-Site Scripting (XSS)</h4>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Attack where malicious scripts execute and steal cookies from users.
          </p>
          <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
            <li class="whitespace-nowrap mobile-wrap">Block JavaScript access with HttpOnly attribute</li>
            <li class="whitespace-nowrap mobile-wrap">Validate and escape input data</li>
            <li class="whitespace-nowrap mobile-wrap">Apply Content Security Policy (CSP)</li>
            <li class="whitespace-nowrap mobile-wrap">Regular security updates</li>
          </ul>
        </div>
      </div>

      <div class="mt-7">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Security Best Practices</h3>
        <div class="relative group mt-3">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="security-best-practices" class="language-http"><span class="text-[#6A9955]">// Maximum security authentication cookie</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">sessionId=abc123; Secure; HttpOnly; SameSite=Strict; Max-Age=3600</span>

<span class="text-[#6A9955]">// API token cookie</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">apiToken=xyz789; Secure; HttpOnly; SameSite=Lax; Path=/api</span>

<span class="text-[#6A9955]">// User preference cookie</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">theme=dark; Secure; SameSite=Lax; Max-Age=31536000</span></code></pre>
        </div>
      </div>
    </div>

    <!-- SameSite Comparison Table -->
    <div class="my-8">
      <table class="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
        <thead>
          <tr class="bg-gray-100 dark:bg-gray-700">
            <th class="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">SameSite Value</th>
            <th class="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Cross-Site GET</th>
            <th class="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Cross-Site POST</th>
            <th class="px-4 py-2 text-left text-gray-700 dark:text-gray-300 font-semibold">Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-gray-300 dark:border-gray-600">
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">Strict</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">❌ Not sent</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">❌ Not sent</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">Maximum security, auth tokens</td>
          </tr>
          <tr class="border-t border-gray-300 dark:border-gray-600">
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">Lax</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">✅ Top-level navigation only</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">❌ Not sent</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">Default value, general use</td>
          </tr>
          <tr class="border-t border-gray-300 dark:border-gray-600">
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium">None</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">✅ Always sent</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">✅ Always sent</td>
            <td class="px-4 py-2 text-gray-700 dark:text-gray-300">Third-party integration, embeds</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-6" id="cookie-types">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Cookie Types</h2>
      
      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">1. Session Cookie vs Persistent Cookie</h3>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Session Cookie</strong>: Cookie without Expires or Max-Age, deleted when browser closes</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Persistent Cookie</strong>: Cookie with expiration time set, persists until specified time</li>
        </ul>
      </div>

      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">2. First-party vs Third-party Cookie</h3>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>First-party Cookie</strong>: Set by the domain currently being visited</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Third-party Cookie</strong>: Set by a different domain (ads, tracking purposes)</li>
        </ul>
      </div>

      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">3. Secure Cookie vs HttpOnly Cookie</h3>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Secure Cookie</strong>: Only transmitted over HTTPS connections</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>HttpOnly Cookie</strong>: Cannot be accessed via JavaScript, prevents XSS attacks</li>
        </ul>
      </div>
    </div>

      <div class="mt-6" id="modern-alternatives">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Modern Alternatives</h2>
        
        <div class="mt-5">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">1. Web Storage API</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            Client-side storage provided by browsers for storing data locally.
          </p>
          
          <div class="mt-4">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">localStorage</h4>
            <div class="relative group mt-3">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="localstorage-example" class="language-javascript"><span class="text-[#6A9955]">// Store data</span>
localStorage.<span class="text-[#DCDCAA]">setItem</span>(<span class="text-[#CE9178]">'userPreference'</span>, <span class="text-[#CE9178]">'dark-theme'</span>);

<span class="text-[#6A9955]">// Read data</span>
<span class="text-[#808080]">const</span> preference = localStorage.<span class="text-[#DCDCAA]">getItem</span>(<span class="text-[#CE9178]">'userPreference'</span>);

<span class="text-[#6A9955]">// Remove data</span>
localStorage.<span class="text-[#DCDCAA]">removeItem</span>(<span class="text-[#CE9178]">'userPreference'</span>);</code></pre>
            </div>
            <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
              <li class="whitespace-nowrap mobile-wrap">Persists after browser closure</li>
              <li class="whitespace-nowrap mobile-wrap">Not automatically sent with HTTP requests</li>
              <li class="whitespace-nowrap mobile-wrap">Only accessible via JavaScript</li>
              <li class="whitespace-nowrap mobile-wrap">Isolated per domain</li>
            </ul>
          </div>

          <div class="mt-4">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">sessionStorage</h4>
            <div class="relative group mt-3">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="sessionstorage-example" class="language-javascript"><span class="text-[#6A9955]">// Store temporary data</span>
sessionStorage.<span class="text-[#DCDCAA]">setItem</span>(<span class="text-[#CE9178]">'tempData'</span>, <span class="text-[#CE9178]">'temporary-value'</span>);

<span class="text-[#6A9955]">// Read data</span>
<span class="text-[#808080]">const</span> tempData = sessionStorage.<span class="text-[#DCDCAA]">getItem</span>(<span class="text-[#CE9178]">'tempData'</span>);

<span class="text-[#6A9955]">// Automatically deleted when tab closes</span></code></pre>
            </div>
            <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
              <li class="whitespace-nowrap mobile-wrap">Deleted when tab/window closes</li>
              <li class="whitespace-nowrap mobile-wrap">Not automatically sent with HTTP requests</li>
              <li class="whitespace-nowrap mobile-wrap">Independent storage space per tab</li>
            </ul>
          </div>
        </div>

        <div class="mt-5">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">2. JWT (JSON Web Token)</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-2">
            A stateless authentication method that includes state information within the token itself.
          </p>
          <div class="relative group mt-3">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="jwt-example" class="language-javascript"><span class="text-[#6A9955]">// JWT token storage (using HttpOnly cookie)</span>
<span class="text-[#569CD6]">Set-Cookie:</span> <span class="text-[#CE9178]">token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict</span>

<span class="text-[#6A9955]">// Or sent via Authorization header</span>
<span class="text-[#569CD6]">Authorization:</span> <span class="text-[#CE9178]">Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span></code></pre>
          </div>
          <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
            <li class="whitespace-nowrap mobile-wrap">No server state storage required</li>
            <li class="whitespace-nowrap mobile-wrap">Suitable for microservices architecture</li>
            <li class="whitespace-nowrap mobile-wrap">Contains claim-based information</li>
            <li class="whitespace-nowrap mobile-wrap">Controllable token expiration time</li>
          </ul>

          <div class="mt-6">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">JWT Storage Options: Security Analysis</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              When using JWT for authentication, choosing the right storage method is crucial for security. Let's compare the main options:
            </p>

            <div class="mt-4">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white">1. HttpOnly Cookies (Recommended)</h5>
              <div class="relative group mt-3">
                <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                </button>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="jwt-httponly-cookie" class="language-javascript"><span class="text-[#6A9955]">// Server-side: Set JWT in HttpOnly cookie</span>
res.<span class="text-[#DCDCAA]">cookie</span>(<span class="text-[#CE9178]">'accessToken'</span>, jwtToken, {
    httpOnly: <span class="text-[#808080]">true</span>,    <span class="text-[#6A9955]">// Prevents XSS attacks</span>
    secure: <span class="text-[#808080]">true</span>,      <span class="text-[#6A9955]">// HTTPS only</span>
    sameSite: <span class="text-[#CE9178]">'strict'</span>, <span class="text-[#6A9955]">// Prevents CSRF attacks</span>
    maxAge: <span class="text-[#B5CEA8">15</span> * <span class="text-[#B5CEA8">60</span> * <span class="text-[#B5CEA8">1000</span>  <span class="text-[#6A9955]">// 15 minutes</span>
});

<span class="text-[#6A9955]">// Client-side: Cannot access via JavaScript (more secure)</span>
<span class="text-[#6A9955]">// Token is automatically sent with requests</span></code></pre>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-3">
                <p class="text-sm text-green-800 dark:text-green-200 font-medium">✅ Pros:</p>
                <ul class="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                  <li>• Protected from XSS attacks (JavaScript cannot access)</li>
                  <li>• Automatic transmission with requests</li>
                  <li>• CSRF protection with SameSite attribute</li>
                  <li>• Server-controlled expiration</li>
                </ul>
              </div>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-2">
                <p class="text-sm text-yellow-800 dark:text-yellow-200 font-medium">⚠️ Cons:</p>
                <ul class="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                  <li>• Potential CSRF attacks if not properly configured</li>
                  <li>• Limited control from client-side</li>
                  <li>• Sent with all requests to the domain</li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white">2. localStorage (Common but Less Secure)</h5>
              <div class="relative group mt-3">
                <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                </button>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="jwt-localstorage" class="language-javascript"><span class="text-[#6A9955]">// Store JWT in localStorage</span>
localStorage.<span class="text-[#DCDCAA]">setItem</span>(<span class="text-[#CE9178]">'accessToken'</span>, jwtToken);

<span class="text-[#6A9955]">// Manual token management required</span>
<span class="text-[#808080]">const</span> token = localStorage.<span class="text-[#DCDCAA]">getItem</span>(<span class="text-[#CE9178]">'accessToken'</span>);
fetch(<span class="text-[#CE9178">'/api/protected'</span>, {
    headers: {
        <span class="text-[#CE9178]">'Authorization'</span>: <span class="text-[#CE9178]">Bearer \${token}</span>
    }
});</code></pre>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-3">
                <p class="text-sm text-green-800 dark:text-green-200 font-medium">✅ Pros:</p>
                <ul class="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                  <li>• Full client-side control</li>
                  <li>• No CSRF vulnerability</li>
                  <li>• Flexible token management</li>
                  <li>• Works well with SPAs</li>
                </ul>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mt-2">
                <p class="text-sm text-red-800 dark:text-red-200 font-medium">❌ Cons:</p>
                <ul class="text-sm text-red-700 dark:text-red-300 mt-2 space-y-1">
                  <li>• Vulnerable to XSS attacks</li>
                  <li>• Accessible via JavaScript</li>
                  <li>• Manual token refresh handling</li>
                  <li>• Persists until manually cleared</li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white">3. Memory Storage (Most Secure for Short-lived Tokens)</h5>
              <div class="relative group mt-3">
                <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                </button>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="jwt-memory" class="language-javascript"><span class="text-[#6A9955]">// Store JWT in memory (JavaScript variable)</span>
<span class="text-[#808080]">let</span> accessToken = <span class="text-[#808080]">null</span>;

<span class="text-[#6A9955]">// Set token after login</span>
<span class="text-[#808080]">function</span> <span class="text-[#DCDCAA]">setAccessToken</span>(token) {
    accessToken = token;
}

<span class="text-[#6A9955]">// Use token for requests</span>
<span class="text-[#808080]">function</span> <span class="text-[#DCDCAA]">authenticatedFetch</span>(url, options = {}) {
    <span class="text-[#808080]">return</span> fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            <span class="text-[#CE9178]">'Authorization'</span>: <span class="text-[#CE9178]">Bearer \${accessToken}</span>
        }
    });
}</code></pre>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-3">
                <p class="text-sm text-green-800 dark:text-green-200 font-medium">✅ Pros:</p>
                <ul class="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                  <li>• Highest security (cleared on page refresh)</li>
                  <li>• No XSS persistence</li>
                  <li>• No CSRF vulnerability</li>
                  <li>• Complete control over token lifecycle</li>
                </ul>
              </div>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-2">
                <p class="text-sm text-yellow-800 dark:text-yellow-200 font-medium">⚠️ Cons:</p>
                <ul class="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                  <li>• Lost on page refresh</li>
                  <li>• Complex state management required</li>
                  <li>• Poor user experience for long sessions</li>
                </ul>
              </div>
            </div>

            <div class="mt-6">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white">Best Practice: Dual Token Strategy</h5>
              <p class="text-gray-700 dark:text-gray-400 mt-2">
                The most secure approach combines multiple strategies:
              </p>
              <div class="relative group mt-3">
                <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                  </svg>
                </button>
                <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="jwt-dual-token" class="language-javascript"><span class="text-[#6A9955]">// 1. Short-lived access token in memory (15 minutes)</span>
<span class="text-[#808080]">let</span> accessToken = <span class="text-[#808080]">null</span>;

<span class="text-[#6A9955]">// 2. Long-lived refresh token in HttpOnly cookie (7 days)</span>
res.<span class="text-[#DCDCAA]">cookie</span>(<span class="text-[#CE9178]">'refreshToken'</span>, refreshToken, {
    httpOnly: <span class="text-[#808080]">true</span>,
    secure: <span class="text-[#808080]">true</span>,
    sameSite: <span class="text-[#CE9178]">'strict'</span>,
    maxAge: <span class="text-[#B5CEA8">7</span> * <span class="text-[#B5CEA8">24</span> * <span class="text-[#B5CEA8">60</span> * <span class="text-[#B5CEA8">60</span> * <span class="text-[#B5CEA8">1000</span> <span class="text-[#6A9955]">// 7 days</span>
});

<span class="text-[#6A9955]">// 3. Automatic token refresh</span>
<span class="text-[#808080]">async function</span> <span class="text-[#DCDCAA]">refreshAccessToken</span>() {
    <span class="text-[#808080]">const</span> response = <span class="text-[#808080]">await</span> fetch(<span class="text-[#CE9178">'/auth/refresh'</span>, {
        method: <span class="text-[#CE9178]">'POST'</span>,
        credentials: <span class="text-[#CE9178]">'include'</span> <span class="text-[#6A9955]">// Include HttpOnly cookies</span>
    });
    <span class="text-[#808080]">const</span> { accessToken: newToken } = <span class="text-[#808080]">await</span> response.<span class="text-[#DCDCAA]">json</span>();
    accessToken = newToken;
}</code></pre>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-3">
                <p class="text-sm text-blue-800 dark:text-blue-200 font-medium">🔒 Security Benefits:</p>
                <ul class="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                  <li>• Access token expires quickly (limits XSS damage)</li>
                  <li>• Refresh token protected from XSS (HttpOnly)</li>
                  <li>• Refresh token protected from CSRF (SameSite)</li>
                  <li>• Automatic token rotation</li>
                  <li>• Graceful handling of token expiration</li>
                </ul>
              </div>
            </div>

            <div class="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h5 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Security Recommendation Summary</h5>
              <div class="space-y-2 text-sm">
                <div class="flex items-center text-green-600 dark:text-green-400">
                  <span class="mr-2">🥇</span>
                  <span><strong>Best:</strong> Dual token strategy (short-lived access token in memory + HttpOnly refresh token)</span>
                </div>
                <div class="flex items-center text-blue-600 dark:text-blue-400">
                  <span class="mr-2">🥈</span>
                  <span><strong>Good:</strong> HttpOnly cookie with proper security attributes</span>
                </div>
                <div class="flex items-center text-yellow-600 dark:text-yellow-400">
                  <span class="mr-2">🥉</span>
                  <span><strong>Acceptable:</strong> Memory storage (for short sessions)</span>
                </div>
                <div class="flex items-center text-red-600 dark:text-red-400">
                  <span class="mr-2">❌</span>
                  <span><strong>Avoid:</strong> localStorage/sessionStorage for sensitive tokens</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6" id="implementation">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Implementation Examples</h2>
      
      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">1. JavaScript Cookie Utilities</h3>
        <div class="relative group mt-3">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="javascript-cookie-utils" class="language-javascript"><span class="text-[#6A9955]">// Cookie utility functions</span>
<span class="text-[#808080]">function</span> <span class="text-[#DCDCAA]">setCookie</span>(name, value, days) {
    <span class="text-[#808080]">const</span> expires = <span class="text-[#808080]">new</span> Date();
    expires.<span class="text-[#DCDCAA]">setTime</span>(expires.<span class="text-[#DCDCAA]">getTime</span>() + (days * <span class="text-[#B5CEA8]">24</span> * <span class="text-[#B5CEA8]">60</span> * <span class="text-[#B5CEA8]">60</span> * <span class="text-[#B5CEA8]">1000</span>));
    document.cookie = <span class="text-[#CE9178]">\${name}\${value}; expires=\${expires.toUTCString()}; path=/; SameSite=Lax</span>;
}</code></pre>
        </div>
      </div>

      <div class="mt-5">
        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">2. Spring Boot ResponseCookie Example</h3>
        <div class="relative group mt-3">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto"><code id="spring-cookie-example" class="language-java"><span class="text-[#6A9955]">// Example of setting secure authentication cookie in Spring Boot</span>
<span class="text-[#808080]">@PostMapping</span>(<span class="text-[#CE9178]">"/login"</span>)
<span class="text-[#808080]">public</span> ResponseEntity&lt;Void&gt; <span class="text-[#DCDCAA]">login</span>(<span class="text-[#808080]">@RequestBody</span> LoginRequest request) {
    <span class="text-[#6A9955]">// Create JWT token after successful authentication</span>
    String jwtToken = jwtService.<span class="text-[#DCDCAA]">generateToken</span>(request.getUsername());
    
    <span class="text-[#6A9955]">// Create secure cookie with JWT token</span>
    ResponseCookie cookie = ResponseCookie
        .<span class="text-[#DCDCAA]">from</span>(<span class="text-[#CE9178]">"auth_token"</span>, jwtToken)
        .<span class="text-[#DCDCAA]">httpOnly</span>(<span class="text-[#808080]">true</span>)      <span class="text-[#6A9955]">// Prevents JavaScript access</span>
        .<span class="text-[#DCDCAA]">secure</span>(<span class="text-[#808080]">true</span>)        <span class="text-[#6A9955]">// HTTPS only</span>
        .<span class="text-[#DCDCAA]">sameSite</span>(<span class="text-[#CE9178]">"Strict"</span>)  <span class="text-[#6A9955]">// Prevents CSRF attacks</span>
        .<span class="text-[#DCDCAA]">path</span>(<span class="text-[#CE9178]">"/"</span>)           <span class="text-[#6A9955]">// Available for all paths</span>
        .<span class="text-[#DCDCAA]">maxAge</span>(Duration.<span class="text-[#DCDCAA]">ofHours</span>(<span class="text-[#B5CEA8]">1</span>))  <span class="text-[#6A9955]">// 1 hour expiration</span>
        .<span class="text-[#DCDCAA]">build</span>();

    <span class="text-[#6A9955]">// Return response with cookie</span>
    <span class="text-[#808080]">return</span> ResponseEntity
        .<span class="text-[#DCDCAA]">ok</span>()
        .<span class="text-[#DCDCAA]">header</span>(<span class="text-[#CE9178]">HttpHeaders.SET_COOKIE"</span>, cookie.<span class="text-[#DCDCAA]">toString</span>())
        .<span class="text-[#DCDCAA]">build</span>();
}

<span class="text-[#6A9955]">// Example of clearing cookie on logout</span>
<span class="text-[#808080]">@PostMapping</span>(<span class="text-[#CE9178]">"/logout"</span>)
<span class="text-[#808080]">public</span> ResponseEntity&lt;Void&gt; <span class="text-[#DCDCAA]">logout</span>() {
    ResponseCookie cookie = ResponseCookie
        .<span class="text-[#DCDCAA]">from</span>(<span class="text-[#CE9178]">"auth_token"</span>, <span class="text-[#CE9178]">""</span>)
        .<span class="text-[#DCDCAA]">httpOnly</span>(<span class="text-[#808080]">true</span>)
        .<span class="text-[#DCDCAA]">secure</span>(<span class="text-[#808080]">true</span>)
        .<span class="text-[#DCDCAA]">sameSite</span>(<span class="text-[#CE9178]">"Strict"</span>)
        .<span class="text-[#DCDCAA]">path</span>(<span class="text-[#CE9178]">"/"</span>)
        .<span class="text-[#DCDCAA]">maxAge</span>(Duration.<span class="text-[#DCDCAA]">ZERO</span>)  <span class="text-[#6A9955]">// Expire immediately</span>
        .<span class="text-[#DCDCAA]">build</span>();

    <span class="text-[#808080]">return</span> ResponseEntity
        .<span class="text-[#DCDCAA]">ok</span>()
        .<span class="text-[#DCDCAA]">header</span>(<span class="text-[#CE9178]">HttpHeaders.SET_COOKIE"</span>, cookie.<span class="text-[#DCDCAA]">toString</span>())
        .<span class="text-[#DCDCAA]">build</span>();
}</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          This example demonstrates how to create and manage secure cookies in a Spring Boot application. The code shows:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Setting a secure authentication cookie with JWT token</li>
          <li class="whitespace-nowrap mobile-wrap">Implementing proper security attributes (HttpOnly, Secure, SameSite)</li>
          <li class="whitespace-nowrap mobile-wrap">Cookie expiration management</li>
          <li class="whitespace-nowrap mobile-wrap">Proper cookie clearing on logout</li>
        </ul>
      </div>
    </div>

    <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
      <p class="text-gray-700 dark:text-gray-400">
        HTTP Cookies remain a fundamental technology for web state management, despite the emergence of modern alternatives. Understanding their structure, security attributes, and proper implementation is crucial for building secure web applications.
      </p>
      <p class="text-gray-700 dark:text-gray-400 mt-3">
        While newer technologies like Web Storage API and JWT tokens offer different advantages, cookies continue to be the preferred choice for authentication and session management due to their automatic transmission with HTTP requests and robust security features when properly configured.
      </p>
      <p class="text-gray-700 dark:text-gray-400 mt-3">
        The key to secure cookie implementation lies in using appropriate attributes like HttpOnly, Secure, and SameSite, combined with proper validation and regular security audits.
      </p>
    </div>
  </div>
</div>
<br>
  `
};
