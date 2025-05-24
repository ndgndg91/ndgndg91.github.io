import React from 'react';
import KakaoAd from './ads/KakaoAd';

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
  return (
    <div className={`h-full p-4 ${className}`}>
      <div className="sticky top-20 space-y-4">
        {children}
        
        {/* Kakao Ad */}
        {showAd && (
          <div className="flex justify-center">
            <KakaoAd
              adUnit="DAN-2nMLIisQJKH9qMpe"
              width={160}
              height={600}
              className="border border-gray-200 rounded-lg"
              style={{ 
                minHeight: '600px',
                backgroundColor: '#f8f9fa'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebarDesktop;
