import React from 'react';
import {useBase64} from './useBase64';
import SEOHead from '../../SEOHead';
import { seoData } from '../../../data/seoData';

const Base64Tool: React.FC = () => {
    const {input, output, error, setInput, encode, decode, clearAll, copyToClipboard} = useBase64();

    return (
        <>
            <SEOHead {...seoData.base64} />
            <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
                <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
                   data-section="true">
                    Developer Playground
                </p>
                <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
                    Base64
                </h1>
                <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
                    Base64 is a method of converting text or files into 64 characters so that the data can be
                    transmitted or stored safely.
                </p>
                <br/>
                <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-6">
                        <label htmlFor="base64-input"
                               className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
                            Input
                        </label>
                        <textarea
                            id="base64-input"
                            rows={10}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter your text here"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 flex gap-4">
                        <button
                            onClick={encode}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
                        >
                            <span className="drop-shadow-sm">Encode</span>
                        </button>
                        <button
                            onClick={decode}
                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-cyan-500/20 dark:shadow-cyan-900/30 transform hover:-translate-y-0.5"
                        >
                            <span className="drop-shadow-sm">Decode</span>
                        </button>
                        <button
                            onClick={clearAll}
                            className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-500 hover:to-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20 dark:shadow-gray-900/30 transform hover:-translate-y-0.5"
                        >
                            <span className="drop-shadow-sm">Clear All</span>
                        </button>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="base64-output"
                                   className="text-2xl font-medium text-gray-900 dark:text-white">
                                Output
                            </label>
                            <button
                                onClick={() => copyToClipboard(error || output)}
                                disabled={!output && !error}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Copy to clipboard"
                            >
                                Copy
                            </button>
                        </div>
                        <textarea
                            id="base64-output"
                            rows={10}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Results are displayed here"
                            readOnly
                            value={error || output}
                        />
                    </div>
                </div>
                
                {/* Bottom Ad */}
                
                <div className="mt-12 prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is Base64 Encoding?</h2>
                    <p className="mb-4">
                        Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It is commonly used when there is a need to encode binary data that needs to be stored and transferred over media that are designed to deal with textual data. This ensures that the data remains intact without modification during transport.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How Base64 Works</h3>
                    <p className="mb-4">
                        The encoding process works by dividing every 3 bytes (24 bits) of data into four 6-bit units. Each 6-bit unit is then mapped to one of the 64 characters in the Base64 alphabet (A-Z, a-z, 0-9, <code>+</code>, <code>/</code>).
                    </p>
                    <ul className="list-disc pl-6 mb-4">
                        <li><strong>Input:</strong> 3 Bytes = 24 Bits</li>
                        <li><strong>Processing:</strong> 4 units of 6 Bits</li>
                        <li><strong>Output:</strong> 4 ASCII Characters</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Meaning of Padding (=)</h3>
                    <p className="mb-4">
                        You may often see one or two <code>=</code> characters at the end of a Base64 string. This is called <strong>padding</strong>. Since Base64 expects units of 3 bytes, if the input data is not a multiple of 3, extra bits are added and represented by the <code>=</code> sign to ensure the final string has the correct length.
                    </p>

                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Encoding vs. Encryption</h2>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 mb-6">
                        <p className="text-amber-800 dark:text-amber-200 font-bold">Important Notice:</p>
                        <p className="text-amber-700 dark:text-amber-300">
                            Base64 is <strong>NOT encryption</strong>. It is a simple data transformation. Anyone can easily decode a Base64 string back to its original form. Never use Base64 to "hide" or "secure" sensitive passwords or private data. For actual security, use the <a href="/tools/encrypt-decrypt/aes" className="underline">AES Encryption Tool</a>.
                        </p>
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Common Use Cases</h2>
                    <ul className="list-disc pl-6 mb-4">
                        <li><strong>Data URIs:</strong> Embedding small images or fonts directly into CSS or HTML files.</li>
                        <li><strong>Email Attachments:</strong> Sending non-text files via SMTP (which is text-based).</li>
                        <li><strong>Basic Auth:</strong> Sending usernames and passwords in HTTP headers (always use with HTTPS!).</li>
                    </ul>

                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Is my data secure?</h2>
                    <p className="mb-4">
                        Yes! This Base64 encoder and decoder works entirely within your web browser using JavaScript. Your input data is never sent to any external server, ensuring your sensitive information remains private and secure on your own device.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Base64Tool;
