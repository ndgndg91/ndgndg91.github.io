// js/app.js
import { copyToClipboard } from './utils.js';
import { showSection } from './navigation.js';
import { encodeBase64, decodeBase64, encodeURL, decodeURL } from './encode-decode.js';
import { toggleIVField, encryptAES, decryptAES, generateRSAKeys, encryptRSA, decryptRSA } from './crypto.js';
import { updateTimestamp, convertTimestampToDatetime, convertDatetimeToTimestamp } from './timestamp.js';
import { generateUUIDv7, generateUUIDv1, generateUUIDv3, generateUUIDv4, generateUUIDv5, generateRandomHex, analyzeString } from './string-tools.js';

import '../css/base.css';
import '../css/navigation.css';
import '../css/sections.css';
import '../css/tools.css';
import '../css/responsive.css';

// 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    // Encode/Decode
    document.getElementById('encode-base64')?.addEventListener('click', encodeBase64);
    document.getElementById('decode-base64')?.addEventListener('click', decodeBase64);
    document.getElementById('encode-url')?.addEventListener('click', encodeURL);
    document.getElementById('decode-url')?.addEventListener('click', decodeURL);

    // UUID
    document.getElementById('generate-uuid-v4')?.addEventListener('click', generateUUIDv4);
    document.getElementById('generate-uuid-v7')?.addEventListener('click', generateUUIDv7);
    document.getElementById('generate-uuid-v1')?.addEventListener('click', generateUUIDv1);
    document.getElementById('generate-uuid-v5')?.addEventListener('click', generateUUIDv5);
    document.getElementById('generate-uuid-v3')?.addEventListener('click', generateUUIDv3);

    // Random Hex
    document.getElementById('generate-random-hex')?.addEventListener('click', generateRandomHex);

    // String Analyzer
    document.getElementById('analyze-string')?.addEventListener('click', analyzeString);

    // Timestamp
    document.getElementById('convert-timestamp-to-datetime')?.addEventListener('click', convertTimestampToDatetime);
    document.getElementById('convert-datetime-to-timestamp')?.addEventListener('click', convertDatetimeToTimestamp);

    // AES
    document.getElementById('encrypt-aes')?.addEventListener('click', encryptAES);
    document.getElementById('decrypt-aes')?.addEventListener('click', decryptAES);

    // RSA
    document.getElementById('generate-rsa-keys')?.addEventListener('click', generateRSAKeys);
    document.getElementById('encrypt-rsa')?.addEventListener('click', encryptRSA);
    document.getElementById('decrypt-rsa')?.addEventListener('click', decryptRSA);

    // Copy 버튼 동적 처리
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.previousElementSibling.id; // 결과 span의 id
            copyToClipboard(targetId);
        });
    });
});
