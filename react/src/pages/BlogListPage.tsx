import React from 'react';
import { useParams } from 'react-router-dom';
import BlogList from '../components/BlogList';
import { getBlogPosts } from '../utils/blog';
import type { BlogCategory } from '../types/blog';

const BlogListPage: React.FC = () => {
  const { category = 'software-engineer' } = useParams<{ category: string }>();
  const posts = getBlogPosts(category as BlogCategory);

  return (    
      <BlogList posts={posts} currentCategory={category as BlogCategory} />
  );
};

export default BlogListPage; 