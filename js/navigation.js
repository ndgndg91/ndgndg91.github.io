import { updateTimestamp } from './timestamp.js'; // 함수 가져오기
import { toggleIVField } from './crypto.js'; // crypto.js에서도 가져오기

let timestampInterval = null;

export function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  if (sectionId === "timestamp-tool") {
    updateTimestamp(); // timestamp.js에서 정의
    if (timestampInterval) clearInterval(timestampInterval);
    timestampInterval = setInterval(updateTimestamp, 1000);
  } else if (sectionId === "aes-tool") {
    toggleIVField(); // crypto.js에서 정의
  } else {
    if (timestampInterval) clearInterval(timestampInterval);
  }
}

// 메뉴 클릭 이벤트
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
      const isActive = dropdown.classList.contains("active");
      document.querySelectorAll(".dropdown").forEach(d => {
        if (d !== dropdown) d.classList.remove("active");
      });
      dropdown.classList.toggle("active", !isActive);
    }
  });
});

// 드롭다운 하위 항목 클릭 시 드롭다운 닫기
document.querySelectorAll(".dropdown-content a").forEach(link => {
  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      const dropdown = link.closest(".dropdown");
      dropdown.classList.remove("active");
    }
  });
});

// 페이지 로드 및 해시 변경 처리
window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  showSection(hash || "timestamp-tool");
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) showSection(hash);
});
