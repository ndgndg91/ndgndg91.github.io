import React from 'react';
import {useLocation, Link} from 'react-router-dom';

interface SidebarProps {
    className?: string;
    children?: React.ReactNode;
    mobileMenuOpen?: boolean;
    onCloseMobileMenu?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
                                             children,
                                             mobileMenuOpen = false,
                                             onCloseMobileMenu = () => {
                                             }
                                         }) => {
    const location = useLocation();

    const isActive = (path: string) => {
        const currentPath = location.pathname;
        // Check both with and without .html extension
        return currentPath === path ||
            currentPath === path.replace(/\.html$/, '') ||
            currentPath === `${path}.html`;
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
        <div className="p-6 pb-24">
            <nav className="flex flex-col gap-8">
                {children || (
                    <div className="flex flex-col gap-3" data-autoscroll="true">
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">📝
                            Blog</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/blog/software-engineer/list')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/blog/software-engineer/list/"
                                >
                                    🚀 Software Engineer
                                </a>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🌐
                            Network</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/network/ip-address/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/network/ip-address')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📡 Check My IP
                                </Link>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🎉
                            Fun</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/fun/roulette/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/fun/roulette')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🎯 Roulette
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/fun/color-palette/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/fun/color-palette')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🎨 Color Palette
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/fun/qr-generator/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/fun/qr-generator')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📱 QR Generator
                                </Link>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🔐
                            Encode Decode</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/encode-decode/base64/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/encode-decode/base64')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📝 Base64
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/encode-decode/url')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/tools/encode-decode/url"
                                >
                                    🌍 URL
                                </a>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">📜
                            String</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/json-parser/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/json-parser')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📄 JSON Parser
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/xml-parser/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/xml-parser')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🏷️ XML Parser
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/uuid-generator/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/uuid-generator')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🆔 UUID Generator
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/random-hex/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/random-hex')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🎲 Random Hex Generator
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/string-diff-checker/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/string-diff-checker')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🔍 String Diff Checker
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/byte-counter/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/byte-counter')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📆 Byte Counter
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/html-escape-unescape/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/html-escape-unescape')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🏷️ HTML Escape/Unescape
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/string/regex-cheatsheet/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/string/regex-cheatsheet')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    📝 Regex Cheatsheet
                                </Link>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">⏰
                            Time</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/time/timestamp/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/time/timestamp')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    🕐 Timestamp
                                </Link>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🖼️
                            Image</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/image/format-converter')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/tools/image/format-converter"
                                >
                                    🔄 Format Converter
                                </a>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🎫
                            Token</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/token/jwt')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/tools/token/jwt"
                                >
                                    🔑 JWT
                                </a>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">#️⃣
                            Hash</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/hash/sha1/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/hash/sha1')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    1️⃣ SHA-1
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/hash/sha2/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/hash/sha2')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    2️⃣ SHA-2
                                </Link>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <Link
                                    to="/tools/hash/sha3/"
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/hash/sha3')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    onClick={onCloseMobileMenu}
                                >
                                    3️⃣ SHA-3
                                </Link>
                            </li>
                        </ul>
                        <h3 className="font-mono text-sm/6 font-medium tracking-widest text-gray-500 uppercase sm:text-xs/6 dark:text-gray-400">🔒
                            Encrypt/Decrypt</h3>
                        <ul className="flex flex-col gap-2 border-l border-gray-100 dark:border-gray-700">
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/encrypt-decrypt/aes')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/tools/encrypt-decrypt/aes"
                                >
                                    🔐 AES
                                </a>
                            </li>
                            <li className="-ml-px flex flex-col items-start gap-2">
                                <a
                                    className={`inline-block border-l-2 text-base/8 sm:text-sm/6 pl-5 sm:pl-4 ${
                                        isActive('/tools/encrypt-decrypt/rsa')
                                            ? 'border-gray-950 dark:border-white font-semibold text-gray-950 dark:text-white'
                                            : 'border-gray-200 dark:border-gray-700 text-gray-600 hover:border-gray-400 hover:text-gray-950 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:text-white'
                                    }`}
                                    href="/tools/encrypt-decrypt/rsa"
                                >
                                    🗝 RSA
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;