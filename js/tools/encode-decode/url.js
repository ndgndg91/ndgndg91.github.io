import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import { encodeURL, decodeURL } from './encode-decode-func.js';

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('encode-url')?.addEventListener('click', encodeURL);
  document.getElementById('decode-url')?.addEventListener('click', decodeURL);
});
