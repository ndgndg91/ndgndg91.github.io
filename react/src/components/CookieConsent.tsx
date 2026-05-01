import React, { useState, useEffect } from 'react';
import { useIsMounted } from '../hooks/useIsMounted';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowConsent(true);
      }
    }
  }, [isMounted]);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  if (!isMounted || !showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. 
            By clicking "Accept", you consent to our use of cookies as described in our <a href="/policy/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={acceptCookies}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
