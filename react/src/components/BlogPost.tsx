import React from 'react';
import type { BlogPost as BlogPostType } from '../types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="max-w-4xl mx-auto py-8">
      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-gray dark:prose-invert prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-img:rounded-lg prose-pre:bg-gray-800 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Author Box */}
      <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            G
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Giri (Dong-gil Nam)</h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">Backend Software Engineer</p>
          <p className="text-gray-600 dark:text-gray-400 text-base mb-4">
            Passionate about building scalable systems and sharing technical insights. Specializing in JVM internals, distributed systems, and performance optimization.
          </p>
          <div className="flex justify-center sm:justify-start gap-4">
            <a href="https://github.com/ndgndg91" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/동길-남-7a1417141" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:ndgndg91@gmail.com" className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;