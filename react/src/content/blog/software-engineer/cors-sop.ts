import type { BlogPost } from '../../../types/blog';

export const corsSop: BlogPost = {
  id: 'cors-sop',
  category: 'software-engineer',
  title: 'CORS (Cross-Origin Resource Sharing) & SOP (Same-Origin Policy)',
  description: 'Explore the concepts of CORS and SOP in web development, including how they work together to prevent CSRF attacks and how to implement CORS.',
  date: '2025-04-30',
  updatedDate: '2025-04-30',
  tags: ['Web Security', 'CORS', 'SOP', 'Spring Boot', 'Web Development', 'API', 'Security'],
  image: '/cors.webp',
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
          <span class="ml-2 text-gray-400">CORS & SOP</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        CORS (Cross-Origin Resource Sharing) & SOP (Same-Origin Policy)
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: April 30, 2025</div>
    </header>

    <!-- Table of Contents for mobile view -->
    <div class="xl:hidden mt-4 mb-6 border rounded p-4 bg-gray-50 dark:bg-gray-800">
      <h3 class="font-bold text-lg mb-2">Table of Contents</h3>
      <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-cors" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is CORS?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-origin" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What does "Different Origin" mean?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-resource-sharing" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is Resource Sharing?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#what-is-sop" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">What is SOP?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#why-limit" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Why Limit?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#simple-request" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Simple Request?</a></li>
        <li class="whitespace-nowrap mobile-wrap"><a href="#preflight" class="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">Preflight?</a></li>
      </ul>
    </div>

    <div class="mt-6 prose dark:prose-invert max-w-none">
      <div class="mt-6" id="what-is-cors">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is CORS?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          CORS stands for Cross-Origin Resource Sharing. The term "Cross-Origin Resource Sharing" is self-explanatory when broken down:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Origin refers to a combination of Protocol + Host + Port</li>
          <li class="whitespace-nowrap mobile-wrap">For example, http://localhost:8080 is one Origin</li>
          <li class="whitespace-nowrap mobile-wrap">Cross-Origin simply means when Origins are different</li>
        </ul>
      </div>

      <!-- CORS Flow Diagram -->
      <div class="my-8">
        <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
          <!-- Background boxes -->
          <rect x="280" y="20" width="500" height="550" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" stroke-dasharray="5,5" rx="10" ry="10" />
          <rect x="780" y="120" width="320" height="415" fill="#ffebee" stroke="#c62828" stroke-width="2" stroke-dasharray="5,5" rx="10" ry="10" />

          <!-- Labels for paths -->
          <text x="20" y="323" font-family="Arial" font-size="22" font-weight="bold">Path of standard latency</text>
          <text x="870" y="75" font-family="Arial" font-size="22" font-weight="bold">Path of added latency</text>

          <!-- Start node -->
          <ellipse cx="150" cy="70" rx="120" ry="50" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="150" y="65" font-family="Arial" font-size="16" text-anchor="middle">JavaScript makes a</text>
          <text x="150" y="85" font-family="Arial" font-size="16" text-anchor="middle">cross-domain XHR call</text>

          <!-- Diamond 1: GET or HEAD -->
          <polygon points="400,50 450,100 400,150 350,100" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="400" y="90" font-family="Arial" font-size="12" text-anchor="middle">Is it a GET</text>
          <text x="400" y="110" font-family="Arial" font-size="12" text-anchor="middle">or HEAD?</text>

          <!-- Diamond 2: POST -->
          <polygon points="600,50 650,100 600,150 550,100" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="600" y="100" font-family="Arial" font-size="12" text-anchor="middle">Is it a</text>
          <text x="600" y="120" font-family="Arial" font-size="12" text-anchor="middle">POST?</text>

          <!-- Diamond 3: Content-type -->
          <polygon points="600,180 650,230 600,280 550,230" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="600" y="220" font-family="Arial" font-size="12" text-anchor="middle">Is the content-</text>
          <text x="600" y="240" font-family="Arial" font-size="12" text-anchor="middle">type standard?</text>

          <!-- Diamond 4: Custom headers -->
          <polygon points="450,300 500,350 450,400 400,350" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="450" y="340" font-family="Arial" font-size="12" text-anchor="middle">Are there</text>
          <text x="450" y="360" font-family="Arial" font-size="12" text-anchor="middle">custom HTTP</text>
          <text x="450" y="380" font-family="Arial" font-size="12" text-anchor="middle">headers?</text>

          <!-- Rectangle: OPTIONS call -->
          <rect x="880" y="170" width="180" height="80" fill="#bbdefb" stroke="#1976d2" stroke-width="2" rx="5" ry="5" />
          <text x="970" y="200" font-family="Arial" font-size="12" text-anchor="middle">Make OPTIONS call to</text>
          <text x="970" y="220" font-family="Arial" font-size="12" text-anchor="middle">server with all custom</text>
          <text x="970" y="240" font-family="Arial" font-size="12" text-anchor="middle">details</text>

          <!-- Diamond 5: Access-Control headers -->
          <polygon points="970,430 1070,480 970,530 870,480" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="970" y="465" font-family="Arial" font-size="12" text-anchor="middle">Did server respond with</text>
          <text x="970" y="485" font-family="Arial" font-size="12" text-anchor="middle">appropriate Access-Control-*</text>
          <text x="970" y="505" font-family="Arial" font-size="12" text-anchor="middle">headers?</text>

          <!-- Final nodes -->
          <ellipse cx="450" cy="520" rx="120" ry="40" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="450" y="525" font-family="Arial" font-size="16" text-anchor="middle">Make actual XHR</text>

          <ellipse cx="970" cy="600" rx="80" ry="40" fill="#bbdefb" stroke="#1976d2" stroke-width="2" />
          <text x="970" y="605" font-family="Arial" font-size="16" text-anchor="middle">ERROR</text>

          <!-- Connecting lines -->
          <!-- Start to Diamond 1 -->
          <line x1="270" y1="70" x2="350" y2="100" stroke="black" stroke-width="2" />
          <polygon points="337,105 350,100 345,85" fill="black" />

          <!-- Diamond 1 to Diamond 4 (Yes) -->
          <polyline points="400,150 400,350" stroke="black" stroke-width="2" fill="none" />
          <polygon points="395,335 405,335 400,350" fill="black" />
          <text x="370" y="190" font-family="Arial" font-size="14">Yes</text>

          <!-- Diamond 1 to Diamond 2 (No) -->
          <line x1="450" y1="100" x2="550" y2="100" stroke="black" stroke-width="2" />
          <polygon points="550,100 538,105 538,95" fill="black" />
          <text x="490" y="90" font-family="Arial" font-size="14">No</text>

          <!-- Diamond 2 to Diamond 3 (Yes) -->
          <line x1="600" y1="150" x2="600" y2="180" stroke="black" stroke-width="2" />
          <polygon points="512,345 512,355 500,350" fill="black" />
          <text x="610" y="170" font-family="Arial" font-size="14">Yes</text>

          <!-- Diamond 2 to OPTIONS (No) -->
          <line x1="650" y1="100" x2="880" y2="100" stroke="black" stroke-width="2" />
          <line x1="880" y1="100" x2="880" y2="160" stroke="black" stroke-width="2" />
          <polygon points="875,158 885,158 880,170" fill="black" />
          <text x="750" y="90" font-family="Arial" font-size="14">No</text>

          <!-- Diamond 3 to Diamond 4 (Yes) -->
          <line x1="600" y1="280" x2="600" y2="350" stroke="black" stroke-width="2" />
          <line x1="600" y1="350" x2="500" y2="350" stroke="black" stroke-width="2" />
          <polygon points="595,168 605,168 600,180" fill="black" />
          <text x="610" y="320" font-family="Arial" font-size="14">Yes</text>

          <!-- Diamond 3 to OPTIONS (No) -->
          <line x1="650" y1="230" x2="880" y2="230" stroke="black" stroke-width="2" />
          <polygon points="868,225 880,230 868,235" fill="black" />
          <text x="750" y="220" font-family="Arial" font-size="14">No</text>

          <!-- Diamond 4 to Final XHR (No) -->
          <line x1="450" y1="400" x2="450" y2="480" stroke="black" stroke-width="2" />
          <polygon points="445,468 455,468 450,480" fill="black" />
          <text x="430" y="440" font-family="Arial" font-size="14">No</text>

          <!-- Diamond 4 to OPTIONS (Yes) -->
          <line x1="500" y1="350" x2="880" y2="350" stroke="black" stroke-width="2" />
          <line x1="880" y1="350" x2="880" y2="260" stroke="black" stroke-width="2" />
          <polygon points="875,262 885,262 880,252" fill="black" />
          <text x="530" y="340" font-family="Arial" font-size="14">Yes</text>

          <!-- OPTIONS to Access-Control Diamond -->
          <line x1="970" y1="250" x2="970" y2="420" stroke="black" stroke-width="2" />
          <polygon points="965,418 975,418 970,430" fill="black" />

          <!-- Access-Control Diamond to Final XHR (Yes) -->
          <line x1="870" y1="480" x2="470" y2="480" stroke="black" stroke-width="2" />
          <polygon points="472,475 472,485 460,480" fill="black" />
          <text x="750" y="470" font-family="Arial" font-size="14">Yes</text>

          <!-- Access-Control Diamond to ERROR (No) -->
          <line x1="970" y1="530" x2="970" y2="560" stroke="black" stroke-width="2" />
          <polygon points="965,548 975,548 970,560" fill="black" />
          <text x="980" y="550" font-family="Arial" font-size="14">No</text>
        </svg>
      </div>

      <div class="mt-6" id="what-is-origin">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What does "Different Origin" mean?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          If any of Protocol, Host, or Port are different, it's considered Cross-Origin:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">http://localhost:8080 and http://localhost:9090 are Cross-Origin (different port)</li>
          <li class="whitespace-nowrap mobile-wrap">http://example.com and https://example.com are Cross-Origin (different protocol)</li>
          <li class="whitespace-nowrap mobile-wrap">https://example.com and https://www.example.com are Cross-Origin (different host)</li>
        </ul>
      </div>

      <div class="mt-6" id="what-is-resource-sharing">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is Resource Sharing?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Resource sharing in the context of web applications refers to how applications access and exchange data:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">A web application can serve its own resources to visitors</li>
          <li class="whitespace-nowrap mobile-wrap">It can also request resources from other servers</li>
          <li class="whitespace-nowrap mobile-wrap">Or make requests to create, delete, or modify resources on other servers</li>
          <li class="whitespace-nowrap mobile-wrap">When making requests to other servers, this means making requests to Cross-Origin</li>
          <li class="whitespace-nowrap mobile-wrap">Therefore, this concept refers to sharing resources between different Origins</li>
        </ul>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" class="my-8">
        <!-- Background -->
        <rect width="800" height="300" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="20" text-anchor="middle" font-weight="bold">CORS & SOP Overview</text>

        <!-- Origins Illustration -->
        <rect x="50" y="80" width="230" height="180" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
        <text x="165" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Origin A</text>
        <text x="165" y="135" font-family="Arial" font-size="12" text-anchor="middle">https://example.com</text>
        <text x="165" y="160" font-family="Arial" font-size="12" text-anchor="middle">Protocol: HTTPS</text>
        <text x="165" y="185" font-family="Arial" font-size="12" text-anchor="middle">Host: example.com</text>
        <text x="165" y="210" font-family="Arial" font-size="12" text-anchor="middle">Port: 443 (default)</text>

        <rect x="530" y="80" width="230" height="180" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="645" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Origin B</text>
        <text x="645" y="135" font-family="Arial" font-size="12" text-anchor="middle">http://api.example.com:8080</text>
        <text x="645" y="160" font-family="Arial" font-size="12" text-anchor="middle">Protocol: HTTP</text>
        <text x="645" y="185" font-family="Arial" font-size="12" text-anchor="middle">Host: api.example.com</text>
        <text x="645" y="210" font-family="Arial" font-size="12" text-anchor="middle">Port: 8080</text>

        <!-- Arrow between origins -->
        <line x1="280" y1="170" x2="530" y2="170" stroke="#333" stroke-width="2" stroke-dasharray="5,5"/>
        <polygon points="520,165 530,170 520,175" fill="#333"/>

        <!-- CORS label -->
        <rect x="360" y="140" width="90" height="30" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="15" ry="15"/>
        <text x="405" y="160" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">CORS</text>

        <!-- Cross-Origin text -->
        <text x="405" y="200" font-family="Arial" font-size="12" text-anchor="middle">Cross-Origin Request</text>
        <text x="405" y="220" font-family="Arial" font-size="12" text-anchor="middle">Different Protocol, Host, or Port</text>
      </svg>

      <div class="mt-6" id="what-is-sop">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is SOP?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          SOP stands for Same-Origin Policy, a critical security concept in web application security:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">When Protocol, Host, and Port are all identical, it's called Same-Origin</li>
          <li class="whitespace-nowrap mobile-wrap">SOP is a security feature implemented by web browsers</li>
          <li class="whitespace-nowrap mobile-wrap">It restricts how a document or script loaded from one origin can interact with resources from another origin</li>
          <li class="whitespace-nowrap mobile-wrap">This policy helps isolate potentially malicious documents and mitigate attack vectors</li>
        </ul>
      </div>

      <div class="mt-6" id="why-limit">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Why Limit Cross-Origin Requests?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The Same-Origin Policy was established primarily to address security concerns:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">It helps prevent CSRF (Cross-Site Request Forgery) attacks</li>
          <li class="whitespace-nowrap mobile-wrap">For example, if a malicious site (https://naber.com) creates an iframe displaying a legitimate site (https://naver.com), a user might not notice the difference and log in</li>
          <li class="whitespace-nowrap mobile-wrap">The malicious site could then use the user's credentials to perform unintended actions on the legitimate site</li>
          <li class="whitespace-nowrap mobile-wrap">SOP prevents scripts from one origin from accessing or modifying data from another origin</li>
          <li class="whitespace-nowrap mobile-wrap">CORS provides a way to safely relax this restriction when necessary</li>
        </ul>
      </div>

      <div class="mt-6" id="simple-request">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is a Simple Request?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Simple Requests are a category of requests that are somewhat exempt from the strict CORS policy:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">Requests that meet all of the following conditions are considered Simple Requests:</li>
          <li class="whitespace-nowrap mobile-wrap">HTTP Method: Only GET, HEAD, or POST</li>
          <li class="whitespace-nowrap mobile-wrap">Content-Type: Only text/plain, application/x-www-form-urlencoded, or multipart/form-data</li>
          <li class="whitespace-nowrap mobile-wrap">No custom headers are included in the request</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          Simple requests don't trigger a preflight request, simplifying the cross-origin process.
        </p>
      </div>

      <div class="mt-6" id="preflight">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is a Preflight Request?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Preflight requests are an important security mechanism in the CORS process:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">A preflight request is made for all requests that are not Simple Requests</li>
          <li class="whitespace-nowrap mobile-wrap">It's an OPTIONS HTTP request sent before the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">It verifies that the CORS protocol is understood and that the server permits the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">The preflight request includes headers like:</li>
          <li class="whitespace-nowrap mobile-wrap">Access-Control-Request-Method: Specifies the HTTP method of the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">Access-Control-Request-Headers: Lists any custom headers that will be used</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The server must respond with appropriate Access-Control-* headers to allow the actual request to proceed.
        </p>
      </div>

      <div class="mt-6" id="spring-boot">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">How to implement in spring boot?</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Preflight requests are an important security mechanism in the CORS process:
        </p>
        <ul class="max-w-md space-y-2 text-gray-700 list-disc list-inside dark:text-gray-400 mt-3">
          <li class="whitespace-nowrap mobile-wrap">A preflight request is made for all requests that are not Simple Requests</li>
          <li class="whitespace-nowrap mobile-wrap">It's an OPTIONS HTTP request sent before the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">It verifies that the CORS protocol is understood and that the server permits the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">The preflight request includes headers like:</li>
          <li class="whitespace-nowrap mobile-wrap">Access-Control-Request-Method: Specifies the HTTP method of the actual request</li>
          <li class="whitespace-nowrap mobile-wrap">Access-Control-Request-Headers: Lists any custom headers that will be used</li>
        </ul>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          The server must respond with appropriate Access-Control-* headers to allow the actual request to proceed.
        </p>

        <div class="mt-8">
          <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Spring Boot 3 CORS Implementation
            Methods</h3>
          <p class="text-gray-700 dark:text-gray-400 mt-3">
            There are several ways to implement CORS in Spring Boot 3. The main methods are as follows:
          </p>

          <div class="mt-5">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">1. Using @CrossOrigin Annotation</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              This method configures CORS at the controller class or method level.
            </p>
            <div class="relative group">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="using-cross-origin-annotation" class="language-java"><span class="text-[#808080]">import</span> org.springframework.web.bind.annotation.CrossOrigin;
<span class="text-[#808080]">import</span> org.springframework.web.bind.annotation.GetMapping;
<span class="text-[#808080]">import</span> org.springframework.web.bind.annotation.RestController;

<span class="text-[#569CD6]">@RestController</span>
<span class="text-[#569CD6]">@CrossOrigin</span>(origins = <span class="text-[#CE9178]">"http://example.com"</span>,
             allowedHeaders = <span class="text-[#CE9178]">"*"</span>,
             methods = {RequestMethod.<span class="text-[#DCDCAA]">GET</span>, RequestMethod.<span class="text-[#DCDCAA]">POST</span>, RequestMethod.<span class="text-[#DCDCAA]">PUT</span>},
             maxAge = <span class="text-[#B5CEA8]">3600</span>)
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">MyController</span> {

    <span class="text-[#569CD6]">@GetMapping</span>(<span class="text-[#CE9178]">"/api/data"</span>)
    <span class="text-[#808080]">public</span> ResponseEntity&lt;?&gt; <span class="text-[#DCDCAA]">getData</span>() {
        <span class="text-[#6A9955]">// Method implementation</span>
        <span class="text-[#808080]">return</span> ResponseEntity.<span class="text-[#DCDCAA]">ok</span>().<span class="text-[#DCDCAA]">body</span>(data);
    }

    <span class="text-[#6A9955]">// You can also apply different CORS settings to specific methods</span>
    <span class="text-[#569CD6]">@CrossOrigin</span>(origins = <span class="text-[#CE9178]">"http://another-domain.com"</span>)
    <span class="text-[#569CD6]">@PostMapping</span>(<span class="text-[#CE9178]">"/api/submit"</span>)
    <span class="text-[#808080]">public</span> ResponseEntity&lt;?&gt; <span class="text-[#DCDCAA]">submitData</span>(@RequestBody DataDTO data) {
        <span class="text-[#6A9955]">// Method implementation</span>
        <span class="text-[#808080]">return</span> ResponseEntity.<span class="text-[#DCDCAA]">ok</span>().<span class="text-[#DCDCAA]">build</span>();
    }
}</code></pre>
            </div>
          </div>

          <div class="mt-7">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">2. Global CORS Configuration with WebMvcConfigurer</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              This method applies CORS settings to the entire application.
            </p>
            <div class="relative group">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="global-cors-configuration-web-mvc-configurer" class="language-java"><span class="text-[#808080]">import</span> org.springframework.context.annotation.Bean;
<span class="text-[#808080]">import</span> org.springframework.context.annotation.Configuration;
<span class="text-[#808080]">import</span> org.springframework.web.servlet.config.annotation.CorsRegistry;
<span class="text-[#808080]">import</span> org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

<span class="text-[#569CD6]">@Configuration</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">WebConfig</span> <span class="text-[#808080]">implements</span> WebMvcConfigurer {

    <span class="text-[#569CD6]">@Override</span>
    <span class="text-[#808080]">public void</span> <span class="text-[#DCDCAA]">addCorsMappings</span>(CorsRegistry registry) {
        registry.<span class="text-[#DCDCAA]">addMapping</span>(<span class="text-[#CE9178]">"/**"</span>)  <span class="text-[#6A9955]">// Apply to all paths</span>
                .<span class="text-[#DCDCAA]">allowedOrigins</span>(<span class="text-[#CE9178]">"http://example.com"</span>, <span class="text-[#CE9178]">"https://example.org"</span>)  <span class="text-[#6A9955]">// Origins to allow</span>
                .<span class="text-[#DCDCAA]">allowedMethods</span>(<span class="text-[#CE9178]">"GET"</span>, <span class="text-[#CE9178]">"POST"</span>, <span class="text-[#CE9178]">"PUT"</span>, <span class="text-[#CE9178]">"DELETE"</span>, <span class="text-[#CE9178]">"OPTIONS"</span>)  <span class="text-[#6A9955]">// HTTP methods to allow</span>
                .<span class="text-[#DCDCAA]">allowedHeaders</span>(<span class="text-[#CE9178]">"*"</span>)  <span class="text-[#6A9955]">// Allow all headers</span>
                .<span class="text-[#DCDCAA]">allowCredentials</span>(<span class="text-[#808080]">true</span>)  <span class="text-[#6A9955]">// Allow credentials</span>
                .<span class="text-[#DCDCAA]">maxAge</span>(<span class="text-[#B5CEA8]">3600</span>);  <span class="text-[#6A9955]">// Preflight request cache time (seconds)</span>
    }
}</code></pre>
            </div>
          </div>

          <div class="mt-7">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">3. Configuration Using CorsFilter</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              This method configures CORS at the filter level. It's useful when using Spring Security.
            </p>
            <div class="relative group">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="configuration-using-cors-filter" class="language-java"><span class="text-[#808080]">import</span> org.springframework.context.annotation.Bean;
<span class="text-[#808080]">import</span> org.springframework.context.annotation.Configuration;
<span class="text-[#808080]">import</span> org.springframework.web.cors.CorsConfiguration;
<span class="text-[#808080]">import</span> org.springframework.web.cors.UrlBasedCorsConfigurationSource;
<span class="text-[#808080]">import</span> org.springframework.web.filter.CorsFilter;

<span class="text-[#569CD6]">@Configuration</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">CorsConfig</span> {

    <span class="text-[#569CD6]">@Bean</span>
    <span class="text-[#808080]">public</span> CorsFilter <span class="text-[#DCDCAA]">corsFilter</span>() {
        UrlBasedCorsConfigurationSource source = <span class="text-[#808080]">new</span> UrlBasedCorsConfigurationSource();
        CorsConfiguration config = <span class="text-[#808080]">new</span> CorsConfiguration();

        <span class="text-[#6A9955]">// Configure allowed origins</span>
        config.<span class="text-[#DCDCAA]">addAllowedOrigin</span>(<span class="text-[#CE9178]">"http://example.com"</span>);
        config.<span class="text-[#DCDCAA]">addAllowedOrigin</span>(<span class="text-[#CE9178]">"https://example.org"</span>);

        <span class="text-[#6A9955]">// Set preflight request cache time</span>
        config.<span class="text-[#DCDCAA]">setMaxAge</span>(<span class="text-[#B5CEA8]">3600L</span>);

        <span class="text-[#6A9955]">// Allow credentials (cookies, authentication headers, etc.)</span>
        config.<span class="text-[#DCDCAA]">setAllowCredentials</span>(<span class="text-[#808080]">true</span>);

        <span class="text-[#6A9955]">// Configure allowed HTTP methods</span>
        config.<span class="text-[#DCDCAA]">addAllowedMethod</span>(<span class="text-[#CE9178]">"GET"</span>);
        config.<span class="text-[#DCDCAA]">addAllowedMethod</span>(<span class="text-[#CE9178]">"POST"</span>);
        config.<span class="text-[#DCDCAA]">addAllowedMethod</span>(<span class="text-[#CE9178]">"PUT"</span>);
        config.<span class="text-[#DCDCAA]">addAllowedMethod</span>(<span class="text-[#CE9178]">"DELETE"</span>);
        config.<span class="text-[#DCDCAA]">addAllowedMethod</span>(<span class="text-[#CE9178]">"OPTIONS"</span>);

        <span class="text-[#6A9955]">// Allow all headers</span>
        config.<span class="text-[#DCDCAA]">addAllowedHeader</span>(<span class="text-[#CE9178]">"*"</span>);

        <span class="text-[#6A9955]">// Configure exposed response headers</span>
        config.<span class="text-[#DCDCAA]">addExposedHeader</span>(<span class="text-[#CE9178]">"Authorization"</span>);

        <span class="text-[#6A9955]">// Apply this configuration to all paths</span>
        source.<span class="text-[#DCDCAA]">registerCorsConfiguration</span>(<span class="text-[#CE9178]">"/**"</span>, config);

        <span class="text-[#808080]">return new</span> CorsFilter(source);
    }
}</code></pre>
            </div>
          </div>

          <div class="mt-7">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">4. CORS Configuration with Spring Security</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              When using Spring Security, you need to add CORS configuration to the SecurityFilterChain.
            </p>
            <div class="relative group">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="cors-configuration-with-spring-security" class="language-java"><span class="text-[#808080]">import</span> org.springframework.context.annotation.Bean;
