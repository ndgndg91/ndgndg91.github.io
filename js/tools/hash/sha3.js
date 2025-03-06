import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import '../../utils'
import { sha3_224, sha3_256, sha3_384, sha3_512 } from 'js-sha3';

// 모드 변경 시 키 입력 필드 표시/숨김
document.getElementById('sha3-mode').addEventListener('change', (e) => {
  const isHmac = e.target.value === 'hmac';
  document.getElementById('sha3-key').style.display = isHmac ? 'block' : 'none';
  document.getElementById('sha3-key-label').style.display = isHmac ? 'block' : 'none';
});

document.getElementById('calculate-sha3').addEventListener('click', () => {
  const inputText = document.getElementById('sha3-input').value;
  const mode = document.getElementById('sha3-mode').value;
  const variant = document.getElementById('sha3-variant').value;
  const outputFormat = document.getElementById('sha3-output-format').value;
  const key = document.getElementById('sha3-key').value;
  const outputTextarea = document.getElementById('sha3-output');

  if (!inputText) {
    outputTextarea.value = 'Please enter input text.';
    return;
  }
  if (mode === 'hmac' && !key) {
    outputTextarea.value = 'Please enter a secret key for HMAC.';
    return;
  }

  try {
    const sha3Functions = {
      '224': sha3_224,
      '256': sha3_256,
      '384': sha3_384,
      '512': sha3_512
    };
    const hashFunc = sha3Functions[variant] || sha3_256;

    let resultHex;
    if (mode === 'hash') {
      resultHex = hashFunc(inputText);
    } else if (mode === 'hmac') {
      resultHex = hmacSha3(key, inputText, hashFunc);
    }

    if (outputFormat === 'hex') {
      outputTextarea.value = resultHex;
    } else if (outputFormat === 'base64') {
      const hashArray = hexToBytes(resultHex);
      outputTextarea.value = btoa(String.fromCharCode(...hashArray));
    }
  } catch (error) {
    outputTextarea.value = 'Error occurred: ' + error.message;
  }
});

function hmacSha3(key, message, hashFunc) {
  const blockSize = variantToBlockSize(hashFunc);
  const keyBytes = new TextEncoder().encode(key);
  let adjustedKey = keyBytes;

  // 키가 블록 크기보다 길면 해시로 줄임
  if (keyBytes.length > blockSize) {
    adjustedKey = hexToBytes(hashFunc(key));
  }

  // 키를 블록 크기에 맞게 패딩
  if (adjustedKey.length < blockSize) {
    const padding = new Uint8Array(blockSize - adjustedKey.length);
    adjustedKey = new Uint8Array([...adjustedKey, ...padding]);
  }

  // ipad와 opad 준비
  const ipad = new Uint8Array(adjustedKey.length).fill(0x36);
  const opad = new Uint8Array(adjustedKey.length).fill(0x5c);

  // XOR 연산
  const innerKey = adjustedKey.map((b, i) => b ^ ipad[i]);
  const outerKey = adjustedKey.map((b, i) => b ^ opad[i]);

  // inner 해시: (key XOR ipad) || message
  const innerData = new Uint8Array([...innerKey, ...new TextEncoder().encode(message)]);
  const innerHash = hashFunc(innerData);

  // outer 해시: (key XOR opad) || innerHash
  const outerData = new Uint8Array([...outerKey, ...hexToBytes(innerHash)]);
  return hashFunc(outerData);
}

function hexToBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return bytes;
}

function variantToBlockSize(hashFunc) {
  if (hashFunc === sha3_224) return 144; // 1152 bits / 8
  if (hashFunc === sha3_256) return 136; // 1088 bits / 8
  if (hashFunc === sha3_384) return 104; // 832 bits / 8
  if (hashFunc === sha3_512) return 72;  // 576 bits / 8
  return 136; // 기본값 SHA3-256
}
