import '../../../css/tailwind.css';
import '../../navigation';
import '../../utils';

const xml2js = require('xml2js');

document.addEventListener('DOMContentLoaded', () => {
  const xmlInput = document.getElementById('xml-input');
  const parseOutput = document.getElementById('parse-output');
  const parseResult = document.getElementById('parse-result');
  const parseButton = document.getElementById('parse-button');
  const clearButton = document.getElementById('clear-button');
  const treeViewButton = document.getElementById('tree-view-button');
  const prettyPrintButton = document.getElementById('pretty-print-button');

  let parsedData = null; // 파싱된 데이터 저장
  let originalXml = ''; // 원본 XML 저장

  // XML 파싱 함수
  function parseXml() {
    const xmlString = xmlInput.value.trim();
    if (!xmlString) {
      parseOutput.textContent = 'XML 입력이 비어 있습니다.';
      return;
    }

    originalXml = xmlString;
    xml2js.parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        parseOutput.textContent = `파싱 오류: ${err.message}`;
      } else {
        parsedData = result;
        renderPrettyPrint(originalXml, parseOutput); // 초기 pretty print
        // renderTree(parsedData, parseOutput, 'root');
        treeViewButton.classList.remove('bg-blue-500', 'text-white');
        prettyPrintButton.classList.add('bg-blue-500', 'text-white');
      }
    });
  }

  // 트리 구조 렌더링 함수
  function renderTree(obj, parentElement, tagName = 'root') {
    parentElement.innerHTML = ''; // 기존 내용 초기화

    const container = document.createElement('div');
    container.className = 'flex flex-col';

    const startTagDiv = document.createElement('div');
    startTagDiv.className = 'flex items-center';
    const toggleButton = document.createElement('span');
    toggleButton.textContent = '▶ ';
    toggleButton.className = 'cursor-pointer text-blue-500 w-6';
    const startTag = document.createElement('span');
    startTag.textContent = `<${tagName}>`;
    startTag.className = 'text-blue-700 dark:text-blue-300';
    startTagDiv.appendChild(toggleButton);
    startTagDiv.appendChild(startTag);
    container.appendChild(startTagDiv);

    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'pl-6 hidden';

    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        const childDiv = document.createElement('div');
        if (typeof value === 'object' && value !== null) {
          renderTree(value, childDiv, key);
        } else {
          const valueDiv = document.createElement('div');
          valueDiv.className = 'flex items-center';
          valueDiv.innerHTML = `<span class="w-6"></span><span>${key}: ${value}</span>`;
          childDiv.appendChild(valueDiv);
        }
        childrenContainer.appendChild(childDiv);
      }
    }

    const endTagDiv = document.createElement('div');
    endTagDiv.className = 'flex items-center';
    const endTagSpacer = document.createElement('span');
    endTagSpacer.className = 'w-6';
    const endTag = document.createElement('span');
    endTag.textContent = `</${tagName}>`;
    endTag.className = 'text-blue-700 dark:text-blue-300';
    endTagDiv.appendChild(endTagSpacer);
    endTagDiv.appendChild(endTag);

    if (childrenContainer.children.length > 0) {
      container.appendChild(childrenContainer);
      container.appendChild(endTagDiv);
      toggleButton.addEventListener('click', () => {
        childrenContainer.classList.toggle('hidden');
        toggleButton.textContent = childrenContainer.classList.contains('hidden') ? '▶ ' : '▼ ';
      });
    } else if (typeof obj === 'object' && obj !== null) {
      container.appendChild(endTagDiv);
    } else {
      startTagDiv.textContent += ` ${obj}`;
      startTagDiv.appendChild(endTag);
      toggleButton.remove();
    }

    parentElement.appendChild(container);
  }

  // Pretty Print 렌더링 함수
  function renderPrettyPrint(xmlString, parentElement) {
    parentElement.innerHTML = '';
    const pre = document.createElement('pre');
    try {
      pre.textContent = formatXml(xmlString);
    } catch (e) {
      pre.textContent = `Pretty Print 오류: ${e.message}`;
    }
    pre.className = 'whitespace-pre-wrap';
    parentElement.appendChild(pre);
  }

  // XML 포맷팅 함수 (Pretty Print)
  function formatXml(xml) {
    let formatted = '';
    let indent = 0;
    const tab = '  '; // 들여쓰기 단위

    // 태그 분리 시 꺾쇠 괄호를 유지하도록 수정
    const nodes = xml.match(/<[^>]+>|[^<>]+/g) || [];
    nodes.forEach((node) => {
      node = node.trim();
      if (!node) return;

      if (node.startsWith('</')) {
        // 종료 태그
        indent = Math.max(0, indent - 1); // indent가 음수가 되지 않도록 보호
        formatted += `${tab.repeat(indent)}${node}\n`;
      } else if (node.startsWith('<') && !node.endsWith('/>')) {
        // 시작 태그
        formatted += `${tab.repeat(indent)}${node}\n`;
        indent++;
      } else if (node.startsWith('<') && node.endsWith('/>')) {
        // 셀프 클로징 태그
        formatted += `${tab.repeat(indent)}${node}\n`;
      } else {
        // 텍스트 노드
        formatted += `${tab.repeat(indent)}${node}\n`;
      }
    });

    return formatted.trim();
  }

  // 클리어 함수
  function clearAll() {
    xmlInput.value = '';
    parseOutput.innerHTML = '';
    parsedData = null;
    originalXml = '';
    treeViewButton.classList.remove('bg-blue-500', 'text-white');
    prettyPrintButton.classList.remove('bg-blue-500', 'text-white');
  }

  // 이벤트 리스너 설정
  parseButton.addEventListener('click', parseXml);
  clearButton.addEventListener('click', clearAll);
  treeViewButton.addEventListener('click', () => {
    if (parsedData) {
      renderTree(parsedData, parseOutput, 'root');
      treeViewButton.classList.add('bg-blue-500', 'text-white');
      prettyPrintButton.classList.remove('bg-blue-500', 'text-white');
    }
  });
  prettyPrintButton.addEventListener('click', () => {
    if (originalXml) {
      renderPrettyPrint(originalXml, parseOutput);
      prettyPrintButton.classList.add('bg-blue-500', 'text-white');
      treeViewButton.classList.remove('bg-blue-500', 'text-white');
    }
  });
});
