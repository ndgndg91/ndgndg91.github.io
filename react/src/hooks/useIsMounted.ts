import { useState, useEffect } from 'react';

/**
 * React 18/19 하이드레이션 불일치(#418)를 원천 차단하는 표준 보호 훅
 * 첫 번째 렌더링은 항상 서버와 동일하게(false) 가져가고, 마운트 직후 true로 전환합니다.
 */
export const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 브라우저 환경이지만 크롤러(ReactSnap 등) 환경인 경우 false를 유지하여 
    // 빌드 결과물(HTML)에 동적 요소가 포함되지 않도록 차단
    if (typeof window !== 'undefined') {
      const ua = window.navigator.userAgent;
      const isHeadless = /ReactSnap|Headless|Puppeteer/i.test(ua) || 
                         window.navigator.webdriver || 
                         (window as any).__IS_REACT_SNAP__;
      
      if (isHeadless) return;
    }
    
    setMounted(true);
  }, []);

  return mounted;
};
