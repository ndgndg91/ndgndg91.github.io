import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import AdSection from '../../ads/AdSection';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const SHA3Page: React.FC = () => {
  const [mode, setMode] = useState<'hash' | 'hmac'>('hash');
  const [variant, setVariant] = useState<'224' | '256' | '384' | '512'>('256');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [key, setKey] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const calculateSHA3 = async () => {
    try {
      if (!input.trim()) {
        toast.error('Please enter input value.');
        return;
      }

      if (mode === 'hmac' && !key.trim()) {
        toast.error('Secret Key is required for HMAC mode.');
        return;
      }

      let result: string;
      if (mode === 'hmac') {
        const hmac = CryptoJS.HmacSHA3(input, key);
        result = outputFormat === 'hex' ? hmac.toString() : CryptoJS.enc.Base64.stringify(hmac);
      } else {
        const hash = CryptoJS.SHA3(input, { outputLength: parseInt(variant) });
        result = outputFormat === 'hex' ? hash.toString() : CryptoJS.enc.Base64.stringify(hash);
      }

      setOutput(result);
    } catch (error) {
      toast.error('An error occurred during calculation.');
      console.error('SHA-3 calculation error:', error);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
      <>
      <SEOHead {...seoData.sha3} />
      <div className="w-full max-w-5xl mx-auto px-2 pt-10 pb-24 sm:px-4 xl:px-4">
        <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
          Developer Playground
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
          SHA-3 Hash & HMAC
        </h1>
        <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
          SHA-3 (Secure Hash Algorithm 3) is the latest hash function based on the Keccak algorithm. It supports multiple
          output sizes: SHA3-224 (224-bit), SHA3-256 (256-bit), SHA3-384 (384-bit), and SHA3-512 (512-bit). Optionally,
          enable HMAC mode to use a secret key.
        </p>
        <br />

        <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            SHA-3 Hash Generator
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Generate SHA-3 hash or HMAC for your input text.
          </p>

          <div className="mb-6">
            <label htmlFor="sha3-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mode
            </label>
            <select
              id="sha3-mode"
              value={mode}
              onChange={(e) => setMode(e.target.value as 'hash' | 'hmac')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="hash">Hash</option>
              <option value="hmac">HMAC</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="sha3-variant" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Hash Variant
            </label>
            <select
              id="sha3-variant"
              value={variant}
              onChange={(e) => setVariant(e.target.value as '224' | '256' | '384' | '512')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="224">SHA3-224</option>
              <option value="256">SHA3-256</option>
              <option value="384">SHA3-384</option>
              <option value="512">SHA3-512</option>
            </select>
          </div>

          <div className="mb-6">
            <label htmlFor="sha3-output-format" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Output Format
            </label>
            <select
              id="sha3-output-format"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as 'hex' | 'base64')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="hex">Hex</option>
              <option value="base64">Base64</option>
            </select>
          </div>

          {mode === 'hmac' && (
            <div className="mb-6">
              <label htmlFor="sha3-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Secret Key
              </label>
              <textarea
                id="sha3-key"
                rows={3}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Secret Key for HMAC"
              />
            </div>
          )}

          <div className="mb-6">
            <label htmlFor="sha3-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Input
            </label>
            <textarea
              id="sha3-input"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter text to hash"
            />
          </div>

          <button
            onClick={calculateSHA3}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
          >
            Generate Hash
          </button>

          {output && (
            <div className="mt-6">
              <label htmlFor="sha3-output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Output
              </label>
              <div className="relative">
                <textarea
                  id="sha3-output"
                  rows={5}
                  value={output}
                  readOnly
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Result will be displayed here"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            </div>
          )}
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

export default SHA3Page; 