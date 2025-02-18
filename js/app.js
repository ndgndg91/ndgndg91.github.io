document.addEventListener('DOMContentLoaded', () => {
  const menuItems = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('.section');

  // 각 메뉴 항목에 클릭 이벤트 리스너 추가
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('data-section');

      // 모든 섹션을 숨기고 선택된 섹션만 표시
      sections.forEach(section => {
        section.style.display = 'none';
        if (section.id === sectionId) {
          section.style.display = 'block';
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });

  // 기본적으로 첫 번째 섹션을 표시
  if (sections.length > 0) {
    sections[0].style.display = 'block';
    sections[0].classList.add('active');
  }
});
