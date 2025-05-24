import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BlogList from '../components/BlogList';
import { getBlogPosts } from '../utils/blog';
import type { BlogCategory } from '../types/blog';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

const BlogListPage: React.FC = () => {
  const { category = 'software-engineer' } = useParams<{ category: string }>();
  const location = useLocation();
  const posts = getBlogPosts(category as BlogCategory);

  // Determine SEO data based on current path
  const getSEOData = () => {
    if (location.pathname.includes('/blog/other/')) {
      return seoData.blogListOther;
    }
    return seoData.blogList;
  };

  return (
    <>
      <SEOHead {...getSEOData()} />
      <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
        <BlogList posts={posts} currentCategory={category as BlogCategory} />
      </div>
    </>
  );
};

export default BlogListPage; 