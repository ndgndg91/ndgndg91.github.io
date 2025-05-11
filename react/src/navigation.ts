// Export a function to initialize navigation
export function initializeNavigation(): void {
  const toggleButton = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const moreButton = document.querySelector('button[aria-label="Navigation"]');
  const rightMobileMenu = document.getElementById('rightMobileMenu');

  if (toggleButton && mobileMenu && rightMobileMenu) {
    const toggleLeftMenu = () => {
      mobileMenu.classList.toggle('translate-x-0');
      mobileMenu.classList.toggle('-translate-x-full');
    };

    const toggleRightMenu = () => {
      if (rightMobileMenu) {
        rightMobileMenu.classList.toggle('translate-x-0');
        rightMobileMenu.classList.toggle('translate-x-full');
      }
    };

    toggleButton.addEventListener('click', toggleLeftMenu);

    if (moreButton) {
      moreButton.addEventListener('click', toggleRightMenu);
    }

    toggleButton.addEventListener('touchstart', (e) => {
      e.preventDefault();
      toggleLeftMenu();
    }, { passive: false });

    document.addEventListener('click', (event) => {
      if (!mobileMenu.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
      if (rightMobileMenu && moreButton && !rightMobileMenu.contains(event.target as Node) && !moreButton.contains(event.target as Node)) {
        rightMobileMenu.classList.remove('translate-x-0');
        rightMobileMenu.classList.add('translate-x-full');
      }
    });

    document.addEventListener('touchstart', (event) => {
      if (!mobileMenu.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('-translate-x-full');
      }
      if (rightMobileMenu && moreButton && !rightMobileMenu.contains(event.target as Node) && !moreButton.contains(event.target as Node)) {
        rightMobileMenu.classList.remove('translate-x-0');
        rightMobileMenu.classList.add('translate-x-full');
      }
    });
  } else {
    console.warn('Hamburger button, mobile menu, or right mobile menu not found:', { toggleButton, mobileMenu, rightMobileMenu });
  }
}
