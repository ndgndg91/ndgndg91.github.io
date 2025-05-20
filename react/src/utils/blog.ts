import type { BlogPost, BlogPostMetadata, BlogCategory } from '../types/blog';

// 모든 블로그 포스트를 동적으로 임포트
const blogPosts = import.meta.glob<{ [key: string]: BlogPost }>('../content/blog/**/*.ts', {
  eager: true
});

// 블로그 포스트 목록 가져오기
export const getBlogPosts = (category?: BlogCategory): BlogPostMetadata[] => {
  return Object.values(blogPosts)
    .flatMap(module => Object.values(module))
    .filter(post => !category || post.category === category)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 특정 블로그 포스트 가져오기
export const getBlogPost = (id: string, category: BlogCategory): BlogPost | undefined => {
  return Object.values(blogPosts)
    .flatMap(module => Object.values(module))
    .find(post => post.id === id && post.category === category);
};

// 블로그 포스트 검색
export const searchBlogPosts = (query: string): BlogPostMetadata[] => {
  const searchTerm = query.toLowerCase();
  return Object.values(blogPosts)
    .flatMap(module => Object.values(module))
    .filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}; 