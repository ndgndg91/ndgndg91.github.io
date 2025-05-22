import type { BlogPost } from '../../../types/blog';

export const mongoSharding: BlogPost = {
  id: 'mongo-sharding',
  category: 'software-engineer',
  title: 'MongoDB Sharding Cluster with Docker Compose',
  description: 'Learn how to set up a MongoDB sharding cluster using Docker Compose. This guide covers the components of a sharded cluster, configuration, and step-by-step setup instructions.',
  date: '2025-03-31',
  updatedDate: '2025-03-31',
  tags: ['MongoDB', 'Sharding', 'Docker', 'Docker Compose', 'Database', 'Scaling', 'High Availability'],
  image: '/mongodb-sharding.webp',
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
          <span class="ml-2 text-gray-400 dark:text-gray-500">MongoDB Sharding Cluster with Docker Compose</span>
        </li>
      </ol>
    </nav>
    <header class="mb-8">
      <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-gray-600 uppercase dark:text-gray-400">Developer Playground</p>
      <h1 class="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">MongoDB Sharding Cluster with Docker Compose</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400 mt-2">Updated: March 31, 2025</div>
    </header>
    <div class="mt-6 prose dark:prose-invert prose-code:bg-gray-100 prose-code:dark:bg-gray-800 prose-code:px-1 prose-code:rounded prose-code:text-gray-900 prose-code:dark:text-gray-100 prose-headings:text-gray-900 prose-headings:dark:text-white prose-p:text-gray-700 prose-p:dark:text-gray-400 prose-strong:text-gray-900 prose-strong:dark:text-white">
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">What is MongoDB Sharding?</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">A method for distributing data across multiple machines</li>
          <li class="whitespace-nowrap mobile-wrap">Supports deployments with very large datasets and high throughput</li>
          <li class="whitespace-nowrap mobile-wrap">Enables horizontal scaling for growing applications</li>
          <li class="whitespace-nowrap mobile-wrap">Allows for automated data balancing across shards</li>
          <li class="whitespace-nowrap mobile-wrap">Provides high availability and fault tolerance</li>
          <li class="whitespace-nowrap mobile-wrap">Essential for applications that exceed single server capacity</li>
        </ul>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
        <!-- Background -->
        <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">MongoDB Sharding Architecture</text>

        <!-- Client -->
        <rect x="350" y="70" width="100" height="40" fill="#f0f5ff" stroke="#2f54eb" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="95" font-family="Arial" font-size="16" text-anchor="middle">Client</text>

        <!-- Router (mongos) -->
        <rect x="300" y="140" width="200" height="50" fill="#e6fffb" stroke="#13c2c2" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="170" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">mongos (Router)</text>

        <!-- Config Servers -->
        <rect x="300" y="220" width="200" height="50" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="250" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Config Server Replica Set</text>

        <!-- Shard 1 -->
        <rect x="100" y="300" width="180" height="60" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="190" y="330" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 1 Replica Set</text>

        <!-- Shard 2 -->
        <rect x="310" y="300" width="180" height="60" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="330" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 2 Replica Set</text>

        <!-- Shard 3 -->
        <rect x="520" y="300" width="180" height="60" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="5" ry="5"/>
        <text x="610" y="330" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 3 Replica Set</text>

        <!-- Arrows -->
        <path d="M400,110 L400,140" stroke="#2f54eb" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,190 L400,220" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <path d="M400,270 L190,300" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,270 L400,300" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,270 L610,300" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Annotation Lines -->
        <text x="450" y="115" font-family="Arial" font-size="12" text-anchor="start">Application connects to mongos</text>
        <text x="450" y="205" font-family="Arial" font-size="12" text-anchor="start">mongos tracks metadata</text>
        <text x="450" y="280" font-family="Arial" font-size="12" text-anchor="start">Data distributed across shards</text>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000"/>
          </marker>
        </defs>
      </svg>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Components of a Sharded Cluster</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><strong>Shards</strong>: Store chunks of sharded data (each is a replica set)</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Config Servers</strong>: Store metadata and configuration settings</li>
          <li class="whitespace-nowrap mobile-wrap"><strong>Router (mongos)</strong>: Routes queries and operations to appropriate shards</li>
          <li class="whitespace-nowrap mobile-wrap">Minimum production requirements: 3 config servers, 2+ shards, 1+ router</li>
          <li class="whitespace-nowrap mobile-wrap">Each shard and config server should be a replica set for redundancy</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Setting Up with Docker Compose</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Below is our complete docker-compose.yml file for creating a sharded MongoDB cluster:
        </p>
        <div class="mt-8 rounded-lg overflow-hidden">
          <div class="bg-gray-800 text-white p-4">
            <h3 class="font-bold text-lg mb-2">docker-compose.yml</h3>
          </div>
          <div class="relative group">
            <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
            </button>
            <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">services:
  <span class="text-blue-400">configsvr1</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">configsvr1</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --configsvr --replSet config_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"10001:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_configsvr1:/data/db</span>

  <span class="text-blue-400">configsvr2</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">configsvr2</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --configsvr --replSet config_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"10002:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_configsvr2:/data/db</span>

  <span class="text-blue-400">configsvr3</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">configsvr3</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --configsvr --replSet config_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"10003:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_configsvr3:/data/db</span>

  <span class="text-blue-400">mongos</span>:
    <span class="text-green-400">depends_on</span>:
      - <span class="text-yellow-300">configsvr1</span>
      - <span class="text-yellow-300">configsvr2</span>
      - <span class="text-yellow-300">configsvr3</span>
      - <span class="text-yellow-300">shardsvr1_1</span>
      - <span class="text-yellow-300">shardsvr1_2</span>
      - <span class="text-yellow-300">shardsvr1_3</span>
      - <span class="text-yellow-300">shardsvr2_1</span>
      - <span class="text-yellow-300">shardsvr2_2</span>
      - <span class="text-yellow-300">shardsvr2_3</span>
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">mongos</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongos --configdb config_rs/configsvr1:27017,configsvr2:27017,configsvr3:27017 --port 27017 --bind_ip_all</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"30000:27017"</span>

  <span class="text-blue-400">shardsvr1_1</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr1_1</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard1_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20001:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr1_1:/data/db</span>

  <span class="text-blue-400">shardsvr1_2</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr1_2</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard1_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20002:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr1_2:/data/db</span>

  <span class="text-blue-400">shardsvr1_3</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr1_3</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard1_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20003:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr1_3:/data/db</span>

  <span class="text-blue-400">shardsvr2_1</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr2_1</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard2_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20004:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr2_1:/data/db</span>

  <span class="text-blue-400">shardsvr2_2</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr2_2</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard2_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20005:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr2_2:/data/db</span>

  <span class="text-blue-400">shardsvr2_3</span>:
    <span class="text-green-400">container_name</span>: <span class="text-yellow-300">shardsvr2_3</span>
    <span class="text-green-400">image</span>: <span class="text-yellow-300">mongo:latest</span>
    <span class="text-green-400">command</span>: <span class="text-yellow-300">mongod --shardsvr --replSet shard2_rs --dbpath /data/db --port 27017</span>
    <span class="text-green-400">ports</span>:
      - <span class="text-yellow-300">"20006:27017"</span>
    <span class="text-green-400">volumes</span>:
      - <span class="text-yellow-300">sharding_mongodb_shardsvr2_3:/data/db</span>

<span class="text-blue-400">volumes</span>:
  <span class="text-green-400">sharding_mongodb_configsvr1</span>:
  <span class="text-green-400">sharding_mongodb_configsvr2</span>:
  <span class="text-green-400">sharding_mongodb_configsvr3</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr1_1</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr1_2</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr1_3</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr2_1</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr2_2</span>:
  <span class="text-green-400">sharding_mongodb_shardsvr2_3</span>:</code></pre>
          </div>
        </div>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <!-- Background -->
        <rect width="800" height="450" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">MongoDB Sharded Cluster with Docker Compose</text>

        <!-- Config Servers -->
        <rect x="100" y="80" width="600" height="100" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="400" y="105" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Config Server Replica Set</text>

        <rect x="120" y="120" width="170" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="205" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr1:27017</text>

        <rect x="315" y="120" width="170" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr2:27017</text>

        <rect x="510" y="120" width="170" height="50" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="595" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr3:27017</text>

        <!-- Mongos Router -->
        <rect x="300" y="200" width="200" height="50" fill="#e6fffb" stroke="#13c2c2" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="230" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">mongos:27017</text>

        <!-- Shard 1 -->
        <rect x="50" y="270" width="340" height="140" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="220" y="295" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Shard 1 Replica Set</text>

        <!-- Shard 1 Servers -->
        <rect x="70" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="115" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr1_1</text>

        <rect x="175" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="220" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr1_2</text>

        <rect x="280" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="325" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr1_3</text>

        <!-- Shard 2 -->
        <rect x="410" y="270" width="340" height="140" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="580" y="295" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Shard 2 Replica Set</text>

        <!-- Shard 2 Servers -->
        <rect x="430" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="475" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr2_1</text>

        <rect x="535" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="580" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr2_2</text>

        <rect x="640" y="310" width="90" height="40" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="685" y="335" font-family="Arial" font-size="14" text-anchor="middle">shardsvr2_3</text>

        <!-- Connection arrows -->
        <path d="M400,250 L220,270" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,250 L580,270" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000"/>
          </marker>
        </defs>
      </svg>
      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Step-by-Step Setup Guide</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Let's walk through the process of setting up and configuring our MongoDB sharding cluster.
        </p>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 1: Start the Containers</h3>
        <p class="text-gray-700 dark:text-gray-400">
          First, we need to launch all the containers defined in our docker-compose.yml file:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">docker-compose up -d</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          This command will create and start all the containers in detached mode. Each container
          will run a MongoDB instance with specific roles (config server, shard server, or router).
        </p>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 2: Configure the Config Server Replica Set</h3>
        <p class="text-gray-700 dark:text-gray-400">
          Connect to one of the config servers and initialize the replica set:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">mongosh mongodb://localhost:10001</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          Once connected, initialize the config server replica set:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-blue-400">rs.initiate</span>(
  {
    <span class="text-green-400">_id</span>: <span class="text-yellow-300">"config_rs"</span>,
    <span class="text-green-400">configsvr</span>: <span class="text-purple-400">true</span>,
    <span class="text-green-400">members</span>: [
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">0</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"configsvr1:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">1</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"configsvr2:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">2</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"configsvr3:27017"</span> }
    ]
  }
)</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          You can check the status of the replica set to ensure it's properly configured:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">rs.status()</code></pre>
        </div>
      </div>
    </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300">
        <!-- Background -->
        <rect width="800" height="300" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Config Server Replica Set Initialization</text>

        <!-- Config Servers -->
        <rect x="100" y="80" width="600" height="180" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="400" y="105" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Config Server Replica Set</text>

        <rect x="120" y="120" width="170" height="60" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="205" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr1:27017</text>
        <text x="205" y="175" font-family="Arial" font-size="14" text-anchor="middle" fill="#fa541c">PRIMARY</text>

        <rect x="315" y="120" width="170" height="60" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr2:27017</text>
        <text x="400" y="175" font-family="Arial" font-size="14" text-anchor="middle" fill="#595959">SECONDARY</text>

        <rect x="510" y="120" width="170" height="60" fill="#ffd591" stroke="#fa8c16" stroke-width="2" rx="5" ry="5"/>
        <text x="595" y="150" font-family="Arial" font-size="16" text-anchor="middle">configsvr3:27017</text>
        <text x="595" y="175" font-family="Arial" font-size="14" text-anchor="middle" fill="#595959">SECONDARY</text>

        <!-- Replication Arrows -->
        <path d="M205,180 C205,200 350,220 400,180" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M205,180 C205,220 500,240 595,180" stroke="#fa8c16" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <text x="300" y="230" font-family="Arial" font-size="14" text-anchor="middle">Replication</text>
        <text x="500" y="250" font-family="Arial" font-size="14" text-anchor="middle">Replication</text>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#fa8c16"/>
          </marker>
        </defs>
      </svg>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 3: Configure the Shard Replica Sets</h3>
        <p class="text-gray-700 dark:text-gray-400">
          Now we need to configure the replica sets for each shard. Connect to the first server in Shard 1:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">mongosh mongodb://localhost:20001</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          Initialize the first shard's replica set:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-blue-400">rs.initiate</span>(
  {
    <span class="text-green-400">_id</span>: <span class="text-yellow-300">"shard1_rs"</span>,
    <span class="text-green-400">members</span>: [
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">0</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr1_1:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">1</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr1_2:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">2</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr1_3:27017"</span> }
    ]
  }
)</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          Connect to the first server in Shard 2:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">mongosh mongodb://localhost:20004</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          Initialize the second shard's replica set:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-blue-400">rs.initiate</span>(
  {
    <span class="text-green-400">_id</span>: <span class="text-yellow-300">"shard2_rs"</span>,
    <span class="text-green-400">members</span>: [
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">0</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr2_1:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">1</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr2_2:27017"</span> },
      { <span class="text-green-400">_id</span> : <span class="text-purple-400">2</span>, <span class="text-green-400">host</span> : <span class="text-yellow-300">"shardsvr2_3:27017"</span> }
    ]
  }
)</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 4: Add Shards to the Cluster</h3>
        <p class="text-gray-700 dark:text-gray-400">
          With the replica sets initialized, we now need to connect to the mongos router and add the shards to the cluster:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">mongosh mongodb://localhost:30000</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          Add both shards to the cluster:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">sh.addShard("shard1_rs/shardsvr1_1:27017,shardsvr1_2:27017,shardsvr1_3:27017")
