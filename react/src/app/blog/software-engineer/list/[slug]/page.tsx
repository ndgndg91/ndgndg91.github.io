import { Metadata } from 'next';
import { jvmWarmup } from '@/content/blog/software-engineer/jvm-warmup';

export const metadata: Metadata = {
  title: jvmWarmup.title,
  description: jvmWarmup.description,
};

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  if (params.slug === 'jvm-warmup') {
    return (
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
    );
  }

  return null;
} 