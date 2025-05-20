import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPostMetadata, BlogCategory } from '../types/blog';

interface BlogListProps {
  posts: BlogPostMetadata[];
  currentCategory?: BlogCategory;
}

const BlogList: React.FC<BlogListProps> = ({ posts, currentCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>(currentCategory || 'all');

  const categories: (BlogCategory | 'all')[] = ['all', 'software-engineer', 'other'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
      <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0 bg-white dark:bg-gray-900">
        <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 dark:text-gray-300 uppercase">
          Developer Playground
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
          Blog
        </h1>
        <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-300">
          This area is intended for a software engineer audience.
        </p>

        {/* Search and Filter */}
        <div className="mt-6">
          <label htmlFor="blog-search-input" className="sr-only">Search blog posts</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="text"
              id="blog-search-input"
              placeholder="Search posts by title or description..."
              className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All' : category === 'software-engineer' ? 'Software Engineering' : 'Other'}
            </button>
          ))}
        </div>

        {/* Blog Post Cards */}
        <div className="mt-6 space-y-6">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.category}/list/${post.id}.html`}
              className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              {post.image && (
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-s-lg"
                  src={`/images/${post.image}`}
                  alt={post.title}
                />
              )}
              <div className="flex flex-col justify-between p-4 leading-normal">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 text-xs font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-200">
                    {post.category === 'software-engineer' ? 'Software Engineering' : 'Other'}
                  </span>
                  {post.tags?.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-300">
                  {post.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.date}</span>
                  {post.updatedDate && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Updated: {post.updatedDate}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">
              No posts found.
            </p>
          </div>
        )}
      </div>
  );
};

export default BlogList; 