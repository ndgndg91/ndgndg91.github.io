import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import { sha3_224, sha3_256, sha3_384, sha3_512 } from "js-sha3";

document.getElementById('calculate-sha3').addEventListener('click', () => {
  const inputText = document.getElementById('sha3-input').value;
  const variant = document.getElementById('sha3-variant').value;
  const outputFormat = document.getElementById('sha3-output-format').value;
  const outputTextarea = document.getElementById('sha3-output');

  if (!inputText) {
    outputTextarea.value = 'enter input.';
    return;
  }

  try {
    // 선택된 변형에 따라 SHA-3 해시 계산 (Hex 출력)
    let hashHex;
    switch (variant) {
      case '224':
        hashHex = sha3_224(inputText);
        break;
      case '256':
        hashHex = sha3_256(inputText);
        break;
      case '384':
        hashHex = sha3_384(inputText);
        break;
      case '512':
        hashHex = sha3_512(inputText);
        break;
      default:
        hashHex = sha3_256(inputText); // 기본값
    }

    // 출력 형식에 따라 변환
    if (outputFormat === 'hex') {
      outputTextarea.value = hashHex;
    } else if (outputFormat === 'base64') {
      const hashArray = hexToBytes(hashHex);
      outputTextarea.value = btoa(String.fromCharCode(...hashArray));
    }
  } catch (error) {
    outputTextarea.value = 'error occurred when calculating hash: ' + error.message;
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
