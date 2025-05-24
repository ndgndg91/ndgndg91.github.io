import React, { useEffect, useState } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import BlogPost from '../components/BlogPost';
import type { BlogPost as BlogPostType, BlogCategory } from '../types/blog';
import { getBlogPost } from '../utils/blog';
import { jvmWarmup } from '../content/blog/software-engineer/jvm-warmup';
import SEOHead from '../components/SEOHead';
import { seoData } from '../data/seoData';

const BlogPage: React.FC = () => {
  const location = useLocation();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();

  // Get SEO data based on blog post slug
  const getSEOData = () => {
    const pathname = location.pathname;
    if (pathname.includes('about-g1gc')) return seoData.aboutG1gc;
    if (pathname.includes('about-zgc')) return seoData.aboutZgc;
    if (pathname.includes('about-kafka')) return seoData.aboutKafka;
    if (pathname.includes('about-mongodb-sharding')) return seoData.aboutMongodbSharding;
    if (pathname.includes('replay-attack')) return seoData.replayAttack;
    
    // Default blog post SEO
    return {
      title: post ? `${post.title} | Developer Playground Blog` : 'Blog Post | Developer Playground',
      description: post ? post.description : 'Read our latest blog post about software engineering and development.',
      keywords: 'tech blog, software engineering, development experience'
    };
  };

  useEffect(() => {
    // 페이지 로드 시 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);

    const loadPost = async () => {
      try {
        const pathname = location.pathname;
        // Extract category and id from pathname
        const match = pathname.match(/\/blog\/([^/]+)\/list\/([^/]+)\.html/);
        if (!match) {
          throw new Error('Invalid path format');
        }
        const [, category, id] = match;
        const postData = getBlogPost(id, category as BlogCategory);
        if (!postData) {
          throw new Error('Post not found');
        }
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [location.pathname]);

  if (loading) {
    return (
      <>
        <SEOHead title="Loading... | Developer Playground" description="Loading blog post..." keywords="blog, loading" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading post...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEOHead title="Post Not Found | Developer Playground" description="The requested blog post could not be found." keywords="blog, error, not found" />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {error || 'Post not found'}
          </h1>
          <Link
            to="/blog/software-engineer/list.html"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Return to blog list
          </Link>
        </div>
      </>
    );
  }

  if (slug === 'jvm-warmup') {
    return (
      <>
        <SEOHead title="JVM Warmup | Developer Playground" description="Understanding JVM warmup process and optimization techniques." keywords="JVM, warmup, Java, performance, optimization" />
        <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
          <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
            <div dangerouslySetInnerHTML={{ __html: jvmWarmup.content }} />
          </div>
          <div className="max-xl:hidden">
            <div className="sticky top-14 max-h-[calc(100svh-3.5rem)] overflow-x-hidden px-6 pt-10 pb-24">
              <div className="flex flex-col gap-3">
                <ins className="kakao_ad_area" style={{ display: 'none' }}
                     data-ad-unit="DAN-2nMLIisQJKH9qMpe"
                     data-ad-width="160"
                     data-ad-height="600"></ins>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead {...getSEOData()} />
      <BlogPost post={post} />
    </>
  );
};

export default BlogPage; 