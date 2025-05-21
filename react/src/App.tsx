import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Base64Tool, UrlTool, JsonParserTool, XmlParserTool, UuidGenerator, RandomHexGenerator, StringDiffChecker, ByteCounter, HtmlEscapeUnescape, Timestamp } from './components/tools';
import ImageConverter from './components/tools/image/ImageConverter';
import JWTPage from './components/tools/token/JWTPage';
import SHA1Page from './components/tools/hash/SHA1Page';
import SHA2Page from './components/tools/hash/SHA2Page';
import SHA3Page from './components/tools/hash/SHA3Page';
import AESPage from './components/tools/encrypt-decrypt/AESPage';
import RSAPage from './components/tools/encrypt-decrypt/RSAPage';
import Layout from './components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import BlogPage from './pages/BlogPage';
import BlogListPage from './pages/BlogListPage';

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
    window.location.pathname.startsWith('/tools/string/') ||
    window.location.pathname.startsWith('/tools/time/') ||
    window.location.pathname.startsWith('/tools/image/') ||
    window.location.pathname.startsWith('/tools/token/') ||
    window.location.pathname.startsWith('/tools/hash/') ||
    window.location.pathname.startsWith('/tools/encrypt-decrypt/') ||
    window.location.pathname.startsWith('/blog/');

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
              
              {/* Blog Routes */}
              <Route path="/blog/software-engineer/list.html" element={<BlogListPage />} />
              <Route 
                path="/blog/software-engineer/list" 
                element={
                  <Navigate to="/blog/software-engineer/list.html" replace />
                } 
              />
              <Route path="/blog/software-engineer/list/:slug.html" element={<BlogPage />} />
              <Route 
                path="/blog/software-engineer/list/:slug" 
                element={
                  <Navigate to="/blog/software-engineer/list/:slug.html" replace />
                } 
              />
              
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
              
              {/* HTML Escape/Unescape Tool Routes */}
              <Route path="/tools/string/html-escape-unescape.html" element={<HtmlEscapeUnescape />} />
              <Route 
                path="/tools/string/html-escape-unescape" 
                element={
                  <Navigate to="/tools/string/html-escape-unescape.html" replace />
                } 
              />
              
              {/* Timestamp Tool Routes */}
              <Route path="/tools/time/timestamp.html" element={<Timestamp />} />
              <Route 
                path="/tools/time/timestamp" 
                element={
                  <Navigate to="/tools/time/timestamp.html" replace />
                } 
              />
              
              {/* Image Format Converter Tool Routes */}
              <Route path="/tools/image/format-converter.html" element={<ImageConverter />} />
              <Route 
                path="/tools/image/format-converter" 
                element={
                  <Navigate to="/tools/image/format-converter.html" replace />
                } 
              />

              {/* JWT Tool Routes */}
              <Route path="/tools/token/jwt.html" element={<JWTPage />} />
              <Route 
                path="/tools/token/jwt" 
                element={
                  <Navigate to="/tools/token/jwt.html" replace />
                } 
              />

              {/* SHA-1 Tool Routes */}
              <Route path="/tools/hash/sha1.html" element={<SHA1Page />} />
              <Route 
                path="/tools/hash/sha1" 
                element={
                  <Navigate to="/tools/hash/sha1.html" replace />
                } 
              />

              {/* SHA-2 Tool Routes */}
              <Route path="/tools/hash/sha2.html" element={<SHA2Page />} />
              <Route 
                path="/tools/hash/sha2" 
                element={
                  <Navigate to="/tools/hash/sha2.html" replace />
                } 
              />

              {/* SHA-3 Tool Routes */}
              <Route path="/tools/hash/sha3.html" element={<SHA3Page />} />
              <Route 
                path="/tools/hash/sha3" 
                element={
                  <Navigate to="/tools/hash/sha3.html" replace />
                } 
              />

              {/* AES Tool Routes */}
              <Route path="/tools/encrypt-decrypt/aes.html" element={<AESPage />} />
              <Route 
                path="/tools/encrypt-decrypt/aes" 
                element={
                  <Navigate to="/tools/encrypt-decrypt/aes.html" replace />
                } 
              />

              {/* RSA Tool Routes */}
              <Route path="/tools/encrypt-decrypt/rsa.html" element={<RSAPage />} />
              <Route 
                path="/tools/encrypt-decrypt/rsa" 
                element={
                  <Navigate to="/tools/encrypt-decrypt/rsa.html" replace />
                } 
              />

              {/* Blog Routes */}
              <Route path="/blog/software-engineer/list/about-g1gc.html" element={<BlogPage />} />
              <Route path="/blog/software-engineer/list/about-zgc.html" element={<BlogPage />} />
              <Route path="/blog/software-engineer/list/about-kafka.html" element={<BlogPage />} />
              <Route path="/blog/software-engineer/list/about-mongodb-sharding.html" element={<BlogPage />} />
              <Route path="/blog/software-engineer/list/replay-attack.html" element={<BlogPage />} />
              <Route path="/blog/other/list.html" element={<BlogListPage />} />
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
