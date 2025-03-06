import '../../../css/base.css';
import '../../../css/navigation.css';
import '../../../css/sections.css';
import '../../../css/tools.css';
import '../../../css/responsive.css';
import '../../navigation';
import '../../utils'
import { encryptRSA, generateRSAKeys, decryptRSA } from "./crypto-func";

document.addEventListener('DOMContentLoaded', () => {
  // RSA
  document.getElementById('generate-rsa-keys')?.addEventListener('click', generateRSAKeys);
  document.getElementById('encrypt-rsa')?.addEventListener('click', encryptRSA);
  document.getElementById('decrypt-rsa')?.addEventListener('click', decryptRSA);
});
