import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { encodeBase64, decodeBase64 } from './encode-decode-func.js';


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('encode-base64')?.addEventListener('click', encodeBase64);
  document.getElementById('decode-base64')?.addEventListener('click', decodeBase64);
});
