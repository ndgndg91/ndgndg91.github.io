import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'


document.addEventListener('DOMContentLoaded', () => {
  const text1 = document.getElementById('text1');
  const text2 = document.getElementById('text2');
  const text1Lines = document.getElementById('text1-lines');
  const text2Lines = document.getElementById('text2-lines');
  const diffOutput = document.getElementById('diff-output');
  const compareButton = document.getElementById('compare-button');
  const clearButton = document.getElementById('clear-button');

  const MAX_LINES = 1000; // 최대 라인 수 설정
  const LINE_HEIGHT = 24; // 한 줄의 예상 높이(px)
  const INITIAL_LINES = 10; // 초기 표시 줄 수

  // 라인 번호 업데이트 및 높이 조정 함수
  function updateLineNumbers(textarea, lineContainer) {
    const lines = textarea.value.split('\n');
    let lineCount = Math.min(lines.length, MAX_LINES); // 최대 라인 수 제한
    lineContainer.innerHTML = '';

    for (let i = 1; i <= lineCount; i++) {
      const lineNumber = document.createElement('div');
      lineNumber.textContent = i;
      lineNumber.className = 'py-1'; // 줄 간격 조정
      lineContainer.appendChild(lineNumber);
    }

    // 높이 조정: 줄 수가 10 이상일 때마다 증가
    const newHeight = Math.max(INITIAL_LINES, Math.ceil(lineCount / 10) * 10) * LINE_HEIGHT;
    textarea.style.height = `${newHeight}px`;
    lineContainer.style.height = `${newHeight}px`; // 라인 번호 영역 높이 동기화
  }

  // 텍스트 비교 함수
  function compareTexts(str1, str2) {
    const lines1 = str1.split('\n');
    const lines2 = str2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const diffResult = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        diffResult.push({ lineNum: i + 1, content: line1, status: 'same' });
      } else {
        const words1 = line1.split(' ');
        const words2 = line2.split(' ');
        const maxWords = Math.max(words1.length, words2.length);
        let highlightedLine1 = [];
        let highlightedLine2 = [];

        for (let j = 0; j < maxWords; j++) {
          const word1 = words1[j] || '';
          const word2 = words2[j] || '';

          if (word1 === word2) {
            highlightedLine1.push({ word: word1, status: 'same' });
            highlightedLine2.push({ word: word2, status: 'same' });
          } else {
            highlightedLine1.push({ word: word1, status: 'diff' });
            highlightedLine2.push({ word: word2, status: 'diff' });
          }
        }
        diffResult.push({ lineNum: i + 1, content: highlightedLine1, content2: highlightedLine2, status: 'diff' });
      }
    }
    return diffResult;
  }

  // 결과 렌더링 함수
  function renderDiff() {
    const diff = compareTexts(text1.value, text2.value);
    diffOutput.innerHTML = '';

    diff.forEach((line) => {
      const lineElement = document.createElement('div');
      lineElement.className = 'flex items-start gap-4';

      // 라인 번호 추가
      const lineNumElement = document.createElement('span');
      lineNumElement.textContent = `${line.lineNum}`;
      lineNumElement.className = 'w-10 text-right text-gray-500 dark:text-gray-400';
      lineElement.appendChild(lineNumElement);

      if (line.status === 'same') {
        const contentElement = document.createElement('span');
        contentElement.textContent = line.content;
        contentElement.className = 'flex-1';
        lineElement.appendChild(contentElement);
      } else {
        // 첫 번째 텍스트
        const content1Container = document.createElement('div');
        content1Container.className = 'flex-1 flex flex-wrap';
        line.content.forEach((wordObj) => {
          const wordElement = document.createElement('span');
          wordElement.textContent = wordObj.word + ' ';
          wordElement.className =
            wordObj.status === 'diff'
              ? 'mx-1 bg-red-100 text-red-800 px-1 rounded'
              : 'mx-1 text-gray-700 dark:text-gray-300';
          content1Container.appendChild(wordElement);
        });
        lineElement.appendChild(content1Container);

        // 두 번째 텍스트
        const content2Container = document.createElement('div');
        content2Container.className = 'flex-1 flex flex-wrap';
        line.content2.forEach((wordObj) => {
          const wordElement = document.createElement('span');
          wordElement.textContent = wordObj.word + ' ';
          wordElement.className =
            wordObj.status === 'diff'
              ? 'mx-1 bg-green-100 text-green-800 px-1 rounded'
              : 'mx-1 text-gray-700 dark:text-gray-300';
          content2Container.appendChild(wordElement);
        });
        lineElement.appendChild(content2Container);
      }

      diffOutput.appendChild(lineElement);
    });
  }

  // 모든 입력과 결과 초기화 함수
  function clearAll() {
    text1.value = '';
    text2.value = '';
    diffOutput.innerHTML = '';
    updateLineNumbers(text1, text1Lines);
    updateLineNumbers(text2, text2Lines);
  }

  // 스크롤 동기화 함수
  function syncScroll(textarea, lineContainer) {
    lineContainer.scrollTop = textarea.scrollTop;
  }

  // 이벤트 리스너 설정
  text1.addEventListener('input', () => {
    updateLineNumbers(text1, text1Lines);
  });
  text2.addEventListener('input', () => {
    updateLineNumbers(text2, text2Lines);
  });
  text1.addEventListener('scroll', () => syncScroll(text1, text1Lines));
  text2.addEventListener('scroll', () => syncScroll(text2, text2Lines));
  compareButton.addEventListener('click', renderDiff);
  clearButton.addEventListener('click', clearAll);

  // 초기 설정
  updateLineNumbers(text1, text1Lines);
  updateLineNumbers(text2, text2Lines);
});
