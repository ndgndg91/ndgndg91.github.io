import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'

import CryptoJS from 'crypto-js';

// 모드 변경 시 키 입력 필드 표시/숨김
document.getElementById('sha1-mode').addEventListener('change', (e) => {
  const isHmac = e.target.value === 'hmac';
  document.getElementById('sha1-key').style.display = isHmac ? 'block' : 'none';
  document.getElementById('sha1-key-label').style.display = isHmac ? 'block' : 'none';
});

document.getElementById('calculate-sha1').addEventListener('click', () => {
  const inputText = document.getElementById('sha1-input').value;
  const mode = document.getElementById('sha1-mode').value;
  const outputFormat = document.getElementById('sha1-output-format').value;
  const key = document.getElementById('sha1-key').value;
  const outputTextarea = document.getElementById('sha1-output');

  if (!inputText) {
    outputTextarea.value = 'Please enter input text.';
    return;
  }
  if (mode === 'hmac' && !key) {
    outputTextarea.value = 'Please enter a secret key for HMAC.';
    return;
  }

  try {
    let result;
    if (mode === 'hash') {
      result = CryptoJS.SHA1(inputText);
    } else if (mode === 'hmac') {
      result = CryptoJS.HmacSHA1(inputText, key);
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
