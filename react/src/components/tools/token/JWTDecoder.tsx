import React, { useState, useEffect, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface DecodedJWT {
  header: any;
  payload: any;
  signature: string;
}

const JWTDecoder: React.FC = () => {
  const [jwtInput, setJwtInput] = useState('');
  const [decodedJWT, setDecodedJWT] = useState<DecodedJWT | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    // Set initial value
    setIsDarkMode(darkModeMediaQuery.matches);
    
    // Listen for changes
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Memoize the syntax highlighter style based on theme
  const syntaxHighlighterStyle = useMemo(() => {
    return isDarkMode ? vscDarkPlus : vs;
  }, [isDarkMode]);

  const base64UrlDecode = (str: string): string => {
    let output = str
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }

    try {
      return atob(output);
    } catch (err) {
      throw new Error('Failed to decode base64url: ' + (err as Error).message);
    }
  };

  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      return { header, payload, signature: parts[2] };
    } catch (error) {
      throw new Error('JWT Decode Error: ' + (error as Error).message);
    }
  };

  const handleDecode = () => {
    try {
      setError(null);
      const decoded = decodeJWT(jwtInput);
      setDecodedJWT(decoded);
    } catch (err) {
      setError((err as Error).message);
      setDecodedJWT(null);
    }
  };

  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        JWT Decoder
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Paste your JWT token below to decode its header and payload.
      </p>
      
      <div className="mb-6">
        <label htmlFor="jwt-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          JWT Token:
        </label>
        <textarea
          id="jwt-input"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          value={jwtInput}
          onChange={(e) => setJwtInput(e.target.value)}
        />
      </div>

      <button
        onClick={handleDecode}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
      >
        Decode
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-lg dark:bg-red-900">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {decodedJWT && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Header:
            </label>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 overflow-x-auto dark:bg-gray-700 dark:border-gray-600">
              <textarea
                readOnly
                value={JSON.stringify(decodedJWT.header, null, 2)}
                className="block w-full text-sm text-gray-900 bg-transparent border-0 focus:ring-0 dark:text-white"
                rows={10}
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Payload:
            </label>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 overflow-x-auto dark:bg-gray-700 dark:border-gray-600">
              <textarea
                readOnly
                value={JSON.stringify(decodedJWT.payload, null, 2)}
                className="block w-full text-sm text-gray-900 bg-transparent border-0 focus:ring-0 dark:text-white"
                rows={10}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JWTDecoder; 