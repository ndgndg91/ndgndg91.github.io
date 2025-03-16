import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { encodeURL, decodeURL } from './encode-decode-func.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('encode-url')?.addEventListener('click', encodeURL);
  document.getElementById('decode-url')?.addEventListener('click', decodeURL);
});
