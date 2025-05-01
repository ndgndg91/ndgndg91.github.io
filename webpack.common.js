const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: './js/index.js',
    blog_software_engineer_list: './js/blog/list.js',
    base64: './js/tools/encode-decode/base64.js',
    url: './js/tools/encode-decode/url.js',
    aes: './js/tools/encrypt-decrypt/aes.js',
    rsa: './js/tools/encrypt-decrypt/rsa.js',
    json_parser: './js/tools/string/json-parser.js',
    xml_parser: './js/tools/string/xml-parser.js',
    random_hex: './js/tools/string/random-hex.js',
    string_diff_checker: './js/tools/string/string-diff-checker.js',
    byte_counter: './js/tools/string/byte-counter.js',
    html_escape_unescape: './js/tools/string/html-escape-unescape.js',
    uuid: './js/tools/string/uuid.js',
    timestamp: './js/tools/time/timestamp.js',
    sha1: './js/tools/hash/sha1.js',
    sha2: './js/tools/hash/sha2.js',
    sha3: './js/tools/hash/sha3.js',
    jwt: './js/tools/token/jwt.js',
    image_format_converter: './js/tools/image/format-converter.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.hbs$/, // Handlebars 파일을 처리하기 위한 규칙 추가
        use: {
          loader: 'handlebars-loader',
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "timers": require.resolve("timers-browserify"),
      "vm": require.resolve("vm-browserify"),
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'ads.txt', to: 'ads.txt' },
        { from: 'img', to: 'img' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
        { from: 'sitemap.xml', to: 'sitemap.xml' },
        { from: 'rss.xml', to: 'rss.xml' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'index.html',
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'index.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Giri's Place for Developers",
        pageDescription: "A comprehensive toolset for developers with Base64, UUID, Hash generators, JWT tools, and technical blog posts on Kafka, MongoDB, JVM and more.",
        pageUrl: "https://developer-playground.com/",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Developer Playground - Giri's Place logo",
        structuredData: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://developer-playground.com/",
            "name": "Developer Playground - Giri's Place",
            "description": "A comprehensive toolset for developers with Base64, UUID, Hash generators, JWT tools, and technical blog posts on Kafka, MongoDB, JVM and more.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://developer-playground.com/blog/software-engineer/list.html?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://developer-playground.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://developer-playground.com/blog/software-engineer/list.html"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Tools",
                "item": "https://developer-playground.com/tools/encode-decode/base64.html"
              }
            ]
          }
        ])
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/mcp-filesystem.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/mcp-filesystem.hbs'), 'utf8'),
        pageTitle: "MCP Filesystem Configuration and Usage",
        pageDescription: "Learn how to configure the Model Connector Provider (MCP) filesystem interface and explore real-world use cases in development environments.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/mcp-filesystem.html",
        pageImage: "mcp.webp",
        pageImageAlt: "MCP Filesystem Configuration Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/handle-floating-point.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/handle-floating-point.hbs'), 'utf8'),
        pageTitle: "Solving Floating-Point Precision Issues",
        pageDescription: "When developing financial applications or systems requiring precise calculations, floating-point precision issues can lead to critical bugs. These problems occur in JVM-based languages like Kotlin, and deciding how to store and process values, especially when interacting with databases, is a crucial design decision.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/handle-floating-point.html",
        pageImage: "handle-floating-point.webp",
        pageImageAlt: "Solving Floating-Point Precision Issues"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/r2dbc-conn-pool.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/r2dbc-conn-pool.hbs'), 'utf8'),
        pageTitle: "Understanding R2DBC Connection Pool",
        pageDescription: "R2DBC connection pooling implements a fundamentally different approach compared to traditional JDBC connection pools like HikariCP, especially in how it handles idle connections and pool initialization.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/r2dbc-conn-pool.html",
        pageImage: "r2dbc-conn-pool.webp",
        pageImageAlt: "r2dbc-conn-pool.webp",
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/documentdb-cons.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/documentdb-cons.hbs'), 'utf8'),
        pageTitle: "AWS DocumentDB Comparison Analysis",
        pageDescription: "Current Issues with AWS DocumentDB (Instance-Based Cluster) - Does not support zero-downtime deployments during bug fixes, increasing code-level management points",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/documentdb-cons.html",
        pageImage: "documentdb-cons.webp",
        pageImageAlt: "AWS DocumentDB Cons"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/kafka-consumer-performance.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/kafka-consumer-performance.hbs'), 'utf8'),
        pageTitle: "Optimizing Kafka Consumer Performance",
        pageDescription: "Explore effective strategies to optimize Kafka consumer performance including partition-pod 1:1 mapping, concurrent listeners, Confluent Parallel Consumer, and asynchronous processing patterns. Learn implementation techniques, advantages, and trade-offs for each approach to maximize throughput and resource efficiency in your Kafka-based systems.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/kafka-consumer-performance.html",
        pageImage: "kafka-consumer-performance.webp",
        pageImageAlt: "Kafka Consumer Performance Optimization"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/replay-attack.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/replay-attack.hbs'), 'utf8'),
        pageTitle: "How to Prevent Replay Attacks in Web Security",
        pageDescription: "Understand replay attacks in network security, how they intercept and reuse data packets, and effective prevention methods to protect your applications.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/replay-attack.html",
        pageImage: "replay-attack.webp",
        pageImageAlt: "Replay Attack Security Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/about-g1gc.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/about-g1gc.hbs'), 'utf8'),
        pageTitle: "Understanding Java's G1 Garbage Collector",
        pageDescription: "Deep dive into Java's Garbage-First (G1) garbage collector, how it works, and why it became the default GC in Java 9 for multi-processor machines with large memory.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/about-g1gc.html",
        pageImage: "g1gc.webp",
        pageImageAlt: "G1 Garbage Collector Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/about-zgc.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/about-zgc.hbs'), 'utf8'),
        pageTitle: "ZGC: Java's Low-Latency Garbage Collector",
        pageDescription: "Explore ZGC (Z Garbage Collector), Java's high-performance garbage collector designed for low pause times under 10ms, regardless of heap size from megabytes to terabytes.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/about-zgc.html",
        pageImage: "zgc.webp",
        pageImageAlt: "ZGC Garbage Collector Architecture"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/jvm-warmup.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/jvm-warmup.hbs'), 'utf8'),
        pageTitle: "JVM Warmup: Optimizing Java Application Startup",
        pageDescription: "Learn about JVM warmup process, how the class loader works through its three stages, and techniques to improve Java application startup performance.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/jvm-warmup.html",
        pageImage: "jvm-warmup.webp",
        pageImageAlt: "JVM Warmup Process Visualization"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/kafka-basic.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/kafka-basic.hbs'), 'utf8'),
        pageTitle: "Kafka Basics: Topics, Partitions, and Core Concepts",
        pageDescription: "Learn about Apache Kafka fundamentals including topics, partitions, offsets, producers, consumers, delivery semantics, brokers, Zookeeper, and KRaft concepts.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/kafka-basic.html",
        pageImage: "kafka.webp",
        pageImageAlt: "Apache Kafka Architectural Diagram",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Kafka Basics: Topics, Partitions, and Core Concepts",
          "description": "Learn about Apache Kafka fundamentals including topics, partitions, offsets, producers, consumers, delivery semantics, brokers, Zookeeper, and KRaft concepts.",
          "image": "https://developer-playground.com/img/kafka.png",
          "author": {
            "@type": "Person",
            "name": "Giri",
            "url": "https://github.com/ndgndg91"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Developer Playground",
            "logo": {
              "@type": "ImageObject",
              "url": "https://developer-playground.com/img/developer-playground-logo.webp"
            }
          },
          "datePublished": "2024-10-15",
          "dateModified": "2025-04-06",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://developer-playground.com/blog/software-engineer/list/kafka-basic.html"
          }
        })
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/mongo-sharding.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/mongo-sharding.hbs'), 'utf8'),
        pageTitle: "MongoDB Sharding Cluster with Docker Compose",
        pageDescription: "A practical guide to setting up a MongoDB sharding cluster using Docker Compose. Learn about sharding architecture, configuration, and best practices.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/mongo-sharding.html",
        pageImage: "mongodb-sharding.webp",
        pageImageAlt: "MongoDB Sharding Cluster Architecture"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/kafka-consumer-rate.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/kafka-consumer-rate.hbs'), 'utf8'),
        pageTitle: "Controlling Processing Rate in Kafka Consumers",
        pageDescription: "Strategies and implementation techniques for managing message processing rates in Kafka consumers to optimize throughput and prevent system overload.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/kafka-consumer-rate.html",
        pageImage: "kafka-consumer-rate.webp",
        pageImageAlt: "Kafka Consumer Rate Control Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/simple-distributed-id-generation.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/simple-distributed-id-generation.hbs'), 'utf8'),
        pageTitle: "Effective Identifier Generation in Distributed Systems",
        pageDescription: "Compare and implement effective strategies for generating unique identifiers in distributed environments, avoiding duplication, and ensuring scalability.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/simple-distributed-id-generation.html",
        pageImage: "simple-distributed-id-generation.webp",
        pageImageAlt: "Distributed ID Generation Architecture"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/etag.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/etag.hbs'), 'utf8'),
        pageTitle: "Cache Control & ETags: Optimizing Web Performance",
        pageDescription: "Web caching is a technique that stores copies of resources to serve future requests more quickly:",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/etag.html",
        pageImage: "etag.webp",
        pageImageAlt: "etag cache conctrol Flow Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/cors-sop.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/cors-sop.hbs'), 'utf8'),
        pageTitle: "CORS (Cross-Origin Resource Sharing) & SOP (Same-Origin Policy)",
        pageDescription: "Explore the concepts of CORS and SOP in web development, including how they work together to prevent CSRF attacks and how to implement CORS.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list/cors-sop.html",
        pageImage: "cors.webp",
        pageImageAlt: "CORS and SOP Flow Diagram"
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'blog/software-engineer/list.html',
      chunks: ['blog_software_engineer_list'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Software Engineering Blog Posts",
        pageDescription: "Explore technical articles on Kafka, MongoDB, JVM optimization, distributed ID generation, and more topics for software engineers and developers.",
        pageUrl: "https://developer-playground.com/blog/software-engineer/list.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Developer Playground Blog",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "headline": "Software Engineering Blog Posts",
          "description": "Explore technical articles on Kafka, MongoDB, JVM optimization, distributed ID generation, and more topics for software engineers and developers.",
          "url": "https://developer-playground.com/blog/software-engineer/list.html",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://developer-playground.com/blog/software-engineer/list/kafka-basic.html",
                "name": "Kafka Basics: Topics, Partitions, and Core Concepts"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "url": "https://developer-playground.com/blog/software-engineer/list/mongo-sharding.html",
                "name": "MongoDB Sharding Cluster with Docker Compose"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "url": "https://developer-playground.com/blog/software-engineer/list/kafka-consumer-rate.html",
                "name": "Controlling Processing Rate in Kafka Consumers"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "url": "https://developer-playground.com/blog/software-engineer/list/mcp-filesystem.html",
                "name": "MCP Filesystem Configuration and Usage"
              },
              {
                "@type": "ListItem",
                "position": 5,
                "url": "https://developer-playground.com/blog/software-engineer/list/simple-distributed-id-generation.html",
                "name": "Effective Identifier Generation in Distributed Systems"
              },
              {
                "@type": "ListItem",
                "position": 6,
                "url": "https://developer-playground.com/blog/software-engineer/list/cors-sop.html",
                "name": "CORS (Cross-Origin Resource Sharing) & SOP (Same-Origin Policy) with Spring Boot"
              }
            ]
          }
        })
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encode-decode/base64.html',
      chunks: ['base64'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encode-decode/base64.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Base64 Encode and Decode Tool",
        pageDescription: "Free online tool to encode text to Base64 and decode Base64 to text. Fast, reliable, and secure Base64 conversion for developers.",
        pageUrl: "https://developer-playground.com/tools/encode-decode/base64.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Base64 Encode and Decode Tool",
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Base64 Encode and Decode Tool",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "description": "Free online tool to encode text to Base64 and decode Base64 to text. Fast, reliable, and secure Base64 conversion for developers.",
          "softwareHelp": {
            "@type": "CreativeWork",
            "text": "Enter text to encode to Base64 or Base64 string to decode. The tool provides instant conversion without uploading data to a server."
          },
          "creator": {
            "@type": "Person",
            "name": "Giri"
          }
        })
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encode-decode/url.html',
      chunks: ['url'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encode-decode/url.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "URL Encode and Decode Tool",
        pageDescription: "Online tool to encode and decode URLs, query parameters, and path segments. Convert special characters to their percent-encoded format and back.",
        pageUrl: "https://developer-playground.com/tools/encode-decode/url.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "URL Encoder and Decoder Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encrypt-decrypt/aes.html',
      chunks: ['aes'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encrypt-decrypt/aes.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "AES Encryption and Decryption Tool",
        pageDescription: "Secure online AES encryption and decryption tool. Encrypt sensitive data with different key sizes and modes including CBC, ECB, and CTR.",
        pageUrl: "https://developer-playground.com/tools/encrypt-decrypt/aes.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "AES Encryption Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encrypt-decrypt/rsa.html',
      chunks: ['rsa'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encrypt-decrypt/rsa.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "RSA Encryption and Decryption Tool",
        pageDescription: "Online RSA public key encryption and private key decryption tool. Generate key pairs, encrypt, and decrypt data securely with this open-source tool.",
        pageUrl: "https://developer-playground.com/tools/encrypt-decrypt/rsa.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "RSA Encryption and Decryption Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/json-parser.html',
      chunks: ['json_parser'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/json-parser.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "JSON Parser and Formatter",
        pageDescription: "Free online tool to parse, validate, and format JSON data. Convert minified JSON to a readable format with proper indentation and syntax highlighting.",
        pageUrl: "https://developer-playground.com/tools/string/json-parser.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "JSON Parser and Formatter Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/xml-parser.html',
      chunks: ['xml_parser'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/xml-parser.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "XML Parser and Formatter",
        pageDescription: "Parse, validate, and format XML documents online. Convert compact XML to a readable format with proper indentation and element structure highlighting.",
        pageUrl: "https://developer-playground.com/tools/string/xml-parser.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "XML Parser and Formatter Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/random-hex.html',
      chunks: ['random_hex'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/random-hex.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Random Hexadecimal Generator",
        pageDescription: "Generate secure random hexadecimal values for cryptographic purposes, testing, or unique identifiers. Customize length and generate multiple values at once.",
        pageUrl: "https://developer-playground.com/tools/string/random-hex.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Random Hex Generator Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/string-diff-checker.html',
      chunks: ['string_diff_checker'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/string-diff-checker.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "String Difference Checker",
        pageDescription: "Compare two text strings and highlight the differences. Ideal for code review, document comparison, and finding changes between text versions.",
        pageUrl: "https://developer-playground.com/tools/string/string-diff-checker.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "String Difference Checker Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/byte-counter.html',
      chunks: ['byte_counter'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/byte-counter.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Byte Counter Tool",
        pageDescription: "Count the number of bytes in a string with support for different character encodings. Useful for database storage planning and payload size estimation.",
        pageUrl: "https://developer-playground.com/tools/string/byte-counter.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Byte Counter Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/html-escape-unescape.html',
      chunks: ['html_escape_unescape'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/html-escape-unescape.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "HTML Escape and Unescape Tool",
        pageDescription: "Convert HTML special characters to their entity references and vice versa. Essential for web developers to safely display HTML code or handle user input.",
        pageUrl: "https://developer-playground.com/tools/string/html-escape-unescape.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "HTML Escape and Unescape Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/uuid.html',
      chunks: ['uuid'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/uuid.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "UUID Generator Tool",
        pageDescription: "Generate secure RFC 4122 compliant UUIDs (Universally Unique Identifiers). Create multiple UUIDs at once for database keys, application identifiers, and more.",
        pageUrl: "https://developer-playground.com/tools/string/uuid.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "UUID Generator Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-1.html',
      chunks: ['sha1'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-1.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "SHA-1 Hash Generator",
        pageDescription: "Generate SHA-1 hash values from text or files. Although no longer recommended for security purposes, SHA-1 is useful for checksums and compatibility with legacy systems.",
        pageUrl: "https://developer-playground.com/tools/hash/sha-1.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "SHA-1 Hash Generator Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-2.html',
      chunks: ['sha2'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-2.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "SHA-2 Hash Generator (SHA-256, SHA-384, SHA-512)",
        pageDescription: "Generate secure SHA-2 family hashes (SHA-256, SHA-384, SHA-512) for cryptographic security. Widely used for digital signatures, checksums, and password storage.",
        pageUrl: "https://developer-playground.com/tools/hash/sha-2.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "SHA-2 Hash Generator Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-3.html',
      chunks: ['sha3'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-3.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "SHA-3 Hash Generator (Keccak)",
        pageDescription: "Generate SHA-3 hash values using the latest NIST-approved hashing algorithm. Provides superior security for cryptographic applications with multiple output sizes.",
        pageUrl: "https://developer-playground.com/tools/hash/sha-3.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "SHA-3 Hash Generator Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/time/timestamp.html',
      chunks: ['timestamp'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/time/timestamp.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Unix Timestamp Converter",
        pageDescription: "Convert between Unix timestamps and human-readable dates and times. Calculate time differences, view current Unix time, and work with different time zones.",
        pageUrl: "https://developer-playground.com/tools/time/timestamp.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Unix Timestamp Converter Tool"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/token/jwt.html',
      chunks: ['jwt'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/token/jwt.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "JWT (JSON Web Token) Tool",
        pageDescription: "Create, decode, and verify JSON Web Tokens (JWT). Analyze token claims, test signature validation, and generate new tokens with custom payloads.",
        pageUrl: "https://developer-playground.com/tools/token/jwt.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "JWT Token Generator and Decoder"
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/image/format-converter.html',
      chunks: ['image_format_converter'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/image/format-converter.hbs'), 'utf8'), // 콘텐츠 직접 삽입
        pageTitle: "Image Format Converter",
        pageDescription: "Convert images between different formats (PNG, JPEG, GIF, WebP) right in your browser. No upload required - secure, fast, and privacy-friendly image conversion.",
        pageUrl: "https://developer-playground.com/tools/image/format-converter.html",
        pageImage: "developer-playground-logo.webp",
        pageImageAlt: "Image Format Converter Tool"
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
