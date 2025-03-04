import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';


import CryptoJS from 'crypto-js';

// 모드 변경 시 키 입력 필드 표시/숨김
document.getElementById('sha2-mode').addEventListener('change', (e) => {
  const isHmac = e.target.value === 'hmac';
  document.getElementById('sha2-key').style.display = isHmac ? 'block' : 'none';
  document.getElementById('sha2-key-label').style.display = isHmac ? 'block' : 'none';
});

document.getElementById('calculate-sha2').addEventListener('click', () => {
  const inputText = document.getElementById('sha2-input').value;
  const mode = document.getElementById('sha2-mode').value;
  const variant = document.getElementById('sha2-variant').value;
  const outputFormat = document.getElementById('sha2-output-format').value;
  const key = document.getElementById('sha2-key').value;
  const outputTextarea = document.getElementById('sha2-output');

  if (!inputText) {
    outputTextarea.value = 'Please enter input text.';
    return;
  }
  if (mode === 'hmac' && !key) {
    outputTextarea.value = 'Please enter a secret key for HMAC.';
    return;
  }

  try {
    const sha2Functions = {
      '224': CryptoJS.SHA224,
      '256': CryptoJS.SHA256,
      '384': CryptoJS.SHA384,
      '512': CryptoJS.SHA512
    };
    const hashFunc = sha2Functions[variant] || CryptoJS.SHA256;

    let result;
    if (mode === 'hash') {
      result = hashFunc(inputText);
    } else if (mode === 'hmac') {
      result = CryptoJS.HmacSHA256(inputText, key); // 기본 HMAC-SHA256 예시
      switch (variant) {
        case '224':
          result = CryptoJS.HmacSHA224(inputText, key);
          break;
        case '256':
          result = CryptoJS.HmacSHA256(inputText, key);
          break;
        case '384':
          result = CryptoJS.HmacSHA384(inputText, key);
          break;
        case '512':
          result = CryptoJS.HmacSHA512(inputText, key);
          break;
      }
    }

    if (outputFormat === 'hex') {
      outputTextarea.value = result.toString(CryptoJS.enc.Hex);
    } else if (outputFormat === 'base64') {
      outputTextarea.value = result.toString(CryptoJS.enc.Base64);
    }
  } catch (error) {
    outputTextarea.value = 'Error occurred: ' + error.message;
  }
});
