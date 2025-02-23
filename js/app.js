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
    const url = new URL(input); // URL 객체로 파싱
    const encodedParams = Array.from(url.searchParams.entries()).map(
      ([key, value]) => `${key}=${encodeURIComponent(value)}`
    ).join('&');
    document.getElementById("url-output").value = `${url.origin}${url.pathname}${encodedParams ? '?' + encodedParams : ''}`;
  } catch (e) {
    document.getElementById("url-output").value = encodeURIComponent(input); // 파싱 실패 시 전체 인코딩
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

// 블로그 포스트 데이터 (예시)
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

// 섹션 토글 함수
function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  if (sectionId === "blog") {
    displayPosts();
  }
}

// 메뉴 클릭 이벤트 추가 (상위 메뉴와 하위 메뉴 모두)
document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    showSection(sectionId);
    // 모바일에서 메뉴 닫기
    if (window.innerWidth <= 768) {
      document.querySelector(".nav").classList.remove("active");
    }
  });
});

// 모바일 메뉴 토글
document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("active");
});

// 드롭다운 클릭 토글 (모바일에서만)
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
