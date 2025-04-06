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
      ],
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'index.html',
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'index.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/mcp-filesystem.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/mcp-filesystem.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/replay-attack.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/replay-attack.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/about-g1gc.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/about-g1gc.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/about-zgc.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/about-zgc.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/jvm-warmup.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/jvm-warmup.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/kafka-basic.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/kafka-basic.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/mongo-sharding.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/mongo-sharding.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/kafka-consumer-rate.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/kafka-consumer-rate.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: "blog/software-engineer/list/simple-distributed-id-generation.html",
      chunks: ['index'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list/simple-distributed-id-generation.hbs'), 'utf8'),
      }
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'blog/software-engineer/list.html',
      chunks: ['blog_software_engineer_list'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'blog/software-engineer/list.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encode-decode/base64.html',
      chunks: ['base64'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encode-decode/base64.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encode-decode/url.html',
      chunks: ['url'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encode-decode/url.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encrypt-decrypt/aes.html',
      chunks: ['aes'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encrypt-decrypt/aes.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/encrypt-decrypt/rsa.html',
      chunks: ['rsa'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/encrypt-decrypt/rsa.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/json-parser.html',
      chunks: ['json_parser'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/json-parser.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/xml-parser.html',
      chunks: ['xml_parser'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/xml-parser.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/random-hex.html',
      chunks: ['random_hex'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/random-hex.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/string-diff-checker.html',
      chunks: ['string_diff_checker'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/string-diff-checker.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/byte-counter.html',
      chunks: ['byte_counter'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/byte-counter.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/html-escape-unescape.html',
      chunks: ['html_escape_unescape'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/html-escape-unescape.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/string/uuid.html',
      chunks: ['uuid'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/uuid.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-1.html',
      chunks: ['sha1'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-1.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-2.html',
      chunks: ['sha2'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-2.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/hash/sha-3.html',
      chunks: ['sha3'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/hash/sha-3.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/time/timestamp.html',
      chunks: ['timestamp'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/time/timestamp.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/token/jwt.html',
      chunks: ['jwt'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/token/jwt.hbs'), 'utf8'), // 콘텐츠 직접 삽입
      },
    }),
    new HtmlWebpackPlugin({
      template: './layouts/main.hbs',
      filename: 'tools/image/format-converter.html',
      chunks: ['image_format_converter'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/image/format-converter.hbs'), 'utf8'), // 콘텐츠 직접 삽입
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
