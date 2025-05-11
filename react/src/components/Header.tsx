import React from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onToggleMobileMenu: () => void;
  onToggleRightMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  darkMode,
  onToggleDarkMode,
  onToggleMobileMenu, 
  onToggleRightMobileMenu 
}) => {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-14">
      {/* 상단 로고 및 메뉴 영역 - 항상 최상위에 표시 */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-950/5 dark:border-white/10 h-full">
        <div className="flex h-full items-center justify-between gap-8 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <a className="shrink-0" aria-label="Home" href="/">
              <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                <text x="100" y="35" fontSize="20" textAnchor="middle" fill="currentColor" className="text-gray-950 dark:text-white">Developer Playground</text>
                <text x="100" y="50" fontSize="10" textAnchor="middle" fill="currentColor" className="text-gray-600 dark:text-gray-400">Giri's Place</text>
              </svg>
            </a>
          </div>
          
          {/* Desktop Navigation Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Dark mode button moved here for desktop */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <a id="addBookmark" className="inline-flex items-center gap-1.5 rounded-full bg-gray-950/5 px-3 py-1.5 text-sm/6 font-medium text-gray-950 hover:bg-gray-950/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="size-4 fill-gray-600 dark:fill-gray-400">
                <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14l-4-2-4 2V2Z" clipRule="evenodd"/>
              </svg>
              Add Bookmark
            </a>
            <a href="https://www.buymeacoffee.com/ndgndg91" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm/6 font-medium text-amber-600 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-amber-600 dark:fill-amber-400">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
              </svg>
              Support Me
            </a>
            <a href="https://paypal.me/ndgndg91" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-sm/6 font-medium text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-blue-600 dark:fill-blue-400">
                <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 1.81.752 3.285-.019.123-.04.24-.062.36-.735 3.773-3.089 5.446-6.956 5.446H8.957c-.63 0-1.174.414-1.354 1.002l-.57 3.62-.038.242a.514.514 0 0 1-.505.418H3.12a.515.515 0 0 1-.516-.594l2.55-16.165.04-.27c.072-.47.515-.86 1.1-.86h5.327c.83 0 1.52.558 1.712 1.327l.1.42z"/>
              </svg>
              PayPal
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              type="button" 
              aria-label="More options" 
              onClick={onToggleRightMobileMenu} 
              className="relative inline-grid size-8 place-items-center rounded-md text-gray-500 hover:bg-gray-950/5 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="size-5">
                <path d="M8 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM8 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9.5 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* 모바일 햄버거 메뉴 - 헤더와 같은 줄에 배치 */}
      <div className="flex h-14 items-center border-t border-gray-950/5 bg-white px-4 sm:px-6 lg:hidden dark:border-white/10 dark:bg-gray-950">
          <button 
          type="button" 
          id="hamburger" 
          onClick={onToggleMobileMenu}
          className="relative inline-grid size-7 place-items-center rounded-md text-gray-500 hover:bg-gray-950/5 hover:text-gray-950 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white -ml-1.5" 
          aria-label="Open navigation menu"
        >
          <span className="absolute top-1/2 left-1/2 size-11 -translate-1/2 [@media(pointer:fine)]:hidden"></span>
          <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 6.5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd"></path>
          </svg>
        </button>
        <ol className="sticky ml-4 flex min-w-0 items-center gap-2 text-sm/6 whitespace-nowrap">
          <li className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400">Welcome Developer Playground by Giri</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Header;
