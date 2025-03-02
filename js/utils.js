// 클립보드에 복사하는 함수
export function copyToClipboard(elementId) {
  const text = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(text)
    .then(() => {
      alert('복사되었습니다: ' + text);
    })
    .catch(err => {
      alert('복사에 실패했습니다.');
      console.error('복사 오류:', err);
    });
}
