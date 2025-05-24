import React from 'react';
import useByteCounter from '../../../hooks/useByteCounter';
import { RefreshCw } from 'lucide-react';
import AdSection from '../../ads/AdSection';

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
      <AdSection 
        position="bottom" 
        size="rectangle" 
        showAd={true}
        className="mt-8"
      />
    </div>
  );
};

export default ByteCounter;
