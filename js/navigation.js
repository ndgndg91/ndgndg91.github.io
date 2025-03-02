// js/navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const links = document.querySelectorAll('.menu a'); // 모든 메뉴 링크 선택

  // 현재 페이지에 .active 클래스 추가
  const currentPath = window.location.pathname;
  links.forEach(link => {
    const href = link.getAttribute('href');
    // 현재 경로와 href가 일치하거나, 홈 버튼의 경우 '/'와 '/index.html' 모두 처리
    if (href === currentPath || (href === '/index.html' && (currentPath === '/' || currentPath === ''))) {
      link.classList.add('active');
    }
  });

  // 햄버거 메뉴 토글
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
    });

    // 메뉴 외부 클릭 시 닫기
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
