import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'
import { encryptRSA, generateRSAKeys, decryptRSA } from "./crypto-func";

document.addEventListener('DOMContentLoaded', () => {
  // RSA
  document.getElementById('generate-rsa-keys')?.addEventListener('click', generateRSAKeys);
  document.getElementById('encrypt-rsa')?.addEventListener('click', encryptRSA);
  document.getElementById('decrypt-rsa')?.addEventListener('click', decryptRSA);
});
