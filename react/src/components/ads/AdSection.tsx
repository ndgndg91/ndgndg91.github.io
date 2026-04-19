import React from 'react';
import KakaoAd from './KakaoAd';

interface AdSectionProps {
  position?: 'top' | 'middle' | 'bottom';
  size?: 'banner' | 'rectangle' | 'skyscraper';
  className?: string;
  showAd?: boolean;
}

const AdSection: React.FC<AdSectionProps> = ({ 
  position = 'bottom',
  size = 'banner',
  className = '',
  showAd = true
}) => {
  if (!showAd) return null;

  // 광고 크기와 유닛에 따른 설정
  const getAdConfig = () => {
    switch (size) {
      case 'banner':
        return {
          adUnit: 'DAN-nZOLt6AO6PDMGqAR',
          width: 300,
          height: 250,
          style: { minHeight: '250px' }
        };
      case 'rectangle':
        return {
          adUnit: 'DAN-nZOLt6AO6PDMGqAR', 
          width: 300,
          height: 250,
          style: { minHeight: '250px' }
        };
      case 'skyscraper':
        return {
          adUnit: 'DAN-2nMLIisQJKH9qMpe',
          width: 160,
          height: 600,
          style: { minHeight: '600px' }
        };
      default:
        return {
          adUnit: 'DAN-nZOLt6AO6PDMGqAR',
          width: 300,
          height: 250,
          style: { minHeight: '250px' }
        };
    }
  };

  const adConfig = getAdConfig();
  const [isMounted, setIsMounted] = React.useState(false);
  const isReactSnap = typeof window !== 'undefined' && window.navigator.userAgent === 'ReactSnap';

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 프리렌더링(빌드) 시점이나, 아직 클라이언트에서 첫 화면을 그리기 전(Hydration 이전)에는
  // 카카오 스크립트가 DOM을 조작하지 못하도록 빈 뼈대(Placeholder)만 똑같은 크기로 반환합니다.
  if (isReactSnap || !isMounted) {
    return (
      <div className={`ad-section ad-${position} ${className}`}>
        <div className="flex justify-center py-4">
          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">Advertisement</p>
            <div 
              className="border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800 animate-pulse"
              style={{
                width: adConfig.width,
                height: adConfig.height,
                minHeight: adConfig.style.minHeight
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Hydration이 완벽하게 끝난 이후(isMounted === true)에만 실제 광고 컴포넌트를 마운트합니다.
  return (
    <div className={`ad-section ad-${position} ${className}`}>
      <div className="flex justify-center py-4">
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2 dark:text-gray-400">Advertisement</p>
          <KakaoAd
            adUnit={adConfig.adUnit}
            width={adConfig.width}
            height={adConfig.height}
            className="border border-gray-200 rounded-lg dark:border-gray-700"
            style={{
              ...adConfig.style,
              backgroundColor: '#f8f9fa'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdSection;
