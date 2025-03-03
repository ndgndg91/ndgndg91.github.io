import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';


document.getElementById('calculate-sha2').addEventListener('click', async () => {
  const inputText = document.getElementById('sha2-input').value;
  const outputFormat = document.getElementById('sha2-output-format').value;
  const outputTextarea = document.getElementById('sha2-output');

  if (!inputText) {
    outputTextarea.value = 'enter input.';
    return;
  }

  try {
    // 텍스트를 Uint8Array로 변환
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    // SHA-256 해시 계산
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // 출력 형식에 따라 변환
    if (outputFormat === 'hex') {
      outputTextarea.value = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else if (outputFormat === 'base64') {
      outputTextarea.value = btoa(String.fromCharCode(...hashArray));
    }
  } catch (error) {
    outputTextarea.value = 'error occurred when calculating hash: ' + error.message;
  }
});
