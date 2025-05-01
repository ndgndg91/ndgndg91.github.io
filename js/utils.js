
/**
 * 클립보드 복사 기능을 처리하는 함수
 * 버튼 클릭 시 지정된 요소의 내용을 클립보드에 복사하고 UI를 업데이트합니다.
 */
export function initializeClipboardCopy() {
  // 모든 복사 버튼 요소 선택
  const copyButtons = document.querySelectorAll('[data-copy-to-clipboard-target]');
  console.log(copyButtons);

  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      try {
        // 복사할 대상 요소의 ID 가져오기
        const targetId = button.getAttribute('data-copy-to-clipboard-target');
        const targetElement = document.getElementById(targetId);

        if (!targetElement) {
          console.error(`Target element with ID '${targetId}' not found`);
          return;
        }

        // 복사할 콘텐츠 타입 확인 (innerHTML 또는 textContent)
        const contentType = button.getAttribute('data-copy-to-clipboard-content-type') || 'textContent';
        let content = contentType === 'innerHTML' ? targetElement.innerHTML : targetElement.textContent;

        // HTML 엔티티 처리 여부 확인
        const handleHtmlEntities = button.getAttribute('data-copy-to-clipboard-html-entities') === 'true';

        if (handleHtmlEntities && contentType === 'innerHTML') {
          // HTML 태그 제거 및 엔티티 디코딩
          const tempElement = document.createElement('div');
          tempElement.innerHTML = content;
          content = tempElement.textContent;
        }

        // 클립보드에 복사
        await navigator.clipboard.writeText(content);

        // UI 업데이트: 복사 성공 메시지 표시
        const defaultMessage = button.querySelector('#default-message');
        const successMessage = button.querySelector('#success-message');

        if (defaultMessage && successMessage) {
          defaultMessage.classList.add('hidden');
          successMessage.classList.remove('hidden');

          // 3초 후 원래 상태로 복원
          setTimeout(() => {
            defaultMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
          }, 3000);
        }

      } catch (error) {
        console.error('Failed to copy text to clipboard:', error);
      }
    });
  });
}



// 또는 동적으로 추가된 요소를 위해 함수를 별도로 호출할 수 있습니다
// initializeClipboardCopy();

// 클립보드에 복사하는 함수
export function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('copied: ' + text);
    })
    .catch(err => {
      alert('Copying failed.');
      console.error('coping error:', err);
    });
}

export function copyTextAreaToClipboard(elementId) {
  const element = document.getElementById(elementId);

  // textarea, input 등의 form 요소는 .value를 사용
  // 그 외의 요소는 textContent 사용
  const text = element.tagName === 'TEXTAREA' || element.tagName === 'INPUT'
    ? element.value
    : element.textContent;

  navigator.clipboard.writeText(text)
    .then(() => {
      alert('copied: ' + text);
    })
    .catch(err => {
      alert('Copying failed.');
      console.error('coping error:', err);
    });
}

// 데스크톱 북마크 버튼
document.querySelector('#addBookmark').addEventListener('click', function(e) {
  e.preventDefault();
  handleBookmark();
});

// 모바일 북마크 버튼
document.querySelector('#mobileAddBookmark').addEventListener('click', function(e) {
  e.preventDefault();
  handleBookmark();
});

function handleBookmark() {
  // 모바일 브라우저 체크
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일 브라우저에서는 공유 기능을 사용
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // 공유 API를 지원하지 않는 경우
      alert('이 페이지를 북마크에 추가하려면 브라우저의 공유 기능을 사용하세요.');
    }
  } else {
    if (window.sidebar && window.sidebar.addPanel) { // Firefox <23
      window.sidebar.addPanel(document.title, window.location.href, '');
    } else if(window.external && ('AddFavorite' in window.external)) { // Internet Explorer
      window.external.AddFavorite(location.href, document.title);
    } else if(window.opera && window.print || window.sidebar && !(window.sidebar instanceof Node)) { // Opera <15 and Firefox >23
      alert('이 페이지를 북마크에 추가하려면 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D를 누르세요.');
    } else { // For other browsers
      alert('이 페이지를 북마크에 추가하려면 ' + (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL') + ' + D를 누르세요.');
    }
  }
  return false;
}
