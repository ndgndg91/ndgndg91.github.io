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
      <div className="sticky top-20 space-y-4">
        {children}
      </div>
    </div>
  );
};

export default RightSidebarDesktop;
