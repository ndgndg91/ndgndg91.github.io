import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

interface RSASignVerifyProps {
  publicKey: string;
  privateKey: string;
}

const RSASignVerify: React.FC<RSASignVerifyProps> = ({ publicKey, privateKey }) => {
  const [input, setInput] = useState('');
  const [signature, setSignature] = useState('');
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [rsaEncryptor] = useState(new JSEncrypt());

  const signRSA = () => {
    if (!input.trim() || !privateKey.trim()) {
      toast.error('Please enter text and private key.');
      return;
    }

    try {
      rsaEncryptor.setPrivateKey(privateKey);
      const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
      const signed = rsaEncryptor.sign(hash, (str: string) => str, 'sha256');
      setSignature(signed || 'Signing failed');
      setVerificationResult(null);
    } catch (error) {
      toast.error('Signing failed: ' + (error as Error).message);
    }
  };

  const verifyRSA = () => {
    if (!input.trim() || !publicKey.trim() || !signature.trim()) {
      toast.error('Please enter text, public key, and signature.');
      return;
    }

    try {
      rsaEncryptor.setPublicKey(publicKey);
      const hash = CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex);
      const isValid = rsaEncryptor.verify(hash, signature, (str: string) => str);
      setVerificationResult(isValid ? 'Signature is valid' : 'Signature is invalid');
    } catch (error) {
      toast.error('Verification failed: ' + (error as Error).message);
    }
  };

  const copyToClipboard = () => {
    if (!signature) return;
    navigator.clipboard.writeText(signature);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="mb-6">
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        RSA Sign/Verify
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Sign or verify text using RSA public and private keys.
      </p>

      <div className="mb-6">
        <label htmlFor="rsa-sign-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Input
        </label>
        <textarea
          id="rsa-sign-input"
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your text here"
        />
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={signRSA}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-teal-500/20 dark:shadow-teal-900/30 transform hover:-translate-y-0.5"
        >
          Sign
        </button>
        <button
          onClick={verifyRSA}
          className="px-6 py-3 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-semibold rounded-lg hover:from-sky-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-sky-500/20 dark:shadow-sky-900/30 transform hover:-translate-y-0.5"
        >
          Verify
        </button>
      </div>

      {signature && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="rsa-sign-output" className="block text-sm font-medium text-gray-900 dark:text-white">
              Signature
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
            id="rsa-sign-output"
            rows={5}
            value={signature}
            readOnly
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Signature will appear here"
          />
        </div>
      )}

      {verificationResult && (
        <div className="mb-6">
          <div className={`p-4 rounded-lg border ${
            verificationResult === 'Signature is valid'
              ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' 
              : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'
          }`}>
            <p className={`text-sm font-medium ${
              verificationResult === 'Signature is valid'
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {verificationResult}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RSASignVerify; 