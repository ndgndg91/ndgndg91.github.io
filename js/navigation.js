// js/navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (toggleButton && mobileMenu) {
    const toggleMenu = () => {
      mobileMenu.classList.toggle('translate-x-0');
      mobileMenu.classList.toggle('-translate-x-full');
    };

    // 클릭 이벤트
    toggleButton.addEventListener('click', toggleMenu);

    // 터치 이벤트 (태블릿/모바일)
    toggleButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      toggleMenu();
    }, { passive: false });

    // 외부 클릭/터치로 메뉴 닫기
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
    });

    document.addEventListener('touchstart', (event) => {
      if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
    });
  } else {
    console.warn('Hamburger button or mobile menu not found:', { toggleButton, mobileMenu });
  }
});
