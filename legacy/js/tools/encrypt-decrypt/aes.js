import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { toggleIVField, decryptAES, encryptAES } from "./crypto-func";

document.addEventListener('DOMContentLoaded', () => {
  toggleIVField();

  // AES
  document.getElementById("aes-mode").addEventListener("change", toggleIVField);
  document.getElementById('encrypt-aes')?.addEventListener('click', encryptAES);
  document.getElementById('decrypt-aes')?.addEventListener('click', decryptAES);
});
