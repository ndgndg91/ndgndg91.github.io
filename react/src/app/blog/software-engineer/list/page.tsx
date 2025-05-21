import { Metadata } from 'next';
import { jvmWarmup } from '@/content/blog/software-engineer/jvm-warmup';

export const metadata: Metadata = {
  title: 'Blog - Software Engineer',
  description: 'This area is intended for a software engineer audience.',
};

export default function BlogListPage() {
  return (
    <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
        <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
          Developer Playground
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
          Blog
        </h1>
        <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
          This area is intended for a software engineer audience.
        </p>
        {/* 검색 창 추가 */}
        <div className="mt-6">
          <label htmlFor="blog-search-input" className="sr-only">Search blog posts</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="text" id="blog-search-input" placeholder="Search posts by title or description..."
                   className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
                   aria-label="Search blog posts"/>
          </div>
        </div>

        {/* 정적 카드 리스트 컨테이너 */}
        <div id="card-container" className="mt-6 space-y-6">
          {/* JVM Warmup */}
          <a href="/blog/software-engineer/list/jvm-warmup" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-72 md:rounded-none md:rounded-s-lg" src="/images/jvm-warmup.webp" alt="JVM Warmup and Class Loading Process"/>
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{jvmWarmup.title}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{jvmWarmup.description}</p>
            </div>
          </a>
        </div>
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
  );
} 