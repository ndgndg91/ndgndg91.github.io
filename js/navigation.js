import { updateTimestamp } from './timestamp.js'; // 함수 가져오기
import { toggleIVField } from './crypto.js'; // crypto.js에서도 가져오기

let timestampInterval = null;

export function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  // 모든 메뉴에서 active 클래스 제거
  document.querySelectorAll(".submenu a").forEach(link => {
    link.classList.remove("active");
  });

  // 선택된 메뉴에 active 클래스 추가
  const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  if (sectionId === "timestamp-tool") {
    updateTimestamp(); // timestamp.js에서 정의
    if (timestampInterval) clearInterval(timestampInterval);
    timestampInterval = setInterval(updateTimestamp, 1000);
  } else if (sectionId === "aes-tool") {
    toggleIVField(); // crypto.js에서 정의
  } else {
    if (timestampInterval) clearInterval(timestampInterval);
  }

  // 모바일에서 메뉴 닫기
  if (window.innerWidth <= 768) {
    document.querySelector(".nav").classList.remove("active");
  }
}

// 메뉴 클릭 이벤트
document.querySelectorAll("[data-section]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    showSection(sectionId);
    window.location.hash = sectionId;
  });
});

// 모바일 메뉴 토글
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// 메뉴 외부 클릭 시 닫기
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768 && nav.classList.contains("active")) {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    if (!isClickInsideNav && !isClickOnToggle) {
      nav.classList.remove("active");
    }
  }
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
