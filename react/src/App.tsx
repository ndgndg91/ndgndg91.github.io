import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Base64Tool } from './components/tools/encode-decode';
import Layout from './components/layout/Layout';


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

  // Determine if we should show desktop ad based on current route
  // 메인 페이지와 base64 도구 페이지에서 광고 표시
  const shouldShowDesktopAd = 
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname === '/tools/encode-decode/base64' ||
    window.location.pathname === '/tools/encode-decode/base64.html';

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
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
            className={!mobileMenuOpen ? 'hidden lg:flex' : 'flex'}
          />
        }
        mobileMenuOpen={mobileMenuOpen}
        rightMobileMenuOpen={rightMobileMenuOpen}
        onCloseMobileMenu={closeMobileMenu}
        onCloseRightMobileMenu={closeRightMobileMenu}
        showDesktopAd={shouldShowDesktopAd}
      >
        <div className="flex flex-col min-h-[calc(100vh-6.5rem)]">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/tools/encode-decode/base64.html" element={<Base64Tool />} />
              {/* Redirect old URL to new URL with .html for SEO */}
              <Route 
                path="/tools/encode-decode/base64" 
                element={
                  <Navigate to="/tools/encode-decode/base64.html" replace />
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Layout>
    </div>

  );
}

export default App;
