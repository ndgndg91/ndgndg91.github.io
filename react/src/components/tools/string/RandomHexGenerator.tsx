import React from 'react';
import useRandomHex from '../../../hooks/useRandomHex';
import AdSection from '../../ads/AdSection';
import { Copy, Check } from 'lucide-react';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const RandomHexGenerator: React.FC = () => {
  const {
    hexLength,
    setHexLength,
    hexResult,
    error,
    copied,
    generateRandomHex,
    copyToClipboard,
    clearAll,
  } = useRandomHex();

  return (
      <>
      <SEOHead {...seoData.randomHex} />
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p 
        className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
        data-section="true"
      >
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Random Hex Generator
      </h1>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Generate a random hexadecimal string. Enter a length to get a hex string of the desired size.
      </p>
      <br />
      
      <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        {/* Input Section */}
        <div className="mb-6">
          <label 
            htmlFor="hex-length"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Length (number of characters):
          </label>
          <input
            type="number"
            id="hex-length"
            min="1"
            max="2048"
            value={hexLength}
            onChange={(e) => setHexLength(Number(e.target.value))}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="e.g., 64"
            required
          />
        </div>

        {/* Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={generateRandomHex}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
            type="button"
          >
            Generate Hex
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:shadow-gray-900/30 transform hover:-translate-y-0.5"
            type="button"
          >
            Clear All
          </button>
        </div>

        {/* Result Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label 
              htmlFor="random-hex-result"
              className="text-2xl font-medium text-gray-900 dark:text-white"
            >
              Result:
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!hexResult}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:ring-4 focus:outline-none ${
                !hexResult
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }`}
              title="Copy to clipboard"
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <Check size={16} />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy size={16} />
                  Copy
                </span>
              )}
            </button>
          </div>
          
          <textarea
            id="random-hex-result"
            rows={10}
            readOnly
            value={error || hexResult}
            className={`block p-2.5 w-full text-sm rounded-lg border ${
              error
                ? 'text-red-700 bg-red-50 border-red-500 dark:bg-red-900/10 dark:border-red-800 dark:text-red-400'
                : 'text-gray-900 bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
            } focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Generated hex string will appear here..."
          />
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

export default RandomHexGenerator;
