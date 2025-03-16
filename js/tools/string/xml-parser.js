import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'

const xml2js = require('xml2js');

document.addEventListener('DOMContentLoaded', () => {
  const xmlInput = document.getElementById('xml-input');
  const parseOutput = document.getElementById('parse-output');
  const parseResult = document.getElementById('parse-result');
  const parseButton = document.getElementById('parse-button');
  const clearButton = document.getElementById('clear-button');

  // XML 파싱 함수
  function parseXml() {
    const xmlString = xmlInput.value.trim();
    if (!xmlString) {
      parseOutput.textContent = 'XML 입력이 비어 있습니다.';
      return;
    }

    xml2js.parseString(xmlString, { explicitArray: false }, (err, result) => {
      if (err) {
        parseOutput.textContent = `파싱 오류: ${err.message}`;
      } else {
        renderTree(result, parseOutput, 'root');
      }
    });
  }

  // 트리 구조 렌더링 함수
  function renderTree(obj, parentElement, tagName = 'root') {
    parentElement.innerHTML = ''; // 기존 내용 초기화

    const container = document.createElement('div');
    container.className = 'flex flex-col'; // 수직 정렬

    // 시작 태그
    const startTagDiv = document.createElement('div');
    startTagDiv.className = 'flex items-center';
    const toggleButton = document.createElement('span');
    toggleButton.textContent = '▶ ';
    toggleButton.className = 'cursor-pointer text-blue-500 w-6'; // 고정 너비로 정렬 보장
    const startTag = document.createElement('span');
    startTag.textContent = `<${tagName}>`;
    startTag.className = 'text-blue-700 dark:text-blue-300';
    startTagDiv.appendChild(toggleButton);
    startTagDiv.appendChild(startTag);
    container.appendChild(startTagDiv);

    // 하위 노드 컨테이너
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'pl-6 hidden'; // 들여쓰기 증가

    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        const childDiv = document.createElement('div');
        if (typeof value === 'object' && value !== null) {
          // 하위 객체가 있으면 재귀 호출
          renderTree(value, childDiv, key);
        } else {
          // 기본 값 표시
          const valueDiv = document.createElement('div');
          valueDiv.className = 'flex items-center';
          valueDiv.innerHTML = `<span class="w-6"></span><span>${key}: ${value}</span>`;
          childDiv.appendChild(valueDiv);
        }
        childrenContainer.appendChild(childDiv);
      }
    }

    // 종료 태그
    const endTagDiv = document.createElement('div');
    endTagDiv.className = 'flex items-center';
    const endTagSpacer = document.createElement('span');
    endTagSpacer.className = 'w-6'; // 토글 버튼 자리 맞춤
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
      // 값이 기본 타입이면 태그와 함께 표시
      startTagDiv.textContent += ` ${obj}`;
      startTagDiv.appendChild(endTag);
      toggleButton.remove(); // 기본 값에는 토글 필요 없음
    }

    parentElement.appendChild(container);
  }

  // 클리어 함수
  function clearAll() {
    xmlInput.value = '';
    parseOutput.innerHTML = '';
  }

  // 이벤트 리스너 설정
  parseButton.addEventListener('click', parseXml);
  clearButton.addEventListener('click', clearAll);
});
