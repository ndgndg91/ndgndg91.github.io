import React from 'react';

interface RightSidebarDesktopProps {
  children?: React.ReactNode;
  className?: string;
}

const RightSidebarDesktop: React.FC<RightSidebarDesktopProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`h-full p-4 ${className}`}>
      <div className="sticky top-20">
        {children || (
          <div className="flex flex-col gap-3">
            <ins 
              className="kakao_ad_area"
              data-ad-unit="DAN-2nMLIisQJKH9qMpe"
              data-ad-width="160"
              data-ad-height="600"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebarDesktop;
