import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import JSEncrypt from 'jsencrypt';
import RSAEncryptDecrypt from './RSAEncryptDecrypt';
import RSASignVerify from './RSASignVerify';
import AdSection from '../../ads/AdSection';

const RSAPage: React.FC = () => {
  const [publicKey, setPublicKey] = useState('');
  const [privateKey, setPrivateKey] = useState('');

  const generateRSAKeys = () => {
    try {
      const newRSAEncryptor = new JSEncrypt({ default_key_size: '2048' });
      setPublicKey(newRSAEncryptor.getPublicKey() || '');
      setPrivateKey(newRSAEncryptor.getPrivateKey() || '');
      toast.success('RSA key pair generated successfully');
    } catch (error) {
      toast.error('Failed to generate RSA key pair: ' + (error as Error).message);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 pt-10 pb-24 sm:px-4 xl:px-4">
      <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
        Developer Playground
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        RSA Encrypt/Decrypt/Sign
      </h1>
      <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        RSA is an asymmetric encryption algorithm that uses public and private keys. It encrypts with the public key and decrypts with the private key. It can also be used for digital signatures.
      </p>
      <br />

      <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          RSA Key Pair
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Generate or enter your RSA key pair.
        </p>

        <div className="mb-6">
          <button
            onClick={generateRSAKeys}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 dark:shadow-indigo-900/30 transform hover:-translate-y-0.5"
          >
            Generate Key Pair
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="rsa-public-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Public Key
          </label>
          <textarea
            id="rsa-public-key"
            rows={3}
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Display after generating key pair"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="rsa-private-key" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Private Key
          </label>
          <textarea
            id="rsa-private-key"
            rows={3}
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Display after generating key pair"
          />
        </div>

        <RSAEncryptDecrypt publicKey={publicKey} privateKey={privateKey} />
        <RSASignVerify publicKey={publicKey} privateKey={privateKey} />
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

export default RSAPage; 