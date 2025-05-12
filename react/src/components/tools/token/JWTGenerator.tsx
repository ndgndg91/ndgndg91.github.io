import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const JWTGenerator: React.FC = () => {
  const [header, setHeader] = useState(JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2));
  const [payload, setPayload] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return JSON.stringify({
      sub: '1234567890',
      name: 'John Doe',
      iat: now,
      exp: now + 3600 // Token expires in 1 hour
    }, null, 2);
  });
  const [secret, setSecret] = useState('');
  const [algorithm, setAlgorithm] = useState('HS256');
  const [generatedToken, setGeneratedToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const base64UrlEncode = (str: string): string => {
    return btoa(str)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const stringToUint8Array = (str: string): Uint8Array => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  const generateJWT = async () => {
    try {
      setError(null);
      
      // Parse header and payload
      const headerObj = JSON.parse(header);
      const payloadObj = JSON.parse(payload);

      // Support only HS256 for simplicity
      headerObj.alg = 'HS256';
      headerObj.typ = 'JWT';

      // Encode header and payload
      const encodedHeader = base64UrlEncode(JSON.stringify(headerObj));
      const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj));

      // Create token without signature
      const signatureBase = encodedHeader + '.' + encodedPayload;

      // Create key for signing
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      );

      // Create signature
      const signatureData = stringToUint8Array(signatureBase);
      const signatureBuffer = await window.crypto.subtle.sign(
        { name: 'HMAC', hash: 'SHA-256' },
        cryptoKey,
        signatureData
      );

      // Convert ArrayBuffer to Base64URL
      const signatureBytes = new Uint8Array(signatureBuffer);
      let signatureBase64 = btoa(String.fromCharCode.apply(null, Array.from(signatureBytes)));
      const signature = signatureBase64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

      // Complete JWT
      setGeneratedToken(signatureBase + '.' + signature);
    } catch (err) {
      setError((err as Error).message);
      setGeneratedToken('');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedToken);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed: ', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        JWT Generator
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Create a new JWT token by setting the header, payload, and signing with a secret key.
      </p>

      <div className="mb-6">
        <label htmlFor="jwt-generate-header" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Header (JSON):
        </label>
        <textarea
          id="jwt-generate-header"
          rows={3}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="jwt-generate-payload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Payload (JSON):
        </label>
        <textarea
          id="jwt-generate-payload"
          rows={6}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="jwt-generate-secret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Secret Key:
        </label>
        <input
          type="text"
          id="jwt-generate-secret"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="your-256-bit-secret"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="jwt-algorithm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Algorithm:
        </label>
        <select
          id="jwt-algorithm"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
        >
          <option value="HS256">HS256 (HMAC with SHA-256)</option>
          <option value="HS384">HS384 (HMAC with SHA-384)</option>
          <option value="HS512">HS512 (HMAC with SHA-512)</option>
        </select>
      </div>

      <button
        onClick={generateJWT}
        className="btn-primary-violet"
      >
        Generate JWT
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-100 rounded-lg dark:bg-red-900">
          <p className="text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {generatedToken && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="jwt-generated-token" className="block text-sm font-medium text-gray-900 dark:text-white">
              Generated JWT:
            </label>
            <button
              onClick={copyToClipboard}
              className={`px-4 py-2 flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-sky-500 hover:bg-sky-600 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <textarea
            id="jwt-generated-token"
            rows={4}
            readOnly
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={generatedToken}
          />
        </div>
      )}
    </div>
  );
};

export default JWTGenerator; 