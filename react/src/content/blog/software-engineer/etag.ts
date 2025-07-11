import type { BlogPost } from '../../../types/blog';

export const etag: BlogPost = {
  id: 'etag',
  category: 'software-engineer',
  title: 'Cache Control & ETags',
  description: 'Cache Control & ETags: Optimizing Web Performance.',
  date: '2025-05-01',
  updatedDate: '2025-05-01',
  tags: ['Web', 'Performance', 'Caching', 'ETag', 'Cache-Control', 'HTTP', 'Browser Cache'],
  image: '/etag.webp',
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
          <span class="ml-2 text-gray-400">Cache Control & ETags</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Cache Control & ETags: Optimizing Web Performance
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: May 1, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-caching" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is Web Caching?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#cache-control" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Cache-Control Header</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#cache-directives" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Common Cache Directives</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#etags" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What are ETags?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#etag-workflow" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">ETag Workflow</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#strong-weak" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Strong vs. Weak ETags</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#best-practices" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Best Practices</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-caching">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is Web Caching?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Web caching is a technique that stores copies of resources to serve future requests more quickly:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">It reduces bandwidth consumption and server load</li>
          <li class="whitespace-nowrap mobile-wrap">It improves page load times for returning visitors</li>
          <li class="whitespace-nowrap mobile-wrap">It occurs at various levels: browser, CDN, proxy, and server</li>
          <li class="whitespace-nowrap mobile-wrap">Effective caching strategies balance freshness with performance</li>
        </ul>
      </div>

      <!-- Caching Overview Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="800" height="300" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Web Caching Overview</text>

          <!-- Client -->
          <rect x="50" y="70" width="120" height="60" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="110" y="105" font-family="Arial" font-size="14" text-anchor="middle">Client</text>

          <!-- Browser Cache -->
          <rect x="220" y="70" width="120" height="60" fill="#e8f5e9" stroke="#388e3c" stroke-width="2" rx="8" ry="8"/>
          <text x="280" y="105" font-family="Arial" font-size="14" text-anchor="middle">Browser Cache</text>

          <!-- CDN/Proxy -->
          <rect x="390" y="70" width="120" height="60" fill="#fff3e0" stroke="#f57c00" stroke-width="2" rx="8" ry="8"/>
          <text x="450" y="105" font-family="Arial" font-size="14" text-anchor="middle">CDN/Proxy</text>

          <!-- Origin Server -->
          <rect x="560" y="70" width="120" height="60" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="8" ry="8"/>
          <text x="620" y="105" font-family="Arial" font-size="14" text-anchor="middle">Origin Server</text>

          <!-- Request Flow -->
          <line x1="120" y1="170" x2="230" y2="170" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
          <line x1="290" y1="170" x2="400" y2="170" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>
          <line x1="460" y1="170" x2="570" y2="170" stroke="#666" stroke-width="2" stroke-dasharray="5,5"/>

          <polygon points="225,165 235,170 225,175" fill="#666"/>
          <polygon points="395,165 405,170 395,175" fill="#666"/>
          <polygon points="565,165 575,170 565,175" fill="#666"/>

          <text x="175" y="190" font-family="Arial" font-size="12" text-anchor="middle">1. Request</text>
          <text x="345" y="190" font-family="Arial" font-size="12" text-anchor="middle">2. Cache Miss</text>
          <text x="515" y="190" font-family="Arial" font-size="12" text-anchor="middle">3. Forward</text>

          <!-- Response Flow -->
          <line x1="570" y1="210" x2="460" y2="210" stroke="#388e3c" stroke-width="2"/>
          <line x1="400" y1="210" x2="290" y2="210" stroke="#388e3c" stroke-width="2"/>
          <line x1="230" y1="210" x2="120" y2="210" stroke="#388e3c" stroke-width="2"/>

          <polygon points="465,205 455,210 465,215" fill="#388e3c"/>
          <polygon points="295,205 285,210 295,215" fill="#388e3c"/>
          <polygon points="125,205 115,210 125,215" fill="#388e3c"/>

          <text x="515" y="230" font-family="Arial" font-size="12" text-anchor="middle">4. Response</text>
          <text x="345" y="230" font-family="Arial" font-size="12" text-anchor="middle">5. Cache & Forward</text>
          <text x="175" y="230" font-family="Arial" font-size="12" text-anchor="middle">6. Cache & Display</text>

          <!-- Cache Headers -->
          <rect x="100" y="250" width="600" height="30" fill="#e0f7fa" stroke="#00838f" stroke-width="1" rx="5" ry="5"/>
          <text x="400" y="270" font-family="Arial" font-size="12" text-anchor="middle">Cache-Control and ETag headers control this entire flow</text>
        </svg>
      </div>

      <div class="mt-6" id="cache-control">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Cache-Control Header</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The Cache-Control header is the primary mechanism for defining caching policies in HTTP/1.1:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">It's sent by the server in HTTP responses to dictate how the resource should be cached</li>
          <li class="whitespace-nowrap mobile-wrap">It can also be sent in requests by clients to specify caching preferences</li>
          <li class="whitespace-nowrap mobile-wrap">It consists of one or more directives separated by commas</li>
          <li class="whitespace-nowrap mobile-wrap">Each directive controls a different aspect of caching behavior</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Example: <code>Cache-Control: max-age=3600, must-revalidate</code>
        </p>
      </div>

      <div class="mt-6" id="cache-directives">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Common Cache Directives</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Cache-Control directives define the specific behavior of caches:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Cacheability</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>public</strong> - Response can be stored by any cache</li>
            <li><strong>private</strong> - Response can only be stored in private cache (e.g., browser)</li>
            <li><strong>no-store</strong> - Response must not be stored in any cache</li>
            <li><strong>no-cache</strong> - Cache can store the response but must revalidate before use</li>
          </ul>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Expiration</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>max-age=seconds</strong> - Maximum time the resource is considered fresh</li>
            <li><strong>s-maxage=seconds</strong> - Like max-age but only for shared caches</li>
            <li><strong>stale-while-revalidate=seconds</strong> - Allows serving stale content while revalidating</li>
            <li><strong>stale-if-error=seconds</strong> - Allows serving stale content if revalidation fails</li>
          </ul>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Revalidation and Reloading</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>must-revalidate</strong> - Cache must verify stale resources before use</li>
            <li><strong>proxy-revalidate</strong> - Like must-revalidate but only for shared caches</li>
            <li><strong>immutable</strong> - Resource will not change; avoid revalidation</li>
          </ul>
        </div>
      </div>

      <div class="mt-6" id="etags">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What are ETags?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          ETags (Entity Tags) provide a mechanism for cache validation:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">ETags are unique identifiers assigned to specific versions of resources</li>
          <li class="whitespace-nowrap mobile-wrap">They're included in the HTTP response headers from the server</li>
          <li class="whitespace-nowrap mobile-wrap">Unlike time-based validation, ETags can detect changes regardless of timing</li>
          <li class="whitespace-nowrap mobile-wrap">They're particularly useful when resources change unpredictably</li>
          <li class="whitespace-nowrap mobile-wrap">ETags can be based on content hashes, timestamps, or version identifiers</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Example: <code>ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"</code>
        </p>
      </div>

      <div class="mt-6" id="etag-workflow">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">ETag Workflow</h2>
        <p class="text-gray-700 dark:text-gray-400">
          ETags enable conditional requests and efficient revalidation:
        </p>
      </div>

      <!-- ETag Workflow Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          <!-- Background -->
          <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="30" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">ETag Validation Workflow</text>

          <!-- Browser -->
          <rect x="100" y="70" width="160" height="320" fill="#e3f2fd" stroke="#1976d2" stroke-width="2" rx="8" ry="8"/>
          <text x="180" y="100" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Browser</text>

          <!-- Server -->
          <rect x="540" y="70" width="160" height="320" fill="#ffebee" stroke="#c62828" stroke-width="2" rx="8" ry="8"/>
          <text x="620" y="100" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Server</text>

          <!-- Initial Request -->
          <line x1="260" y1="140" x2="540" y2="140" stroke="#333" stroke-width="2"/>
          <polygon points="530,135 540,140 530,145" fill="#333"/>
          <text x="400" y="130" font-family="Arial" font-size="12" text-anchor="middle">1. Initial Request: GET /resource</text>

          <!-- Initial Response -->
          <line x1="540" y1="180" x2="260" y2="180" stroke="#388e3c" stroke-width="2"/>
          <polygon points="270,175 260,180 270,185" fill="#388e3c"/>
          <text x="400" y="170" font-family="Arial" font-size="12" text-anchor="middle">2. Response: 200 OK</text>
          <text x="400" y="195" font-family="Arial" font-size="11" text-anchor="middle">ETag: "abc123"</text>
          <text x="400" y="210" font-family="Arial" font-size="11" text-anchor="middle">Cache-Control: max-age=3600</text>

          <!-- Browser Caches -->
          <rect x="130" y="220" width="100" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="5" ry="5"/>
          <text x="180" y="240" font-family="Arial" font-size="11" text-anchor="middle">3. Cache resource</text>

          <!-- Later: Conditional Request -->
          <line x1="260" y1="280" x2="540" y2="280" stroke="#333" stroke-width="2"/>
          <polygon points="530,275 540,280 530,285" fill="#333"/>
          <text x="400" y="270" font-family="Arial" font-size="12" text-anchor="middle">4. Later: GET /resource</text>
          <text x="400" y="295" font-family="Arial" font-size="11" text-anchor="middle">If-None-Match: "abc123"</text>

          <!-- Not Modified -->
          <line x1="540" y1="340" x2="260" y2="340" stroke="#f57c00" stroke-width="2"/>
          <polygon points="270,335 260,340 270,345" fill="#f57c00"/>
          <text x="400" y="330" font-family="Arial" font-size="12" text-anchor="middle">5. Response: 304 Not Modified</text>

          <!-- Browser Uses Cache -->
          <rect x="130" y="350" width="100" height="30" fill="#c8e6c9" stroke="#388e3c" stroke-width="1" rx="5" ry="5"/>
          <text x="180" y="370" font-family="Arial" font-size="11" text-anchor="middle">6. Use cached copy</text>
        </svg>
      </div>

      <div class="mt-6" id="strong-weak">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Strong vs. Weak ETags</h2>
        <p class="text-gray-700 dark:text-gray-400">
          ETags come in two flavors with different validation guarantees:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Strong ETags</strong> guarantee byte-for-byte identity</li>
          <li class="whitespace-nowrap mobile-wrap">Format: <code>ETag: "abc123"</code></li>
          <li class="whitespace-nowrap mobile-wrap">Used when exact equality is required</li>
          <li class="whitespace-nowrap mobile-wrap">Appropriate for range requests and full downloads</li>
        </ul>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap"><strong>Weak ETags</strong> indicate semantic equivalence but not byte equality</li>
          <li class="whitespace-nowrap mobile-wrap">Format: <code>ETag: W/"abc123"</code> (note the W/ prefix)</li>
          <li class="whitespace-nowrap mobile-wrap">Used when content may vary slightly but remains functionally equivalent</li>
          <li class="whitespace-nowrap mobile-wrap">Good for content that includes timestamps, view counts, or other minor changing elements</li>
        </ul>
      </div>

      <div class="mt-6" id="best-practices">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Best Practices</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Optimize your caching strategy with these guidelines:
        </p>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Resource Type-Based Caching</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>Static assets</strong> (JS, CSS, images) - Long cache times with versioned URLs or ETags</li>
            <li><strong>HTML content</strong> - Shorter cache times with ETags for validation</li>
            <li><strong>API responses</strong> - Cache-Control based on data volatility</li>
            <li><strong>User-specific content</strong> - private directive with appropriate validation</li>
          </ul>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">ETag Implementation</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li>Generate ETags based on content hashes for accurate change detection</li>
            <li>Use weak ETags for content with minor, inconsequential variations</li>
            <li>Ensure ETag generation is consistent across server instances</li>
            <li>Combine ETags with appropriate Cache-Control directives</li>
          </ul>
        </div>

        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-4">
          <h3 class="font-bold text-lg text-gray-800 dark:text-gray-200">Common Patterns</h3>
          <ul class="space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-2">
            <li><strong>Immutable content</strong>: <code>Cache-Control: max-age=31536000, immutable</code></li>
            <li><strong>Regularly updated content</strong>: <code>Cache-Control: max-age=3600</code> with ETags</li>
            <li><strong>Dynamic but cacheable API</strong>: <code>Cache-Control: private, max-age=0, must-revalidate</code> with ETags</li>
            <li><strong>Uncacheable content</strong>: <code>Cache-Control: no-store</code></li>
          </ul>
        </div>
      </div>

      <!-- Code Example -->
      <div class="mt-8 rounded-lg overflow-hidden">
        <div class="bg-gray-800 text-white p-4">
          <h3 class="font-bold text-lg mb-2">ETag Implementation Example (Spring Boot 3)</h3>
        </div>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="etag-implementation-example-spring-boot-3" class="language-java"><span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.http.ResponseEntity</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.bind.annotation.GetMapping</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.bind.annotation.RequestMapping</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.bind.annotation.RestController</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.http.HttpStatus</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.http.CacheControl</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">org.springframework.web.context.request.WebRequest</span>;

<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.time.Instant</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.util.Map</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.util.concurrent.TimeUnit</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.nio.charset.StandardCharsets</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.security.MessageDigest</span>;
<span class="text-[#808080]">import</span> <span class="text-[#CE9178]">java.util.HexFormat</span>;

<span class="text-[#569CD6]">@RestController</span>
<span class="text-[#569CD6]">@RequestMapping</span>(<span class="text-[#CE9178]">"/api"</span>)
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">DataController</span> {

    <span class="text-[#569CD6]">@GetMapping</span>(<span class="text-[#CE9178]">"/data"</span>)
    <span class="text-[#808080]">public</span> ResponseEntity&lt;Map&lt;String, Object&gt;&gt; <span class="text-[#DCDCAA]">getData</span>(WebRequest webRequest) {
        <span class="text-[#6A9955]">// Create response data</span>
        Map&lt;String, Object&gt; data = Map.<span class="text-[#DCDCAA]">of</span>(
            <span class="text-[#CE9178]">"message"</span>, <span class="text-[#CE9178]">"Hello World"</span>,
            <span class="text-[#CE9178]">"timestamp"</span>, Instant.<span class="text-[#DCDCAA]">now</span>().toEpochMilli()
        );

        <span class="text-[#6A9955]">// Generate ETag from content</span>
        String jsonData = data.toString();
        String etag = <span class="text-[#DCDCAA]">generateETag</span>(jsonData);

        <span class="text-[#6A9955]">// Check if the request has a matching ETag</span>
        <span class="text-[#808080]">if</span> (webRequest.<span class="text-[#DCDCAA]">checkNotModified</span>(etag)) {
            <span class="text-[#808080]">return</span> ResponseEntity.<span class="text-[#DCDCAA]">status</span>(HttpStatus.<span class="text-[#DCDCAA]">NOT_MODIFIED</span>)
                    .eTag(etag)
                    .<span class="text-[#DCDCAA]">build</span>();
        }

        <span class="text-[#6A9955]">// Return response with ETag and Cache-Control</span>
        <span class="text-[#808080]">return</span> ResponseEntity.<span class="text-[#DCDCAA]">ok</span>()
                .eTag(etag)
                .cacheControl(CacheControl.<span class="text-[#DCDCAA]">maxAge</span>(3600, TimeUnit.<span class="text-[#DCDCAA]">SECONDS</span>))
                .<span class="text-[#DCDCAA]">body</span>(data);
    }

    <span class="text-[#808080]">private</span> String <span class="text-[#DCDCAA]">generateETag</span>(String content) {
        <span class="text-[#808080]">try</span> {
            MessageDigest digest = MessageDigest.<span class="text-[#DCDCAA]">getInstance</span>(<span class="text-[#CE9178]">"SHA-1"</span>);
            <span class="text-[#808080]">byte</span>[] hash = digest.<span class="text-[#DCDCAA]">digest</span>(content.<span class="text-[#DCDCAA]">getBytes</span>(StandardCharsets.<span class="text-[#DCDCAA]">UTF_8</span>));
            <span class="text-[#808080]">return</span> HexFormat.<span class="text-[#DCDCAA]">of</span>().<span class="text-[#DCDCAA]">formatHex</span>(hash);
        } <span class="text-[#808080]">catch</span> (Exception e) {
            <span class="text-[#808080]">throw new</span> <span class="text-[#DCDCAA]">RuntimeException</span>(<span class="text-[#CE9178]">"Failed to generate ETag"</span>, e);
        }
    }
}</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Effective caching with Cache-Control headers and ETags is essential for optimizing web performance. By implementing these mechanisms properly, you can:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Reduce bandwidth usage and server load</li>
          <li class="whitespace-nowrap mobile-wrap">Improve page load times for returning visitors</li>
          <li class="whitespace-nowrap mobile-wrap">Ensure content freshness while maximizing cache efficiency</li>
          <li class="whitespace-nowrap mobile-wrap">Create a better user experience with faster, more responsive websites</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Remember that caching is a balance between performance and freshness. The right strategy depends on your specific use case, content volatility, and user expectations.
        </p>
      </div>
    </div>
  </div>
  <br>
  `
};