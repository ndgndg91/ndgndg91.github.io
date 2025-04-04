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

document.querySelector('#addBookmark').addEventListener('click', function() {
  if (window.sidebar && window.sidebar.addPanel) { // Firefox <23

    window.sidebar.addPanel(document.title,window.location.href,'');

  } else if(window.external && ('AddFavorite' in window.external)) { // Internet Explorer

    window.external.AddFavorite(location.href,document.title);

  } else if(window.opera && window.print || window.sidebar && ! (window.sidebar instanceof Node)) { // Opera <15 and Firefox >23
    /**
     * For Firefox <23 and Opera <15, no need for JS to add to bookmarks
     * The only thing needed is a `title` and a `rel="sidebar"`
     * To ensure that the bookmarked URL doesn't have a complementary `#` from our trigger's href
     * we force the current URL
     */
    triggerBookmark.attr('rel', 'sidebar').attr('title', document.title).attr('href', window.location.href);
    return true;

  } else { // For the other browsers (mainly WebKit) we use a simple alert to inform users that they can add to bookmarks with ctrl+D/cmd+D

    alert('You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D on your keyboard.');

  }
  // If you have something in the `href` of your trigger
  return false;
});
