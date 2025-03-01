const path = require('path');

module.exports = {
  entry: {
    app: './js/app.js', // 시작 파일
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'js/[name].js', // 출력: dist/js/app.js
  },
  module: {
    rules: [
      {
        test: /\.css$/, // .css 파일을 처리
        use: ['style-loader', 'css-loader'], // CSS를 JS에 넣어줌
      },
    ],
  },
};