sh.addShard("shard2_rs/shardsvr2_1:27017,shardsvr2_2:27017,shardsvr2_3:27017")</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          You can verify that the shards were added correctly:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white">sh.status()</code></pre>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 350">
        <!-- Background -->
        <rect width="800" height="350" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Adding Shards to the Cluster</text>

        <!-- Mongos Router -->
        <rect x="300" y="80" width="200" height="50" fill="#e6fffb" stroke="#13c2c2" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">mongos:27017</text>

        <!-- Shard 1 -->
        <rect x="50" y="200" width="300" height="100" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="200" y="225" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 1 Replica Set</text>

        <!-- Shard 1 Primary/Secondary -->
        <circle cx="120" cy="265" r="20" fill="#52c41a"/>
        <text x="120" y="270" font-family="Arial" font-size="12" text-anchor="middle" fill="white">P</text>

        <circle cx="200" cy="265" r="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
        <text x="200" y="270" font-family="Arial" font-size="12" text-anchor="middle">S</text>

        <circle cx="280" cy="265" r="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
        <text x="280" y="270" font-family="Arial" font-size="12" text-anchor="middle">S</text>

        <!-- Shard 2 -->
        <rect x="450" y="200" width="300" height="100" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="600" y="225" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 2 Replica Set</text>

        <!-- Shard 2 Primary/Secondary -->
        <circle cx="520" cy="265" r="20" fill="#52c41a"/>
        <text x="520" y="270" font-family="Arial" font-size="12" text-anchor="middle" fill="white">P</text>

        <circle cx="600" cy="265" r="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
        <text x="600" y="270" font-family="Arial" font-size="12" text-anchor="middle">S</text>

        <circle cx="680" cy="265" r="20" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
        <text x="680" y="270" font-family="Arial" font-size="12" text-anchor="middle">S</text>

        <!-- Connection Lines -->
        <path d="M400,130 L200,200" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,130 L600,200" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Legend -->
        <rect x="50" y="320" width="700" height="20" fill="none"/>
        <circle cx="70" cy="320" r="10" fill="#52c41a"/>
        <text x="85" y="325" font-family="Arial" font-size="12" text-anchor="start">Primary (P)</text>

        <circle cx="200" cy="320" r="10" fill="#b7eb8f" stroke="#52c41a" stroke-width="1"/>
        <text x="215" y="325" font-family="Arial" font-size="12" text-anchor="start">Secondary (S)</text>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#13c2c2"/>
          </marker>
        </defs>
      </svg>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 5: Enable Sharding for a Database</h3>
        <p class="text-gray-700 dark:text-gray-400">
          Now that we have our shards added to the cluster, we can enable sharding for a database and collection.
          Still connected to the mongos router:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400">// Create and switch to our database</span>
