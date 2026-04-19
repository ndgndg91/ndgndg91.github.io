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
  const [isMounted, setIsMounted] = React.useState(false);
  const isReactSnap = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent === 'ReactSnap';

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // 빌드(캡처) 시점이나 마운트 전에는 아무것도 하지 않음
    if (isReactSnap || !isMounted) return;
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

      // 카카오 광고 스크립트 실행 트리거
      const triggerAdfit = () => {
        if ((window as any).adfit) {
          try {
            (window as any).adfit.display();
          } catch (e) {
            console.error('Adfit display error:', e);
          }
        } else {
          // 스크립트가 아직 없는 경우에만 로드
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

      // 마운트 후 약간의 지연을 주어 DOM 안착 보장
      const timer = setTimeout(triggerAdfit, 200);
      return () => clearTimeout(timer);
    };

    initializeAd();
  }, [adUnit, width, height, isReactSnap, isMounted]);

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
