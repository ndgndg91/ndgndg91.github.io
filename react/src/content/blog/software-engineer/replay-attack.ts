import type { BlogPost } from '../../../types/blog';

export const replayAttack: BlogPost = {
  id: 'replay-attack',
  title: 'How to Prevent Replay Attacks',
  description: 'Learn about replay attacks, their types, and how to prevent them using various security measures including Message Authentication Codes, timestamps, and nonces.',
  category: 'software-engineer',
  date: '2024-04-01',
  updatedDate: '2024-04-01',
  tags: ['Security', 'Network Security', 'Authentication'],
  image: 'replay-attack.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">How to Prevent Replay Attacks</span>
        </li>
      </ol>
    </nav>

    <header class="mb-8">
      <div class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 dark:text-gray-300 uppercase">
        Security
      </div>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        How to Prevent Replay Attacks
      </h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: April 1, 2024</div>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">What is a Replay Attack?</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        A replay attack is a type of network attack where an attacker intercepts valid network data packets and later reuses them. By retransmitting the data, the system processes it as legitimate data. Replay attacks are difficult to detect because they appear as normal requests. Additionally, they can be successful even if the original transmission was encrypted. Replay attacks can overload systems through repetitive requests, potentially disrupting normal system operations.
      </p>

      <div class="flex justify-center mb-6 mt-4" id="replay-attack-general-diagram">
        <!-- SVG Replay Attack Diagram -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" class="rounded-lg shadow-md w-full max-w-2xl">
          <!-- Background -->
          <rect width="800" height="500" fill="#f8fafc" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#1e293b">Replay Attack Mechanism</text>

          <!-- Entities -->
          <g id="legitimate-sender">
            <rect x="100" y="100" width="120" height="60" rx="5" ry="5" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
            <text x="160" y="135" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Sender</text>
          </g>

          <g id="legitimate-receiver">
            <rect x="580" y="100" width="120" height="60" rx="5" ry="5" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
            <text x="640" y="135" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Receiver</text>
          </g>

          <g id="attacker">
            <rect x="340" y="300" width="120" height="60" rx="5" ry="5" fill="#f87171" stroke="#dc2626" stroke-width="2"/>
            <text x="400" y="335" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Attacker</text>
          </g>

          <!-- Communication channels -->
          <line x1="220" y1="130" x2="580" y2="130" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>
          <text x="400" y="115" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#475569">Secure Channel</text>

          <!-- Attack flow -->
          <!-- 1. Original data transmission -->
          <path d="M 220,130 L 400,130 L 400,300" stroke="#2563eb" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
          <text x="270" y="155" font-family="Arial, sans-serif" font-size="12" fill="#2563eb">1. Data capture</text>

          <!-- 2. Data modification -->
          <ellipse cx="400" cy="240" rx="30" ry="20" fill="#fef3c7" stroke="#f59e0b" stroke-width="2"/>
          <text x="400" y="245" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#92400e">Modify</text>

          <!-- 3. Replay attack -->
          <path d="M 460,300 C 520,300 520,130 580,130" stroke="#dc2626" stroke-width="2" fill="none" stroke-dasharray="4,2" marker-end="url(#arrowRed)"/>
          <text x="520" y="200" font-family="Arial, sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">2. Replay attack</text>

          <!-- Legend -->
          <rect x="600" y="400" width="150" height="80" rx="5" ry="5" fill="white" stroke="#94a3b8" stroke-width="1"/>
          <text x="675" y="420" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e293b">Legend</text>

          <rect x="620" y="435" width="16" height="16" fill="#60a5fa" stroke="#2563eb" stroke-width="1"/>
          <text x="645" y="448" font-family="Arial, sans-serif" font-size="12" fill="#1e293b" text-anchor="start">Legitimate entities</text>

          <rect x="620" y="460" width="16" height="16" fill="#f87171" stroke="#dc2626" stroke-width="1"/>
          <text x="645" y="473" font-family="Arial, sans-serif" font-size="12" fill="#1e293b" text-anchor="start">Attacker</text>

          <!-- Explanatory notes -->
          <text x="100" y="420" font-family="Arial, sans-serif" font-size="12" fill="#64748b">1. Attacker intercepts legitimate data packets</text>
          <text x="100" y="440" font-family="Arial, sans-serif" font-size="12" fill="#64748b">2. Attacker may modify data or use it as-is</text>
          <text x="100" y="460" font-family="Arial, sans-serif" font-size="12" fill="#64748b">3. Receiver processes replayed data as legitimate</text>

          <!-- Arrow markers -->
          <defs>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb"/>
            </marker>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
      </div>

      <div class="mb-4 text-gray-900 dark:text-gray-100">
        As shown in the diagram, the attacker waits until data transmission begins. They then sniff the communication channel to extract the data. The attacker can acquire the data and potentially modify it before reusing it. Although the recipient receives modified data, they treat it as legitimate.
      </div>

      <div class="mb-4 text-gray-900 dark:text-gray-100">
        There are four main types of replay attacks: network, wireless, session, and HTTP.
      </div>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Types of Replay Attacks</h3>
        <ul class="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
          <li>Network replay attacks occur when attackers intercept network traffic and retransmit it later, using tools like Wireshark or tcpdump.</li>
          <li>Wireless replay attacks involve intercepting wireless communications and then retransmitting them.</li>
          <li>Session replay attacks intercept sessions between two parties.</li>
          <li>HTTP replay attacks involve capturing HTTP requests and responses to execute the attack.</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Real-World Example</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Let's assume Alice wants to log into her online banking account using a web browser. When Alice enters her login credentials and clicks the submit button, the login request is transmitted to the bank server over the internet.
      </p>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Bob, the attacker, monitors the network and captures the login request as it's being transmitted. He then waits until Alice logs out of her account before resending the captured login request to the bank server. Since the login request is valid, the server accepts it and grants Bob access to Alice's account.
      </p>

      <div class="flex justify-center mb-6 mt-4" id="banking-replay-attack-diagram">
        <!-- SVG Banking Replay Attack Example -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 550">
          <!-- Background -->
          <rect width="900" height="550" fill="#f8fafc" rx="10" ry="10"/>

          <!-- Title -->
          <text x="450" y="40" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#1e293b">Banking Replay Attack Example</text>

          <!-- Entities -->
          <!-- Alice -->
          <g id="alice">
            <rect x="100" y="100" width="120" height="60" rx="5" ry="5" fill="#60a5fa" stroke="#2563eb" stroke-width="2"/>
            <text x="160" y="135" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Alice</text>
            <image x="120" y="110" width="20" height="20" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci11c2VyIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCI+PC9jaXJjbGU+PC9zdmc+"/>
          </g>

          <!-- Computer -->
          <g id="computer">
            <rect x="100" y="220" width="120" height="80" rx="5" ry="5" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
            <rect x="115" y="230" width="90" height="50" rx="2" ry="2" fill="#f3f4f6"/>
            <rect x="145" y="290" width="30" height="10" fill="#9ca3af"/>
            <text x="160" y="260" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#1e293b">Login</text>
          </g>

          <!-- Bank Server -->
          <g id="bank-server">
            <rect x="700" y="150" width="120" height="180" rx="5" ry="5" fill="#a7f3d0" stroke="#10b981" stroke-width="2"/>
            <text x="760" y="190" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#1e293b">Bank Server</text>
            <rect x="720" y="210" width="80" height="10" rx="2" ry="2" fill="#6ee7b7"/>
            <rect x="720" y="230" width="80" height="10" rx="2" ry="2" fill="#6ee7b7"/>
            <rect x="720" y="250" width="80" height="10" rx="2" ry="2" fill="#6ee7b7"/>
            <rect x="720" y="270" width="80" height="10" rx="2" ry="2" fill="#6ee7b7"/>
          </g>

          <!-- Attacker Bob -->
          <g id="bob">
            <rect x="400" y="360" width="120" height="60" rx="5" ry="5" fill="#f87171" stroke="#dc2626" stroke-width="2"/>
            <text x="460" y="410" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Bob (Attacker)</text>
            <image x="420" y="370" width="20" height="20" href="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9ImZlYXRoZXIgZmVhdGhlci11c2VyIj48cGF0aCBkPSJNMjAgMjF2LTJhNCA0IDAgMCAwLTQtNEg4YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCI+PC9jaXJjbGU+PC9zdmc+"/>
          </g>

          <!-- Internet Cloud -->
          <ellipse cx="450" cy="240" rx="150" ry="60" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
          <text x="450" y="245" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#64748b">Internet</text>

          <!-- Flow of events -->
          <!-- Step 1: Alice logs in -->
          <path d="M 220,240 Q 320,220 400,220" stroke="#2563eb" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
          <circle cx="310" cy="220" r="16" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>
          <text x="310" y="225" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e40af">1</text>
          <text x="280" y="200" font-family="Arial, sans-serif" font-size="12" fill="#2563eb" text-anchor="middle">Login request</text>

          <!-- Step 2: Attack capture -->
          <path d="M 380,250 L 410,360" stroke="#dc2626" stroke-width="2" fill="none" stroke-dasharray="4,2" marker-end="url(#arrowRed)"/>
          <circle cx="395" cy="315" r="16" fill="#fecaca" stroke="#dc2626" stroke-width="1.5"/>
          <text x="395" y="320" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#b91c1c">2</text>
          <text x="350" y="320" font-family="Arial, sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">Capture</text>

          <!-- Step 3: Normal response -->
          <path d="M 500,220 Q 580,220 700,220" stroke="#2563eb" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
          <circle cx="600" cy="220" r="16" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>
          <text x="600" y="225" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e40af">3</text>
          <text x="600" y="200" font-family="Arial, sans-serif" font-size="12" fill="#2563eb" text-anchor="middle">Server processes request</text>

          <!-- Step 4: Alice logs out -->
          <path d="M 700,260 Q 600,280 220,280" stroke="#2563eb" stroke-width="2" fill="none" marker-end="url(#arrowBlue)"/>
          <circle cx="450" cy="280" r="16" fill="#bfdbfe" stroke="#2563eb" stroke-width="1.5"/>
          <text x="450" y="285" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e40af">4</text>
          <text x="450" y="310" font-family="Arial, sans-serif" font-size="12" fill="#2563eb" text-anchor="middle">Alice logs out</text>

          <!-- Step 5: Bob replays captured request -->
          <path d="M 500,360 C 600,250 650,260 700,260" stroke="#dc2626" stroke-width="2" fill="none" stroke-dasharray="4,2" marker-end="url(#arrowRed)"/>
          <circle cx="550" cy="310" r="16" fill="#fecaca" stroke="#dc2626" stroke-width="1.5"/>
          <text x="550" y="315" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#b91c1c">5</text>
          <text x="635" y="300" font-family="Arial, sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">Replay login request</text>

          <!-- Step 6: Server grants access -->
          <path d="M 700,300 C 600,330 550,370 520,370" stroke="#dc2626" stroke-width="2" fill="none" marker-end="url(#arrowRed)"/>
          <circle cx="600" cy="350" r="16" fill="#fecaca" stroke="#dc2626" stroke-width="1.5"/>
          <text x="600" y="355" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#b91c1c">6</text>
          <text x="650" y="370" font-family="Arial, sans-serif" font-size="12" fill="#dc2626" text-anchor="middle">Access granted</text>

          <!-- Bob's access -->
          <g id="bobs-computer" transform="translate(350, 440)">
            <rect x="0" y="0" width="200" height="80" rx="5" ry="5" fill="#d1d5db" stroke="#dc2626" stroke-width="2"/>
            <rect x="15" y="10" width="170" height="50" rx="2" ry="2" fill="#f3f4f6"/>
            <text x="100" y="40" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#dc2626">Access to Alice's account</text>
          </g>

          <!-- Legend -->
          <rect x="700" y="420" width="150" height="120" rx="5" ry="5" fill="white" stroke="#94a3b8" stroke-width="1"/>
          <text x="775" y="440" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1e293b">Legend</text>

          <rect x="720" y="455" width="16" height="16" fill="#60a5fa" stroke="#2563eb" stroke-width="1"/>
          <text x="745" y="468" font-family="Arial, sans-serif" font-size="12" fill="#1e293b" text-anchor="start">Legitimate user</text>

          <rect x="720" y="480" width="16" height="16" fill="#f87171" stroke="#dc2626" stroke-width="1"/>
          <text x="745" y="493" font-family="Arial, sans-serif" font-size="12" fill="#1e293b" text-anchor="start">Attacker</text>

          <rect x="720" y="505" width="16" height="16" fill="#a7f3d0" stroke="#10b981" stroke-width="1"/>
          <text x="745" y="518" font-family="Arial, sans-serif" font-size="12" fill="#1e293b" text-anchor="start">Bank server</text>

          <!-- Arrow markers -->
          <defs>
            <marker id="arrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb"/>
            </marker>
            <marker id="arrowRed" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">How to Prevent Replay Attacks</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        There are several methods to prevent replay attacks. The most common approaches include:
      </p>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Prevention Methods</h3>
        <ul class="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
          <li>Timestamp-based validation: Include a timestamp in each request and reject requests that are too old.</li>
          <li>Nonce-based validation: Use a unique number (nonce) for each request and reject duplicate nonces.</li>
          <li>Sequence numbers: Use incrementing sequence numbers to ensure requests are processed in order.</li>
          <li>Challenge-response authentication: Require the client to prove knowledge of a secret without transmitting it.</li>
        </ul>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
        <h3 class="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-100">Message Authentication Codes with Timestamps or Nonces</h3>
        <p class="mb-2 text-indigo-800 dark:text-indigo-200">
          One approach is to use Message Authentication Codes (MACs). A MAC is a cryptographic checksum included in transmitted data that ensures authenticity and integrity. The MAC can incorporate a timestamp or other changing value for each transmission, making it difficult for attackers to reuse captured transmissions.
        </p>
        <p class="mb-2 text-indigo-800 dark:text-indigo-200">
          Including timestamps in transmitted data helps prevent replay attacks by ensuring the data is only considered valid within a specific timeframe. Nonces (Number used Only Once) can also be used during data transmission across networks.
        </p>
      </div>

      <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
        <h3 class="font-bold text-lg mb-2 text-indigo-900 dark:text-indigo-100">JWT ID (JTI)</h3>
        <p class="mb-2 text-indigo-800 dark:text-indigo-200">
          When using JWTs (JSON Web Tokens) created by clients, you can include a JTI in the payload. JTI stands for JWT ID and can uniquely identify a JWT. This allows clients to use JWTs as MACs before discarding them. The server can store the JWT's JTI in a cache or database and reject requests with the same JTI, considering them replay attacks.
        </p>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Example Implementation</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        Let's implement a solution to prevent replay attacks using Spring Cloud Gateway with Kotlin. This implementation will include:
      </p>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Implementation Components</h3>
        <ul class="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200">
          <li>Gateway Filter: Validates requests and prevents replay attacks</li>
          <li>Nonce Repository: Stores and manages nonces</li>
          <li>Account Repository: Manages account information</li>
          <li>Signature Helper: Handles request signing and verification</li>
        </ul>
      </div>

      <h3 class="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Account Model</h3>
      <div class="relative group">
        <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">data class</span> <span class="text-[#4EC9B0]">Account</span>(
    <span class="text-[#569CD6]">val</span> id: <span class="text-[#4EC9B0]">String</span>,
    <span class="text-[#569CD6]">val</span> apiKey: <span class="text-[#4EC9B0]">String</span>,
    <span class="text-[#569CD6]">val</span> secretKey: <span class="text-[#4EC9B0]">String</span>,
    <span class="text-[#569CD6]">val</span> status: <span class="text-[#4EC9B0]">AccountStatus</span>
)

<span class="text-[#569CD6]">enum class</span> <span class="text-[#4EC9B0]">AccountStatus</span> {
    ACTIVE,
    INACTIVE,
    SUSPENDED
}</code></pre>
      </div>

      <h3 class="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Nonce Repository</h3>
      <div class="relative group">
        <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">interface</span> <span class="text-[#4EC9B0]">NonceRepository</span> {
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">saveNonce</span>(nonce: <span class="text-[#4EC9B0]">String</span>, ttlSeconds: <span class="text-[#4EC9B0]">Long</span>): <span class="text-[#4EC9B0]">Boolean</span>
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">existsNonce</span>(nonce: <span class="text-[#4EC9B0]">String</span>): <span class="text-[#4EC9B0]">Boolean</span>
}

<span class="text-[#808080]">@Component</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">RedisNonceRepository</span>(
    <span class="text-[#569CD6]">private val</span> redisTemplate: <span class="text-[#4EC9B0]">StringRedisTemplate</span>
) : <span class="text-[#4EC9B0]">NonceRepository</span> {
    <span class="text-[#569CD6]">override fun</span> <span class="text-[#DCDCAA]">saveNonce</span>(nonce: <span class="text-[#4EC9B0]">String</span>, ttlSeconds: <span class="text-[#4EC9B0]">Long</span>): <span class="text-[#4EC9B0]">Boolean</span> {
        <span class="text-[#569CD6]">return</span> redisTemplate.opsForValue()
            .setIfAbsent(<span class="text-[#CE9178]">"nonce:$nonce"</span>, <span class="text-[#CE9178]">"1"</span>, <span class="text-[#4EC9B0]">Duration</span>.ofSeconds(ttlSeconds))
    }

    <span class="text-[#569CD6]">override fun</span> <span class="text-[#DCDCAA]">existsNonce</span>(nonce: <span class="text-[#4EC9B0]">String</span>): <span class="text-[#4EC9B0]">Boolean</span> {
        <span class="text-[#569CD6]">return</span> redisTemplate.hasKey(<span class="text-[#CE9178]">"nonce:$nonce"</span>)
    }
}</code></pre>
      </div>

      <h3 class="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Account Repository</h3>
      <div class="relative group">
        <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#569CD6]">interface</span> <span class="text-[#4EC9B0]">AccountRepository</span> {
    <span class="text-[#569CD6]">fun</span> <span class="text-[#DCDCAA]">findByApiKey</span>(apiKey: <span class="text-[#4EC9B0]">String</span>): <span class="text-[#4EC9B0]">Account</span>?
}

<span class="text-[#808080]">@Component</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">JpaAccountRepository</span>(
    <span class="text-[#569CD6]">private val</span> accountJpaRepository: <span class="text-[#4EC9B0]">AccountJpaRepository</span>
) : <span class="text-[#4EC9B0]">AccountRepository</span> {
    <span class="text-[#569CD6]">override fun</span> <span class="text-[#DCDCAA]">findByApiKey</span>(apiKey: <span class="text-[#4EC9B0]">String</span>): <span class="text-[#4EC9B0]">Account</span>? {
        <span class="text-[#569CD6]">return</span> accountJpaRepository.findByApiKey(apiKey)?.toDomain()
    }
}</code></pre>
      </div>

      <h3 class="text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">Authentication Filter</h3>
      <div class="relative group">
        <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
          </svg>
        </button>
        <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="language-kotlin"><span class="text-[#808080]">@Component</span>