<span class="text-blue-400">use</span> <span class="text-yellow-300">myShardedDB</span>

<span class="text-gray-400">// Enable sharding for the database</span>
<span class="text-blue-400">sh.enableSharding</span>(<span class="text-yellow-300">"myShardedDB"</span>)</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 6: Shard a Collection</h3>
        <p class="text-gray-700 dark:text-gray-400">
          For data to be distributed across shards, we need to shard a collection using a shard key:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400">// Create a collection</span>
<span class="text-blue-400">db.createCollection</span>(<span class="text-yellow-300">"users"</span>)

<span class="text-gray-400">// Create an index on the field we'll use as shard key</span>
<span class="text-blue-400">db.users.createIndex</span>({ <span class="text-green-400">userId</span>: <span class="text-yellow-300">"hashed"</span> })

<span class="text-gray-400">// Shard the collection using a hashed shard key</span>
<span class="text-blue-400">sh.shardCollection</span>(<span class="text-yellow-300">"myShardedDB.users"</span>, { <span class="text-green-400">userId</span>: <span class="text-yellow-300">"hashed"</span> })</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          By using a hashed shard key, MongoDB will evenly distribute the data across our shards.
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
        <!-- Background -->
        <rect width="800" height="450" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Shard Key Distribution</text>

        <!-- Mongos Router -->
        <rect x="300" y="80" width="200" height="50" fill="#e6fffb" stroke="#13c2c2" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">mongos:27017</text>

        <!-- Documents -->
        <rect x="250" y="150" width="300" height="50" fill="#f9f0ff" stroke="#722ed1" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="180" font-family="Arial" font-size="16" text-anchor="middle">Document Insertion with userId</text>

        <!-- Hashing Process -->
        <rect x="250" y="220" width="300" height="50" fill="#e6f7ff" stroke="#1890ff" stroke-width="2" rx="5" ry="5"/>
        <text x="400" y="250" font-family="Arial" font-size="16" text-anchor="middle">Hashing Function (userId: "hashed")</text>

        <!-- Shard 1 -->
        <rect x="50" y="300" width="340" height="120" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="220" y="325" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 1</text>

        <rect x="80" y="340" width="280" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="220" y="360" font-family="Arial" font-size="14" text-anchor="middle">Chunk 1: hash values range 1</text>

        <rect x="80" y="380" width="280" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="220" y="400" font-family="Arial" font-size="14" text-anchor="middle">Chunk 3: hash values range 3</text>

        <!-- Shard 2 -->
        <rect x="410" y="300" width="340" height="120" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="580" y="325" font-family="Arial" font-size="16" text-anchor="middle" font-weight="bold">Shard 2</text>

        <rect x="440" y="340" width="280" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="580" y="360" font-family="Arial" font-size="14" text-anchor="middle">Chunk 2: hash values range 2</text>

        <rect x="440" y="380" width="280" height="30" fill="#d9f7be" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="580" y="400" font-family="Arial" font-size="14" text-anchor="middle">Chunk 4: hash values range 4</text>

        <!-- Arrows -->
        <path d="M400,130 L400,150" stroke="#13c2c2" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M400,200 L400,220" stroke="#722ed1" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <path d="M300,270 L220,300" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
        <path d="M500,270 L580,300" stroke="#1890ff" stroke-width="2" fill="none" marker-end="url(#arrow)"/>

        <!-- Arrow marker definition -->
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#000"/>
          </marker>
        </defs>
      </svg>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Step 7: Test the Sharded Cluster</h3>
        <p class="text-gray-700 dark:text-gray-400">
          Now let's insert some test data to see our sharded cluster in action:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400">// Insert test documents</span>
