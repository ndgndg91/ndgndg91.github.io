// software-engineer/list.js
import '../../css/tailwind.css'
import '../navigation';
import '../utils'

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('blog-search-input');
  const cards = document.querySelectorAll('#card-container > a');

  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    cards.forEach(card => {
      const title = card.querySelector('h5').textContent.toLowerCase();
      const description = card.querySelector('p').textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
