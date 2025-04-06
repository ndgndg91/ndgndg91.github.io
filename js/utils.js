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