<span class="text-blue-400">for</span>(<span class="text-green-400">let</span> <span class="text-cyan-400">i</span> = <span class="text-purple-400">1</span>; <span class="text-cyan-400">i</span> &lt;= <span class="text-purple-400">10000</span>; <span class="text-cyan-400">i</span>++) {
  <span class="text-blue-400">db.users.insertOne</span>({
    <span class="text-green-400">userId</span>: <span class="text-cyan-400">i</span>,
    <span class="text-green-400">name</span>: <span class="text-yellow-300">"User "</span> + <span class="text-cyan-400">i</span>,
    <span class="text-green-400">email</span>: <span class="text-yellow-300">"user"</span> + <span class="text-cyan-400">i</span> + <span class="text-yellow-300">"@example.com"</span>,
    <span class="text-green-400">created</span>: <span class="text-blue-400">new</span> <span class="text-blue-400">Date</span>()
  });
}

<span class="text-gray-400">// Check the chunk distribution</span>
<span class="text-blue-400">sh.status</span>()</code></pre>
        </div>
        <p class="text-gray-700 dark:text-gray-400">
          You should see that MongoDB has distributed the chunks across our two shards. As your data grows,
          MongoDB will continue to split and migrate chunks to maintain an even distribution.
        </p>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Common Operations and Management</h2>
        <p class="text-gray-700 dark:text-gray-400">
          Here are some common operations you might need when managing your sharded cluster:
        </p>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Checking Shard Status</h3>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400">// Get overall shard status</span>
