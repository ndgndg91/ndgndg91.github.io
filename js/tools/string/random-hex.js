import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import { generateRandomHex } from './string-tools-func.js';
import { copyToClipboard } from "../../utils";

document.addEventListener('DOMContentLoaded', () => {
  // Random Hex
  document.getElementById('generate-random-hex')?.addEventListener('click', generateRandomHex);

  // Copy 버튼 동적 처리
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.previousElementSibling.id; // 결과 span의 id
      copyToClipboard(targetId);
    });
  });
});
