// UUID 형식 유효성 검사 함수
function isValidUUID(str) {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
}

// 클립보드에 복사하는 함수
function copyToClipboard(elementId) {
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

// 16진수로 변환하는 유틸리티 함수
function toHex(value, length) {
  return value.toString(16).padStart(length, '0');
}