<span class="text-blue-400">sh.status</span>()

<span class="text-gray-400">// Get database distribution</span>
<span class="text-blue-400">use</span> <span class="text-yellow-300">config</span>
<span class="text-blue-400">db.databases.find</span>()

<span class="text-gray-400">// Get detailed chunk distribution</span>
<span class="text-blue-400">db.chunks.find</span>().<span class="text-blue-400">pretty</span>()</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Balancing Operations</h3>
        <p class="text-gray-700 dark:text-gray-400">
          The balancer runs automatically to distribute chunks evenly. You can manage it as follows:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400">// Check if balancer is running</span>
<span class="text-blue-400">sh.isBalancerRunning</span>()

<span class="text-gray-400">// Start the balancer</span>
<span class="text-blue-400">sh.startBalancer</span>()

<span class="text-gray-400">// Stop the balancer</span>
<span class="text-blue-400">sh.stopBalancer</span>()

<span class="text-gray-400">// Set balancer window (only run during off-peak hours)</span>
<span class="text-blue-400">use</span> <span class="text-yellow-300">config</span>
<span class="text-blue-400">db.settings.updateOne</span>(
  { <span class="text-green-400">_id</span>: <span class="text-yellow-300">"balancer"</span> },
  { <span class="text-green-400">$set</span>: { <span class="text-green-400">activeWindow</span>: { <span class="text-green-400">start</span>: <span class="text-yellow-300">"01:00"</span>, <span class="text-green-400">stop</span>: <span class="text-yellow-300">"05:00"</span> } } },
  { <span class="text-green-400">upsert</span>: <span class="text-purple-400">true</span> }
)</code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Adding a New Shard</h3>
        <p class="text-gray-700 dark:text-gray-400">
          As your data grows, you may need to add more shards. To add a new shard:
        </p>
        <ol class="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-400">
          <li>Add the new shard servers to your docker-compose.yml file</li>
          <li>Start the new containers with <code>docker-compose up -d</code></li>
          <li>Initialize the new shard's replica set</li>
          <li>Add the new shard to the cluster using <code>sh.addShard()</code></li>
        </ol>
      </div>

      <div class="mt-6">
        <h3 class="inline-block mb-2 text-2xl tracking-tight text-gray-900 dark:text-white">Cleanup</h3>
        <p class="text-gray-700 dark:text-gray-400">
          When you're done experimenting with your sharded cluster, you can clean up:
        </p>
        <div class="relative group">
          <button class="absolute right-2 top-2 p-2 text-gray-400 hover:text-gray-100 bg-gray-800 rounded-lg opacity-100 transition-opacity" onclick="copyCode(this)">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          </button>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 overflow-x-auto"><code class="text-white"><span class="text-gray-400"># Stop all containers</span>
