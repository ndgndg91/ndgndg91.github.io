// js/navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // 메뉴 외부 클릭 시 닫기 (선택 사항)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024 && nav.classList.contains('active')) {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnToggle = menuToggle.contains(e.target);
        if (!isClickInsideNav && !isClickOnToggle) {
          nav.classList.remove('active');
        }
      }
    });
  }
});
