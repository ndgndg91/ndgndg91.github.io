import React from 'react';
import useHtmlEscape from '../../../hooks/useHtmlEscape';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const HtmlEscapeUnescape: React.FC = () => {
  const {
    input,
    output,
    error,
    setInput,
    handleEscape,
    handleUnescape,
    loadTestExample,
    copyToClipboard
  } = useHtmlEscape();

  return (
      <>
  <SEOHead {...seoData.htmlEscape} />
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
        Developer Playground
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-900 dark:text-white">
        HTML Escape / Unescape
      </h1>
      <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        Escape or unescape HTML entities in your text
      </p>
      
      <div className="mt-8 space-y-6">
        {/* Input Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="html-string-input" className="block mb-2 text-xl font-medium text-gray-900 dark:text-white">
            Input
          </label>
          <div className="mb-4">
            <textarea
              id="html-string-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block w-full p-4 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter HTML to escape/unescape..."
              rows={10}
            />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleEscape}
              disabled={!input}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 dark:shadow-blue-900/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Escape HTML
            </button>
            <button
              onClick={handleUnescape}
              disabled={!input}
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 dark:shadow-green-900/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Unescape HTML
            </button>
            <button
              onClick={loadTestExample}
              className="px-6 py-2.5 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-medium rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:shadow-gray-900/30 transform hover:-translate-y-0.5"
            >
              Load Test Example
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white">
              Output
            </h2>
            <button
              onClick={() => copyToClipboard(output)}
              disabled={!output}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              title="Copy to clipboard"
            >
              Copy to Clipboard
            </button>
          </div>
          
          {error ? (
            <div className="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
              {error}
            </div>
          ) : (
            <pre className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg overflow-auto">
              <code className="text-sm text-gray-900 dark:text-gray-100 break-words whitespace-pre-wrap">
                {output || 'Result will appear here...'}
              </code>
            </pre>
          )}
        </div>
        
        {/* Information Section */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            About HTML Escape/Unescape
          </h2>
          <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
            <p className="text-gray-800 dark:text-gray-200">
              This tool helps you escape special HTML characters to their corresponding HTML entities or unescape HTML entities back to their original characters.
            </p>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Examples:</h3>
            <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-800 dark:text-gray-200">
              <li className="text-gray-800 dark:text-gray-200">
                <code className="text-blue-700 dark:text-blue-300">&lt;div&gt;</code> becomes <code className="text-blue-700 dark:text-blue-300">&amp;lt;div&amp;gt;</code> (escaped)
              </li>
              <li className="text-gray-800 dark:text-gray-200">
                <code className="text-blue-700 dark:text-blue-300">&amp;lt;div&amp;gt;</code> becomes <code className="text-blue-700 dark:text-blue-300">&lt;div&gt;</code> (unescaped)
              </li>
              <li className="text-gray-800 dark:text-gray-200">
                <code className="text-blue-700 dark:text-blue-300">&quot;Hello&quot;</code> becomes <code className="text-blue-700 dark:text-blue-300">&amp;quot;Hello&amp;quot;</code> (escaped)
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom Ad */}
      
      <div className="mt-12 prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Why Escape HTML?</h2>
        <p className="mb-4">
          HTML escaping is a critical security measure used to prevent <strong>Cross-Site Scripting (XSS)</strong> attacks. By converting special characters (like <code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, <code>&quot;</code>, and <code>&#39;</code>) into HTML entities, you ensure that web browsers treat user input as <strong>plain text</strong> rather than executable code or HTML markup.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How XSS Prevention Works</h3>
        <p className="mb-4">
          Imagine a user enters a comment: <code>&lt;script&gt;alert('Hacked!')&lt;/script&gt;</code>. If your site displays this directly, the browser will execute the script. By escaping it, the text becomes:
          <br />
          <code>&amp;lt;script&amp;gt;alert(&amp;#39;Hacked!&amp;#39;)&amp;lt;/script&amp;gt;</code>
          <br />
          The browser will now safely display the literal characters instead of running the code.
        </p>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Common HTML Entities Table</h3>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2">Character</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2">Entity Name</th>
                <th className="border border-gray-300 dark:border-gray-700 p-2">Entity Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&lt;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;lt;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;#60;</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&gt;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;gt;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;#62;</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;amp;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;#38;</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&quot;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;quot;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;#34;</code></td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&#39;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;apos;</code></td>
                <td className="border border-gray-300 dark:border-gray-700 p-2"><code>&amp;#39;</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Escaping vs. Sanitizing</h2>
        <p className="mb-4">
          It's important to understand the difference between these two security concepts:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Escaping:</strong> Converts all special characters into safe entities. The output will display exactly as the input but cannot be rendered as HTML.</li>
          <li><strong>Sanitizing:</strong> Removes or strips out dangerous HTML tags and attributes (like <code>&lt;script&gt;</code> or <code>onclick</code>) while allowing "safe" tags like <code>&lt;b&gt;</code> or <code>&lt;i&gt;</code> to remain. This is used when you want to allow some rich-text formatting.</li>
        </ul>
        <p className="mb-4 italic text-sm">
          Recommendation: Always <strong>Escape</strong> by default. Only use <strong>Sanitization</strong> (via libraries like DOMPurify) if you explicitly need to render user-provided HTML.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to use this tool</h2>
        <p className="mb-4">
          Enter your raw HTML or text into the Input area. Click <strong>Escape HTML</strong> to safely encode characters for web display. Click <strong>Unescape HTML</strong> to decode previously escaped text back to its original form. You can also use the <strong>Load Test Example</strong> button to see how it works instantly.
        </p>
      </div>
    </div>
      </>
  );
};

export default HtmlEscapeUnescape;
