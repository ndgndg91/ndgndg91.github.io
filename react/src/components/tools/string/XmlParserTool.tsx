import React, { useState, useEffect } from 'react';
import { useXmlParser } from './useXmlParser';
import { Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs';
import AdSection from '../../ads/AdSection';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const XmlParserTool: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const {
    input,
    output,
    error,
    setInput,
    parseXml,
    copyToClipboard,
    clearAll
  } = useXmlParser();
  
  // Detect dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    
    setIsDarkMode(darkModeMediaQuery.matches);
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
  const syntaxHighlighterStyle = isDarkMode ? vscDarkPlus : vs;

  return (
      <>
      <SEOHead {...seoData.xmlParser} />
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
         data-section="true">
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        XML Parser
      </h1>
      <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
        Parse XML strings into Pretty Print Output
      </p>
      
      <div className="mt-8 max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Input Section */}
        <div className="mb-6">
          <label htmlFor="xml-input" className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
            Input
          </label>
          <textarea
            id="xml-input"
            rows={10}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter XML..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={parseXml}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
            type="button"
          >
            Parse XML
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
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                {error}
              </div>
            ) : output ? (
              <div className="relative">
                <SyntaxHighlighter
                  language="xml"
                  style={syntaxHighlighterStyle}
                  customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    maxHeight: '400px',
                    overflow: 'auto',
                  }}
                  wrapLongLines={false}
                >
                  {output}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="p-4 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
                Parsed XML will appear here...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Ad */}
      <AdSection 
        position="bottom" 
        size="rectangle" 
        showAd={true}
        className="mt-8"
      />
    </div>
      </>
  );
};

export default XmlParserTool;
