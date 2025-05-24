import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import CryptoJS from 'crypto-js';
import AdSection from '../../ads/AdSection';

const AESPage: React.FC = () => {
  const [mode, setMode] = useState<'CBC' | 'ECB'>('CBC');
  const [keySize, setKeySize] = useState<'16' | '24' | '32' | 'custom'>('16');
  const [customKeySize, setCustomKeySize] = useState('16');
  const [outputFormat, setOutputFormat] = useState<'base64' | 'hex'>('base64');
  const [key, setKey] = useState('');
  const [iv, setIv] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value as 'CBC' | 'ECB');
  };

  const encryptAES = () => {
    if (!input.trim() || !key.trim()) {
      toast.error('Please enter text and key.');
      return;
    }

    const keyParsed = CryptoJS.enc.Utf8.parse(key);
    const keyBytes = keyParsed.words.length * 4;
    const expectedBytes = keySize === 'custom' ? parseInt(customKeySize) : parseInt(keySize);
    
    if (keyBytes !== expectedBytes) {
      toast.error(`Key must be ${expectedBytes}bytes. Current: ${keyBytes}bytes`);
      return;
    }

    let ivParsed: CryptoJS.lib.WordArray | undefined = undefined;
    if (mode === 'CBC') {
      if (!iv.trim() || iv.length !== 16) {
        toast.error('When using CBC mode, enter 16 length IV.');
        return;
      }
      ivParsed = CryptoJS.enc.Utf8.parse(iv);
    }

    try {
      const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];
      const encrypted = CryptoJS.AES.encrypt(input, keyParsed, {
        mode: modeObj,
        iv: ivParsed,
        padding: CryptoJS.pad.Pkcs7,
      });

      const result = outputFormat === 'base64' 
        ? encrypted.toString() 
        : encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      
      setOutput(result);
    } catch (error) {
      toast.error('Encryption failed: ' + (error as Error).message);
    }
  };

  const decryptAES = () => {
    if (!input.trim() || !key.trim()) {
      toast.error('Please enter text and key.');
      return;
    }

    const keyParsed = CryptoJS.enc.Utf8.parse(key);
    const keyBytes = keyParsed.words.length * 4;
    const expectedBytes = keySize === 'custom' ? parseInt(customKeySize) : parseInt(keySize);
    
    if (keyBytes !== expectedBytes) {
      toast.error(`Key must be ${expectedBytes}bytes. Current: ${keyBytes}bytes`);
      return;
    }

    let ivParsed: CryptoJS.lib.WordArray | undefined = undefined;
    if (mode === 'CBC') {
      if (!iv.trim() || iv.length !== 16) {
        toast.error('When using CBC mode, enter 16 length IV.');
        return;
      }
      ivParsed = CryptoJS.enc.Utf8.parse(iv);
    }

    try {
      const modeObj = { CBC: CryptoJS.mode.CBC, ECB: CryptoJS.mode.ECB }[mode];
      let decrypted;

      if (/^[0-9A-Fa-f]+$/.test(input)) {
        const ciphertext = CryptoJS.enc.Hex.parse(input);
        const cipherParams = CryptoJS.lib.CipherParams.create({
          ciphertext: ciphertext,
        });
        decrypted = CryptoJS.AES.decrypt(cipherParams, keyParsed, {
          mode: modeObj,
          iv: ivParsed,
          padding: CryptoJS.pad.Pkcs7,
        });
      } else {
        decrypted = CryptoJS.AES.decrypt(input, keyParsed, {
          mode: modeObj,
          iv: ivParsed,
          padding: CryptoJS.pad.Pkcs7,
        });
      }

      const result = decrypted.toString(CryptoJS.enc.Utf8);
      if (!result) {
        toast.error('Decryption failed: Invalid key or data');
        return;
      }
      setOutput(result);
    } catch (error) {
      toast.error('Decryption failed: ' + (error as Error).message);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 pt-10 pb-24 sm:px-4 xl:px-4">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
        Developer Playground
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        AES Encrypt/Decrypt
      </h1>
      <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        AES (Advanced Encryption Standard) is a symmetric key encryption algorithm that uses the same key to encrypt and decrypt data.
      </p>
      <br />

      <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          AES Encryption/Decryption
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Encrypt or decrypt text using AES.
        </p>

        <div className="mb-6">
          <label htmlFor="aes-mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Mode
          </label>
          <select
            id="aes-mode"
            value={mode}
            onChange={handleModeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="CBC">CBC</option>
            <option value="ECB">ECB</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="aes-key-size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Key Size
          </label>
          <select
            id="aes-key-size"
            value={keySize}
            onChange={(e) => setKeySize(e.target.value as '16' | '24' | '32' | 'custom')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="16">AES-128 (16 bytes)</option>
            <option value="24">AES-192 (24 bytes)</option>
            <option value="32">AES-256 (32 bytes)</option>
            <option value="custom">Custom Size</option>
          </select>
        </div>

        {keySize === 'custom' && (
          <div className="mb-6">
            <label htmlFor="aes-custom-key-size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Custom Key Size (bytes)
            </label>
            <input
              type="number"
              id="aes-custom-key-size"
              min="1"
              value={customKeySize}
              onChange={(e) => setCustomKeySize(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter custom key size in bytes"
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="aes-output-format" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Output Format
          </label>
          <select
            id="aes-output-format"
            value={outputFormat}
            onChange={(e) => setOutputFormat(e.target.value as 'base64' | 'hex')}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="base64">Base64</option>
            <option value="hex">Hex</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="aes-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Key
          </label>
          <input
            type="text"
            id="aes-key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your key (to fit the length)"
          />
        </div>

        {mode === 'CBC' && (
          <div className="mb-6">
            <label htmlFor="aes-iv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              IV (CBC Mode, 16)
            </label>
            <input
              type="text"
              id="aes-iv"
              value={iv}
              onChange={(e) => setIv(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ex) : initializationv"
            />
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="aes-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Input
          </label>
          <textarea
            id="aes-input"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your text here"
          />
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={encryptAES}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/20 dark:shadow-emerald-900/30 transform hover:-translate-y-0.5"
          >
            Encrypt
          </button>
          <button
            onClick={decryptAES}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 dark:shadow-blue-900/30 transform hover:-translate-y-0.5"
          >
            Decrypt
          </button>
        </div>

        {output && (
          <div className="mb-6">
            <label htmlFor="aes-output" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Output
            </label>
            <div className="relative">
              <textarea
                id="aes-output"
                rows={5}
                value={output}
                readOnly
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Results are displayed here"
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
  );
};

export default AESPage; 