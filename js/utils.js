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
