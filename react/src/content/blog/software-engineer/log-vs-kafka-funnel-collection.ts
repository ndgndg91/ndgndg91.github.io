import type { BlogPost } from '../../../types/blog';

export const logVsKafkaFunnelCollection: BlogPost = {
  id: 'funnel-log-vs-kafka-collection',
  title: 'Funnel Data Collection: Log vs. Kafka — An Engineering Decision Record',
  description: 'When a data team requests Kafka for funnel event collection, is it really the right tool for the job? An engineering post-mortem on how we decoupled the schema requirement from the transport channel.',
  category: 'software-engineer',
  date: '2026-07-09',
  updatedDate: '2026-07-09',
  tags: ['Architecture', 'Data Pipeline', 'Logging', 'Kafka', 'Fluentd', 'Decision Record'],
  image: 'funnel-log-vs-kafka-collection.webp',
  content: `
    <nav class="mb-4" aria-label="Breadcrumb">
      <ol class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <li><a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">Home</a></li>
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
          <span class="ml-2 text-gray-900 dark:text-gray-100 font-medium">Funnel Data: Log vs. Kafka</span>
        </li>
      </ol>
    </nav>
    <article class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-4xl font-extrabold mb-6 text-gray-900 dark:text-white">Funnel Data Collection: Log vs. Kafka — An Engineering Decision Record</h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 font-medium mb-8">
        It is easy to accept requests from other teams as-is. When our data platform team requested that we publish user conversion funnel events directly to a Kafka cluster rather than writing them to logs, it seemed like a natural direction. But looking deeper into the trade-offs, we realized that the requested solution and the actual operational requirements were two different things.
      </p>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">1. The Trigger: A Funnel Data Gap</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          We recently launched a new authentication flow that migrated users away from our legacy system. While the feature worked perfectly, our analytics dashboards went blank because the legacy logs—which our analytics engine ingested to track user drop-offs and funnel steps—were no longer being printed.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The first reaction was to replicate the old logging pattern in the new authentication services. However, the data team proposed a different approach: <strong>"Do not use logs; publish these events directly to Kafka instead."</strong>
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">2. The Fallacy: "Kafka is More Reliable for Analytics"</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Kafka is a fantastic tool for event streaming. It guarantees at-least-once delivery, maintains event order, and protects against data loss.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          But does funnel analytics data need that level of guarantee?
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Funnel data is statistical. We calculate aggregate percentages and conversion rates (e.g., "What percentage of users dropped off between entering their phone number and verifying their OTP?"). Losing a few events during a network hiccup might change a conversion rate from 84.12% to 84.11%, which has zero business impact. Unlike ledger entries, financial transactions, or audit logs, funnel metrics do not require strict, transaction-level consistency.
        </p>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          From a data reliability standpoint, Kafka was overkill.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">3. The Real Driver: Consumer Convenience</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          When we discussed this with the data team, we discovered that their preference for Kafka was not actually about transport-level reliability. It was about <strong>operational convenience</strong>:
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>No Log Parsing:</strong> Text logs are difficult to parse, and formats frequently break. Kafka topics enforce a structured JSON schema, ensuring consistent data ingestion.</li>
          <li><strong>Replayability:</strong> Kafka offsets make it easy to restart consumers and reprocess events in case of downstream database failures.</li>
          <li><strong>Resource Isolation:</strong> Running Elasticsearch queries against production databases for analytics reports introduces operational risk. Consuming from Kafka isolates the analytics workload entirely.</li>
        </ul>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          The data team did not necessarily need Kafka as the <em>transport</em>; they needed a **structured, replayable event channel that avoided text log parsing**.
        </p>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">4. The Cost: Producer-Consumer Asymmetry</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          While Kafka provided massive benefits for the consumer (the data team), it introduced high costs for the producers (the backend services):
        </p>
        <ul class="list-disc pl-5 space-y-2 mb-6 text-gray-900 dark:text-gray-100">
          <li><strong>Diverse Technology Stacks:</strong> The authentication flows spanned multiple backend services written in different languages (Java, Kotlin, Python). Adding Kafka producers to all of them meant building and maintaining multiple client configurations.</li>
          <li><strong>Legacy and Fade-out Services:</strong> Some services in the flow were scheduled for deprecation. Adding new infrastructure dependencies to a dying service is a clear anti-pattern.</li>
          <li><strong>Network Management:</strong> Connecting some services to the data team\'s separate Kafka cluster required setting up new VPC peering, security groups, and SSL certificate management.</li>
        </ul>
      </section>

      <section class="mb-8 border-b border-gray-100 dark:border-gray-800 pb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">5. The Solution: Decoupling at the Infrastructure Layer</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          Instead of forcing the backend applications to publish directly to Kafka, we moved the integration to our logging infrastructure:
        </p>
        
        <div class="bg-gray-50 dark:bg-gray-800/40 p-6 rounded-xl border border-gray-200 dark:border-gray-700 my-6">
          <p class="text-gray-900 dark:text-gray-100 font-semibold mb-2">How it works:</p>
          <ol class="list-decimal pl-5 space-y-2 text-gray-800 dark:text-gray-200">
            <li>Backend applications write structured JSON funnel logs directly to <code>stdout</code>. No Kafka client library or config required.</li>
            <li>A node-level log collector (<strong>Fluent-bit</strong> running as a DaemonSet) scrapes these logs.</li>
            <li>Fluent-bit forwards the logs to a central <strong>Fluentd</strong> aggregator.</li>
            <li>Fluentd uses a <code>@type copy</code> plugin to write to the main Elasticsearch cluster, and simultaneously uses the <code>out_kafka2</code> plugin to publish the structured JSON logs to the data team\'s Kafka cluster.</li>
          </ol>
        </div>

        <p class="mb-4 text-gray-900 dark:text-gray-100">
          This pattern achieved zero application-level cost. The backend services printed standard logs, while the logging agent handled Kafka publishing. The data team received their structured JSON events on their Kafka topic, and the backend team avoided managing additional client dependencies in legacy services.
        </p>
        <blockquote class="border-l-4 border-indigo-500 dark:border-indigo-400 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          <strong>Important:</strong> Relying on stdout logging under high traffic can cause performance bottlenecks due to synchronous I/O blocking. Ensure you configure your application to use asynchronous logging (such as Logback\'s <code>AsyncAppender</code> or Log4j2\'s LMAX Disruptor-based <code>AsyncLogger</code>) to prevent logging from slowing down application throughput.
        </blockquote>
      </section>

      <section class="mb-8">
        <h2 class="text-2xl font-bold mb-4 text-indigo-700 dark:text-indigo-400">6. Conclusion</h2>
        <p class="mb-4 text-gray-900 dark:text-gray-100">
          When teams request a specific technology, it is often because they are looking at the problem through the lens of their own operational convenience. By taking the time to separate the *intent* (schema-enforced, structured data) from the *transport* (Kafka vs. Logs), we were able to satisfy the requirements of both teams at a fraction of the engineering cost.
        </p>
      </section>
    </article>
  `
};
