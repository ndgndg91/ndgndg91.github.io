import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import {copyTextAreaToClipboard} from "../../utils";


document.addEventListener('DOMContentLoaded', function() {
  // HTML 요소 가져오기
  const inputTextarea = document.getElementById('html-string-input');
  const resultTextarea = document.getElementById('escape-unescape-result');
  const escapeButton = document.getElementById('escape-button');
  const unescapeButton = document.getElementById('unescape-button');
  const testButton = document.getElementById('test-button');

  // HTML escape 함수
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // HTML unescape 함수
  function unescapeHTML(str) {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/");
  }

  // Escape 버튼 이벤트 리스너
  escapeButton.addEventListener('click', function() {
    const inputText = inputTextarea.value;
    resultTextarea.value = escapeHTML(inputText);
  });

  // Unescape 버튼 이벤트 리스너
  unescapeButton.addEventListener('click', function() {
    const inputText = inputTextarea.value;
    resultTextarea.value = unescapeHTML(inputText);
  });

  // 테스트 예제 버튼 이벤트 리스너
  testButton.addEventListener('click', function() {
    // 테스트 HTML 예제
    const testExample = `<div class="container">
  <h1>HTML sample</h1>
  <p>this <strong>HTML</strong> including tag <em>text</em>.</p>
  <ul>
    <li>item 1</li>
    <li>item 2 & item 3</li>
    <li>item "4"</li>
  </ul>
  <a href="https://example.com?param=value&another=test">link</a>
</div>`;

    inputTextarea.value = testExample;
    // 자동으로 escape 실행
    resultTextarea.value = escapeHTML(testExample);
  });

// Copy 버튼 동적 처리
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      copyTextAreaToClipboard("escape-unescape-result");
    });
  });
});
