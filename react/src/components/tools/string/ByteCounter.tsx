import React from 'react';
import useByteCounter from '../../../hooks/useByteCounter';
import { RefreshCw } from 'lucide-react';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const ByteCounter: React.FC = () => {
  const { input, setInput, result, countBytes, clearAll } = useByteCounter();

  // Handle input change and count bytes automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Count bytes when the component mounts or input changes
  React.useEffect(() => {
    countBytes();
  }, [input, countBytes]);

  return (
      <>
      <SEOHead {...seoData.byteCounter} />
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p 
        className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
        data-section="true"
      >
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Byte Counter (UTF-8)
      </h1>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        You can check the length and UTF-8 byte size of the entered string.
      </p>
      <br />

      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          String Input
        </h2>
        
        {/* Text Input */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="string-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your string:
            </label>
            <button
              onClick={clearAll}
              disabled={!input}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
            >
              <RefreshCw size={16} />
              <span>Clear</span>
            </button>
          </div>
          <textarea
            id="string-input"
            value={input}
            onChange={handleInputChange}
            className="w-full min-h-[200px] p-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-y"
            placeholder="Enter your string here..."
          />
        </div>

        {/* Results */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
            Results
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Length (number of characters):</span>
              <span className="px-3 py-1 font-mono font-bold text-gray-900 bg-gray-200 rounded dark:bg-gray-600 dark:text-white">
                {result.charLength}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Byte Size (UTF-8):</span>
              <span className="px-3 py-1 font-mono font-bold text-white bg-blue-600 rounded dark:bg-blue-700">
                {result.byteLength}
              </span>
            </div>
          </div>
        </div>

        {/* Information */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/30 dark:border-blue-800/50">
          <h4 className="mb-2 font-medium text-blue-800 dark:text-blue-200">
            About UTF-8 Byte Counting
          </h4>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            UTF-8 is a variable-width character encoding that uses between 1 and 4 bytes per character. 
            ASCII characters (0-127) use 1 byte, while other characters may use 2-4 bytes depending on 
            their Unicode code point.
          </p>
        </div>
      </div>
      
      {/* Bottom Ad */}
      
      <div className="mt-12 prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why count bytes instead of characters?</h2>
        <p className="mb-4">
          In modern programming and database design, the number of characters in a string does not always equal the number of bytes it occupies. For example, standard English letters (ASCII) take 1 byte each, but characters in Korean, Japanese, Chinese, or Emojis can take 3 to 4 bytes each in UTF-8 encoding.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">When is this useful?</h2>
        <p className="mb-4">
          This tool is essential for developers designing database schemas (like VARCHAR lengths in MySQL), configuring message brokers (like Kafka payload limits), or building APIs with strict payload size restrictions. Knowing the exact UTF-8 byte size helps prevent unexpected truncation errors and <code>Data too long for column</code> exceptions.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to use this Byte Counter</h2>
        <p className="mb-4">
          Simply type or paste your text into the Input box. The tool will automatically calculate both the standard character length and the precise UTF-8 byte size in real-time. No clicking required!
        </p>
      </div>
    </div>
      </>
  );
};

export default ByteCounter;
