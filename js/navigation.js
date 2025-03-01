// navigation.js
import { updateTimestamp } from './timestamp.js';
import { toggleIVField } from './crypto.js';

let timestampInterval = null;

export function showSection(sectionId) {
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? "block" : "none";
  });

  // 모든 .submenu a에서 active 클래스 제거
  document.querySelectorAll(".submenu a").forEach(link => {
    link.classList.remove("active");
  });

  // 선택된 메뉴에 active 클래스 추가
  const activeLink = document.querySelector(`.submenu a[data-section="${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }

  if (sectionId === "timestamp-tool") {
    updateTimestamp();
    if (timestampInterval) clearInterval(timestampInterval);
    timestampInterval = setInterval(updateTimestamp, 1000);
  } else if (sectionId === "aes-tool") {
    toggleIVField();
  } else {
    if (timestampInterval) clearInterval(timestampInterval);
  }

  if (window.innerWidth <= 1024) {
    document.querySelector(".nav").classList.remove("active");
  }
}

const links = document.querySelectorAll("[data-section]");
links.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    if (sectionId) { // sectionId가 있을 때만 호출
      showSection(sectionId);
      window.location.hash = sectionId;
    }
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (window.innerWidth <= 1024 && nav.classList.contains("active")) {
    const isClickInsideNav = nav.contains(e.target);
    const isClickOnToggle = menuToggle.contains(e.target);
    if (!isClickInsideNav && !isClickOnToggle) {
      nav.classList.remove("active");
    }
  }
});

window.addEventListener("load", () => {
  const hash = window.location.hash.substring(1);
  const defaultSection = hash || "timestamp-tool";
  showSection(defaultSection);
});

window.addEventListener("hashchange", () => {
  const hash = window.location.hash.substring(1);
  if (hash) showSection(hash);
});
