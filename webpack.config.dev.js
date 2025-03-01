const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development', // 개발 모드
  devtool: 'inline-source-map', // 디버깅 쉽게
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // index.html을 기반으로 빌드
    }),
  ],
});
