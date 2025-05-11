import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Base64Tool, UrlTool, JsonParserTool, XmlParserTool, UuidGenerator, RandomHexGenerator, StringDiffChecker, ByteCounter } from './components/tools';
import Layout from './components/layout/Layout';
import { Toaster } from 'react-hot-toast';

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
  // Show ads on main page and tool pages
  const shouldShowDesktopAd = 
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html' ||
    window.location.pathname.startsWith('/tools/encode-decode/') ||
    window.location.pathname.startsWith('/tools/string/');

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''} bg-white dark:bg-gray-900`}>
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
              
              {/* Base64 Tool Routes */}
              <Route path="/tools/encode-decode/base64.html" element={<Base64Tool />} />
              <Route 
                path="/tools/encode-decode/base64" 
                element={
                  <Navigate to="/tools/encode-decode/base64.html" replace />
                } 
              />
              
              {/* URL Encode/Decode Tool Routes */}
              <Route path="/tools/encode-decode/url.html" element={<UrlTool />} />
              <Route 
                path="/tools/encode-decode/url" 
                element={
                  <Navigate to="/tools/encode-decode/url.html" replace />
                } 
              />
              
              {/* JSON Parser Tool Routes */}
              <Route path="/tools/string/parser.html" element={<JsonParserTool />} />
              <Route 
                path="/tools/string/parser" 
                element={
                  <Navigate to="/tools/string/parser.html" replace />
                } 
              />
              
              {/* XML Parser Tool Routes */}
              <Route path="/tools/string/xml-parser.html" element={<XmlParserTool />} />
              <Route 
                path="/tools/string/xml-parser" 
                element={
                  <Navigate to="/tools/string/xml-parser.html" replace />
                } 
              />
              
              {/* UUID Generator Tool Routes */}
              <Route path="/tools/string/uuid-generator.html" element={<UuidGenerator />} />
              <Route 
                path="/tools/string/uuid-generator" 
                element={
                  <Navigate to="/tools/string/uuid-generator.html" replace />
                } 
              />
              
              {/* Random Hex Generator Tool Routes */}
              <Route path="/tools/string/random-hex.html" element={<RandomHexGenerator />} />
              <Route 
                path="/tools/string/random-hex" 
                element={
                  <Navigate to="/tools/string/random-hex.html" replace />
                } 
              />
              
              {/* String Diff Checker Tool Routes */}
              <Route path="/tools/string/string-diff-checker.html" element={<StringDiffChecker />} />
              <Route 
                path="/tools/string/string-diff-checker" 
                element={
                  <Navigate to="/tools/string/string-diff-checker.html" replace />
                } 
              />
              
              {/* Byte Counter Tool Routes */}
              <Route path="/tools/string/byte-counter.html" element={<ByteCounter />} />
              <Route 
                path="/tools/string/byte-counter" 
                element={
                  <Navigate to="/tools/string/byte-counter.html" replace />
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
      </Layout>
    </div>
  );
}

export default App;
