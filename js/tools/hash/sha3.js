import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import {sha3_256} from "js-sha3";

document.getElementById('calculate-sha3').addEventListener('click', () => {
  const inputText = document.getElementById('sha3-input').value;
  const outputFormat = document.getElementById('sha3-output-format').value;
  const outputTextarea = document.getElementById('sha3-output');

  if (!inputText) {
    outputTextarea.value = '입력값을 제공해주세요.';
    return;
  }

  try {
    // js-sha3를 사용해 SHA3-256 계산 (Hex 출력)
    const hashHex = sha3_256(inputText);

    // 출력 형식에 따라 변환
    if (outputFormat === 'hex') {
      outputTextarea.value = hashHex;
    } else if (outputFormat === 'base64') {
      const hashArray = hexToBytes(hashHex);
      outputTextarea.value = btoa(String.fromCharCode(...hashArray));
    }
  } catch (error) {
    outputTextarea.value = '해시 계산 중 오류가 발생했습니다: ' + error.message;
  }

  // 헥스를 바이트 배열로 변환하는 헬퍼 함수
  function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
  }
});
