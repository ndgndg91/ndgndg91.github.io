import React from 'react';

interface RightSidebarDesktopProps {
  children?: React.ReactNode;
  className?: string;
  showAd?: boolean;
}

const RightSidebarDesktop: React.FC<RightSidebarDesktopProps> = ({ 
  children, 
  className = ''
}) => {
  return (
    <div className={`h-full p-4 ${className}`}>
      <div className="sticky top-20">
        {children}
      </div>
    </div>
  );
};

export default RightSidebarDesktop;
