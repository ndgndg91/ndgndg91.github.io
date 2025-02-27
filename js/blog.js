const blogPosts = [
  { title: "포스트 5", date: "2025-02-20", url: "https://ndgndg91.blogspot.com/post5" },
  { title: "포스트 4", date: "2025-01-15", url: "https://ndgndg91.blogspot.com/post4" },
  { title: "포스트 3", date: "2024-12-10", url: "https://ndgndg91.blogspot.com/post3" },
  { title: "포스트 2", date: "2024-11-05", url: "https://ndgndg91.blogspot.com/post2" },
  { title: "포스트 1", date: "2024-10-01", url: "https://ndgndg91.blogspot.com/post1" },
];

const postsPerPage = 2;
let currentPage = 1;

function displayPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPostsContainer.innerHTML = "";

  const sortedPosts = blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = sortedPosts.slice(startIndex, endIndex);

  paginatedPosts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");
    postElement.innerHTML = `
      <h3><a href="${post.url}" target="_blank">${post.title}</a></h3>
      <p>작성일: ${post.date}</p>
    `;
    blogPostsContainer.appendChild(postElement);
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  document.getElementById("page-info").textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prev-page").disabled = currentPage === 1;
  document.getElementById("next-page").disabled = currentPage === totalPages;
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPosts();
  }
});
