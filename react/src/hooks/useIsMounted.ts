import { useState, useEffect } from 'react';

/**
 * React 18 하이드레이션 에러(#418) 방지를 위한 안전한 마운트 감지 훅
 * 빌드(react-snap) 시점에는 항상 false를 반환하여 정적 HTML에는 초기 UI(Loading/Skeleton)만 저장되도록 보장합니다.
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // react-snap 크롤러인지 확인
    const isReactSnap = typeof window !== 'undefined' && 
                        window.navigator && 
                        window.navigator.userAgent === 'ReactSnap';

    // 크롤러가 아닐 때만 마운트 완료 처리
    // 이를 통해 빌드 결과물(정적 HTML)은 항상 '첫 번째 렌더링' 상태를 유지함
    if (!isReactSnap) {
      setIsMounted(true);
    }
  }, []);

  return isMounted;
};
