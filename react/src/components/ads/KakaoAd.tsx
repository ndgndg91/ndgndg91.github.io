import React, { useLayoutEffect, useRef } from 'react';

interface KakaoAdProps {
  adUnit: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}

const KakaoAd: React.FC<KakaoAdProps> = ({ 
  adUnit, 
  width, 
  height, 
  className = '',
  style = {}
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const adInitializedRef = useRef(false);
  
  const [isMounted, setIsMounted] = React.useState(false);
  const isReactSnap = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent === 'ReactSnap';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // useLayoutEffect를 사용하여 DOM이 완전히 구성된 후 즉시 실행
  useLayoutEffect(() => {
    if (!isMounted) return; // Hydration이 끝난 후 실행
    if (adInitializedRef.current) return;
    if (isReactSnap) return; // 프리렌더링(빌드) 시 무시

    const initializeAd = () => {
      const insElement = adRef.current;
      if (insElement && !adInitializedRef.current) {
        console.log('Initializing Kakao Ad (static approach):', {
          adUnit,
          width,
          height,
          element: insElement
        });

        // display를 빈 문자열로 설정하여 광고가 보이도록 함
        insElement.style.display = '';
        adInitializedRef.current = true;

        // 카카오 광고 스크립트 강제 재실행
        const reloadKakaoScript = () => {
          // 기존 스크립트 제거
          const existingScripts = document.querySelectorAll('script[src*="kas/static/ba.min.js"]');
          existingScripts.forEach(script => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          });

          // 새로운 스크립트 추가
          const newScript = document.createElement('script');
          newScript.type = 'text/javascript';
          newScript.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
          newScript.async = true;
          
          newScript.onload = () => {
            console.log('Kakao script reloaded successfully');
          };
          
          newScript.onerror = (error) => {
            console.error('Failed to reload Kakao script:', error);
          };

          document.head.appendChild(newScript);
        };

        // 약간의 딜레이 후 스크립트 재로드
        setTimeout(reloadKakaoScript, 100);
      }
    };

    // DOM이 준비되면 즉시 실행
    initializeAd();

  }, [adUnit, width, height, isMounted, isReactSnap]);

  // 빌드 환경(react-snap)이거나 Hydration 이전일 경우 DOM 변조를 막기 위해
  // <ins> 태그 대신 빈 <div>를 렌더링합니다.
  if (isReactSnap || !isMounted) {
    return (
      <div 
        className={`kakao-ad-container ${className}`}
        style={{
          minWidth: `${width}px`,
          minHeight: `${height}px`,
          display: 'block',
          ...style
        }}
      >
        <div 
          className="w-full h-full bg-transparent"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`kakao-ad-container ${className}`}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        display: 'block',
        ...style
      }}
    >
      {/* 정적으로 ins 요소 렌더링 */}
      <ins
        ref={adRef}
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={adUnit}
        data-ad-width={width.toString()}
        data-ad-height={height.toString()}
      />
    </div>
  );
};

export default KakaoAd;
