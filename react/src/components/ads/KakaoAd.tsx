import React, { useEffect, useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const adInitializedRef = useRef(false);
  const isReactSnap = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent === 'ReactSnap';

  useEffect(() => {
    // 빌드(캡처) 시점에는 아무것도 하지 않음
    if (isReactSnap) return;
    if (adInitializedRef.current) return;

    const initializeAd = () => {
      if (!containerRef.current) return;

      console.log('Imperatively injecting Kakao Ad:', adUnit);

      // 명령형으로 ins 태그를 직접 생성하여 주입
      // 이 시점은 Hydration이 완벽히 끝난 후이므로 React 에러가 발생하지 않음
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', adUnit);
      ins.setAttribute('data-ad-width', width.toString());
      ins.setAttribute('data-ad-height', height.toString());

      containerRef.current.innerHTML = ''; // 기존 내용 청소
      containerRef.current.appendChild(ins);
      adInitializedRef.current = true;

      // 카카오 광고 스크립트 재로드 및 실행 트리거
      const reloadKakaoScript = () => {
        const existingScripts = document.querySelectorAll('script[src*="kas/static/ba.min.js"]');
        existingScripts.forEach(script => script.parentNode?.removeChild(script));

        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
        newScript.async = true;
        document.head.appendChild(newScript);
      };

      setTimeout(reloadKakaoScript, 100);
    };

    initializeAd();
  }, [adUnit, width, height, isReactSnap]);

  return (
    <div 
      className={`kakao-ad-wrapper ${className}`}
      suppressHydrationWarning={true}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        display: 'block',
        ...style
      }}
    >
      {/* 
        React에 의해 관리되지 않는 영역임을 명시 (dangerouslySetInnerHTML)
        서버와 클라이언트 모두 초기 렌더링 시에는 빈 div를 반환하므로 Mismatch가 발생하지 않음
      */}
      <div 
        ref={containerRef} 
        dangerouslySetInnerHTML={{ __html: '' }} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default KakaoAd;
