import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import Prism from 'prismjs';
import 'prismjs/components/prism-json.min';

function formatJSON() {
  const input = document.getElementById('json-input').value;
  const output = document.getElementById('json-output').querySelector('code');
  const indentLevel = parseInt(document.getElementById('indent-level').value, 10);

  try {
    const jsonObj = JSON.parse(input);
    const formattedJSON = JSON.stringify(jsonObj, null, indentLevel);
    output.innerHTML = Prism.highlight(formattedJSON, Prism.languages.json, 'json');
  } catch (error) {
    output.innerHTML = 'error: invalid JSON format.\n' + error.message;
    output.style.color = 'red';
  }
}




document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('format-button').addEventListener('click', formatJSON);

  document.getElementById('copy-button').addEventListener('click', copyToClipboard);
});


async function copyToClipboard() {
  const text = document.getElementById('json-output').querySelector('code').innerText;
  try {
    await navigator.clipboard.writeText(text);
    alert('copied!');
  } catch (err) {
    console.error('copy failed: ', err);
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('copied!');
  }
}


