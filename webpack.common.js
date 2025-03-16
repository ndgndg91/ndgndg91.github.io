const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: './js/index.js',
    base64: './js/tools/encode-decode/base64.js',
    url: './js/tools/encode-decode/url.js',
    aes: './js/tools/encrypt-decrypt/aes.js',
    rsa: './js/tools/encrypt-decrypt/rsa.js',
    json_parser: './js/tools/string/json-parser.js',
    random_hex: './js/tools/string/random-hex.js',
    string_diff_checker: './js/tools/string/string-diff-checker.js',
    string_analyzer: './js/tools/string/string-analyzer.js',
    uuid: './js/tools/string/uuid.js',
    timestamp: './js/tools/time/timestamp.js',
    sha1: './js/tools/hash/sha1.js',
    sha2: './js/tools/hash/sha2.js',
    sha3: './js/tools/hash/sha3.js',
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
  plugins: [
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
      filename: 'tools/string/string-analyzer.html',
      chunks: ['string_analyzer'],
      templateParameters: {
        content: require('fs').readFileSync(path.resolve(__dirname, 'tools/string/string-analyzer.hbs'), 'utf8'), // 콘텐츠 직접 삽입
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
