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

  const getAdConfig = () => {
    switch (size) {
      case 'banner':
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

  return (
    <div 
      className={`ad-section ad-${position} ${className}`}
      suppressHydrationWarning={true}
    >
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
              backgroundColor: 'transparent'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdSection;
