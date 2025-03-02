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
    random_hex: './js/tools/string/random-hex.js',
    string_analyzer: './js/tools/string/string-analyzer.js',
    uuid: './js/tools/string/uuid.js',
    timestamp: './js/tools/time/timestamp.js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/encode-decode/base64.html',
      filename: 'tools/encode-decode/base64.html',
      chunks: ['base64'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/encode-decode/url.html',
      filename: 'tools/encode-decode/url.html',
      chunks: ['url'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/encrypt-decrypt/aes.html',
      filename: 'tools/encrypt-decrypt/aes.html',
      chunks: ['aes'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/encrypt-decrypt/rsa.html',
      filename: 'tools/encrypt-decrypt/rsa.html',
      chunks: ['rsa'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/string/random-hex.html',
      filename: 'tools/string/random-hex.html',
      chunks: ['random_hex'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/string/string-analyzer.html',
      filename: 'tools/string/string-analyzer.html',
      chunks: ['string_analyzer'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/string/uuid.html',
      filename: 'tools/string/uuid.html',
      chunks: ['uuid'],
    }),
    new HtmlWebpackPlugin({
      template: './tools/time/timestamp.html',
      filename: 'tools/time/timestamp.html',
      chunks: ['timestamp'],
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
