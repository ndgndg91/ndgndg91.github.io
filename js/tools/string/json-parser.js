import '../../../css/tailwind.css';
import '../../navigation';
import '../../utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-json.min';

document.addEventListener('DOMContentLoaded', () => {
  const jsonInput = document.getElementById('json-input');
  const outputContent = document.getElementById('output-content');
  const formatButton = document.getElementById('format-button');
  const copyButton = document.getElementById('copy-button');
  const treeViewButton = document.getElementById('tree-view-button');
  const prettyPrintButton = document.getElementById('pretty-print-button');
  const indentLevelSelect = document.getElementById('indent-level');

  let parsedJson = null; // 파싱된 JSON 객체 저장

  // JSON 파싱 및 초기 렌더링 함수
  function formatJson() {
    const input = jsonInput.value.trim();
    const indentLevel = parseInt(indentLevelSelect.value, 10);

    try {
      parsedJson = JSON.parse(input);
      renderPrettyPrint(parsedJson, outputContent);
      prettyPrintButton.classList.add('bg-blue-500', 'text-white');
      treeViewButton.classList.remove('bg-blue-500', 'text-white');
    } catch (error) {
      outputContent.innerHTML = `error: invalid JSON format.<br>${error.message}`;
      outputContent.style.color = 'red';
    }
  }

  // 트리 구조 렌더링 함수
  function renderTree(obj, parentElement, keyName = '') {
    parentElement.innerHTML = ''; // 기존 내용 초기화

    const container = document.createElement('div');
    container.className = 'flex flex-col';

    const startDiv = document.createElement('div');
    startDiv.className = 'flex items-center';
    const toggleButton = document.createElement('span');
    toggleButton.textContent = '▶ ';
    toggleButton.className = 'cursor-pointer text-blue-500 w-6';
    const keySpan = document.createElement('span');
    keySpan.textContent = keyName ? `${keyName}: ` : '';
    keySpan.className = 'text-blue-700 dark:text-blue-300';
    startDiv.appendChild(toggleButton);
    startDiv.appendChild(keySpan);
    container.appendChild(startDiv);

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'pl-6 hidden';

    if (Array.isArray(obj)) {
      startDiv.appendChild(document.createTextNode('['));
      obj.forEach((item, index) => {
        const childDiv = document.createElement('div');
        if (typeof item === 'object' && item !== null) {
          renderTree(item, childDiv, `[${index}]`);
        } else {
          const valueDiv = document.createElement('div');
          valueDiv.className = 'flex items-center';
          valueDiv.innerHTML = `<span class="w-6"></span><span>[${index}]: ${JSON.stringify(item)}</span>`;
          childDiv.appendChild(valueDiv);
        }
        childrenContainer.appendChild(childDiv);
      });
      const endDiv = document.createElement('div');
      endDiv.className = 'flex items-center';
      endDiv.innerHTML = '<span class="w-6"></span>]';
      container.appendChild(childrenContainer);
      container.appendChild(endDiv);
    } else if (typeof obj === 'object' && obj !== null) {
      startDiv.appendChild(document.createTextNode('{'));
      for (const [key, value] of Object.entries(obj)) {
        const childDiv = document.createElement('div');
        if (typeof value === 'object' && value !== null) {
          renderTree(value, childDiv, key);
        } else {
          const valueDiv = document.createElement('div');
          valueDiv.className = 'flex items-center';
          valueDiv.innerHTML = `<span class="w-6"></span><span>${key}: ${JSON.stringify(value)}</span>`;
          childDiv.appendChild(valueDiv);
        }
        childrenContainer.appendChild(childDiv);
      }
      const endDiv = document.createElement('div');
      endDiv.className = 'flex items-center';
      endDiv.innerHTML = '<span class="w-6"></span>}';
      container.appendChild(childrenContainer);
      container.appendChild(endDiv);
    } else {
      startDiv.textContent += JSON.stringify(obj);
      toggleButton.remove();
    }

    if (childrenContainer.children.length > 0) {
      toggleButton.addEventListener('click', () => {
        childrenContainer.classList.toggle('hidden');
        toggleButton.textContent = childrenContainer.classList.contains('hidden') ? '▶ ' : '▼ ';
      });
    } else {
      toggleButton.remove();
    }

    parentElement.appendChild(container);
  }

  // Pretty Print 렌더링 함수
  function renderPrettyPrint(obj, parentElement) {
    parentElement.innerHTML = '';
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    const indentLevel = parseInt(indentLevelSelect.value, 10);
    const formattedJSON = JSON.stringify(obj, null, indentLevel);
    code.innerHTML = Prism.highlight(formattedJSON, Prism.languages.json, 'json');
    pre.appendChild(code);
    pre.className = 'whitespace-pre-wrap';
    parentElement.appendChild(pre);
  }

  // 클립보드 복사 함수
  async function copyToClipboard() {
    const text = outputContent.innerText;
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied!');
    } catch (err) {
      console.error('Copy failed: ', err);
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Copied!');
    }
  }

  // 이벤트 리스너 설정
  formatButton.addEventListener('click', formatJson);
  copyButton.addEventListener('click', copyToClipboard);
  treeViewButton.addEventListener('click', () => {
    if (parsedJson) {
      renderTree(parsedJson, outputContent);
      treeViewButton.classList.add('bg-blue-500', 'text-white');
      prettyPrintButton.classList.remove('bg-blue-500', 'text-white');
    }
  });
  prettyPrintButton.addEventListener('click', () => {
    if (parsedJson) {
      renderPrettyPrint(parsedJson, outputContent);
      prettyPrintButton.classList.add('bg-blue-500', 'text-white');
      treeViewButton.classList.remove('bg-blue-500', 'text-white');
    }
  });
});