<span class="text-[#808080]">import</span> org.springframework.context.annotation.Configuration;
<span class="text-[#808080]">import</span> org.springframework.security.config.annotation.web.builders.HttpSecurity;
<span class="text-[#808080]">import</span> org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
<span class="text-[#808080]">import</span> org.springframework.security.web.SecurityFilterChain;

<span class="text-[#569CD6]">@Configuration</span>
<span class="text-[#569CD6]">@EnableWebSecurity</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">SecurityConfig</span> {

    <span class="text-[#569CD6]">@Bean</span>
    <span class="text-[#808080]">public</span> SecurityFilterChain <span class="text-[#DCDCAA]">filterChain</span>(HttpSecurity http) <span class="text-[#808080]">throws</span> Exception {
        http
            <span class="text-[#6A9955]">// Enable CORS configuration</span>
            .<span class="text-[#DCDCAA]">cors</span>().<span class="text-[#DCDCAA]">and</span>()
            .<span class="text-[#DCDCAA]">csrf</span>().<span class="text-[#DCDCAA]">disable</span>()  <span class="text-[#6A9955]">// Disable CSRF (common for API servers)</span>
            .<span class="text-[#DCDCAA]">authorizeHttpRequests</span>(authorize -> authorize
                .<span class="text-[#DCDCAA]">requestMatchers</span>(<span class="text-[#CE9178]">"/public/**"</span>).<span class="text-[#DCDCAA]">permitAll</span>()
                .<span class="text-[#DCDCAA]">anyRequest</span>().<span class="text-[#DCDCAA]">authenticated</span>()
            );

        <span class="text-[#808080]">return</span> http.<span class="text-[#DCDCAA]">build</span>();
    }

    <span class="text-[#6A9955]">// Define CorsConfigurationSource bean</span>
    <span class="text-[#569CD6]">@Bean</span>
    <span class="text-[#808080]">public</span> CorsConfigurationSource <span class="text-[#DCDCAA]">corsConfigurationSource</span>() {
        CorsConfiguration configuration = <span class="text-[#808080]">new</span> CorsConfiguration();
        configuration.<span class="text-[#DCDCAA]">setAllowedOrigins</span>(Arrays.<span class="text-[#DCDCAA]">asList</span>(<span class="text-[#CE9178]">"http://example.com"</span>));
        configuration.<span class="text-[#DCDCAA]">setAllowedMethods</span>(Arrays.<span class="text-[#DCDCAA]">asList</span>(<span class="text-[#CE9178]">"GET"</span>, <span class="text-[#CE9178]">"POST"</span>, <span class="text-[#CE9178]">"PUT"</span>, <span class="text-[#CE9178]">"DELETE"</span>, <span class="text-[#CE9178]">"OPTIONS"</span>));
        configuration.<span class="text-[#DCDCAA]">setAllowedHeaders</span>(Arrays.<span class="text-[#DCDCAA]">asList</span>(<span class="text-[#CE9178]">"*"</span>));
        configuration.<span class="text-[#DCDCAA]">setAllowCredentials</span>(<span class="text-[#808080]">true</span>);
        configuration.<span class="text-[#DCDCAA]">setMaxAge</span>(<span class="text-[#B5CEA8]">3600L</span>);

        UrlBasedCorsConfigurationSource source = <span class="text-[#808080]">new</span> UrlBasedCorsConfigurationSource();
        source.<span class="text-[#DCDCAA]">registerCorsConfiguration</span>(<span class="text-[#CE9178]">"/**"</span>, configuration);
        <span class="text-[#808080]">return</span> source;
    }
}</code></pre>
            </div>
          </div>

          <div class="mt-7">
            <h4 class="text-xl font-medium text-gray-900 dark:text-white">Handling Preflight Requests</h4>
            <p class="text-gray-700 dark:text-gray-400 mt-2">
              If you want to explicitly handle preflight requests (OPTIONS method), you can add the following to your controller:
            </p>
            <div class="relative group">
              <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                </svg>
              </button>
              <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code id="handling-preflight-requests" class="language-java"><span class="text-[#569CD6]">@RestController</span>
