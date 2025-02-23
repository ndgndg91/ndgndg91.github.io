// Base64 인코딩/디코딩 함수
function encodeBase64() {
  const input = document.getElementById("base64-input").value;
  document.getElementById("base64-output").value = btoa(input);
}

function decodeBase64() {
  const input = document.getElementById("base64-input").value;
  try {
    document.getElementById("base64-output").value = atob(input);
  } catch (e) {
    document.getElementById("base64-output").value = "Error: Invalid Base64 string";
  }
}

// URL 인코딩/디코딩 함수
function encodeURL() {
  const input = document.getElementById("url-input").value;
  try {
    const url = new URL(input);
    const encodedParams = Array.from(url.searchParams.entries()).map(
      ([key, value]) => `${key}=${encodeURIComponent(value)}`
    ).join('&');
    document.getElementById("url-output").value = `${url.origin}${url.pathname}${encodedParams ? '?' + encodedParams : ''}`;
  } catch (e) {
    document.getElementById("url-output").value = encodeURIComponent(input);
  }
}

function decodeURL() {
  const input = document.getElementById("url-input").value;
  try {
    document.getElementById("url-output").value = decodeURIComponent(input);
  } catch (e) {
    document.getElementById("url-output").value = "Error: Invalid URL-encoded string";
  }
}

// AES 모드에 따른 IV 필드 표시/숨김 함수
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

// AES 모드 변경 시 IV 필드 표시/숨김
document.getElementById("aes-mode").addEventListener("change", toggleIVField);

// AES 암호화
function encryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value); // 비트 단위 (128, 192, 256)
  const outputFormat = document.getElementById("aes-output-format").value;
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  // 입력 검증
  if (!input || !key) {
    outputElement.value = "텍스트와 키를 입력하세요.";
    return;
  }

  // 키를 명시적으로 파싱하고 바이트 길이 검증
  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4; // WordArray의 바이트 수 계산
  const expectedBytes = keySize; // AES 요구 바이트 (16, 24, 32)
  if (keyBytes !== expectedBytes) {
    console.log(keyBytes)
    console.log(expectedBytes)
    outputElement.value = `키는 ${keySize}비트(${expectedBytes}바이트)여야 합니다. 현재: ${keyBytes}바이트`;
    return;
  }

  // IV 검증 및 파싱 (CBC 모드에서만 필요)
  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "CBC 모드에서는 16자의 IV를 입력해야 합니다.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput); // IV를 명시적으로 파싱
  }

  try {
    const modeObj = {
      CBC: CryptoJS.mode.CBC,
      ECB: CryptoJS.mode.ECB,
    }[mode];

    const encrypted = CryptoJS.AES.encrypt(input, keyParsed, {
      mode: modeObj,
      iv: iv, // ECB에서는 무시됨
      padding: CryptoJS.pad.Pkcs7
    });

    outputElement.value = outputFormat === "base64" ? encrypted.toString() : encrypted.ciphertext.toString(CryptoJS.enc.Hex);
  } catch (e) {
    outputElement.value = "암호화 실패: " + e.message;
  }
}

// AES 복호화
function decryptAES() {
  const input = document.getElementById("aes-input").value;
  const key = document.getElementById("aes-key").value;
  const mode = document.getElementById("aes-mode").value;
  const keySize = parseInt(document.getElementById("aes-key-size").value); // 비트 단위 (128, 192, 256)
  const outputFormat = document.getElementById("aes-output-format").value;
  const ivInput = document.getElementById("aes-iv").value;
  const outputElement = document.getElementById("aes-output");

  // 입력 검증
  if (!input || !key) {
    outputElement.value = "텍스트와 키를 입력하세요.";
    return;
  }

  // 키를 명시적으로 파싱하고 바이트 길이 검증
  const keyParsed = CryptoJS.enc.Utf8.parse(key);
  const keyBytes = keyParsed.words.length * 4; // WordArray의 바이트 수 계산
  const expectedBytes = keySize; // AES 요구 바이트 (16, 24, 32)
  if (keyBytes !== expectedBytes) {
    outputElement.value = `키는 ${keySize}비트(${expectedBytes}바이트)여야 합니다. 현재: ${keyBytes}바이트`;
    return;
  }

  // IV 검증 및 파싱 (CBC 모드에서만 필요)
  let iv = null;
  if (mode === "CBC") {
    if (!ivInput || ivInput.length !== 16) {
      outputElement.value = "CBC 모드에서는 16자의 IV를 입력해야 합니다.";
      return;
    }
    iv = CryptoJS.enc.Utf8.parse(ivInput); // IV를 명시적으로 파싱
  }

  try {
    const modeObj = {
      CBC: CryptoJS.mode.CBC,
      ECB: CryptoJS.mode.ECB,
    }[mode];

    const decrypted = CryptoJS.AES.decrypt(
      input, // Base64 입력만 처리
      keyParsed,
      { mode: modeObj, iv: iv, padding: CryptoJS.pad.Pkcs7 }
    );

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    outputElement.value = result || "복호화 실패: 잘못된 키 또는 데이터";
  } catch (e) {
    outputElement.value = "복호화 실패: " + e.message;
  }
}


// RSA 키 생성 및 암호화/복호화
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

