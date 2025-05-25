import React, { useEffect } from 'react';
import SEOHead from './SEOHead';
import { seoData } from '../data/seoData';

const MainContent: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <SEOHead {...seoData.home} />
      <div className="px-4 pt-10 pb-24 sm:px-6 xl:pr-0">
        <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400" data-section="true">
          Developer Playground
        </p>
        <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
          Welcome to Giri's Place
        </h1>
        <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
          A personal site with a variety of tools and blogs for developers. Explore useful features like data conversion, encryption, time management, and more.
        </p>
        <div className="prose mt-10" data-content="true">
          <div id="quick-reference" className="not-prose relative isolate scroll-mt-16">
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Developer Blog</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Technical articles about software engineering, development practices, and programming insights.
              </p>
              <a href="/blog/software-engineer/list.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Read Technical Blog
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Encoding & Decoding Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Convert and transform data with <a href="/tools/encode-decode/base64.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">Base64 encoding</a> and <a href="/tools/encode-decode/url.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">URL encoding</a> tools.
              </p>
              <a href="/tools/encode-decode/base64.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Explore Encoding Tools
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">String Processing Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Advanced string manipulation tools including <a href="/tools/string/parser.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">JSON parser</a>, <a href="/tools/string/xml-parser.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">XML parser</a>, <a href="/tools/string/uuid-generator.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">UUID generator</a>, and <a href="/tools/string/string-diff-checker.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">text comparison</a> utilities.
              </p>
              <a href="/tools/string/uuid-generator.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Explore String Tools
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Time & Date Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Convert between Unix timestamps and human-readable dates. Perfect for debugging and <a href="/tools/time/timestamp.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">timestamp conversion</a> tasks.
              </p>
              <a href="/tools/time/timestamp.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Convert Timestamps
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Cryptographic Hash Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Generate secure hashes with <a href="/tools/hash/sha1.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">SHA-1</a>, <a href="/tools/hash/sha2.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">SHA-2</a>, and <a href="/tools/hash/sha3.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">SHA-3</a> algorithms for data integrity verification.
              </p>
              <a href="/tools/hash/sha2.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Generate Hash
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Image Format Converter</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Convert images between formats like JPEG, PNG, WebP, and GIF. Optimize your images for web with our <a href="/tools/image/format-converter.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">format converter</a>.
              </p>
              <a href="/tools/image/format-converter.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Convert Images
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Encryption & Security Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Secure your data with <a href="/tools/encrypt-decrypt/aes.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">AES encryption</a> and <a href="/tools/encrypt-decrypt/rsa.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">RSA encryption</a>. Essential tools for data protection and security.
              </p>
              <a href="/tools/encrypt-decrypt/aes.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Encrypt Data
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">JWT Token Tools</h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Decode, verify, and analyze <a href="/tools/token/jwt.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">JSON Web Tokens (JWT)</a>. Perfect for debugging authentication systems.
              </p>
              <a href="/tools/token/jwt.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                Decode JWT
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg shadow-sm dark:from-purple-900/20 dark:to-pink-900/20 dark:bg-gray-800 dark:border-purple-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                🎯 Random Roulette
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full dark:bg-purple-800 dark:text-purple-200">NEW!</span>
              </h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Having trouble making decisions? Try our interactive <a href="/tools/fun/roulette.html" className="text-purple-600 hover:underline dark:text-purple-400 dark:hover:text-purple-300">random roulette</a>! Perfect for choosing lunch menus, activities, or any random selection. Customize your options and let fate decide!
              </p>
              <a href="/tools/fun/roulette.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 transition-all duration-200 transform hover:scale-105">
                🎲 Spin the Roulette!
              </a>
            </div>
            <br />
            <div className="max-w-screen p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg shadow-sm dark:from-blue-900/20 dark:to-cyan-900/20 dark:bg-gray-800 dark:border-blue-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                🎨 Color Palette Generator
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full dark:bg-blue-800 dark:text-blue-200">NEW!</span>
              </h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Create beautiful color combinations for your designs! Our <a href="/tools/fun/color-palette.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">color palette generator</a> offers various themes like pastel, vibrant, earthy tones and more. Export as CSS or JSON for easy integration.
              </p>
              <a href="/tools/fun/color-palette.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-200 transform hover:scale-105">
                🌈 Generate Colors!
              </a>
            </div>
            <br />
            <br />
            <div className="max-w-screen p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm dark:from-green-900/20 dark:to-emerald-900/20 dark:bg-gray-800 dark:border-green-700">
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                📱 QR Code Generator
                <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full dark:bg-green-800 dark:text-green-200">NEW!</span>
              </h2>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Transform text, URLs, or contact info into QR codes instantly! Our <a href="/tools/fun/qr-code.html" className="text-green-600 hover:underline dark:text-green-400 dark:hover:text-green-300">QR code generator</a> supports custom colors, sizes, and error correction levels. Perfect for sharing links, contact details, or any text.
              </p>
              <a href="/tools/fun/qr-code.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 transition-all duration-200 transform hover:scale-105">
                📲 Create QR Code!
              </a>
            </div>
            <br />
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Explore All Developer Tools</h3>
              <p className="text-gray-700 dark:text-gray-400">Our comprehensive toolkit includes over 15 specialized utilities for developers. From <a href="/tools/encode-decode/base64.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">data encoding</a> to <a href="/tools/hash/sha2.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">hash generation</a>, we've got all your development needs covered. Check out the navigation menu to discover more tools, or visit our <a href="/blog/software-engineer/list.html" className="text-blue-600 hover:underline dark:text-blue-400 dark:hover:text-blue-300">technical blog</a> for in-depth articles about software engineering.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainContent;