<span class="text-[#808080]">public class</span> <span class="text-[#DCDCAA]">CorsController</span> {

    <span class="text-[#569CD6]">@RequestMapping</span>(value = <span class="text-[#CE9178]">"/**"</span>, method = RequestMethod.<span class="text-[#DCDCAA]">OPTIONS</span>)
    <span class="text-[#808080]">public</span> ResponseEntity&lt;?&gt; <span class="text-[#DCDCAA]">handleOptionsRequest</span>() {
        <span class="text-[#808080]">return</span> ResponseEntity
            .<span class="text-[#DCDCAA]">ok</span>()
            .<span class="text-[#DCDCAA]">build</span>();
    }
}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" class="my-8">
        <!-- Background -->
        <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="20" text-anchor="middle" font-weight="bold">CORS Preflight Process</text>

        <!-- Browser -->
        <rect x="50" y="80" width="200" height="250" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="8" ry="8"/>
        <text x="150" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Browser</text>

        <!-- Server -->
        <rect x="550" y="80" width="200" height="250" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="650" y="110" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Server</text>

        <!-- Preflight Request -->
        <line x1="250" y1="150" x2="550" y2="150" stroke="#333" stroke-width="2" />
        <polygon points="540,145 550,150 540,155" fill="#333"/>
        <text x="400" y="140" font-family="Arial" font-size="14" text-anchor="middle">1. Preflight Request (OPTIONS)</text>

        <!-- Preflight details -->
        <text x="400" y="165" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Access-Control-Request-Method: PUT</text>
        <text x="400" y="185" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Access-Control-Request-Headers: Content-Type</text>

        <!-- Preflight Response -->
        <line x1="550" y1="230" x2="250" y2="230" stroke="#333" stroke-width="2" />
        <polygon points="260,225 250,230 260,235" fill="#333"/>
        <text x="400" y="220" font-family="Arial" font-size="14" text-anchor="middle">2. Preflight Response</text>

        <!-- Response details -->
        <text x="400" y="245" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Access-Control-Allow-Origin: https://example.com</text>
        <text x="400" y="265" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Access-Control-Allow-Methods: GET, POST, PUT</text>
        <text x="400" y="285" font-family="Arial" font-size="12" text-anchor="middle" fill="#666">Access-Control-Allow-Headers: Content-Type</text>

        <!-- Actual Request -->
        <line x1="250" y1="320" x2="550" y2="320" stroke="#52c41a" stroke-width="2" />
        <polygon points="540,315 550,320 540,325" fill="#52c41a"/>
        <text x="400" y="310" font-family="Arial" font-size="14" text-anchor="middle" fill="#52c41a">3. Actual Request (Only if preflight successful)</text>

        <!-- Result label -->
        <rect x="350" y="350" width="100" height="30" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="15" ry="15"/>
        <text x="400" y="370" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">Success</text>
      </svg>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          CORS is a crucial security mechanism that enables controlled cross-origin resource sharing while protecting users from potential attacks. Understanding how CORS works with the Same-Origin Policy is essential for modern web application development.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-3">
          By properly implementing CORS, you can build secure web applications that safely interact with resources from different origins while maintaining security best practices.
        </p>
      </div>
    </div>
  </div>
  <br>
    `
};