import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { Base64Tool, UrlTool, JsonParserTool, XmlParserTool, UuidGenerator, RandomHexGenerator, StringDiffChecker, ByteCounter, HtmlEscapeUnescape, Timestamp, QRCodeGenerator, RegexCheatsheet } from './components/tools';
import ImageConverter from './components/tools/image/ImageConverter';
import JWTPage from './components/tools/token/JWTPage';
import SHA1Page from './components/tools/hash/SHA1Page';
import SHA2Page from './components/tools/hash/SHA2Page';
import SHA3Page from './components/tools/hash/SHA3Page';
import AESPage from './components/tools/encrypt-decrypt/AESPage';
import RSAPage from './components/tools/encrypt-decrypt/RSAPage';
import Roulette from './components/tools/fun/Roulette';
import IpAddressPage from './components/tools/network/IpAddressPage';
import ColorPaletteGenerator from './components/tools/fun/ColorPaletteGenerator';
import Layout from './components/layout/Layout';
import { Toaster } from 'react-hot-toast';
import BlogPage from './pages/BlogPage';
import BlogListPage from './pages/BlogListPage';
import AdTestPage from './components/debug/AdTestPage';


// 정적 파일 확장자 목록
const STATIC_FILE_EXTENSIONS = ['.xml', '.txt', '.ico', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.css', '.js', '.json', '.webmanifest'];

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightMobileMenuOpen, setRightMobileMenuOpen] = useState(false);

  // 정적 파일 체크
  const isStaticFile = STATIC_FILE_EXTENSIONS.some(ext => location.pathname.endsWith(ext));
  if (isStaticFile) {
    return null; // 정적 파일은 라우터를 통과하지 않음
  }

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
      window.location.pathname.startsWith('/tools/fun/') ||
      window.location.pathname.startsWith('/tools/network/') ||
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

                {/* IP Address Tool Routes */}
                <Route path="/tools/network/ip-address.html" element={<Navigate to="/tools/network/ip-address" replace />}/>
                <Route path="/tools/network/ip-address" element={<IpAddressPage />} />

                {/* Debug Route */}
                <Route path="/debug/ads" element={<AdTestPage />} />

                {/* Blog Routes */}
                <Route path="/blog/software-engineer/list.html" element={<Navigate to="/blog/software-engineer/list" replace />} />
                <Route path="/blog/software-engineer/list"  element={<BlogListPage />}/>
                <Route path="/blog/software-engineer/list/:slug.html" element={<Navigate to="/blog/software-engineer/list/:slug" replace />} />
                <Route path="/blog/software-engineer/list/:slug" element={<BlogPage />}/>

                {/* Base64 Tool Routes */}
                <Route path="/tools/encode-decode/base64.html" element={<Navigate to="/tools/encode-decode/base64" replace />} />
                <Route path="/tools/encode-decode/base64" element={<Base64Tool />} />

                {/* URL Encode/Decode Tool Routes */}
                <Route path="/tools/encode-decode/url.html" element={<Navigate to="/tools/encode-decode/url" replace />} />
                <Route path="/tools/encode-decode/url" element={<UrlTool />} />

                {/* JSON Parser Tool Routes */}
                <Route path="/tools/string/parser.html" element={<Navigate to="/tools/string/parser" replace />} />
                <Route path="/tools/string/parser" element={<JsonParserTool />} />

                {/* XML Parser Tool Routes */}
                <Route path="/tools/string/xml-parser.html" element={<Navigate to="/tools/string/xml-parser" replace />} />
                <Route path="/tools/string/xml-parser" element={<XmlParserTool />} />

                {/* UUID Generator Tool Routes */}
                <Route path="/tools/string/uuid-generator.html" element={<Navigate to="/tools/string/uuid-generator" replace />} />
                <Route path="/tools/string/uuid-generator" element={<UuidGenerator />} />

                {/* Random Hex Generator Tool Routes */}
                <Route path="/tools/string/random-hex.html" element={<Navigate to="/tools/string/random-hex" replace />} />
                <Route path="/tools/string/random-hex" element={<RandomHexGenerator />} />

                {/* String Diff Checker Tool Routes */}
                <Route path="/tools/string/string-diff-checker.html" element={<Navigate to="/tools/string/string-diff-checker" replace />} />
                <Route path="/tools/string/string-diff-checker" element={<StringDiffChecker />} />

                {/* Byte Counter Tool Routes */}
                <Route path="/tools/string/byte-counter.html" element={<Navigate to="/tools/string/byte-counter" replace />} />
                <Route path="/tools/string/byte-counter" element={<ByteCounter />} />

                {/* HTML Escape/Unescape Tool Routes */}
                <Route path="/tools/string/html-escape-unescape.html" element={<Navigate to="/tools/string/html-escape-unescape" replace />} />
                <Route path="/tools/string/html-escape-unescape" element={<HtmlEscapeUnescape />} />

                {/* Regex Cheatsheet Tool Routes */}
                <Route path="/tools/string/regex-cheatsheet.html" element={<Navigate to="/tools/string/regex-cheatsheet" replace />} />
                <Route path="/tools/string/regex-cheatsheet" element={<RegexCheatsheet />} />

                {/* Timestamp Tool Routes */}
                <Route path="/tools/time/timestamp.html" element={<Navigate to="/tools/time/timestamp" replace />} />
                <Route path="/tools/time/timestamp" element={<Timestamp />} />

                {/* Image Format Converter Tool Routes */}
                <Route path="/tools/image/format-converter.html" element={<Navigate to="/tools/image/format-converter" replace />} />
                <Route path="/tools/image/format-converter" element={<ImageConverter />} />

                {/* JWT Tool Routes */}
                <Route path="/tools/token/jwt.html" element={<Navigate to="/tools/token/jwt" replace />} />
                <Route path="/tools/token/jwt" element={<JWTPage />} />

                {/* SHA-1 Tool Routes */}
                <Route path="/tools/hash/sha1.html" element={<Navigate to="/tools/hash/sha1" replace />} />
                <Route path="/tools/hash/sha1" element={<SHA1Page />} />

                {/* SHA-2 Tool Routes */}
                <Route path="/tools/hash/sha2.html" element={<Navigate to="/tools/hash/sha2" replace />} />
                <Route path="/tools/hash/sha2" element={<SHA2Page />} />

                {/* SHA-3 Tool Routes */}
                <Route path="/tools/hash/sha3.html" element={<Navigate to="/tools/hash/sha3" replace />} />
                <Route path="/tools/hash/sha3" element={<SHA3Page />} />

                {/* AES Tool Routes */}
                <Route path="/tools/encrypt-decrypt/aes.html" element={<Navigate to="/tools/encrypt-decrypt/aes" replace />} />
                <Route path="/tools/encrypt-decrypt/aes" element={<AESPage />} />

                {/* RSA Tool Routes */}
                <Route path="/tools/encrypt-decrypt/rsa.html" element={<Navigate to="/tools/encrypt-decrypt/rsa" replace />} />
                <Route path="/tools/encrypt-decrypt/rsa" element={<RSAPage />} />

                {/* Roulette Tool Routes */}
                <Route path="/tools/fun/roulette.html" element={<Navigate to="/tools/fun/roulette" replace />} />
                <Route path="/tools/fun/roulette" element={<Roulette />} />

                {/* Color Palette Generator Tool Routes */}
                <Route path="/tools/fun/color-palette.html" element={<Navigate to="/tools/fun/color-palette" replace />} />
                <Route path="/tools/fun/color-palette" element={<ColorPaletteGenerator />} />

                {/* QR Code Generator Tool Routes */}
                <Route path="/tools/fun/qr-generator.html" element={<Navigate to="/tools/fun/qr-generator" replace />} />
                <Route path="/tools/fun/qr-generator" element={<QRCodeGenerator />} />

                {/* Blog Routes */}
                <Route path="/blog/software-engineer/list/about-g1gc.html" element={<Navigate to="/blog/software-engineer/list/about-g1gc" replace />} />
                <Route path="/blog/software-engineer/list/about-g1gc" element={<BlogPage />} />

                <Route path="/blog/software-engineer/list/about-zgc.html" element={<Navigate to="/blog/software-engineer/list/about-zgc" replace />} />
                <Route path="/blog/software-engineer/list/about-zgc" element={<BlogPage />} />

                <Route path="/blog/software-engineer/list/about-kafka.html" element={<Navigate to="/blog/software-engineer/list/about-kafka" replace />} />
                <Route path="/blog/software-engineer/list/about-kafka" element={<BlogPage />} />

                <Route path="/blog/software-engineer/list/about-mongodb-sharding.html" element={<Navigate to="/blog/software-engineer/list/about-mongodb-sharding" replace />} />
                <Route path="/blog/software-engineer/list/about-mongodb-sharding" element={<BlogPage />} />

                <Route path="/blog/software-engineer/list/replay-attack.html" element={<Navigate to="/blog/software-engineer/list/replay-attack" replace />} />
                <Route path="/blog/software-engineer/list/replay-attack" element={<BlogPage />} />

                <Route path="/blog/other/list.html" element={<Navigate to="/blog/other/list" replace />} />
                <Route path="/blog/other/list" element={<BlogListPage />} />
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