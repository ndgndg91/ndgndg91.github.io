import React, { useState, useRef, useEffect } from 'react';
import useStringDiff, { type DiffLine } from '../../../hooks/useStringDiff';
import { Copy, RefreshCw, Check } from 'lucide-react';

const StringDiffChecker: React.FC = () => {
  const {
    text1,
    setText1,
    text2,
    setText2,
    diffResult,
    isComparing,
    compare,
    clearAll,
  } = useStringDiff();

  const [copied1, setCopied1] = useState<boolean>(false);
  const [copied2, setCopied2] = useState<boolean>(false);
  const textarea1Ref = useRef<HTMLTextAreaElement>(null);
  const textarea2Ref = useRef<HTMLTextAreaElement>(null);
  const lineNumbers1Ref = useRef<HTMLDivElement>(null);
  const lineNumbers2Ref = useRef<HTMLDivElement>(null);
  const [lineNumbers1, setLineNumbers1] = useState<number[]>([]);
  const [lineNumbers2, setLineNumbers2] = useState<number[]>([]);

  // Update line numbers when text changes
  useEffect(() => {
    const lines1 = text1.split('\n').length;
    const lines2 = text2.split('\n').length;
    setLineNumbers1(Array.from({ length: lines1 || 1 }, (_, i) => i + 1));
    setLineNumbers2(Array.from({ length: lines2 || 1 }, (_, i) => i + 1));
  }, [text1, text2]);

  // Sync scroll between textarea and line numbers
  const syncScroll = (textarea: HTMLTextAreaElement, lineNumbers: HTMLDivElement) => {
    if (textarea && lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop;
    }
  };

  // Handle copy to clipboard
  const copyToClipboard = async (text: string, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Render diff line with highlighted differences
  const renderDiffLine = (line: DiffLine) => {
    return (
      <div key={line.lineNum} className="flex items-start gap-4">
        <span className="w-10 text-right text-gray-500 dark:text-gray-400">
          {line.lineNum}
        </span>
        <div className="flex-1">
          {line.content.map((word, idx) => (
            <span
              key={idx}
              className={`${
                word.status === 'removed'
                  ? 'bg-red-100 dark:bg-red-900/50 line-through'
                  : word.status === 'added'
                  ? 'bg-green-100 dark:bg-green-900/50'
                  : ''
              }`}
            >
              {word.word}{' '}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p 
        className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
        data-section="true"
      >
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        String Diff Checker
      </h1>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Compare two text strings and highlight the differences between them.
      </p>
      <br />

      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 mb-6">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Compare Text
        </h2>
        
        {/* Text Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* First Text Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="text1" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                First Text
              </label>
              <button
                onClick={() => copyToClipboard(text1, setCopied1)}
                disabled={!text1}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
                title="Copy to clipboard"
              >
                {copied1 ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative flex">
              <div 
                ref={lineNumbers1Ref}
                className="w-10 pr-2 text-right text-gray-500 bg-gray-100 border-r border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 overflow-hidden select-none"
              >
                {lineNumbers1.map((num) => (
                  <div key={num} className="py-1">{num}</div>
                ))}
              </div>
              <textarea
                id="text1"
                ref={textarea1Ref}
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                onScroll={() => textarea1Ref.current && lineNumbers1Ref.current && 
                  syncScroll(textarea1Ref.current, lineNumbers1Ref.current)}
                className="w-full min-h-[200px] p-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-y"
                placeholder="Enter first text here..."
              />
            </div>
          </div>

          {/* Second Text Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="text2" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Second Text
              </label>
              <button
                onClick={() => copyToClipboard(text2, setCopied2)}
                disabled={!text2}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 disabled:opacity-50"
                title="Copy to clipboard"
              >
                {copied2 ? (
                  <>
                    <Check size={14} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="relative flex">
              <div 
                ref={lineNumbers2Ref}
                className="w-10 pr-2 text-right text-gray-500 bg-gray-100 border-r border-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600 overflow-hidden select-none"
              >
                {lineNumbers2.map((num) => (
                  <div key={num} className="py-1">{num}</div>
                ))}
              </div>
              <textarea
                id="text2"
                ref={textarea2Ref}
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                onScroll={() => textarea2Ref.current && lineNumbers2Ref.current && 
                  syncScroll(textarea2Ref.current, lineNumbers2Ref.current)}
                className="w-full min-h-[200px] p-3 text-gray-900 bg-gray-50 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-y"
                placeholder="Enter second text here..."
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={compare}
            disabled={isComparing || (!text1 && !text2)}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isComparing ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Comparing...</span>
              </>
            ) : (
              <span>Compare Texts</span>
            )}
          </button>
          <button
            onClick={clearAll}
            className="px-6 py-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:shadow-gray-900/30 transform hover:-translate-y-0.5"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Results Section */}
      {diffResult.length > 0 && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Comparison Results
          </h2>
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg overflow-auto max-h-[500px]">
            {diffResult.map((line) => (
              <div key={line.lineNum} className="mb-1">
                {renderDiffLine(line)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StringDiffChecker;
