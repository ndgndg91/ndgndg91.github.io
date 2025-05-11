import React from 'react';
import RightSidebarDesktop from './RightSidebarDesktop';
import RightSidebarMobile from './RightSidebarMobile';

// Extend the existing Window interface
declare global {
  interface Window {
    // For Firefox and other browsers that support sidebar
    sidebar?: {
      addPanel?: (title: string, content: string, x?: string) => void;
    };
  }
  
  // Extend the existing External interface for IE
  interface External {
    AddFavorite?: (url: string, title: string) => void;
  }
}

interface RightSidebarProps {
  children?: React.ReactNode;
  className?: string;
  isMobile?: boolean;
  rightMobileMenuOpen?: boolean;
  onCloseRightMobileMenu?: () => void;
}

/**
 * RightSidebar is a wrapper component that renders either the desktop or mobile version
 * of the right sidebar based on the `isMobile` prop.
 * 
 * @deprecated Consider using RightSidebarDesktop or RightSidebarMobile directly for better type safety
 */
const RightSidebar: React.FC<RightSidebarProps> = ({ 
  children, 
  className = '', 
  isMobile = false,
  rightMobileMenuOpen = false,
  onCloseRightMobileMenu = () => {}
}) => {
  if (isMobile) {
    return (
      <RightSidebarMobile 
        isOpen={rightMobileMenuOpen}
        onClose={onCloseRightMobileMenu}
      />
    );
  }
  
  return (
    <RightSidebarDesktop className={className}>
      {children}
    </RightSidebarDesktop>
  );
};

export { RightSidebarDesktop, RightSidebarMobile };
export default RightSidebar;