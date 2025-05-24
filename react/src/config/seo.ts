// 브라우저 캐싱을 위한 정적 자산 설정
export const CACHE_CONFIG = {
  // CSS, JS 파일은 1년간 캠싱
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable'
  },
  // HTML 파일은 1시간 캐싱
  htmlFiles: {
    'Cache-Control': 'public, max-age=3600'
  },
  // 이미지는 1개월 캐싱
  images: {
    'Cache-Control': 'public, max-age=2592000'
  }
};

// SEO를 위한 페이지 우선순위
export const PAGE_PRIORITIES = {
  home: 1.0,
  tools: 0.8,
  blog: 0.9,
  blogPosts: 0.7
};

// 검색엔진 크롤링 빈도
export const CRAWL_FREQUENCY = {
  home: 'weekly',
  tools: 'monthly',
  blog: 'weekly',
  blogPosts: 'monthly'
};
