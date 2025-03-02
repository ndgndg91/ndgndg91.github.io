import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import { toggleIVField, decryptAES, encryptAES } from "./crypto-func";

document.addEventListener('DOMContentLoaded', () => {
  toggleIVField();

  // AES
  document.getElementById("aes-mode").addEventListener("change", toggleIVField);
  document.getElementById('encrypt-aes')?.addEventListener('click', encryptAES);
  document.getElementById('decrypt-aes')?.addEventListener('click', decryptAES);
});
