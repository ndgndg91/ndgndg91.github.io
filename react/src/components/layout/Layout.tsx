import React from 'react';
import type { ReactNode } from 'react';
import { zIndex } from '../../theme';
import RightSidebarMobile from '../RightSidebarMobile';
import RightSidebarDesktop from '../RightSidebarDesktop';

interface LayoutProps {
  children: ReactNode;
  header: ReactNode;
  sidebar: ReactNode;
  mobileMenuOpen: boolean;
  rightMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onCloseRightMobileMenu: () => void;
  showDesktopAd?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  sidebar,
  mobileMenuOpen,
  rightMobileMenuOpen,
  onCloseMobileMenu,
  onCloseRightMobileMenu,
  showDesktopAd = false,
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      {/* Header - Always on top */}
      <div className="sticky top-0 left-0 right-0 z-50" style={{ zIndex: zIndex.top }}>
        {header}
      </div>
      
      {/* Content Wrapper */}
      <div className="flex flex-1 overflow-hidden max-w-[1920px] mx-auto w-full">
        {/* Mobile overlay */}
        {(mobileMenuOpen || rightMobileMenuOpen) && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            style={{ 
              zIndex: zIndex.overlay,
              top: '7rem', /* Start below both header levels on mobile */
              height: 'calc(100vh - 7rem)'
            }}
            onClick={() => {
              if (mobileMenuOpen) onCloseMobileMenu();
              if (rightMobileMenuOpen) onCloseRightMobileMenu();
            }}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar */}
        <aside 
          className={`fixed left-0 w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 overflow-y-auto transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:z-40`}
          style={{
            top: '3.5rem', /* Below the header */
            bottom: 0,
            zIndex: zIndex.modal,
            height: 'calc(100vh - 3.5rem)' /* Full height minus header */
          }}
        >
          {sidebar}
        </aside>

        {/* Desktop Right Sidebar with Ad */}
        {showDesktopAd && (
          <div className="hidden xl:block fixed right-0 top-14 w-64 h-[calc(100vh-3.5rem)] overflow-y-auto border-l border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm">
            <RightSidebarDesktop />
          </div>
        )}

        {/* Mobile Menu Sidebar */}
        <div 
          className={`fixed right-0 w-48 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
            rightMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
          style={{ 
            top: '7rem',
            bottom: 0,
            zIndex: zIndex.modal,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            height: 'calc(100vh - 7rem)'
          }}
        >
          <RightSidebarMobile 
            isOpen={rightMobileMenuOpen}
            onClose={onCloseRightMobileMenu}
          />
        </div>

        {/* Main Content */}
        <main 
          className={`flex-1 transition-all duration-300 w-full max-w-5xl mx-auto ${
            showDesktopAd ? 'xl:pr-80 xl:max-w-[calc(1536px+16rem)]' : 'xl:pr-0 xl:max-w-[1536px]'
          } lg:ml-64 lg:px-6`}
          style={{
            marginTop: '3.5rem', /* Match header height */
          }}
          onClick={() => {
            if (mobileMenuOpen) onCloseMobileMenu();
            if (rightMobileMenuOpen) onCloseRightMobileMenu();
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;