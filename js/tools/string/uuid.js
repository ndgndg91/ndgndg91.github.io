import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import { generateUUIDv7, generateUUIDv1, generateUUIDv3, generateUUIDv4, generateUUIDv5 } from './string-tools-func.js';
import { copyToClipboard } from "../../utils";


document.addEventListener('DOMContentLoaded', () => {
  // UUID
  document.getElementById('generate-uuid-v4')?.addEventListener('click', generateUUIDv4);
  document.getElementById('generate-uuid-v7')?.addEventListener('click', generateUUIDv7);
  document.getElementById('generate-uuid-v1')?.addEventListener('click', generateUUIDv1);
  document.getElementById('generate-uuid-v5')?.addEventListener('click', generateUUIDv5);
  document.getElementById('generate-uuid-v3')?.addEventListener('click', generateUUIDv3);

  // Copy 버튼 동적 처리
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.previousElementSibling.id; // 결과 span의 id
      copyToClipboard(targetId);
    });
  });
});
