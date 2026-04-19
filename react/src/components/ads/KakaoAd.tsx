import React, { useEffect, useRef } from 'react';
import { useIsMounted } from '../../hooks/useIsMounted';

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
    // 1. 마운트 전(빌드 시점 포함)에는 절대 아무것도 하지 않음 (전시 결과 100% 일치 보장)
    if (!isMounted) return;

    // 2. 이미 초기화된 경우와 컨테이너 부재 시 중단
    if (adInitializedRef.current || !containerRef.current) return;

    const initializeAd = () => {
      if (!containerRef.current) return;

      console.log('Imperatively injecting Kakao Ad:', adUnit);

      // ins 태그 생성 및 주입
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none';
      ins.setAttribute('data-ad-unit', adUnit);
      ins.setAttribute('data-ad-width', width.toString());
      ins.setAttribute('data-ad-height', height.toString());

      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(ins);
      adInitializedRef.current = true;

      // 카카오 광고 실행 트리거 (Adfit 객체 가용성 체크 및 재시도)
      let retryCount = 0;
      const MAX_RETRIES = 15; // 4.5초까지 대기 시간 상향

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
          
          // 만약 스크립트 자체가 누락된 경우를 대비한 최후의 수단
          const script = document.querySelector('script[src*="kas/static/ba.min.js"]');
          if (!script) {
             const newScript = document.createElement('script');
             newScript.src = "https://t1.daumcdn.net/kas/static/ba.min.js";
             newScript.async = true;
             document.head.appendChild(newScript);
          }
          
          setTimeout(triggerAdfit, 300);
        } else {
          console.warn('Kakao AdFit script failed to initialize after 4.5s retries.');
        }
      };

      // DOM에 ins가 붙은 후 다음 프레임에서 실행 보장
      requestAnimationFrame(() => {
        setTimeout(triggerAdfit, 100);
      });
    };

    initializeAd();

    return () => {
      adInitializedRef.current = false;
    };
  }, [adUnit, width, height, isMounted]);

  return (
    <div 
      className={`kakao-ad-wrapper ${className}`}
      style={{
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        display: 'block',
        ...style,
        backgroundColor: 'transparent'
      }}
    >
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%' }}
        suppressHydrationWarning={true}
      />
    </div>
  );
};

export default KakaoAd;
