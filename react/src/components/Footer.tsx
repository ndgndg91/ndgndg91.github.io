import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto py-8">
      <div className="mx-auto w-full max-w-2xl lg:max-w-5xl px-4 sm:px-6 lg:px-8 text-sm leading-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="py-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a href="mailto:ndgndg91@gmail.com" className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  ndgndg91@gmail.com
                </a>
              </li>
            </ul>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">GitHub</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://github.com/ndgndg91" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  @ndgndg91
                </a>
              </li>
            </ul>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">LinkedIn</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://www.linkedin.com/in/동길-남-7a1417141" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  동길 남
                </a>
              </li>
            </ul>
          </div>
          <div className="py-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Blog</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <a 
                  href="https://ndgndg91.blogspot.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  ndgndg91.blogspot.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} Giri Labs Inc. All rights reserved.
            </p>
            {/* <div className="mt-4 sm:mt-0 flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm">
                Terms of Service
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
