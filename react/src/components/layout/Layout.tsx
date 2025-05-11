import React from 'react';
import type { ReactNode } from 'react';
import { zIndex } from '../../theme';
import { RightSidebarDesktop, RightSidebarMobile } from '../RightSidebar';

interface LayoutProps {
  children: ReactNode;
  header: ReactNode;
  sidebar: ReactNode;
  rightSidebar?: ReactNode;
  mobileMenuOpen: boolean;
  rightMobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  onCloseRightMobileMenu: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  sidebar,
  rightSidebar,
  mobileMenuOpen,
  rightMobileMenuOpen,
  onCloseMobileMenu,
  onCloseRightMobileMenu,
}) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 overflow-x-hidden">
      {/* Header - Always on top */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ zIndex: zIndex.top }}>
        {header}
      </div>
      
      {/* Content Wrapper */}
      <div className="flex w-screen" style={{ height: 'calc(100vh - 3.5rem)' }}>
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

        {/* Right Sidebar - Desktop */}
        {rightSidebar && (
          <div className="hidden xl:block fixed right-0 top-14 w-64" style={{ height: 'calc(100vh - 3.5rem)' }}>
            <RightSidebarDesktop>
              {rightSidebar}
            </RightSidebarDesktop>
          </div>
        )}

        {/* Right Sidebar - Mobile */}
        <div 
          className={`fixed right-0 w-48 bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
            rightMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden`}
          style={{ 
            top: '7rem', /* Below both header levels on mobile */
            bottom: 0,
            zIndex: zIndex.modal,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            height: 'calc(100vh - 7rem)' /* Full height minus both header levels */
          }}
        >
          <RightSidebarMobile 
            isOpen={rightMobileMenuOpen}
            onClose={onCloseRightMobileMenu}
          />
        </div>

        {/* Main Content */}
        <main 
          className={`flex-1 overflow-y-auto transition-all duration-300 w-full ${
            rightSidebar ? 'xl:pr-64' : ''
          } lg:ml-64`}
          style={{
            padding: '1.5rem',
            marginTop: '3.5rem', /* Match header height */
            height: 'calc(100vh - 3.5rem)', /* Full height minus header */
            // Mobile styles will be handled by CSS media queries
          }}
          data-mobile-styles={JSON.stringify({
            marginTop: '6.5rem',
            height: 'calc(100vh - 6.5rem)'
          })}
        >
          <div className="h-full w-full">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 w-full h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;