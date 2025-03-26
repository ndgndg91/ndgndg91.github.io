// software-engineer/list.js
import '../../css/tailwind.css'
import '../navigation';
import '../utils'

document.addEventListener('DOMContentLoaded', () => {
  const blogPosts = [
    { link: '/blog/software-engineer/list/kafka-basic.html', title: "Kafka Basics", description: "Topic, Partition, Offsets, Producer, Consumer, Delivery semantics, Broker, Zookeeper, KRaft concepts.", imgSrc: "/img/kafka.png" },
    // { link: '', title: "Tech Trend 2022", description: "A look at emerging tech trends for the upcoming year.", imgSrc: "/docs/images/blog/image-4.jpg" },
    // { link: '', title: "AI Revolution", description: "How AI is shaping the future of industries.", imgSrc: "/docs/images/blog/image-4.jpg" },
    // { link: '', title: "Cloud Computing", description: "The rise of cloud-based solutions in 2021.", imgSrc: "/docs/images/blog/image-4.jpg" },v
    // { link: '', title: "Cybersecurity Updates", description: "Key updates in cybersecurity for 2021.", imgSrc: "/docs/images/blog/image-4.jpg" },
    // { link: '', title: "Next Big Thing", description: "What's next for software engineering.", imgSrc: "/docs/images/blog/image-4.jpg" },
    // { link: '', title: "Blockchain Basics", description: "Understanding the fundamentals of blockchain.", imgSrc: "/docs/images/blog/image-4.jpg" },
  ];

  const itemsPerPage = 5;
  let currentPage = 1;
  let filteredPosts = [...blogPosts]; // 검색 결과로 필터링된 포스트

  // 카드 렌더링 함수
  function renderCards() {
    const container = document.getElementById('card-container');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedPosts = filteredPosts.slice(start, end);

    if (paginatedPosts.length === 0) {
      container.innerHTML = '<p class="text-gray-500 dark:text-gray-400">No posts found.</p>';
      return;
    }

    paginatedPosts.forEach(post => {
      const card = `
                    <a href="${post.link}" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <img class="object-cover w-full rounded-t-lg h-[600px] md:h-auto md:w-72 md:rounded-none md:rounded-s-lg" src="${post.imgSrc}" alt="${post.title}">
                        <div class="flex flex-col justify-between p-4 leading-normal">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${post.title}</h5>
                            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${post.description}</p>
                        </div>
                    </a>
                `;
      container.innerHTML += card;
    });
  }

  // 페이지네이션 렌더링 함수
  function renderPagination() {
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return; // 페이지가 1개 이하면 페이지네이션 숨김

    pagination.innerHTML += `
                <li>
                    <a href="#" id="prev-btn" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                </li>
            `;

    for (let i = 1; i <= totalPages; i++) {
      pagination.innerHTML += `
                    <li>
                        <a href="#" class="page-btn px-3 py-2 leading-tight ${i === currentPage ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" data-page="${i}">${i}</a>
                    </li>
                `;
    }

    pagination.innerHTML += `
                <li>
                    <a href="#" id="next-btn" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                </li>
            `;

    document.getElementById('prev-btn').addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updatePage();
      }
    });

    document.getElementById('next-btn').addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updatePage();
      }
    });

    document.querySelectorAll('.page-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = parseInt(btn.getAttribute('data-page'));
        updatePage();
      });
    });
  }

  // 검색 기능
  function filterPosts(searchTerm) {
    filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    currentPage = 1; // 검색 시 첫 페이지로 리셋
    updatePage();
  }

  // 페이지 업데이트 함수
  function updatePage() {
    renderCards();
    renderPagination();
  }

  // 초기 렌더링
  updatePage();

  // 검색 이벤트 리스너
  document.getElementById('blog-search-input').addEventListener('input', (e) => {
    filterPosts(e.target.value);
  });
});

