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
  const isMounted = useIsMounted();

  useEffect(() => {
    // 마운트 전에는 아무것도 하지 않음 (빌드 시점 포함)
    if (!isMounted) return;
    if (adInitializedRef.current) return;

    const initializeAd = () => {
      if (!containerRef.current) return;

      console.log('Imperatively injecting Kakao Ad:', adUnit);

      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', adUnit);
      ins.setAttribute('data-ad-width', width.toString());
      ins.setAttribute('data-ad-height', height.toString());

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(ins);
      adInitializedRef.current = true;

      // 카카오 광고 실행 트리거 (안전하게 재시도)
      let retryCount = 0;
      const MAX_RETRIES = 5;

      const triggerAdfit = () => {
        const adfit = (window as any).adfit;
        if (adfit && typeof adfit.display === 'function') {
          try {
            adfit.display();
          } catch (e) {
            console.error('Adfit display error:', e);
          }
        } else if (retryCount < MAX_RETRIES) {
          retryCount++;
          console.log(`Adfit not ready, retrying... (${retryCount}/${MAX_RETRIES})`);
          setTimeout(triggerAdfit, 500);
        } else {
          // 마지막 수단: 스크립트 강제 로드
          const existingScript = document.querySelector('script[src*="kas/static/ba.min.js"]');
          if (!existingScript) {
            const newScript = document.createElement('script');
            newScript.type = 'text/javascript';
            newScript.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
            newScript.async = true;
            document.head.appendChild(newScript);
          }
        }
      };

      setTimeout(triggerAdfit, 200);
    };

    initializeAd();
  }, [adUnit, width, height, isMounted]);

  return (
    <div 
      className={`kakao-ad-wrapper ${className}`}
      suppressHydrationWarning={true}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        display: 'block',
        ...style,
        backgroundColor: 'transparent' // 초기 배경색 제거 (로딩 전까지 투명)
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
