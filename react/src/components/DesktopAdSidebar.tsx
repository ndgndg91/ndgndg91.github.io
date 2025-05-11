import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
    kakao_adfit?: {
      createAd: (options: any) => void;
      destroyAd: (element: HTMLElement) => void;
    };
  }
}

interface DesktopAdSidebarProps {
  className?: string;
  children?: React.ReactNode;
}

const DesktopAdSidebar: React.FC<DesktopAdSidebarProps> = ({ 
  className = '',
  children 
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adInitialized, setAdInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const createAd = () => {
      if (!adRef.current) return;
      
      try {
        // 기존 광고 제거
        if (adRef.current && window.kakao_adfit?.destroyAd) {
          try {
            window.kakao_adfit.destroyAd(adRef.current);
          } catch (e) {
            console.warn('Error destroying previous ad:', e);
          }
        }
        
        // 새 광고 생성
        if (window.kakao_adfit?.createAd) {
          window.kakao_adfit.createAd({
            adUnitId: 'DAN-2nMLIisQJKH9qMpe',
            adType: 'wide',
            container: adRef.current,
            onError: (error: any) => {
              console.error('Kakao AdFit error:', error);
              // 에러 발생 시 재시도 (최대 3번)
              if (retryCount < 3) {
                const timer = setTimeout(() => {
                  setRetryCount(prev => prev + 1);
                  createAd();
                }, 1000 * (retryCount + 1));
                return () => clearTimeout(timer);
              }
            },
            onLoad: () => {
              console.log('Kakao Ad loaded successfully');
              setAdInitialized(true);
            }
          });
        } else {
          console.warn('kakao_adfit.createAd is not available');
        }
      } catch (error) {
        console.error('Error creating Kakao AdFit ad:', error);
      }
    };

    // 카카오 광고 스크립트 로드 이벤트 리스너
    const onKakaoReady = () => {
      console.log('Kakao AdFit is ready');
      createAd();
    };

    // 이벤트 리스너 등록
    window.addEventListener('kakao_adfit_ready', onKakaoReady);
    
    // 이미 로드된 경우 바로 광고 생성 시도
    if (window.kakao_adfit) {
      createAd();
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('kakao_adfit_ready', onKakaoReady);
      
      if (window.kakao_adfit?.destroyAd && adRef.current) {
        try {
          window.kakao_adfit.destroyAd(adRef.current);
        } catch (error) {
          console.error('Error cleaning up Kakao AdFit:', error);
        }
      }
    };
  }, [retryCount]);

  return (
    <div className={className}>
      {children || (
        <div className="flex flex-col gap-3">
          <div 
            ref={adRef}
            className="kakao_ad_area"
            data-ad-unit="DAN-2nMLIisQJKH9qMpe"
            data-ad-width="160"
            data-ad-height="600"
            style={{
              minHeight: '600px',
              backgroundColor: 'transparent',
              transition: 'opacity 0.3s ease-in-out',
              opacity: adInitialized ? 1 : 0
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DesktopAdSidebar;
