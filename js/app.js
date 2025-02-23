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

  // Unix Timestamp
  const timestampElement = document.getElementById("current-timestamp");
  if (timestampElement) {
    timestampElement.textContent = Math.floor(now.getTime() / 1000);
  }

  // 현재 타임존
  const timezoneElement = document.getElementById("current-timezone");
  if (timezoneElement) {
    timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // 선택한 타임존의 시간 (실시간 표시용)
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
  const timezoneSelect = document.getElementById("timestamp-timezone").value; // 변환용 타임존
  const resultElement = document.getElementById("timestamp-to-datetime-result");

  if (!timestampInput || isNaN(timestampInput)) {
    resultElement.textContent = "유효한 Unix Timestamp를 입력하세요.";
    return;
  }

  const timestamp = parseInt(timestampInput) * 1000; // 초 단위를 밀리초로 변환
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
  const timezoneSelect = document.getElementById("datetime-timezone").value; // 변환용 타임존
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

  // 타임존 적용하여 UTC로 변환
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
    const timezoneSelect = document.getElementById("timezone-select");
    if (timezoneSelect) {
      timezoneSelect.addEventListener("change", updateTimestamp);
    }
  } else {
    if (timestampInterval) clearInterval(timestampInterval);
  }
}

// 메뉴 클릭 이벤트 추가
document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    showSection(sectionId);
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

// 초기 상태
showSection("blog");
