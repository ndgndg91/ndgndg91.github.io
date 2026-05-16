import React, { useState, useEffect, useMemo } from 'react';
import { useJsonParser } from './useJsonParser';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import SEOHead from '../../SEOHead';
import { seoData } from '../../../data/seoData';

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
    <>
      <SEOHead {...seoData.jsonParser} />
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
      
      {/* Bottom Ad */}
      
      <div className="mt-12 prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is JSON?</h2>
        <p className="mb-4">
          JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write, and easy for machines to parse and generate. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Supported JSON Data Types</h3>
        <p className="mb-4">Standard JSON supports the following six basic data types:</p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>String:</strong> A sequence of zero or more Unicode characters, wrapped in double quotes.</li>
          <li><strong>Number:</strong> A signed decimal number that may contain a fractional part and use exponential E notation.</li>
          <li><strong>Object:</strong> An unordered set of name/value pairs (keys must be strings).</li>
          <li><strong>Array:</strong> An ordered collection of values.</li>
          <li><strong>Boolean:</strong> Either <code>true</code> or <code>false</code>.</li>
          <li><strong>Null:</strong> An empty value, using the word <code>null</code>.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">JSON vs. XML: Why Choose JSON?</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2">Feature</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2">JSON</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2">XML</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Readability</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Higher (concise)</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Lower (verbose)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Data Types</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Strings, Numbers, Arrays</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">All data is Strings</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Parsing Speed</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Faster (Native JS support)</td>
                <td className="border border-gray-300 dark:border-gray-700 p-2">Slower</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to use this JSON Parser</h2>
        <p className="mb-4">
          Paste your minified or unformatted JSON string into the <strong>Input</strong> area. Select your preferred indentation level (2, 4, or 8 spaces), and click <strong>Parse JSON</strong>. The formatted and color-coded JSON will be displayed in the <strong>Output</strong> area. If there are any syntax errors in your JSON, a helpful error message will be shown instead.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">JSON Security Best Practices</h2>
        <p className="mb-4">
          When working with JSON in your own applications, follow these security guidelines:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Never use eval():</strong> To convert a JSON string into an object, always use <code>JSON.parse()</code>. Using <code>eval()</code> can execute malicious scripts embedded in the data.</li>
          <li><strong>Sanitize Inputs:</strong> Even if the data is valid JSON, validate the actual content before using it in database queries or UI rendering to prevent XSS.</li>
          <li><strong>Secure Transmission:</strong> Always send JSON over HTTPS to prevent man-in-the-middle attacks from intercepting sensitive data.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-4 mb-8">
          <div>
            <h4 className="font-bold">Can JSON have comments?</h4>
            <p>The official JSON standard (RFC 8259) does not support comments. However, some variants like JSONC (JSON with Comments) allow them, but standard parsers will throw an error.</p>
          </div>
          <div>
            <h4 className="font-bold">What is the difference between JSON and a JavaScript Object?</h4>
            <p>JSON is a <strong>string format</strong> used for data transfer, while a JavaScript Object is a <strong>data structure</strong> in memory. JSON requires double quotes for keys and has stricter syntax rules.</p>
          </div>
          <div>
            <h4 className="font-bold">Is there a size limit for JSON?</h4>
            <p>Theoretically, no. However, practical limits depend on the memory of the system parsing the JSON and the maximum string size of the language being used.</p>
          </div>
        </div>
      </div>
    </div>
        </>
  );
};

export default JsonParserTool;
