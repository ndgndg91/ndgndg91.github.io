import type { BlogPost } from '../../../types/blog';

export const documentdbCons: BlogPost = {
  id: 'documentdb-cons',
  category: 'software-engineer',
  title: 'AWS DocumentDB Comparison Analysis',
  description: 'Current Issues with AWS DocumentDB (Instance-Based Cluster) - Does not support zero-downtime deployments during bug fixes, increasing code-level management points',
  date: '2025-04-13',
  updatedDate: '2025-04-113',
  tags: ['Database', 'AWS', 'MongoDB', 'Performance', 'Architecture', 'Cloud'],
  image: 'documentdb-cons.webp',
  content:`
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500">
        <li><a href="/" class="hover:text-gray-700">Home</a></li>
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
          <span class="ml-2 text-gray-400">AWS DocumentDB Comparison Analysis</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
        Database Analysis
      </p>
      <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        AWS DocumentDB Comparison Analysis
      </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: April 13, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">
          Current Issues with AWS DocumentDB (Instance-Based Cluster)
        </h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Does not support zero-downtime deployments during bug fixes, increasing code-level management points</li>
          <li class="whitespace-nowrap mobile-wrap">Only shares the MongoDB interface, creating inconvenience of having to monitor both MongoDB and DocumentDB:
            <ul class="pl-5 mt-2 space-y-1 list-disc">
              <li>Uncertainty about feature support</li>
              <li>Differences in operational behavior</li>
              <li>Various other inconsistencies</li>
            </ul>
          </li>
          <li class="whitespace-nowrap mobile-wrap">Performance is significantly worse than MongoDB (partly due to lower specs of current DocumentDB instances, but also underperforms compared to MongoDB at equivalent specs)</li>
          <li class="whitespace-nowrap mobile-wrap">Write operations are slower</li>
          <li class="whitespace-nowrap mobile-wrap">Read operations are slower</li>
          <li class="whitespace-nowrap mobile-wrap">Spring Data MongoDB framework cannot be applied directly, requiring tricky workarounds</li>
          <li class="whitespace-nowrap mobile-wrap">Spring Batch MongoCursorItemReader and MongoPagingItemReader throw exceptions</li>
          <li class="whitespace-nowrap mobile-wrap">Different SSL implementation methods</li>
          <li class="whitespace-nowrap mobile-wrap">Requires DocumentDB GC tuning (DBA domain)</li>
          <li class="whitespace-nowrap mobile-wrap">Unpredictable CPU spikes</li>
        </ul>
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">
          Alternative Solutions:
        </h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">MongoDB Atlas
            <ul class="pl-5 mt-2 space-y-1 list-disc">
              <li>No GC → No "Stop the world" pauses</li>
              <li>WiredTiger engine reuses deleted space efficiently</li>
            </ul>
          </li>
          <li class="whitespace-nowrap mobile-wrap">EC2 Marketplace</li>
        </ul>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 460">
        <rect width="900" height="460" fill="#f8f9fa" rx="10" ry="10"/>

        <text x="450" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">
          MongoDB Atlas vs EC2 Marketplace
        </text>

        <!-- Atlas Box -->
        <rect x="50" y="80" width="380" height="280" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="240" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">MongoDB Atlas</text>

        <!-- EC2 Box -->
        <rect x="470" y="80" width="380" height="280" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="660" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">EC2 Marketplace</text>

        <!-- Atlas Features -->
        <rect x="70" y="130" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="155" font-family="Arial" font-size="16" text-anchor="middle">✅ Fully-Managed Service</text>

        <rect x="70" y="180" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="205" font-family="Arial" font-size="16" text-anchor="middle">✅ One-click Scaling & Global Distribution</text>

        <rect x="70" y="230" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="255" font-family="Arial" font-size="16" text-anchor="middle">✅ Built-in Security & Compliance</text>

        <rect x="70" y="280" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="240" y="305" font-family="Arial" font-size="16" text-anchor="middle">❌ Higher Cost</text>

        <!-- EC2 Features -->
        <rect x="490" y="130" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="155" font-family="Arial" font-size="16" text-anchor="middle">❌ Self-managed Operation</text>

        <rect x="490" y="180" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="205" font-family="Arial" font-size="16" text-anchor="middle">❌ Manual Scaling & Deployment</text>

        <rect x="490" y="230" width="340" height="40" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="255" font-family="Arial" font-size="16" text-anchor="middle">❌ Custom Security Configuration</text>

        <rect x="490" y="280" width="340" height="40" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="660" y="305" font-family="Arial" font-size="16" text-anchor="middle">✅ Cost Optimization Potential</text>

        <!-- Bottom text -->
        <text x="240" y="380" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Limited Customization</text>
        <text x="660" y="380" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Complete Control</text>

        <!-- Sharding note -->
        <text x="450" y="420" font-family="Arial" font-size="16" text-anchor="middle" font-style="italic">Both solutions require shard key design consideration</text>
      </svg>

      <div class="mt-6">
        <h2 class="mb-2 text-3xl sm:text-2xl tracking-tight text-gray-900 dark:text-white break-words">AWS DocumentDB Elastic Cluster</h2>
        <p class="text-gray-800 dark:text-gray-400">
          Amazon DocumentDB Elastic Cluster is based on a serverless architecture that automatically scales up and down, with a different maintenance approach than instance-based clusters.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Key considerations:</h3>
        <ul class="max-w-md space-y-1 text-gray-800 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Elastic Cluster is managed by AWS to minimize availability impact during maintenance</li>
          <li class="whitespace-nowrap mobile-wrap">Using Elastic Cluster minimizes operational disruptions from regular maintenance</li>
          <li class="whitespace-nowrap mobile-wrap">Official documentation states it doesn't support transactions, but need to verify if this applies to multi-shard transactions or transactions within a single shard</li>
          <li class="whitespace-nowrap mobile-wrap">Supports MongoDB 5.0 version currently in use</li>
          <li class="whitespace-nowrap mobile-wrap">Performance improvements expected with a minimum of 2 shards</li>
          <li class="whitespace-nowrap mobile-wrap">Requires shard key design</li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Documentation reference:</h3>
        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white">
          <pre class="whitespace-pre-wrap"><code><span class="text-blue-400">https://docs.aws.amazon.com/documentdb/latest/developerguide/elastic-best-practices.html#scaling</span></code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Solution Comparison Matrix</h2>
        <p class="text-gray-700 dark:text-gray-400">
          The table below provides a comprehensive comparison of the different MongoDB deployment options.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Comparison Criteria:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Full control and custom configuration</li>
          <li class="whitespace-nowrap mobile-wrap">Operational overhead minimization</li>
          <li class="whitespace-nowrap mobile-wrap">Security and compliance</li>
          <li class="whitespace-nowrap mobile-wrap">Global deployment and auto-scaling</li>
          <li class="whitespace-nowrap mobile-wrap">Rapid deployment and development environment</li>
          <li class="whitespace-nowrap mobile-wrap">Cost optimization</li>
        </ul>

        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white mt-4">
    <pre class="whitespace-pre-wrap"><code><span class="text-purple-400">Atlas vs EC2 Marketplace Summary</span>

<span class="text-blue-400">MongoDB Atlas:</span>
✅ Fully-Managed
✅ Automatic scaling
✅ Built-in security
✅ No GC (no "Stop the world" pauses)
❌ Higher cost
❌ Limited customization

<span class="text-green-400">EC2 Marketplace:</span>
✅ Complete control
✅ Custom configuration
✅ Potential cost savings
❌ Self-managed operation
❌ Manual security configuration
❌ Manual scaling</code></pre>
        </div>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">DocumentDB Elastic Cluster advantages:</h3>
        <div class="bg-gray-800 rounded-md p-4 overflow-x-auto text-white">
    <pre class="whitespace-pre-wrap"><code><span class="text-yellow-400">Advantages:</span>
- Serverless architecture
- Automatic scaling
- Minimized maintenance impact
- MongoDB 5.0 support

<span class="text-red-400">Limitations:</span>
- Transaction support needs verification
- Requires shard key design
- Minimum 2 shards required</code></pre>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <!-- Background -->
        <rect width="800" height="450" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Solution Recommendations</text>

        <!-- DocumentDB Instance-based Box -->
        <rect x="50" y="80" width="220" height="320" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="10" ry="10"/>
        <text x="160" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">DocumentDB Instance</text>

        <!-- DocumentDB Elastic Box -->
        <rect x="290" y="80" width="220" height="320" fill="#d9f7be" stroke="#52c41a" stroke-width="2" rx="10" ry="10"/>
        <text x="400" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">DocumentDB Elastic</text>

        <!-- MongoDB Atlas Box -->
        <rect x="530" y="80" width="220" height="320" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="10" ry="10"/>
        <text x="640" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">MongoDB Atlas</text>

        <!-- Current Solution -->
        <text x="160" y="140" font-family="Arial" font-size="14" text-anchor="middle" font-style="italic">Current Solution</text>

        <!-- DocumentDB Instance Issues -->
        <rect x="70" y="160" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="180" font-family="Arial" font-size="12" text-anchor="middle">No Zero-downtime Deployment</text>

        <rect x="70" y="200" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="220" font-family="Arial" font-size="12" text-anchor="middle">Performance Issues</text>

        <rect x="70" y="240" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="260" font-family="Arial" font-size="12" text-anchor="middle">Spring Integration Problems</text>

        <rect x="70" y="280" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="300" font-family="Arial" font-size="12" text-anchor="middle">GC Tuning Required</text>

        <rect x="70" y="320" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="160" y="340" font-family="Arial" font-size="12" text-anchor="middle">Unpredictable CPU Spikes</text>

        <!-- DocumentDB Elastic Features -->
        <rect x="310" y="160" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="400" y="180" font-family="Arial" font-size="12" text-anchor="middle">Serverless Architecture</text>

        <rect x="310" y="200" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="400" y="220" font-family="Arial" font-size="12" text-anchor="middle">Automatic Scaling</text>

        <rect x="310" y="240" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="400" y="260" font-family="Arial" font-size="12" text-anchor="middle">Minimal Maintenance Impact</text>

        <rect x="310" y="280" width="180" height="30" fill="#fff1b8" stroke="#d48806" stroke-width="1" rx="5" ry="5"/>
        <text x="400" y="300" font-family="Arial" font-size="12" text-anchor="middle">Transaction Support (Verify)</text>

        <rect x="310" y="320" width="180" height="30" fill="#fff1b8" stroke="#d48806" stroke-width="1" rx="5" ry="5"/>
        <text x="400" y="340" font-family="Arial" font-size="12" text-anchor="middle">Requires Shard Key Design</text>

        <!-- MongoDB Atlas Features -->
        <rect x="550" y="160" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="640" y="180" font-family="Arial" font-size="12" text-anchor="middle">Fully-Managed Service</text>

        <rect x="550" y="200" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="640" y="220" font-family="Arial" font-size="12" text-anchor="middle">No GC (No "Stop the world")</text>

        <rect x="550" y="240" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="640" y="260" font-family="Arial" font-size="12" text-anchor="middle">One-click Global Deployment</text>

        <rect x="550" y="280" width="180" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="5" ry="5"/>
        <text x="640" y="300" font-family="Arial" font-size="12" text-anchor="middle">Spring Framework Compatible</text>

        <rect x="550" y="320" width="180" height="30" fill="#ffc9c9" stroke="#cf1322" stroke-width="1" rx="5" ry="5"/>
        <text x="640" y="340" font-family="Arial" font-size="12" text-anchor="middle">Higher Cost</text>

        <!-- Conclusion -->
        <text x="400" y="420" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Recommended Options: DocumentDB Elastic or MongoDB Atlas</text>
      </svg>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion and Next Steps</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Based on the analysis of the current issues with DocumentDB instance-based clusters and the evaluation of alternatives,
          two main options emerge as viable solutions to address the existing challenges.
        </p>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Recommended options:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">AWS DocumentDB Elastic Cluster
            <ul class="pl-5 mt-2 space-y-1 list-disc">
              <li>Remains within AWS ecosystem</li>
              <li>Addresses maintenance and scaling issues</li>
              <li>Need to verify transaction support requirements</li>
              <li>Requires shard key design</li>
            </ul>
          </li>
          <li class="whitespace-nowrap mobile-wrap">MongoDB Atlas
            <ul class="pl-5 mt-2 space-y-1 list-disc">
              <li>Best performance and compatibility</li>
              <li>Eliminates GC-related issues</li>
              <li>Spring framework compatibility</li>
              <li>Higher cost structure</li>
            </ul>
          </li>
        </ul>

        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white mt-4">Required Actions:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Evaluate transaction usage in current application to determine compatibility with Elastic Cluster</li>
          <li class="whitespace-nowrap mobile-wrap">Design shard key strategy for both options</li>
          <li class="whitespace-nowrap mobile-wrap">Conduct cost analysis comparing both solutions</li>
          <li class="whitespace-nowrap mobile-wrap">Test performance with representative workloads</li>
        </ul>
      </div>
    </div>
`
};