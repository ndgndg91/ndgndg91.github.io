// js/index.js
import '../css/tailwind.css'
import './navigation';
import './utils'
import {initializeClipboardCopy} from "./utils";

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
  console.log('onload hello');

  initializeClipboardCopy();
});


