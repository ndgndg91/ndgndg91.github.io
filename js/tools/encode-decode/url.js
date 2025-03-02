import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import { encodeURL, decodeURL } from './encode-decode.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('encode-url')?.addEventListener('click', encodeURL);
  document.getElementById('decode-url')?.addEventListener('click', decodeURL);
});