<span class="text-green-400">docker-compose</span> <span class="text-blue-400">down</span>

<span class="text-gray-400"># If you want to remove volumes (this will delete all data)</span>
<span class="text-green-400">docker</span> <span class="text-blue-400">volume</span> <span class="text-blue-400">ls</span> <span class="text-yellow-300">--filter driver=local --format "{.Name}"</span> | <span class="text-green-400">grep</span> <span class="text-yellow-300">"sharding_mongodb"</span> | <span class="text-green-400">xargs</span> <span class="text-yellow-300">-r</span> <span class="text-green-400">docker</span> <span class="text-blue-400">volume</span> <span class="text-blue-400">rm</span></code></pre>
        </div>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Best Practices for MongoDB Sharding</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Choose the right shard key for your workload pattern</li>
          <li class="whitespace-nowrap mobile-wrap">Consider hashed shard keys for even distribution</li>
          <li class="whitespace-nowrap mobile-wrap">Use compound shard keys for mixed query patterns</li>
          <li class="whitespace-nowrap mobile-wrap">Monitor chunk distribution regularly</li>
          <li class="whitespace-nowrap mobile-wrap">Implement proper backup strategies for each shard</li>
          <li class="whitespace-nowrap mobile-wrap">Use dedicated servers for config servers in production</li>
          <li class="whitespace-nowrap mobile-wrap">Place multiple mongos routers for high availability</li>
          <li class="whitespace-nowrap mobile-wrap">Plan your cluster size based on data growth projections</li>
          <li class="whitespace-nowrap mobile-wrap">Configure appropriate write concern based on your durability needs</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Common Sharding Challenges</h2>
        <div class="mt-4">
          <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Jumbo Chunks</h3>
          <p class="text-gray-700 dark:text-gray-400">
            When chunks become too large for MongoDB to migrate, they're marked as "jumbo." These can occur with poorly chosen shard keys. To resolve, you may need to:
          </p>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400 mb-4">
            <li class="whitespace-nowrap mobile-wrap">Manually split the jumbo chunks</li>
            <li class="whitespace-nowrap mobile-wrap">Consider resharding with a better shard key</li>
          </ul>
        </div>

        <div class="mt-4">
          <h3 class="inline-block mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Hotspots</h3>
          <p class="text-gray-700 dark:text-gray-400">
            When certain shards receive disproportionately high traffic, they become "hotspots." This often happens with monotonically increasing shard keys (like timestamps).
          </p>
          <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
            <li class="whitespace-nowrap mobile-wrap">Use hashed shard keys to distribute traffic evenly</li>
            <li class="whitespace-nowrap mobile-wrap">Consider pre-splitting chunks for new collections</li>
          </ul>
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
        <!-- Background -->
        <rect width="800" height="400" fill="#f8f9fa" rx="10" ry="10"/>

        <!-- Title -->
        <text x="400" y="40" font-family="Arial" font-size="24" text-anchor="middle" font-weight="bold">Common Sharding Patterns</text>

        <!-- Good Distribution (Hashed Key) -->
        <rect x="50" y="80" width="300" height="250" fill="#f6ffed" stroke="#52c41a" stroke-width="2" rx="8" ry="8"/>
        <text x="200" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Hashed Shard Key</text>
        <text x="200" y="140" font-family="Arial" font-size="16" text-anchor="middle">Even Distribution</text>

        <!-- Chunks in Good Distribution -->
        <rect x="70" y="160" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="130" y="180" font-family="Arial" font-size="14" text-anchor="middle">Chunk 1</text>

        <rect x="70" y="200" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="130" y="220" font-family="Arial" font-size="14" text-anchor="middle">Chunk 2</text>

        <rect x="70" y="240" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="130" y="260" font-family="Arial" font-size="14" text-anchor="middle">Chunk 3</text>

        <rect x="210" y="160" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="270" y="180" font-family="Arial" font-size="14" text-anchor="middle">Chunk 4</text>

        <rect x="210" y="200" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="270" y="220" font-family="Arial" font-size="14" text-anchor="middle">Chunk 5</text>

        <rect x="210" y="240" width="120" height="30" fill="#b7eb8f" stroke="#52c41a" stroke-width="1" rx="3" ry="3"/>
        <text x="270" y="260" font-family="Arial" font-size="14" text-anchor="middle">Chunk 6</text>

        <!-- Poor Distribution (e.g., Timestamp) -->
        <rect x="450" y="80" width="300" height="250" fill="#fff2e8" stroke="#fa8c16" stroke-width="2" rx="8" ry="8"/>
        <text x="600" y="110" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">Monotonic Shard Key</text>
        <text x="600" y="140" font-family="Arial" font-size="16" text-anchor="middle">Uneven Distribution</text>

        <!-- Chunks in Poor Distribution -->
        <rect x="470" y="160" width="120" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <text x="530" y="180" font-family="Arial" font-size="14" text-anchor="middle">Chunk 1</text>

        <rect x="470" y="200" width="120" height="30" fill="#ffd591" stroke="#fa8c16" stroke-width="1" rx="3" ry="3"/>
        <text x="530" y="220" font-family="Arial" font-size="14" text-anchor="middle">Chunk 2</text>

        <rect x="610" y="160" width="120" height="110" fill="#ffa940" stroke="#fa8c16" stroke-width="2" rx="3" ry="3"/>
        <text x="670" y="180" font-family="Arial" font-size="14" text-anchor="middle" fill="white">Jumbo Chunk</text>
        <text x="670" y="200" font-family="Arial" font-size="14" text-anchor="middle" fill="white">"Hotspot"</text>
        <text x="670" y="220" font-family="Arial" font-size="12" text-anchor="middle" fill="white">Recent data &amp;</text>
        <text x="670" y="240" font-family="Arial" font-size="12" text-anchor="middle" fill="white">heavy traffic</text>

        <!-- Balanced Arrows (점선, 투명도 추가) -->
        <path d="M200,60 L130,160" stroke="#52c41a" stroke-width="2" fill="none" stroke-dasharray="5,3" stroke-opacity="0.7" marker-end="url(#balancedArrow)"/>
        <path d="M200,60 L270,160" stroke="#52c41a" stroke-width="2" fill="none" stroke-dasharray="5,3" stroke-opacity="0.7" marker-end="url(#balancedArrow)"/>

        <!-- 글자 위치 상향 조정 -->
        <text x="200" y="50" font-family="Arial" font-size="14" fill="#52c41a" text-anchor="middle">Balanced Traffic</text>

        <!-- Heavy Traffic Arrow (점선, 투명도 추가) -->
        <path d="M600,60 L670,160" stroke="#fa541c" stroke-width="4" fill="none" stroke-dasharray="5,3" stroke-opacity="0.6" marker-end="url(#heavyArrow)"/>

        <!-- 글자 위치 상향 조정 -->
        <text x="600" y="50" font-family="Arial" font-size="14" fill="#fa541c" text-anchor="middle">Heavy Traffic</text>

        <!-- Arrow marker definitions -->
        <defs>
          <marker id="heavyArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#fa541c" fill-opacity="0.6"/>
          </marker>
          <marker id="balancedArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="#52c41a" fill-opacity="0.7"/>
          </marker>
        </defs>
      </svg>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">Conclusion</h2>
        <p class="text-gray-700 dark:text-gray-400">
          MongoDB sharding provides a powerful solution for horizontally scaling your database. With Docker Compose, you can easily set up a local sharded cluster for development and testing. This helps you understand the concepts and prepare for a production deployment.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          Remember that while this setup is excellent for learning and development, a production sharding setup would require additional considerations for security, monitoring, and backup strategies. Always thoroughly test your sharding strategy before implementing it in a production environment.
        </p>
        <p class="text-gray-700 dark:text-gray-400 mt-4">
          By following this guide, you've learned how to:
        </p>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap">Set up a complete MongoDB sharding infrastructure with Docker Compose</li>
          <li class="whitespace-nowrap mobile-wrap">Configure config server and shard replica sets</li>
          <li class="whitespace-nowrap mobile-wrap">Enable sharding for databases and collections</li>
          <li class="whitespace-nowrap mobile-wrap">Distribute data across shards using appropriate shard keys</li>
          <li class="whitespace-nowrap mobile-wrap">Monitor and manage your sharded cluster</li>
        </ul>
      </div>

      <div class="mt-6">
        <h2 class="inline-block mb-2 text-3xl tracking-tight text-gray-900 dark:text-white">References and Further Reading</h2>
        <ul class="max-w-md space-y-1 text-gray-700 list-disc list-inside dark:text-gray-400">
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.mongodb.com/docs/manual/sharding/" class="text-blue-600 hover:underline dark:text-blue-400">MongoDB Sharding Documentation</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.mongodb.com/docs/manual/core/sharding-shard-key/" class="text-blue-600 hover:underline dark:text-blue-400">Shard Key Selection Guide</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://www.mongodb.com/docs/manual/tutorial/deploy-shard-cluster/" class="text-blue-600 hover:underline dark:text-blue-400">Deploy a Sharded Cluster</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://hub.docker.com/_/mongo" class="text-blue-600 hover:underline dark:text-blue-400">MongoDB Docker Image</a></li>
          <li class="whitespace-nowrap mobile-wrap"><a href="https://github.com/yasasdy/mongodb-sharding" class="text-blue-600 hover:underline dark:text-blue-400">MongoDB Sharding GitHub Repository</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="max-xl:hidden">
    <div class="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
      <div class="flex flex-col gap-3">
        <ins class="kakao_ad_area" style="display:none;"
             data-ad-unit="DAN-2nMLIisQJKH9qMpe"
             data-ad-width="160"
             data-ad-height="600"></ins>
      </div>
    </div>
  </div>
</div>

  `
}; 
