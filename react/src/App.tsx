import { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightMobileMenuOpen, setRightMobileMenuOpen] = useState(false);

  // Check for dark mode preference on initial load
  useEffect(() => {
    if (
      localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Update dark mode class on HTML element when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    if (rightMobileMenuOpen) setRightMobileMenuOpen(false);
  };

  const toggleRightMobileMenu = () => {
    setRightMobileMenuOpen(prev => !prev);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const closeRightMobileMenu = () => {
    setRightMobileMenuOpen(false);
  };

  // Right sidebar content
  const rightSidebarContent = (
    <div className="flex flex-col gap-3">
      <ins 
        className="kakao_ad_area"
        data-ad-unit="DAN-2nMLIisQJKH9qMpe"
        data-ad-width="160"
        data-ad-height="600"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Layout
        header={
          <Header 
            darkMode={darkMode} 
            onToggleDarkMode={() => setDarkMode(!darkMode)} 
            onToggleMobileMenu={toggleMobileMenu}
            onToggleRightMobileMenu={toggleRightMobileMenu}
          />
        }
        sidebar={
          <Sidebar 
            mobileMenuOpen={mobileMenuOpen} 
            onCloseMobileMenu={closeMobileMenu}
          />
        }
        rightSidebar={
          <RightSidebar 
            rightMobileMenuOpen={rightMobileMenuOpen}
            onCloseRightMobileMenu={closeRightMobileMenu}
          >
            {rightSidebarContent}
          </RightSidebar>
        }
        mobileMenuOpen={mobileMenuOpen}
        rightMobileMenuOpen={rightMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onCloseRightMobileMenu={closeRightMobileMenu}
      >
        <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
          <main className="flex-1">
            <MainContent />
          </main>
          <Footer />
        </div>
      </Layout>
    </div>
  );
}

export default App;