<span class="text-[#569CD6]">class</span> <span class="text-[#4EC9B0]">AuthenticationFilter</span>(
    <span class="text-[#569CD6]">private val</span> accountRepository: <span class="text-[#4EC9B0]">AccountRepository</span>,
    <span class="text-[#569CD6]">private val</span> nonceRepository: <span class="text-[#4EC9B0]">NonceRepository</span>,
    <span class="text-[#569CD6]">private val</span> signatureHelper: <span class="text-[#4EC9B0]">SignatureHelper</span>
) : <span class="text-[#4EC9B0]">GlobalFilter</span> {
    <span class="text-[#569CD6]">override fun</span> <span class="text-[#DCDCAA]">filter</span>(exchange: <span class="text-[#4EC9B0]">ServerWebExchange</span>, chain: <span class="text-[#4EC9B0]">GatewayFilterChain</span>): <span class="text-[#4EC9B0]">Mono</span>&lt;<span class="text-[#4EC9B0]">Void</span>&gt; {
        <span class="text-[#569CD6]">val</span> request = exchange.request
        <span class="text-[#569CD6]">val</span> response = exchange.response

        <span class="text-[#6A9955]">// Skip authentication for certain paths</span>
        <span class="text-[#569CD6]">if</span> (shouldSkipAuth(request)) {
            <span class="text-[#569CD6]">return</span> chain.filter(exchange)
        }

        <span class="text-[#569CD6]">return try</span> {
            <span class="text-[#569CD6]">val</span> apiKey = request.headers.getFirst(<span class="text-[#CE9178]">"X-API-Key"</span>)
                ?: <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"API key is required"</span>)

            <span class="text-[#569CD6]">val</span> account = accountRepository.findByApiKey(apiKey)
                ?: <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Invalid API key"</span>)

            <span class="text-[#569CD6]">if</span> (account.status != <span class="text-[#4EC9B0]">AccountStatus</span>.ACTIVE) {
                <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Account is not active"</span>)
            }

            <span class="text-[#569CD6]">val</span> nonce = request.headers.getFirst(<span class="text-[#CE9178]">"X-Nonce"</span>)
                ?: <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Nonce is required"</span>)

            <span class="text-[#569CD6]">if</span> (nonceRepository.existsNonce(nonce)) {
                <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Nonce already used"</span>)
            }

            <span class="text-[#569CD6]">val</span> signature = request.headers.getFirst(<span class="text-[#CE9178]">"X-Signature"</span>)
                ?: <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Signature is required"</span>)

            <span class="text-[#569CD6]">val</span> requestPath = request.path.toString()
            <span class="text-[#569CD6]">val</span> requestMethod = request.method.toString()
            <span class="text-[#569CD6]">val</span> requestBody = request.body.toString()

            <span class="text-[#569CD6]">val</span> expectedSignature = signatureHelper.generateSignature(
                account.secretKey,
                requestPath,
                requestMethod,
                requestBody,
                nonce
            )

            <span class="text-[#569CD6]">if</span> (signature != expectedSignature) {
                <span class="text-[#569CD6]">throw</span> <span class="text-[#4EC9B0]">UnauthorizedException</span>(<span class="text-[#CE9178]">"Invalid signature"</span>)
            }

            <span class="text-[#6A9955]">// Save nonce after successful validation</span>
            nonceRepository.saveNonce(nonce, 300) <span class="text-[#6A9955]">// 5 minutes TTL</span>

            chain.filter(exchange)
        } <span class="text-[#569CD6]">catch</span> (e: <span class="text-[#4EC9B0]">UnauthorizedException</span>) {
            response.statusCode = <span class="text-[#4EC9B0]">HttpStatus</span>.UNAUTHORIZED
            response.headers.contentType = <span class="text-[#4EC9B0]">MediaType</span>.APPLICATION_JSON
            <span class="text-[#569CD6]">val</span> responseBody = mapOf(
                <span class="text-[#CE9178]">"error"</span> <span class="text-[#569CD6]">to</span> <span class="text-[#CE9178]">"Unauthorized"</span>,
                <span class="text-[#CE9178]">"message"</span> <span class="text-[#569CD6]">to</span> e.message
            )
            <span class="text-[#569CD6]">val</span> buffer = response.bufferFactory().wrap(
                <span class="text-[#4EC9B0]">ObjectMapper</span>().writeValueAsString(responseBody).toByteArray()
            )
            response.writeWith(<span class="text-[#4EC9B0]">Mono</span>.just(buffer))
        }
    }

    <span class="text-[#569CD6]">private fun</span> <span class="text-[#DCDCAA]">shouldSkipAuth</span>(request: <span class="text-[#4EC9B0]">ServerHttpRequest</span>): <span class="text-[#4EC9B0]">Boolean</span> {
        <span class="text-[#569CD6]">val</span> path = request.path.toString()
        <span class="text-[#569CD6]">return</span> path.startsWith(<span class="text-[#CE9178]">"/public/"</span>) || path.startsWith(<span class="text-[#CE9178]">"/health"</span>)
    }
}</code></pre>
      </div>

      <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 dark:border-yellow-400 p-4 my-6">
        <h3 class="font-bold text-lg mb-2 text-yellow-900 dark:text-yellow-100">Implementation Notes</h3>
        <ul class="list-disc pl-5 space-y-1 text-yellow-800 dark:text-yellow-200">
          <li>The TTL period (10 seconds in this example) should be adjusted based on your system's needs. Longer TTLs increase security against replay attacks but require more storage.</li>
          <li>Using Redis for nonce storage enables horizontal scaling of your API gateway.</li>
          <li>The signature should include the HTTP method, path, and nonce to ensure that the signature is unique for each request, even if the same endpoint is called.</li>
        </ul>
      </div>

      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">How This Prevents Replay Attacks</h2>
      <p class="mb-4 text-gray-900 dark:text-gray-100">
        This implementation prevents replay attacks through several mechanisms:
      </p>

      <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
        <ul class="list-disc pl-5 space-y-2 text-blue-800 dark:text-blue-200">
          <li><strong>Signature Verification:</strong> Each request must include a valid signature created using the HTTP method, request path, nonce, and a secret key known only to the client and server.</li>
          <li><strong>Nonce Validation:</strong> Each request must include a unique nonce that hasn't been used before within the TTL period.</li>
          <li><strong>TTL-based Storage:</strong> Nonces are stored in Redis with a time-to-live (TTL) of 10 seconds, after which they expire automatically.</li>
          <li><strong>Access Token Binding:</strong> Nonces are tied to specific access tokens, ensuring that even if a nonce is reused by a different user, it will be rejected.</li>
        </ul>
      </div>

      <p class="mb-4 text-gray-900 dark:text-gray-100">
        When a request is received, the filter validates the signature and checks if the nonce has been used before. If the nonce is new, it's stored in Redis with a TTL. If a replay attack attempts to reuse the same nonce within the TTL period, the filter will detect the duplicate nonce and reject the request.
      </p>

      <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">References</h2>
      <ul class="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-100">
        <li><a href="https://en.wikipedia.org/wiki/Replay_attack" class="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia - Replay Attack</a></li>
        <li><a href="https://www.baeldung.com/cs/replay-attacks" class="text-blue-600 dark:text-blue-400 hover:underline">Baeldung - Understanding Replay Attacks</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Cryptographic_nonce" class="text-blue-600 dark:text-blue-400 hover:underline">Wikipedia - Cryptographic Nonce</a></li>
      </ul>
    </section>
  `
}; 