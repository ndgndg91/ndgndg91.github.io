// js/navigation.js
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const moreButton = document.querySelector('button[aria-label="Navigation"]');
  const rightMobileMenu = document.getElementById('rightMobileMenu');

  if (toggleButton && mobileMenu) {
    const toggleLeftMenu = () => {
      mobileMenu.classList.toggle('translate-x-0');
      mobileMenu.classList.toggle('-translate-x-full');
    };

    const toggleRightMenu = () => {
      rightMobileMenu.classList.toggle('translate-x-0');
      rightMobileMenu.classList.toggle('translate-x-full');
    };

    // 햄버거 버튼 클릭 이벤트
    toggleButton.addEventListener('click', toggleLeftMenu);

    // 점 세개 버튼 클릭 이벤트
    if (moreButton) {
      moreButton.addEventListener('click', toggleRightMenu);
    }

    // 터치 이벤트 (태블릿/모바일)
    toggleButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      toggleLeftMenu();
    }, { passive: false });

    // 외부 클릭/터치로 메뉴 닫기
    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
      if (!rightMobileMenu.contains(event.target) && !moreButton.contains(event.target)) {
        rightMobileMenu.classList.remove('translate-x-0');
        rightMobileMenu.classList.add('translate-x-full');
      }
    });

    document.addEventListener('touchstart', (event) => {
      if (!mobileMenu.contains(event.target) && !toggleButton.contains(event.target)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
      if (!rightMobileMenu.contains(event.target) && !moreButton.contains(event.target)) {
        rightMobileMenu.classList.remove('translate-x-0');
        rightMobileMenu.classList.add('translate-x-full');
      }
    });
  } else {
    console.warn('Hamburger button or mobile menu not found:', { toggleButton, mobileMenu });
  }
});
