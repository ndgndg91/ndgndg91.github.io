import CryptoJS from 'crypto-js'; // crypto-js 모듈 가져오기
import JSEncrypt from 'jsencrypt'; // jsencrypt 모듈 가져오기

export function toggleIVField() {
  const mode = document.getElementById("aes-mode").value;
  const ivLabel = document.getElementById("aes-iv-label");
  const ivInput = document.getElementById("aes-iv");
  if (mode === "CBC") {
    ivLabel.style.display = "block";
    ivInput.style.display = "block";
  } else {
    ivLabel.style.display = "none";
    ivInput.style.display = "none";
  }
}

export function encryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value);
  const outputFormat = document.getElementById("aes-output-format").value;
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  if (!input || !key) {
    outputElement.value = "Enter Text and Key.";
    return;
  }

  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4;
  const expectedBytes = keySize;
  if (keyBytes !== expectedBytes) {
    outputElement.value = `key must be ${keySize}bits(${expectedBytes}bytes). current: ${keyBytes}bytes.`;
    return;
  }

  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "when using CBC mode, enter 16 length IV.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput);
  }

  try {
    const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];
    const encrypted = CryptoJS.AES.encrypt(input, keyParsed, {
      mode: modeObj,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
    });
    outputElement.value =
      outputFormat === "base64"
        ? encrypted.toString()
        : encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  } catch (e) {
    outputElement.value = "encryption failed : " + e.message;
  }
}

export function decryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value);
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  if (!input || !key) {
    outputElement.value = "Enter Text and Key.";
    return;
  }

  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4;
  const expectedBytes = keySize;
  if (keyBytes !== expectedBytes) {
    outputElement.value = `key must be ${keySize}bits(${expectedBytes}bytes). current: ${keyBytes}bytes.`;
    return;
  }

  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "when using CBC mode, enter 16 length IV.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput);
  }

  try {
    const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];

    let decrypted;
    if (/^[0-9A-Fa-f]+$/.test(input)) { // 입력이 hex인지 확인
      const ciphertext = CryptoJS.enc.Hex.parse(input);
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
      });
      decrypted = CryptoJS.AES.decrypt(cipherParams, keyParsed, {
        mode: modeObj,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      });
    } else { // Base64 입력 처리
      decrypted = CryptoJS.AES.decrypt(input, keyParsed, {
        mode: modeObj,
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
      });
    }

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    outputElement.value = result || "decryption failed: wrong key or data";
  } catch (e) {
    outputElement.value = "decryption failed: " + e.message;
  }
}

let rsaEncryptor = new JSEncrypt(); // JSEncrypt 인스턴스 생성
export function generateRSAKeys() {
  rsaEncryptor = new JSEncrypt({ default_key_size: 2048 });
  document.getElementById("rsa-public-key").value = rsaEncryptor.getPublicKey();
  document.getElementById("rsa-private-key").value = rsaEncryptor.getPrivateKey();
}

export function encryptRSA() {
  const input = document.getElementById("rsa-input").value;
  const publicKey = document.getElementById("rsa-public-key").value;
  if (!input || !publicKey) {
    document.getElementById("rsa-output").value = "enter text and public key.";
    return;
  }
  try {
    rsaEncryptor.setPublicKey(publicKey);
    const encrypted = rsaEncryptor.encrypt(input);
    document.getElementById("rsa-output").value = encrypted || "encryption failed";
  } catch (e) {
    document.getElementById("rsa-output").value = "encryption failed: " + e.message;
  }
}

export function decryptRSA() {
  const input = document.getElementById("rsa-input").value;
  const privateKey = document.getElementById("rsa-private-key").value;
  if (!input || !privateKey) {
    document.getElementById("rsa-output").value = "enter text and private key.";
    return;
  }
  try {
    rsaEncryptor.setPrivateKey(privateKey);
    const decrypted = rsaEncryptor.decrypt(input);
    document.getElementById("rsa-output").value = decrypted || "decryption failed: wrong key or data";
  } catch (e) {
    document.getElementById("rsa-output").value = "decryption failed: " + e.message;
  }
}
