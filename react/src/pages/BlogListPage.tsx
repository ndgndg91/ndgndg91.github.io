import React from 'react';
import { useParams } from 'react-router-dom';
import BlogList from '../components/BlogList';
import { getBlogPosts } from '../utils/blog';
import type { BlogCategory } from '../types/blog';

const BlogListPage: React.FC = () => {
  const { category = 'software-engineer' } = useParams<{ category: string }>();
  const posts = getBlogPosts(category as BlogCategory);

  return (
    <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <BlogList posts={posts} currentCategory={category as BlogCategory} />
    </div>
  );
};

export default BlogListPage; 