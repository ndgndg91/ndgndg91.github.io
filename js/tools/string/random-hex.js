import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { generateRandomHex } from './string-tools-func.js';
import {copyTextAreaToClipboard} from "../../utils";

document.addEventListener('DOMContentLoaded', () => {
  // Random Hex
  document.getElementById('generate-random-hex')?.addEventListener('click', generateRandomHex);

  // Copy 버튼 동적 처리
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      copyTextAreaToClipboard("random-hex-result");
    });
  });
});
