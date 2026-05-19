import type { BlogPost } from '../../../types/blog';

export const csrfHttpOnlyDanger: BlogPost = {
  id: 'csrf-httponly-danger',
  category: 'software-engineer',
  title: 'The Hidden Danger of HttpOnly CSRF Cookies in Django',
  description: 'An incident report on how applying the HttpOnly flag to a CSRF cookie can inadvertently break the Double Submit Cookie pattern and lock users out of your application.',
  date: '2026-05-19',
  updatedDate: '2026-05-19',
  tags: ['Security', 'CSRF', 'Django', 'Web Development', 'Incident Report', 'HttpOnly'],
  image: 'csrf-httponly-danger.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">CSRF & HttpOnly</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Incident Report
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        The Hidden Danger of HttpOnly CSRF Cookies in Django
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Published: May 19, 2026</div>
    </header>

    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h3 class="font-bold text-lg mb-2 text-gray-900 dark:text-white">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 dark:text-gray-300 list-disc list-inside">
        <li class="whitespace-nowrap mobile-wrap"><a href="#the-incident" class="hover:text-gray-900 dark:hover:text-white">The Incident: Locked Out by Security</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#the-cause" class="hover:text-gray-900 dark:hover:text-white">The Cause: Breaking the Double Submit Cookie Pattern</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#the-blind-spot" class="hover:text-gray-900 dark:hover:text-white">The Blind Spot: Why QA Missed It</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#lessons-learned" class="hover:text-gray-900 dark:hover:text-white">Lessons Learned and Next Steps</a></li>
      </ul>
    </div>

    <section class="mt-8">
      <h2 id="the-incident" class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-800">1. The Incident: Locked Out by Security</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Recently, based on a security vulnerability scan, an attempt was made to harden a web application by applying the <code>HttpOnly=True</code> flag to the CSRF cookie (setting <code>CSRF_COOKIE_HTTPONLY = True</code> in Django). The intention was straightforward: protect the CSRF token from Cross-Site Scripting (XSS) attacks by making it inaccessible to client-side scripts.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        However, almost immediately after this configuration was deployed to the staging environment, a critical bug emerged: <strong>users were unable to log out or perform any state-changing actions</strong>. Every attempt to trigger a POST request resulted in a <code>403 Forbidden</code> response with the error: <code>"CSRF Failed: CSRF token missing or incorrect."</code>
      </p>
    </section>

    <section class="mt-8">
      <h2 id="the-cause" class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-800">2. The Cause: Breaking the Double Submit Cookie Pattern</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        To understand why this happened, we must look at how modern web frameworks handle CSRF protection. Django, by default, relies on the <strong>Double Submit Cookie</strong> pattern.
      </p>
      
      <div class="my-8 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 950 480" class="max-w-full h-auto rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <!-- Background -->
          <rect width="950" height="480" fill="none"/>
          
          <!-- Browser Side -->
          <rect x="50" y="80" width="280" height="350" fill="#e3f2fd" stroke="#2196f3" stroke-width="2" rx="10" ry="10" class="dark:fill-blue-900/20 dark:stroke-blue-400"/>
          <text x="190" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" class="fill-gray-900 dark:fill-white">Browser / Client</text>
          
          <!-- Server Side -->
          <rect x="620" y="80" width="280" height="350" fill="#f1f8e9" stroke="#8bc34a" stroke-width="2" rx="10" ry="10" class="dark:fill-green-900/20 dark:stroke-green-400"/>
          <text x="760" y="115" font-family="Arial" font-size="18" font-weight="bold" text-anchor="middle" class="fill-gray-900 dark:fill-white">Django Server</text>
          
          <!-- 1. Set-Cookie -->
          <path d="M620 160 L330 160" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <text x="475" y="150" font-family="Arial" font-size="12" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400">1. Set-Cookie (csrftoken)</text>
          
          <!-- Cookie Store -->
          <rect x="100" y="145" width="180" height="40" fill="#fff" stroke="#2196f3" stroke-dasharray="4" rx="5" ry="5" class="dark:fill-gray-900 dark:stroke-blue-400"/>
          <text x="190" y="170" font-family="Arial" font-size="12" text-anchor="middle" class="fill-blue-600 dark:fill-blue-300">Cookie Store</text>
          
          <!-- HttpOnly Label -->
          <text x="190" y="205" font-family="Arial" font-size="11" text-anchor="middle" font-weight="bold" fill="#d32f2f" class="dark:fill-red-400">HttpOnly = True</text>
          
          <!-- JS Engine -->
          <rect x="100" y="290" width="180" height="40" fill="#fff9c4" stroke="#fbc02d" rx="5" ry="5" class="dark:fill-yellow-900/20 dark:stroke-yellow-400"/>
          <text x="190" y="315" font-family="Arial" font-size="12" text-anchor="middle" class="fill-gray-900 dark:fill-white">JavaScript (document.cookie)</text>
          
          <!-- Blocked Icon -->
          <path d="M190 290 L190 220" stroke="#d32f2f" stroke-width="2" stroke-dasharray="4"/>
          <circle cx="190" cy="250" r="15" fill="#fff" stroke="#d32f2f" stroke-width="2" class="dark:fill-gray-800"/>
          <text x="190" y="257" font-family="Arial" font-size="20" font-weight="bold" text-anchor="middle" fill="#d32f2f">X</text>
          <text x="245" y="255" font-family="Arial" font-size="11" text-anchor="middle" fill="#d32f2f" font-weight="bold">BLOCKED</text>
          
          <!-- 2. Request -->
          <path d="M330 365 L620 365" stroke="#d32f2f" stroke-width="2" marker-end="url(#arrowhead-red)"/>
          <text x="475" y="355" font-family="Arial" font-size="12" text-anchor="middle" fill="#d32f2f" font-weight="bold">2. POST Request</text>
          <text x="475" y="385" font-family="Arial" font-size="11" text-anchor="middle" class="fill-gray-600 dark:fill-gray-400">Header: X-CSRFToken: [MISSING]</text>
          
          <!-- 3. Result -->
          <rect x="670" y="315" width="180" height="60" fill="#ffebee" stroke="#d32f2f" stroke-width="2" rx="5" ry="5" class="dark:fill-red-900/20 dark:stroke-red-400"/>
          <text x="760" y="340" font-family="Arial" font-size="13" font-weight="bold" text-anchor="middle" fill="#d32f2f">403 Forbidden</text>
          <text x="760" y="360" font-family="Arial" font-size="11" text-anchor="middle" fill="#d32f2f">CSRF Token Check Failed</text>
          
          <!-- Definitions -->
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
            <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#d32f2f" />
            </marker>
          </defs>
        </svg>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Django's <strong>Double Submit Cookie</strong> pattern works as follows:
      </p>
      <ol class="list-decimal list-inside mb-4 ml-4 space-y-2 text-gray-900 dark:text-gray-100">
        <li>The server generates a random CSRF token and sends it as a cookie (e.g., <code>csrftoken</code>).</li>
        <li>The client-side application (React, Vue, etc.) reads this cookie value using JavaScript (<code>document.cookie</code>).</li>
        <li>The client then includes this value in a custom HTTP header (e.g., <code>X-CSRFToken</code>) for all non-GET requests.</li>
        <li>The server compares the token in the cookie with the token in the header. If they match, the request is authorized.</li>
      </ol>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        By setting <code>HttpOnly=True</code>, we effectively blocked JavaScript's access to that cookie. Consequently, the frontend could no longer read the token to populate the <code>X-CSRFToken</code> header. The server received the request with a missing header, failed the validation, and rightfully rejected the action.
      </p>
    </section>

    <section class="mt-8">
      <h2 id="the-blind-spot" class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-800">3. The Blind Spot: Why QA Missed It</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The pressing question was: <em>Why wasn't this caught in Development or QA environments?</em>
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Investigation revealed a common pitfall: to simplify automated testing, the Dev and QA environments were using a custom middleware to bypass CSRF checks entirely.
      </p>
      <div class="relative bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm font-mono mb-4 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
        <pre><code># Custom middleware used only in Dev/QA
class DisableCSRF(MiddlewareMixin):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)</code></pre>
      </div>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        This bypass created a massive blind spot. The security configuration was technically deployed, but its destructive side effects were invisible until it reached Staging, where the full security policy was active.
      </p>
    </section>

    <section class="mt-8">
      <h2 id="lessons-learned" class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400 border-b pb-2 border-gray-200 dark:border-gray-800">4. Lessons Learned and Next Steps</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        The configuration was immediately reverted. This incident highlighted several critical engineering principles:
      </p>
      <ul class="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-900 dark:text-gray-100">
        <li><strong>Understand Your Security Patterns:</strong> Django's official documentation and OWASP guidelines explicitly mention that the CSRF cookie should <em>not</em> be HttpOnly if you are using the default AJAX/Double-Submit pattern.</li>
        <li><strong>Mirror Production Policies:</strong> Disabling core security mechanisms in lower environments creates dangerous discrepancies. Always aim to test with the same security posture as production.</li>
        <li><strong>Triaging Scanner Reports:</strong> Automated vulnerability scanners often flag missing HttpOnly flags on <em>any</em> cookie as a generic warning. It is the engineer's responsibility to triage these reports contextually.</li>
      </ul>
      <p class="mb-4 text-gray-900 dark:text-gray-100 font-medium">
        Security hardening is essential, but it must be applied with a deep understanding of the underlying architectural patterns to avoid inadvertently breaking your own system.
      </p>
    </section>
  `,
};
