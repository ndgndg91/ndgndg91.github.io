import type { BlogPost } from '../../../types/blog';

export const kafkaBasic: BlogPost = {
  id: 'kafka-basics',
  category: 'software-engineer',
  title: 'Kafka Basics',
  description: 'Topic, Partition, Offsets, Producer, Consumer, Delivery semantics, Broker, Zookeeper, KRaft concepts.',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['Kafka', 'Message Queue', 'Distributed Systems', 'Event Streaming', 'Data Pipeline', 'KRaft'],
  image: 'kafka.webp',
  content: `
<div class="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
  <div class="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
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
          <span class="ml-2 text-gray-400">About Kafka Basic</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
    <p class="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
      Developer Playground
    </p>
    <h1 data-title="true" class="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
      About Kafka Basic
    </h1>
      <div class="text-sm text-gray-500 mt-2">Updated: March 31, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Topics</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">A category or feed name to which records are published</li>
          <li class="whitespace-nowrap mobile-wrap">Identified by unique names within a Kafka cluster</li>
          <li class="whitespace-nowrap mobile-wrap">Store messages in various formats (<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">JSON</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">Avro</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">Protobuf</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">text</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">binary</code>, <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">custom</code>)</li>
          <li class="whitespace-nowrap mobile-wrap">Split into partitions for distributed data scaling</li>
          <li class="whitespace-nowrap mobile-wrap">Configured with replication factor for fault tolerance</li>
          <li class="whitespace-nowrap mobile-wrap">Support configurable retention policies (time/size based)</li>
          <li class="whitespace-nowrap mobile-wrap">Immutable append-only logs - once written, cannot be modified</li>
          <li class="whitespace-nowrap mobile-wrap">Names are case-sensitive (alphanumeric, dots, underscores, hyphens)</li>
          <li class="whitespace-nowrap mobile-wrap">Internal topics: <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">__consumer_offsets</code> and <code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-gray-900 dark:text-gray-100">__transaction_state</code></li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
        <!-- Background -->
        <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka Topics and Partitions</text>

        <!-- Topic A -->
        <rect x="100" y="80" width="600" height="120" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="130" y="105" font-family="Arial" font-size="18" font-weight="bold">Topic A</text>

        <!-- Partitions for Topic A -->
        <rect x="120" y="120" width="560" height="30" fill="#91d5ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="140" font-family="Arial" font-size="14" text-anchor="middle">Partition 0</text>

        <!-- Messages in Partition 0 -->
        <rect x="130" y="122" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <rect x="175" y="122" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <rect x="220" y="122" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <rect x="265" y="122" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <text x="140" y="140" font-family="Arial" font-size="12" fill="white" text-anchor="middle">0</text>
        <text x="185" y="140" font-family="Arial" font-size="12" fill="white" text-anchor="middle">1</text>
        <text x="230" y="140" font-family="Arial" font-size="12" fill="white" text-anchor="middle">2</text>
        <text x="275" y="140" font-family="Arial" font-size="12" fill="white" text-anchor="middle">3</text>

        <rect x="120" y="160" width="560" height="30" fill="#91d5ff" stroke="#1890ff" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="180" font-family="Arial" font-size="14" text-anchor="middle">Partition 1</text>

        <!-- Messages in Partition 1 -->
        <rect x="130" y="162" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <rect x="175" y="162" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <rect x="220" y="162" width="40" height="26" fill="#1890ff" rx="2" ry="2"/>
        <text x="140" y="180" font-family="Arial" font-size="12" fill="white" text-anchor="middle">0</text>
        <text x="185" y="180" font-family="Arial" font-size="12" fill="white" text-anchor="middle">1</text>
        <text x="230" y="180" font-family="Arial" font-size="12" fill="white" text-anchor="middle">2</text>

        <!-- Topic B -->
        <rect x="100" y="220" width="600" height="120" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="130" y="245" font-family="Arial" font-size="18" font-weight="bold">Topic B</text>

        <!-- Partitions for Topic B -->
        <rect x="120" y="260" width="560" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="280" font-family="Arial" font-size="14" text-anchor="middle">Partition 0</text>

        <!-- Messages in Partition 0 -->
        <rect x="130" y="262" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <rect x="175" y="262" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <rect x="220" y="262" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <rect x="265" y="262" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <rect x="310" y="262" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <text x="140" y="280" font-family="Arial" font-size="12" fill="white" text-anchor="middle">0</text>
        <text x="185" y="280" font-family="Arial" font-size="12" fill="white" text-anchor="middle">1</text>
        <text x="230" y="280" font-family="Arial" font-size="12" fill="white" text-anchor="middle">2</text>
        <text x="275" y="280" font-family="Arial" font-size="12" fill="white" text-anchor="middle">3</text>
        <text x="320" y="280" font-family="Arial" font-size="12" fill="white" text-anchor="middle">4</text>

        <rect x="120" y="300" width="560" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="320" font-family="Arial" font-size="14" text-anchor="middle">Partition 1</text>

        <!-- Messages in Partition 1 -->
        <rect x="130" y="302" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <rect x="175" y="302" width="40" height="26" fill="#52c41a" rx="2" ry="2"/>
        <text x="140" y="320" font-family="Arial" font-size="12" fill="white" text-anchor="middle">0</text>
        <text x="185" y="320" font-family="Arial" font-size="12" fill="white" text-anchor="middle">1</text>

        <!-- Legend -->
        <rect x="650" y="370" width="20" height="15" fill="#1890ff" rx="2" ry="2"/>
        <text x="675" y="382" font-family="Arial" font-size="12" text-anchor="start">Message with offset</text>
      </svg>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Partitions &amp;Offsets</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Topics have one or multiple partitions for parallel processing</li>
          <li class="whitespace-nowrap mobile-wrap">Each partition is an ordered, immutable sequence of records</li>
          <li class="whitespace-nowrap mobile-wrap">Messages in a partition are strictly ordered with sequential offsets</li>
          <li class="whitespace-nowrap mobile-wrap">Offsets are partition-specific identifiers that are immutable</li>
          <li class="whitespace-nowrap mobile-wrap">Each partition starts with offset 0</li>
          <li class="whitespace-nowrap mobile-wrap">Default retention: 7 days (configurable by time/size)</li>
          <li class="whitespace-nowrap mobile-wrap">Oldest messages are removed when retention limits are reached</li>
          <li class="whitespace-nowrap mobile-wrap">Partitions are distributed across brokers for load balancing</li>
          <li class="whitespace-nowrap mobile-wrap">Each has a leader broker and zero or more follower brokers</li>
          <li class="whitespace-nowrap mobile-wrap">Partition count can be increased but not decreased after creation</li>
        </ul>
      </div>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Producer</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Write (publish) data to Kafka topics</li>
          <li class="whitespace-nowrap mobile-wrap">Can specify partition or let Kafka handle assignment</li>
          <li class="whitespace-nowrap mobile-wrap">Message components: key, value, headers, timestamp</li>
          <li class="whitespace-nowrap mobile-wrap">Compression options: none (default), gzip, snappy, lz4, zstd</li>
          <li class="whitespace-nowrap mobile-wrap">Timestamp options: system time (default) or custom</li>
          <li class="whitespace-nowrap mobile-wrap">Support for retries, idempotence, and exactly-once semantics (since 2.8)</li>
        </ul>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Partitioning strategies:</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Null key: round-robin distribution</li>
          <li class="whitespace-nowrap mobile-wrap">Non-null key: consistent hashing (murmur2)</li>
          <li class="whitespace-nowrap mobile-wrap">Custom partitioning possible</li>
        </ul>
      </div>
      <div class="mt-6">
        <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Acknowledgment modes (acks):</h3>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">acks=0: No acknowledgment (fire and forget)</li>
          <li class="whitespace-nowrap mobile-wrap">acks=1: Leader acknowledgment only (default)</li>
          <li class="whitespace-nowrap mobile-wrap">acks=all/-1: Full acknowledgment from leader and all in-sync replicas</li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
        <!-- Background -->
        <rect width="800" height="500" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka Producers and Consumers</text>

        <!-- Producers -->
        <rect x="60" y="100" width="120" height="60" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
        <text x="120" y="140" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Producer 1</text>

        <rect x="60" y="180" width="120" height="60" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
        <text x="120" y="220" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Producer 2</text>

        <!-- Kafka Cluster -->
        <rect x="300" y="100" width="200" height="280" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="400" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Cluster</text>

        <!-- Topic with Partitions -->
        <rect x="320" y="150" width="160" height="200" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="175" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Topic</text>

        <!-- Partitions -->
        <rect x="330" y="190" width="140" height="40" fill="#adc6ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="215" font-family="Arial" font-size="14" text-anchor="middle">Partition 0</text>

        <rect x="330" y="240" width="140" height="40" fill="#adc6ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="265" font-family="Arial" font-size="14" text-anchor="middle">Partition 1</text>

        <rect x="330" y="290" width="140" height="40" fill="#adc6ff" stroke="#2f54eb" stroke-width="1" rx="3" ry="3"/>
        <text x="400" y="315" font-family="Arial" font-size="14" text-anchor="middle">Partition 2</text>

        <!-- Consumer Group -->
        <rect x="620" y="100" width="140" height="280" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="10" ry="10"/>
        <text x="690" y="130" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Consumer Group</text>

        <!-- Consumers -->
        <rect x="630" y="150" width="120" height="60" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="690" y="190" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Consumer 1</text>

        <rect x="630" y="220" width="120" height="60" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="690" y="260" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Consumer 2</text>

        <rect x="630" y="290" width="120" height="60" fill="#fff7e6" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="690" y="330" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Consumer 3</text>

        <!-- Arrows from Producers to Kafka -->
        <path d="M180,130 L300,210" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M180,210 L300,250" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Arrows from Kafka to Consumers -->
        <path d="M500,210 L630,180" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M500,260 L630,250" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M500,310 L630,320" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Key Information -->
        <text x="120" y="270" font-family="Arial" font-size="14" text-anchor="middle">Key-based routing</text>
        <text x="120" y="290" font-family="Arial" font-size="14" text-anchor="middle">Acks, compression</text>

        <text x="400" y="400" font-family="Arial" font-size="14" text-anchor="middle">Ordered messages in each partition</text>
        <text x="400" y="420" font-family="Arial" font-size="14" text-anchor="middle">Immutable offsets</text>

        <text x="690" y="400" font-family="Arial" font-size="14" text-anchor="middle">One partition</text>
        <text x="690" y="420" font-family="Arial" font-size="14" text-anchor="middle">per consumer</text>
        <text x="690" y="440" font-family="Arial" font-size="14" text-anchor="middle">within group</text>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000"/>
          </marker>
        </defs>
      </svg>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Consumers</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Pull (fetch) data from Kafka topics</li>
          <li class="whitespace-nowrap mobile-wrap">Read messages in exact write order within each partition</li>
          <li class="whitespace-nowrap mobile-wrap">Use deserializers for various data formats</li>
          <li class="whitespace-nowrap mobile-wrap">Maintain position by tracking last consumed offset</li>
          <li class="whitespace-nowrap mobile-wrap">Offset reset policies: earliest, latest, none</li>
          <li class="whitespace-nowrap mobile-wrap">Configurable fetch settings for throughput vs. latency optimization</li>
        </ul>
      </div>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Consumer Groups</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Organized for parallel processing</li>
          <li class="whitespace-nowrap mobile-wrap">Each consumer assigned exclusive partitions within a group</li>
          <li class="whitespace-nowrap mobile-wrap">Dynamic rebalancing when consumers join/leave</li>
          <li class="whitespace-nowrap mobile-wrap">Inactive consumers if more consumers than partitions</li>
          <li class="whitespace-nowrap mobile-wrap">Identified by unique group.id</li>
          <li class="whitespace-nowrap mobile-wrap">Offsets committed to __consumer_offsets topic</li>
          <li class="whitespace-nowrap mobile-wrap">Managed by a group coordinator broker</li>
          <li class="whitespace-nowrap mobile-wrap">Partition assignment strategies: Range, RoundRobin, Sticky, CooperativeSticky</li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
        <!-- Background -->
        <rect width="800" height="550" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka Consumer Groups and Delivery Semantics</text>

        <!-- Kafka Topic -->
        <rect x="50" y="100" width="180" height="300" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="140" y="130" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Kafka Topic</text>

        <!-- Partitions -->
        <rect x="70" y="150" width="140" height="50" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="140" y="180" font-family="Arial" font-size="16" text-anchor="middle">Partition 0</text>

        <rect x="70" y="210" width="140" height="50" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="140" y="240" font-family="Arial" font-size="16" text-anchor="middle">Partition 1</text>

        <rect x="70" y="270" width="140" height="50" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="140" y="300" font-family="Arial" font-size="16" text-anchor="middle">Partition 2</text>

        <rect x="70" y="330" width="140" height="50" fill="#91d5ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="140" y="360" font-family="Arial" font-size="16" text-anchor="middle">Partition 3</text>

        <!-- Consumer Group A -->
        <rect x="290" y="100" width="140" height="300" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="360" y="130" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Group A</text>

        <rect x="310" y="150" width="100" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="360" y="180" font-family="Arial" font-size="14" text-anchor="middle">Consumer A1</text>

        <rect x="310" y="210" width="100" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="360" y="240" font-family="Arial" font-size="14" text-anchor="middle">Consumer A2</text>

        <rect x="310" y="270" width="100" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="360" y="300" font-family="Arial" font-size="14" text-anchor="middle">Consumer A3</text>

        <rect x="310" y="330" width="100" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="360" y="360" font-family="Arial" font-size="14" text-anchor="middle">Consumer A4</text>

        <!-- Consumer Group B - 오른쪽으로 이동 및 세로 위치 조정 -->
        <rect x="560" y="100" width="140" height="180" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="630" y="130" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Group B</text>

        <rect x="580" y="150" width="100" height="50" fill="#b7eb8f" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="630" y="180" font-family="Arial" font-size="14" text-anchor="middle">Consumer B1</text>

        <rect x="580" y="210" width="100" height="50" fill="#b7eb8f" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="630" y="240" font-family="Arial" font-size="14" text-anchor="middle">Consumer B2</text>

        <!-- Delivery Semantics -->
        <rect x="490" y="320" width="280" height="175" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="8" ry="8"/>
        <text x="630" y="340" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Delivery Semantics</text>

        <text x="510" y="360" font-family="Arial" font-size="14" fill="#fa541c" font-weight="bold">• At least once (default):</text>
        <text x="520" y="380" font-family="Arial" font-size="12">Commit after processing, possible duplicates</text>

        <text x="510" y="405" font-family="Arial" font-size="14" fill="#fa8c16" font-weight="bold">• At most once:</text>
        <text x="520" y="425" font-family="Arial" font-size="12">Commit on receive, possible data loss</text>

        <text x="510" y="440" font-family="Arial" font-size="14" fill="#52c41a" font-weight="bold">• Exactly once:</text>
        <text x="520" y="460" font-family="Arial" font-size="12">Transactions API, no duplicates, no loss</text>

        <!-- Connection arrows for Group A - 직선 화살표 -->
        <path d="M210,175 L310,175" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M210,235 L310,235" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M210,295 L310,295" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M210,355 L310,355" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Connection arrows for Group B - 곡선 화살표 -->
        <path d="M210,175 C300,155 460,140 580,175" stroke="#52c41a" stroke-width="2" stroke-dasharray="5,3" fill="none" marker-end="url(#arrow2)"/>
        <path d="M210,235 C300,215 460,200 580,235" stroke="#52c41a" stroke-width="2" stroke-dasharray="5,3" fill="none" marker-end="url(#arrow2)"/>

        <!-- Group B Partition Assignment -->
        <text x="630" y="295" font-family="Arial" font-size="12" text-anchor="middle">Each consumer handles</text>
        <text x="630" y="310" font-family="Arial" font-size="12" text-anchor="middle">2 partitions</text>

        <!-- Group A Partition Assignment -->
        <text x="140" y="450" font-family="Arial" font-size="14" text-anchor="middle" font-style="italic">Topic with 4 partitions</text>
        <text x="360" y="415" font-family="Arial" font-size="12" text-anchor="middle">1 partition per consumer</text>
        <text x="360" y="430" font-family="Arial" font-size="12" text-anchor="middle">within the group</text>

        <!-- Offset Commits -->
        <text x="360" y="450" font-family="Arial" font-size="12" text-anchor="middle">Offsets stored in</text>
        <text x="360" y="465" font-family="Arial" font-size="12" text-anchor="middle">__consumer_offsets topic</text>

        <!-- Group A Label -->
        <text x="400" y="200" font-family="Arial" font-size="12" fill="#fa8c16" font-weight="bold">Group A connections</text>
        <!-- Group B Label -->
        <text x="430" y="150" font-family="Arial" font-size="12" fill="#52c41a" font-weight="bold">Group B connections</text>

        <!-- Arrow marker definitions -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#fa8c16"/>
          </marker>
          <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#52c41a"/>
          </marker>
        </defs>
      </svg>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Delivery semantics for consumers</h2>
        <div class="mt-6">
          <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">At least once (default):</h3>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">Commit after processing</li>
            <li class="whitespace-nowrap mobile-wrap">May cause duplicates if failure occurs</li>
            <li class="whitespace-nowrap mobile-wrap">Requires idempotent consumers</li>
          </ul>
        </div>
        <div class="mt-6">
          <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">At most once:</h3>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">Commit on receive, before processing</li>
            <li class="whitespace-nowrap mobile-wrap">No reprocessing on failure, potential data loss</li>
          </ul>
        </div>
        <div class="mt-6">
          <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Exactly once:</h3>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">Via Kafka Transactions API</li>
            <li class="whitespace-nowrap mobile-wrap">Requires idempotent producers and transactional consumers</li>
            <li class="whitespace-nowrap mobile-wrap">Primarily for Kafka-to-Kafka workflows</li>
          </ul>
        </div>
      </div>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Kafka brokers</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Distributed system of multiple servers (3-100+)</li>
          <li class="whitespace-nowrap mobile-wrap">Each identified by integer ID</li>
          <li class="whitespace-nowrap mobile-wrap">Connect via bootstrap servers</li>
          <li class="whitespace-nowrap mobile-wrap">Manage partitions, handle requests, manage replication</li>
          <li class="whitespace-nowrap mobile-wrap">Automatic leadership transfer on failure</li>
          <li class="whitespace-nowrap mobile-wrap">Controller broker manages administrative operations</li>
        </ul>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500">
        <!-- Background -->
        <rect width="800" height="500" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka Brokers and Replication</text>

        <!-- Broker 1 -->
        <rect x="100" y="80" width="180" height="320" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="190" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Broker 1 (id: 101)</text>

        <!-- Partitions in Broker 1 -->
        <rect x="110" y="130" width="160" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="190" y="155" font-family="Arial" font-size="14" text-anchor="middle" fill="white">Topic A - P0 (Leader)</text>

        <rect x="110" y="180" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="190" y="205" font-family="Arial" font-size="14" text-anchor="middle">Topic A - P1 (Follower)</text>

        <rect x="110" y="230" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="190" y="255" font-family="Arial" font-size="14" text-anchor="middle">Topic B - P1 (Follower)</text>

        <!-- Broker 2 -->
        <rect x="310" y="80" width="180" height="320" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="400" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Broker 2 (id: 102)</text>

        <!-- Partitions in Broker 2 -->
        <rect x="320" y="130" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="155" font-family="Arial" font-size="14" text-anchor="middle">Topic A - P0 (Follower)</text>

        <rect x="320" y="180" width="160" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="205" font-family="Arial" font-size="14" text-anchor="middle" fill="white">Topic A - P1 (Leader)</text>

        <rect x="320" y="230" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="255" font-family="Arial" font-size="14" text-anchor="middle">Topic B - P0 (Follower)</text>

        <!-- Broker 3 -->
        <rect x="520" y="80" width="180" height="320" fill="#e6f7ff" stroke="#1890ff" stroke-width="3" rx="10" ry="10"/>
        <text x="610" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Broker 3 (id: 103)</text>

        <!-- Partitions in Broker 3 -->
        <rect x="530" y="130" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="610" y="155" font-family="Arial" font-size="14" text-anchor="middle">Topic A - P0 (Follower)</text>

        <rect x="530" y="180" width="160" height="40" fill="#d6e4ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="610" y="205" font-family="Arial" font-size="14" text-anchor="middle">Topic A - P1 (Follower)</text>

        <rect x="530" y="230" width="160" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="2" rx="5" ry="5"/>
        <text x="610" y="255" font-family="Arial" font-size="14" text-anchor="middle" fill="white">Topic B - P0 (Leader)</text>

        <!-- Replication Information -->
        <rect x="120" y="290" width="560" height="120" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="8" ry="8"/>
        <text x="400" y="315" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Replication Information</text>

        <text x="140" y="345" font-family="Arial" font-size="14">• Replication Factor: 3 (each partition has 3 copies across brokers)</text>
        <text x="140" y="370" font-family="Arial" font-size="14">• For each partition, one broker is the leader, others are followers (ISR)</text>
        <text x="140" y="395" font-family="Arial" font-size="14">• With RF=3, cluster can tolerate 2 broker failures without data loss</text>

        <!-- Legend -->
        <rect x="650" y="440" width="20" height="15" fill="#1890ff" rx="2" ry="2"/>
        <text x="675" y="452" font-family="Arial" font-size="12" text-anchor="start">Leader Partition</text>

        <rect x="650" y="465" width="20" height="15" fill="#d6e4ff" stroke="#096dd9" stroke-width="1" rx="2" ry="2"/>
        <text x="675" y="477" font-family="Arial" font-size="12" text-anchor="start">Follower Partition</text>

        <!-- Controller information -->
        <text x="190" y="460" font-family="Arial" font-size="14" text-anchor="middle" fill="#f5222d" font-weight="bold">Controller Broker</text>
        <text x="190" y="480" font-family="Arial" font-size="12" text-anchor="middle">Manages administrative tasks</text>
        <text x="190" y="495" font-family="Arial" font-size="12" text-anchor="middle">and leadership elections</text>

        <!-- Controller arrow -->
        <path d="M190,440 L190,410" stroke="#f5222d" stroke-width="2" stroke-dasharray="5,3" fill="none" marker-end="url(#arrow)"/>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#f5222d"/>
          </marker>
        </defs>
      </svg>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Topic replication factor</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Replication factor = number of copies per partition</li>
          <li class="whitespace-nowrap mobile-wrap">Recommended: factor of 3 for production</li>
          <li class="whitespace-nowrap mobile-wrap">Must be ≤ number of brokers</li>
          <li class="whitespace-nowrap mobile-wrap">Set at topic level, can differ between topics</li>
          <li class="whitespace-nowrap mobile-wrap">With factor N, tolerate N-1 broker failures</li>
        </ul>
      </div>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Concept of Leader for a Partition</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">One leader per partition handles all reads/writes</li>
          <li class="whitespace-nowrap mobile-wrap">Followers passively replicate from leader</li>
          <li class="whitespace-nowrap mobile-wrap">In-Sync Replicas (ISR) = leader + caught-up followers</li>
          <li class="whitespace-nowrap mobile-wrap">With 3 partitions, RF=3, 3 brokers: each partition has ISR=3</li>
          <li class="whitespace-nowrap mobile-wrap">Automatic leadership transfer on failure</li>
          <li class="whitespace-nowrap mobile-wrap">Controller manages elections</li>
        </ul>
      </div>
      <div class="mt-6">
      <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Kafka Topic durability</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Replication factor N tolerates N-1 broker failures</li>
          <li class="whitespace-nowrap mobile-wrap">Enhanced by min.insync.replicas setting</li>
          <li class="whitespace-nowrap mobile-wrap">Strongest guarantees: RF=3, min.insync.replicas=2, acks=all</li>
          <li class="whitespace-nowrap mobile-wrap">Trade-off: higher durability vs. latency/throughput</li>
        </ul>
      </div>

      <div class="mt-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550">
          <!-- Background -->
          <rect width="800" height="550" fill="#f8f9fa" rx="10" ry="10"/>

          <!-- Title -->
          <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Kafka: Zookeeper vs KRaft</text>

          <!-- Zookeeper Based (Left Side) -->
          <rect x="50" y="80" width="320" height="320" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="10" ry="10"/>
          <text x="210" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Zookeeper-based Architecture</text>
          <text x="210" y="130" font-family="Arial" font-size="14" text-anchor="middle">(Before Kafka 4.0)</text>

          <!-- Zookeeper Ensemble -->
          <rect x="80" y="150" width="260" height="100" fill="#efdbff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
          <text x="210" y="170" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Zookeeper Ensemble</text>

          <circle cx="130" cy="200" r="20" fill="#722ed1"/>
          <text x="130" y="205" font-family="Arial" font-size="14" text-anchor="middle" fill="white">ZK1</text>

          <circle cx="210" cy="200" r="20" fill="#722ed1"/>
          <text x="210" y="205" font-family="Arial" font-size="14" text-anchor="middle" fill="white">ZK2</text>

          <circle cx="290" cy="200" r="20" fill="#722ed1"/>
          <text x="290" y="205" font-family="Arial" font-size="14" text-anchor="middle" fill="white">ZK3</text>

          <!-- Kafka Brokers with Zookeeper -->
          <rect x="80" y="280" width="260" height="100" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="210" y="300" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Kafka Brokers</text>

          <rect x="100" y="320" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="130" y="345" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B1</text>

          <rect x="180" y="320" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="210" y="345" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B2</text>

          <rect x="260" y="320" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="290" y="345" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B3</text>

          <!-- Arrows between Zookeeper and Kafka -->
          <path d="M130,220 L130,320" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M210,220 L210,320" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
          <path d="M290,220 L290,320" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

          <!-- KRaft Based (Right Side) -->
          <rect x="430" y="80" width="320" height="320" fill="#e6fffb" stroke="#13c2c2" stroke-width="2" rx="10" ry="10"/>
          <text x="590" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">KRaft Architecture</text>
          <text x="590" y="130" font-family="Arial" font-size="14" text-anchor="middle">(Kafka 4.0+)</text>

          <!-- Kafka Brokers with KRaft -->
          <rect x="460" y="150" width="260" height="230" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
          <text x="590" y="170" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Kafka Brokers with KRaft</text>

          <!-- KRaft Controller Quorum -->
          <rect x="480" y="190" width="220" height="80" fill="#b5f5ec" stroke="#13c2c2" stroke-width="2" rx="5" ry="5"/>
          <text x="590" y="210" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">KRaft Controller Quorum</text>

          <circle cx="530" cy="240" r="20" fill="#13c2c2"/>
          <text x="530" y="245" font-family="Arial" font-size="12" text-anchor="middle" fill="white">KR1</text>

          <circle cx="590" cy="240" r="20" fill="#13c2c2"/>
          <text x="590" y="245" font-family="Arial" font-size="12" text-anchor="middle" fill="white">KR2</text>

          <circle cx="650" cy="240" r="20" fill="#13c2c2"/>
          <text x="650" y="245" font-family="Arial" font-size="12" text-anchor="middle" fill="white">KR3</text>

          <!-- Broker Nodes -->
          <rect x="480" y="290" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="510" y="315" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B1</text>

          <rect x="560" y="290" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="590" y="315" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B2</text>

          <rect x="640" y="290" width="60" height="40" fill="#1890ff" stroke="#096dd9" stroke-width="1" rx="3" ry="3"/>
          <text x="670" y="315" font-family="Arial" font-size="14" text-anchor="middle" fill="white">B3</text>

          <!-- Internal connections (KRaft to Brokers) -->
          <path d="M530,260 L510,290" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
          <path d="M590,260 L590,290" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>
          <path d="M650,260 L670,290" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow2)"/>

          <!-- Timeline -->
          <rect x="160" y="480" width="480" height="20" fill="#f0f2f5" stroke="#d9d9d9" stroke-width="1" rx="3" ry="3"/>
          <text x="400" y="445" font-family="Arial" font-size="12" text-anchor="middle">Kafka Version Timeline</text>

          <line x1="100" y1="500" x2="700" y2="500" stroke="#d9d9d9" stroke-width="1"/>

          <line x1="250" y1="480" x2="250" y2="500" stroke="#d9d9d9" stroke-width="2"/>
          <text x="250" y="475" font-family="Arial" font-size="9" text-anchor="middle">v2.8</text>
          <text x="250" y="465" font-family="Arial" font-size="9" text-anchor="middle">KRaft Preview</text>

          <line x1="350" y1="480" x2="350" y2="500" stroke="#d9d9d9" stroke-width="2"/>
          <text x="350" y="475" font-family="Arial" font-size="9" text-anchor="middle">v3.0</text>
          <text x="350" y="465" font-family="Arial" font-size="9" text-anchor="middle">KRaft Supported</text>

          <line x1="450" y1="480" x2="450" y2="500" stroke="#d9d9d9" stroke-width="2"/>
          <text x="450" y="475" font-family="Arial" font-size="9" text-anchor="middle">v3.3</text>
          <text x="450" y="465" font-family="Arial" font-size="9" text-anchor="middle">KRaft Production-Ready</text>

          <line x1="550" y1="480" x2="550" y2="500" stroke="#d9d9d9" stroke-width="2"/>
          <text x="550" y="475" font-family="Arial" font-size="9" text-anchor="middle">v4.0</text>
          <text x="550" y="465" font-family="Arial" font-size="9" text-anchor="middle">Zookeeper Removed</text>

          <!-- Key Features -->
          <text x="50" y="420" font-family="Arial" font-size="12" fill="#722ed1" font-weight="bold">Zookeeper:</text>
          <text x="120" y="420" font-family="Arial" font-size="12">Manages metadata, broker coordination, leader election</text>

          <text x="430" y="420" font-family="Arial" font-size="12" fill="#13c2c2" font-weight="bold">KRaft:</text>
          <text x="470" y="420" font-family="Arial" font-size="12">Self-managed consensus, simplified architecture</text>

          <!-- Arrow marker definitions -->
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#722ed1"/>
            </marker>
            <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#13c2c2"/>
            </marker>
          </defs>
        </svg>
        <h2 class="inline-block mb-2 text-3xl  tracking-tight text-gray-900 dark:text-white">Zookeeper</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Managed metadata and broker coordination (historically)</li>
          <li class="whitespace-nowrap mobile-wrap">Handled broker registration, configurations, elections</li>
          <li class="whitespace-nowrap mobile-wrap">Stored consumer offsets until 0.10</li>
          <li class="whitespace-nowrap mobile-wrap">Required until Kafka 2.7</li>
          <li class="whitespace-nowrap mobile-wrap">KRaft mode preview in 2.8, official in 3.0</li>
          <li class="whitespace-nowrap mobile-wrap">Production-ready in 3.3.0</li>
          <li class="whitespace-nowrap mobile-wrap">Removed completely in 4.0</li>
          <li class="whitespace-nowrap mobile-wrap">Typically used 3-5 nodes (7 for large clusters)</li>
          <li class="whitespace-nowrap mobile-wrap">Leader-follower ensemble with quorum consensus</li>
        </ul>
      </div>

      <!-- Related Articles Section -->
      <div class="mt-10 border-t border-gray-200 pt-8">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Related Articles</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Related Article 1 -->
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/blog/software-engineer/list/kafka-consumer-rate.html">
              <img class="rounded-t-lg" src="/images/kafka-consumer-rate.webp" alt="Kafka Consumer Rate Control" />
            </a>
            <div class="p-5">
              <a href="/blog/software-engineer/list/kafka-consumer-rate.html">
                <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Controlling Processing Rate in Kafka Consumers</h5>
              </a>
              <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">Learn how to control message processing rates in Kafka consumers for optimized throughput.</p>
              <a href="/blog/software-engineer/list/kafka-consumer-rate.html" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700">
                Read more
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
          <!-- Related Article 2 -->
          <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="/tools/encode-decode/base64.html">
              <div class="h-40 bg-gray-200 rounded-t-lg flex items-center justify-center dark:bg-gray-700">
                <span class="text-gray-500 text-lg font-medium dark:text-gray-400">Data Encoding Tools</span>
              </div>
            </a>
            <div class="p-5">
              <a href="/tools/encode-decode/base64.html">
                <h5 class="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">Base64 Encoding for Message Serialization</h5>
              </a>
              <p class="mb-3 text-sm text-gray-700 dark:text-gray-400">Useful for encoding binary data in Kafka messages. Try our Base64 encoding tool.</p>
              <a href="/tools/encode-decode/base64.html" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700">
                Try the tool
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
}; 