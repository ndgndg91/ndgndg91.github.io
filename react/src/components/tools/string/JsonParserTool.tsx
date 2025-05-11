import React, { useState, useEffect, useMemo } from 'react';
import { useJsonParser } from './useJsonParser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export interface JsonParserToolProps {
  // Add any props here if needed in the future
}

const JsonParserTool: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    input,
    output,
    error,
    indentLevel,
    setInput,
    setIndentLevel,
    parseJson,
    copyToClipboard,
    clearAll
  } = useJsonParser();
  
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
  
  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  // Memoize the syntax highlighter style based on theme
  const syntaxHighlighterStyle = useMemo(() => {
    return isDarkMode ? vscDarkPlus : vs;
  }, [isDarkMode]);

  return (
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
         data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        JSON Parser
      </h1>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Input JSON String and Parse Pretty Print Output.
      </p>
      <br/>
      
      <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Input Section */}
        <div className="mb-6">
          <label htmlFor="json-input" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            Input
          </label>
          <textarea
            id="json-input"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter JSON..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="mb-6">
          <label htmlFor="indent-level" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Indent
          </label>
          <select
            id="indent-level"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={indentLevel}
            onChange={(e) => setIndentLevel(parseInt(e.target.value, 10) as 2 | 4 | 8)}
          >
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={8}>8 spaces</option>
          </select>
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={parseJson}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
            type="button"
          >
            Parse JSON
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:shadow-gray-900/30 transform hover:-translate-y-0.5"
            type="button"
          >
            Clear All
          </button>
          <button
            onClick={handleCopy}
            disabled={!output || !!error}
            className={`ml-auto px-6 py-3 flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 ${
              !output || error
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {copied ? (
              <>
                <Check size={18} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div>
          <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Output</h3>
          <div className="relative">
            {error ? (
              <div className="text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            ) : output ? (
              <div className="relative group">
                <SyntaxHighlighter
                  language="json"
                  style={syntaxHighlighterStyle}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#f9fafb',
                    color: isDarkMode ? '#f8fafc' : '#1f2937',
                    minHeight: '200px',
                    maxHeight: '70vh',
                    overflow: 'auto',
                  }}
                  wrapLines={true}
                  wrapLongLines={false}
                >
                  {output}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 italic min-h-[200px] flex items-center justify-center">
                Parsed JSON will appear here...
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default JsonParserTool;
