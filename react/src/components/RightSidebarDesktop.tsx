import React, { useEffect, useRef, useState } from 'react';

// Extend the Window interface for Kakao AdFit
declare global {
  interface Window {
    kakao_adfit?: {
      createAd: (options: any) => void;
      destroyAd: (element: HTMLElement) => void;
    };
  }
}

interface RightSidebarDesktopProps {
  children?: React.ReactNode;
  className?: string;
  showAd?: boolean;
}

const RightSidebarDesktop: React.FC<RightSidebarDesktopProps> = ({ 
  children, 
  className = '',
  showAd = true
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adInitialized, setAdInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!showAd) return;

    const createAd = () => {
      if (!adRef.current) return;
      
      try {
        // Remove existing ad if it exists
        if (adRef.current && window.kakao_adfit?.destroyAd) {
          try {
            window.kakao_adfit.destroyAd(adRef.current);
          } catch (e) {
            console.warn('Error destroying previous ad:', e);
          }
        }
        
        // Create new ad
        if (window.kakao_adfit?.createAd) {
          window.kakao_adfit.createAd({
            adUnitId: 'DAN-2nMLIisQJKH9qMpe',
            adType: 'wide',
            container: adRef.current,
            onError: (error: any) => {
              console.error('Kakao AdFit error:', error);
              // Retry on error (max 3 times)
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

    // Listen for Kakao AdFit ready event
    const onKakaoReady = () => {
      console.log('Kakao AdFit is ready');
      createAd();
    };

    // Add event listener
    window.addEventListener('kakao_adfit_ready', onKakaoReady);
    
    // If already loaded, create ad immediately
    if (window.kakao_adfit) {
      createAd();
    }

    // Cleanup on unmount
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
  }, [retryCount, showAd]);

  return (
    <div className={`h-full p-4 ${className}`}>
      <div className="sticky top-20">
        {children || (showAd ? (
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
        ) : null)}
      </div>
    </div>
  );
};

export default RightSidebarDesktop;