// 블로그 포스트 데이터
const blogPosts = [
  { title: "포스트 5", date: "2025-02-20", url: "https://ndgndg91.blogspot.com/post5" },
  { title: "포스트 4", date: "2025-01-15", url: "https://ndgndg91.blogspot.com/post4" },
  { title: "포스트 3", date: "2024-12-10", url: "https://ndgndg91.blogspot.com/post3" },
  { title: "포스트 2", date: "2024-11-05", url: "https://ndgndg91.blogspot.com/post2" },
  { title: "포스트 1", date: "2024-10-01", url: "https://ndgndg91.blogspot.com/post1" },
];

// 페이지네이션 설정
const postsPerPage = 2;
let currentPage = 1;

function displayPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = "";

  const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  paginatedPosts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
      <p>작성일: ${post.date}</p>
    `;
    blogPostsContainer.appendChild(postElement);
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;
}

// 페이지네이션 버튼 이벤트
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPosts();
  }
});

// Unix Timestamp 및 타임존 실시간 업데이트
function updateTimestamp() {
  const now = new Date();

  const timestampElement = document.getElementById("current-timestamp");
  if (timestampElement) {
    timestampElement.textContent = Math.floor(now.getTime() / 1000);
  }

  const timezoneElement = document.getElementById("current-timezone");
  if (timezoneElement) {
    timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  const timezoneSelect = document.getElementById("timezone-select");
  const selectedTimezone = timezoneSelect ? timezoneSelect.value : Intl.DateTimeFormat().resolvedOptions().timeZone;
  const datetimeElement = document.getElementById("current-datetime");
  if (datetimeElement) {
    const options = {
      timeZone: selectedTimezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);
    const year = parts.find(part => part.type === 'year').value;
    const month = parts.find(part => part.type === 'month').value;
    const day = parts.find(part => part.type === 'day').value;
    const hours = parts.find(part => part.type === 'hour').value;
    const minutes = parts.find(part => part.type === 'minute').value;
    const seconds = parts.find(part => part.type === 'second').value;
    datetimeElement.textContent = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
  }
}

// Timestamp -> Datetime 변환
function convertTimestampToDatetime() {
  const timestampInput = document.getElementById("timestamp-input").value;
  const timezoneSelect = document.getElementById("timestamp-timezone").value;
  const resultElement = document.getElementById("timestamp-to-datetime-result");

  if (!timestampInput || isNaN(timestampInput)) {
    resultElement.textContent = "유효한 Unix Timestamp를 입력하세요.";
    return;
  }

  const timestamp = parseInt(timestampInput) * 1000;
  const date = new Date(timestamp);
  const options = {
    timeZone: timezoneSelect,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);
  const year = parts.find(part => part.type === 'year').value;
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const hours = parts.find(part => part.type === 'hour').value;
  const minutes = parts.find(part => part.type === 'minute').value;
  const seconds = parts.find(part => part.type === 'second').value;
  resultElement.textContent = `${year} ${month} ${day} ${hours} ${minutes} ${seconds}`;
}

// Datetime -> Timestamp 변환
function convertDatetimeToTimestamp() {
  const datetimeInput = document.getElementById("datetime-input").value.trim();
  const timezoneSelect = document.getElementById("datetime-timezone").value;
  const resultElement = document.getElementById("datetime-to-timestamp-result");

  const parts = datetimeInput.split(" ");
  if (parts.length !== 6) {
    resultElement.textContent = "형식: YYYY MM DD HH MM SS";
    return;
  }

  const [year, month, day, hours, minutes, seconds] = parts;
  const dateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    resultElement.textContent = "유효한 날짜/시간을 입력하세요.";
    return;
  }

  const options = { timeZone: timezoneSelect };
  const utcDate = new Date(date.toLocaleString('en-US', options));
  resultElement.textContent = Math.floor(utcDate.getTime() / 1000);
}

// 섹션 토글 함수
let timestampInterval = null;
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  if (sectionId === "blog") {
    displayPosts();
    if (timestampInterval) clearInterval(timestampInterval);
  } else if (sectionId === "timestamp-tool") {
    updateTimestamp();
    if (timestampInterval) clearInterval(timestampInterval);
    timestampInterval = setInterval(updateTimestamp, 1000);
  } else if (sectionId === "aes-tool") {
    toggleIVField(); // AES 섹션 진입 시 IV 필드 상태 업데이트
  } else {
    if (timestampInterval) clearInterval(timestampInterval);
  }
}

// 타임존 선택 이벤트 (Timestamp 섹션 전용)
const timezoneSelect = document.getElementById("timezone-select");
if (timezoneSelect && !timezoneSelect.dataset.listenerAdded) {
  timezoneSelect.addEventListener("change", updateTimestamp);
  timezoneSelect.dataset.listenerAdded = "true";
}

// 메뉴 클릭 이벤트 추가 (상위 및 서브메뉴 모두)
document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    showSection(sectionId);
    window.location.hash = sectionId;
    if (window.innerWidth <= 768) {
      document.querySelector(".nav").classList.remove("active");
    }
  });
});

// 모바일 메뉴 토글
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("active");
});

// 드롭다운 클릭 토글 (모바일)
document.querySelectorAll(".dropdown .dropbtn").forEach(dropbtn => {
  dropbtn.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = dropbtn.parentElement;
      dropdown.classList.toggle("active");
    }
  });
});

// 페이지 로드 시 URL 해시 확인 및 섹션 표시
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showSection(hash);
  } else {
    showSection("timestamp-tool");
  }
});

// 해시 변경 시 섹션 업데이트
window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    showSection(hash);
  }
});
