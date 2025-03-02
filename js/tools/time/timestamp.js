import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import { updateTimestamp, convertTimestampToDatetime, convertDatetimeToTimestamp } from './timestamp-func.js';
import { copyToClipboard } from "../../utils";

let timestampInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  updateTimestamp();
  if (timestampInterval) clearInterval(timestampInterval);
  timestampInterval = setInterval(updateTimestamp, 1000);

  // Timestamp
  document.getElementById('convert-timestamp-to-datetime')?.addEventListener('click', convertTimestampToDatetime);
  document.getElementById('convert-datetime-to-timestamp')?.addEventListener('click', convertDatetimeToTimestamp);

  // Copy 버튼 동적 처리
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.previousElementSibling.id; // 결과 span의 id
      copyToClipboard(targetId);
    });
  });
});
