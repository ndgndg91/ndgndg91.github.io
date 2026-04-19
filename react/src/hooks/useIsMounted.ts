import { useSyncExternalStore } from 'react';

/**
 * React 18 하이드레이션 불일치(#418)를 원천 차단하고 
 * ReactSnap 크롤러를 정확하게 필터링하는 하이브리드 보호 훅
 */
const emptySubscribe = () => () => {};

export const useIsMounted = () => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,  // 브라우저 런타임
    () => false  // 서버/빌드 렌더링
  );

  // 브라우저 환경이지만 ReactSnap 크롤러인 경우 false를 유지하여 
  // 빌드 결과물(HTML)에 동적 요소가 포함되지 않도록 원천 차단
  if (typeof window !== 'undefined' && 
      /ReactSnap/i.test(navigator.userAgent)) {
    return false;
  }

  return isClient;
};
