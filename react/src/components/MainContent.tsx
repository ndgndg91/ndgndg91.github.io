import React, { useEffect } from 'react';

const MainContent: React.FC = () => {
  useEffect(() => {
    // 카카오 광고 초기화
    if (window.kakaoAdQueue) {
      window.kakaoAdQueue.push(() => {
        if (window.kakao) {
          window.kakao.displaySlot('DAN-nZOLt6AO6PDMGqAR');
        }
      });
    }
  }, []);

  return (
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
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Blog</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Readings for developers.
            </p>
            <a href="/blog/software-engineer/list.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Read Blog
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Encode/Decode</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Easily encode and decode Base64 and URL data.
            </p>
            <a href="/tools/encode-decode/base64.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With Encode/Decode
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">String Tools</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Provides Json Parser, Xml Parser, UUID generation, random Hex values, string diff checker and count bytes tools.
            </p>
            <a href="/tools/string/uuid.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With String Tools
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Time</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Convert Unix Timestamp and check current time.
            </p>
            <a href="/tools/time/timestamp.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With Timestamp
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Hash</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Generate Hash with Secure Hash Algorithm 1, 2, 3. Also HMAC
            </p>
            <a href="/tools/hash/sha-3.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With Hash
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Image</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Convert Image format! JPEG to PNG, PNG to JPEG, JPEG to WebP, WebP to JPEG, PNG to WebP, WebP to PNG.
            </p>
            <a href="/tools/image/format-converter.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Convert Image Format
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Encrypt/Decrypt</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Encrypt your data securely with AES and RSA.
            </p>
            <a href="/tools/encrypt-decrypt/aes.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With Encrypt/Decrypt
            </a>
          </div>
          <br />
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Token</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Work with JSON Web Tokens (JWT) - decode, verify, and generate tokens.
            </p>
            <a href="/tools/token/jwt.html" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
              Play With Tokens
            </a>
          </div>
          <br />
          <div className="mb-6">
            <p>Check out the left menu to explore more tools!</p>
          </div>
          <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <ins className="kakao_ad_area" style={{ display: 'none' }} data-ad-unit="DAN-nZOLt6AO6PDMGqAR" data-ad-width="300" data-ad-height="250"></ins>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
