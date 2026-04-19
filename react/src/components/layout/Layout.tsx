import React from 'react';
import type { ReactNode } from 'react';
import { zIndex } from '../../theme';
import RightSidebarMobile from '../RightSidebarMobile';

interface LayoutProps {
  children: ReactNode;
  header: ReactNode;
  sidebar: ReactNode;
  mobileMenuOpen: boolean;
  rightMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onCloseRightMobileMenu: () => void;
  darkMode: boolean;
  isMounted: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  sidebar,
  mobileMenuOpen,
  rightMobileMenuOpen,
  onCloseMobileMenu,
  onCloseRightMobileMenu,
  darkMode,
  isMounted
}) => {
  const rootClassName = `min-h-screen bg-white dark:bg-gray-950 flex flex-col ${isMounted && darkMode ? 'dark' : ''}`.replace(/\s+/g, ' ').trim();

  return (
    <div className={rootClassName} suppressHydrationWarning={true}>
      {/* Header - Always on top */}
      <div className="sticky top-0 left-0 right-0 z-50" style={{ zIndex: zIndex.top }} suppressHydrationWarning={true}>
        {header}
      </div>
      
      {/* Content Wrapper */}
      <div className="flex flex-1 overflow-hidden max-w-[1920px] mx-auto w-full" suppressHydrationWarning={true}>
        {/* Mobile overlay */}
        {isMounted && (mobileMenuOpen || rightMobileMenuOpen) && (
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
            suppressHydrationWarning={true}
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
          suppressHydrationWarning={true}
        >
          {sidebar}
        </aside>



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
          suppressHydrationWarning={true}
        >
          <RightSidebarMobile 
            isOpen={rightMobileMenuOpen}
            onClose={onCloseRightMobileMenu}
          />
        </div>

        {/* Main Content */}
        <main 
          className="flex-1 transition-all duration-300 w-full max-w-5xl mx-auto xl:pr-0 xl:max-w-[1536px] lg:ml-64 lg:px-6"
          style={{
            marginTop: '3.5rem', /* Match header height */
          }}
          onClick={() => {
            if (mobileMenuOpen) onCloseMobileMenu();
            if (rightMobileMenuOpen) onCloseRightMobileMenu();
          }}
          suppressHydrationWarning={true}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;