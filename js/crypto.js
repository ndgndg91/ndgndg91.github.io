function toggleIVField() {
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

document.getElementById("aes-mode").addEventListener("change", toggleIVField);

function encryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value);
  const outputFormat = document.getElementById("aes-output-format").value;
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  if (!input || !key) {
    outputElement.value = "텍스트와 키를 입력하세요.";
    return;
  }

  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4;
  const expectedBytes = keySize;
  if (keyBytes !== expectedBytes) {
    outputElement.value = `키는 ${keySize}비트(${expectedBytes}바이트)여야 합니다. 현재: ${keyBytes}바이트`;
    return;
  }

  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "CBC 모드에서는 16자의 IV를 입력해야 합니다.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput);
  }

  try {
    const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];
    const encrypted = CryptoJS.AES.encrypt(input, keyParsed, {
      mode: modeObj,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    });
    outputElement.value = outputFormat === "base64" ? encrypted.toString() : encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  } catch (e) {
    outputElement.value = "암호화 실패: " + e.message;
  }
}

function decryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value);
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  if (!input || !key) {
    outputElement.value = "텍스트와 키를 입력하세요.";
    return;
  }

  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4;
  const expectedBytes = keySize;
  if (keyBytes !== expectedBytes) {
    outputElement.value = `키는 ${keySize}비트(${expectedBytes}바이트)여야 합니다. 현재: ${keyBytes}바이트`;
    return;
  }

  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "CBC 모드에서는 16자의 IV를 입력해야 합니다.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput);
  }

  try {
    const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];
    const decrypted = CryptoJS.AES.decrypt(input, keyParsed, {
      mode: modeObj,
      iv: iv,
      padding: CryptoJS.pad.Pkcs7
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    outputElement.value = result || "복호화 실패: 잘못된 키 또는 데이터";
  } catch (e) {
    outputElement.value = "복호화 실패: " + e.message;
  }
}

let rsaEncryptor = new JSEncrypt();
function generateRSAKeys() {
  rsaEncryptor = new JSEncrypt({ default_key_size: 2048 });
  document.getElementById("rsa-public-key").value = rsaEncryptor.getPublicKey();
  document.getElementById("rsa-private-key").value = rsaEncryptor.getPrivateKey();
}

function encryptRSA() {
  const input = document.getElementById("rsa-input").value;
  const publicKey = document.getElementById("rsa-public-key").value;
  if (!input || !publicKey) {
    document.getElementById("rsa-output").value = "텍스트와 공개 키를 입력하세요.";
    return;
  }
  try {
    rsaEncryptor.setPublicKey(publicKey);
    const encrypted = rsaEncryptor.encrypt(input);
    document.getElementById("rsa-output").value = encrypted || "암호화 실패";
  } catch (e) {
    document.getElementById("rsa-output").value = "암호화 실패: " + e.message;
  }
}

function decryptRSA() {
  const input = document.getElementById("rsa-input").value;
  const privateKey = document.getElementById("rsa-private-key").value;
  if (!input || !privateKey) {
    document.getElementById("rsa-output").value = "텍스트와 개인 키를 입력하세요.";
    return;
  }
  try {
    rsaEncryptor.setPrivateKey(privateKey);
    const decrypted = rsaEncryptor.decrypt(input);
    document.getElementById("rsa-output").value = decrypted || "복호화 실패: 잘못된 키 또는 데이터";
  } catch (e) {
    document.getElementById("rsa-output").value = "복호화 실패: " + e.message;
  }
}
