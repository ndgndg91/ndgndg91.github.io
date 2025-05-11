import React from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarProps {
  className?: string;
  children?: React.ReactNode;
  mobileMenuOpen?: boolean;
  onCloseMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className = '', 
  children, 
  mobileMenuOpen = false,
  onCloseMobileMenu = () => {}
}) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  // Close menu when clicking outside on mobile
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const sidebar = document.querySelector('aside[role="navigation"]');
      
      if (mobileMenuOpen && sidebar && !sidebar.contains(target)) {
        onCloseMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, onCloseMobileMenu]);

  return (
    <aside 
      role="navigation"
      className={`fixed inset-y-0 left-0 w-64 transform overflow-y-auto bg-white px-4 pb-4 pt-20 transition-transform duration-300 ease-in-out dark:bg-gray-950 z-50 lg:z-40 lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <nav className="flex flex-col gap-8">
        {children || (
          <div className="flex flex-col gap-3" data-autoscroll="true">
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Blog</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/blog/software-engineer/list.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/blog/software-engineer/list.html"
                >
                  Software Engineer
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Encode Decode</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/encode-decode/base64.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/encode-decode/base64.html"
                >
                  Base64
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/encode-decode/url.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/encode-decode/url.html"
                >
                  URL
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">String</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/json-parser.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/json-parser.html"
                >
                  JSON Parser
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/xml-parser.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/xml-parser.html"
                >
                  XML Parser
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/uuid.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/uuid.html"
                >
                  UUID Generator
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/random-hex.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/random-hex.html"
                >
                  Random Hex Generator
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/string-diff-checker.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/string-diff-checker.html"
                >
                  String Diff Checker
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/byte-counter.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/byte-counter.html"
                >
                  Byte Counter
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/string/html-escape-unescape.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/string/html-escape-unescape.html"
                >
                  HTML Escape/Unescape
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Time</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/time/timestamp.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/time/timestamp.html"
                >
                  Timestamp
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Image</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/image/format-converter.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/image/format-converter.html"
                >
                  Format Converter
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Token</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/token/jwt.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/token/jwt.html"
                >
                  JWT
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Hash</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/hash/sha-1.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/hash/sha-1.html"
                >
                  SHA-1
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/hash/sha-2.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/hash/sha-2.html"
                >
                  SHA-2
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/hash/sha-3.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/hash/sha-3.html"
                >
                  SHA-3
                </a>
              </li>
            </ul>
            <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">Encrypt/Decrypt</h3>
            <ul className="flex flex-col gap-2 border-l dark:border-[color-mix(in_oklab,_var(--color-gray-950),white_20%)] border-[color-mix(in_oklab,_var(--color-gray-950),white_90%)]">
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/encrypt-decrypt/aes.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/encrypt-decrypt/aes.html"
                >
                  AES
                </a>
              </li>
              <li className="-ml-px flex flex-col items-start gap-2">
                <a 
                  className={`inline-block border-l text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                    isActive('/tools/encrypt-decrypt/rsa.html') 
                      ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white' 
                      : 'border-transparent text-gray-600 hover:border-gray-950/25 hover:text-gray-950 dark:text-gray-300 dark:hover:border-white/25 dark:hover:text-white'
                  }`} 
                  href="/tools/encrypt-decrypt/rsa.html"
                >
                  RSA
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;