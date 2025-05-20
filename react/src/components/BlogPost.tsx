import React from 'react';
import type { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-pre:bg-gray-800 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default BlogPost; 