const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path'); // path 모듈 추가

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    hot: true,
  },
});
