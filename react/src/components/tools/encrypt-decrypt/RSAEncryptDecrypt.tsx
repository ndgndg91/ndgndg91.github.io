import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

interface RSAEncryptDecryptProps {
  publicKey: string;
  privateKey: string;
}

const RSAEncryptDecrypt: React.FC<RSAEncryptDecryptProps> = ({ publicKey, privateKey }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [rsaEncryptor] = useState(new JSEncrypt());

  const encryptRSA = () => {
    if (!input.trim() || !publicKey.trim()) {
      toast.error('Please enter text and public key.');
      return;
    }

    try {
      rsaEncryptor.setPublicKey(publicKey);
      const encrypted = rsaEncryptor.encrypt(input);
      setOutput(encrypted || 'Encryption failed');
    } catch (error) {
      toast.error('Encryption failed: ' + (error as Error).message);
    }
  };

  const decryptRSA = () => {
    if (!input.trim() || !privateKey.trim()) {
      toast.error('Please enter text and private key.');
      return;
    }

    try {
      rsaEncryptor.setPrivateKey(privateKey);
      const decrypted = rsaEncryptor.decrypt(input);
      if (!decrypted) {
        toast.error('Decryption failed: Invalid key or data');
        return;
      }
      setOutput(decrypted);
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
    <div className="mb-6">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        RSA Encryption/Decryption
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Encrypt or decrypt text using RSA public and private keys.
      </p>

      <div className="mb-6">
        <label htmlFor="rsa-encrypt-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Input
        </label>
        <textarea
          id="rsa-encrypt-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your text here"
        />
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={encryptRSA}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-fuchsia-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 dark:shadow-purple-900/30 transform hover:-translate-y-0.5"
        >
          Encrypt
        </button>
        <button
          onClick={decryptRSA}
          className="px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/20 dark:shadow-pink-900/30 transform hover:-translate-y-0.5"
        >
          Decrypt
        </button>
      </div>

      {output && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="rsa-encrypt-output" className="block text-sm font-medium text-gray-900 dark:text-white">
              Output
            </label>
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <svg className="h-4 w-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy
            </button>
          </div>
          <textarea
            id="rsa-encrypt-output"
            rows={5}
            value={output}
            readOnly
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Results are displayed here"
          />
        </div>
      )}
    </div>
  );
};

export default RSAEncryptDecrypt; 