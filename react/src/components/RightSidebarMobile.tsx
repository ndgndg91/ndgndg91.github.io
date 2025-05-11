import React, { useEffect, useRef } from 'react';

// Extend the existing Window interface
declare global {
  interface Window {
    // For Firefox and other browsers that support sidebar
    sidebar?: {
      addPanel?: (title: string, content: string, x?: string) => void;
    };
  }
  
  // Extend the existing External interface for IE
  interface External {
    AddFavorite?: (url: string, title: string) => void;
  }
}

// SocialLink interface is currently not used
// interface SocialLink {
//   name: string;
//   href: string;
//   icon: string;
// }

interface RightSidebarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const RightSidebarMobile: React.FC<RightSidebarMobileProps> = ({
  isOpen = false,
  onClose = () => {},
  className = '',
  // darkMode and onToggleDarkMode are kept in props for future use
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Social links implementation can be added here when needed

  const handleAddBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    // Type assertion for window.sidebar
    const sidebar = window.sidebar as any;
    if (sidebar?.addPanel) {
      sidebar.addPanel(document.title, window.location.href, '');
    } else if (window.external && 'AddFavorite' in window.external) {
      // For IE
      (window.external as any).AddFavorite(location.href, document.title);
    } else {
      alert('Press ' + (navigator.platform.match('Mac') ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div 
      ref={sidebarRef}
      className={`fixed inset-y-0 right-0 z-50 w-full bg-white shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-900 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${className}`}
    >
      <div className="h-full p-3 space-y-2">
          <a 
            href="#" 
            onClick={handleAddBookmark}
            className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-sm/6 font-medium text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="size-4 fill-gray-600 dark:fill-gray-400">
              <path fillRule="evenodd" d="M4 2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14l-4-2-4 2V2Z" clipRule="evenodd"/>
            </svg>
            Add Bookmark
          </a>
          <a 
            href="https://www.buymeacoffee.com/ndgndg91" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1.5 text-sm/6 font-medium text-amber-600 hover:bg-amber-500/20 dark:bg-amber-500/20 dark:text-amber-400 dark:hover:bg-amber-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-amber-600 dark:fill-amber-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
            </svg>
            Buy Me a Coffee
          </a>
          
          <a 
            href="https://paypal.me/ndgndg91" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-sm/6 font-medium text-blue-600 hover:bg-blue-500/20 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-4 fill-blue-600 dark:fill-blue-400">
              <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L7.418 21h1.518l.95-6.02h1.385c4.678 0 7.75-2.203 8.796-6.502zm-2.96-5.09c.762.868.983 1.81.752 3.285-.019.123-.04.24-.062.36-.735 3.773-3.089 5.446-6.956 5.446H8.957c-.63 0-1.174.414-1.354 1.002l-.57 3.62-.038.242a.514.514 0 0 1-.505.418H3.12a.515.515 0 0 1-.516-.594l2.55-16.165.04-.27c.072-.47.515-.86 1.1-.86h5.327c.83 0 1.52.558 1.712 1.327l.1.42z"/>
            </svg>
            PayPal
          </a>
      </div>
    </div>
  );
};

export default RightSidebarMobile;
