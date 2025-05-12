import React, { useState } from 'react';

interface VerificationResult {
  isValid: boolean;
  algorithm?: string;
  error?: string;
}

const JWTVerifier: React.FC = () => {
  const [token, setToken] = useState('');
  const [secret, setSecret] = useState('');
  const [keyType, setKeyType] = useState<'secret' | 'public'>('secret');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [decodedJWT, setDecodedJWT] = useState<any>(null);

  const base64UrlDecode = (str: string): string => {
    let output = str
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }

    try {
      return atob(output);
    } catch (err) {
      throw new Error('Failed to decode base64url: ' + (err as Error).message);
    }
  };

  const stringToUint8Array = (str: string): Uint8Array => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      return { header, payload, signature: parts[2] };
    } catch (error) {
      throw new Error('JWT Decode Error: ' + (error as Error).message);
    }
  };

  const verifyJWTSignature = async (token: string, secret: string, keyType: 'secret' | 'public'): Promise<VerificationResult> => {
    if (keyType === 'public') {
      return {
        isValid: false,
        error: 'RSA/ECDSA(공개키) 검증은 아직 지원하지 않습니다.'
      };
    }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const alg = header.alg;

      const signatureBase = parts[0] + '.' + parts[1];
      const signatureData = stringToUint8Array(signatureBase);

      // Only supporting HS256 for simplicity
      if (alg !== 'HS256') {
        return {
          isValid: false,
          algorithm: alg,
          error: `Only HS256 algorithm is supported for verification. Token uses ${alg}.`
        };
      }

      // For HMAC signatures
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);

      // Create crypto key
      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['verify']
      );

      // Convert the base64url signature to ArrayBuffer
      const signatureParts = parts[2].replace(/-/g, '+').replace(/_/g, '/');
      let signatureStr = signatureParts;
      while (signatureStr.length % 4) {
        signatureStr += '=';
      }

      const signature = new Uint8Array(
        [...atob(signatureStr)].map(c => c.charCodeAt(0))
      );

      // Verify signature
      const isValid = await window.crypto.subtle.verify(
        { name: 'HMAC', hash: 'SHA-256' },
        cryptoKey,
        signature,
        signatureData
      );

      return { isValid, algorithm: alg };
    } catch (error) {
      return { isValid: false, error: (error as Error).message };
    }
  };

  const handleVerify = async () => {
    try {
      // First decode the token
      const decoded = decodeJWT(token);
      setDecodedJWT(decoded);

      // Then verify the signature
      const verified = await verifyJWTSignature(token, secret, keyType);
      setVerificationResult(verified);
    } catch (err) {
      setVerificationResult({
        isValid: false,
        error: (err as Error).message
      });
      setDecodedJWT(null);
    }
  };

  const handleKeyTypeChange = (type: 'secret' | 'public') => {
    setKeyType(type);
    setVerificationResult(null);
    setDecodedJWT(null);
  };

  return (
    <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        JWT Verification
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Verify a JWT token against a secret key or public key.
      </p>

      <div className="mb-6">
        <label htmlFor="jwt-verify-token" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          JWT Token:
        </label>
        <textarea
          id="jwt-verify-token"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your JWT token here"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label htmlFor="jwt-verify-secret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Secret Key or Public Key:
        </label>
        <textarea
          id="jwt-verify-secret"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter secret key or public key"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Key Type:
        </label>
        <div className="flex items-center mb-4">
          <input
            id="secret-key-radio"
            type="radio"
            name="key-type"
            value="secret"
            checked={keyType === 'secret'}
            onChange={() => handleKeyTypeChange('secret')}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="secret-key-radio" className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
            Secret Key (for HMAC)
          </label>
        </div>
      </div>

      <button
        onClick={handleVerify}
        className="btn-primary-violet"
      >
        Verify Signature
      </button>

      {verificationResult && (
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Verification Result:
          </label>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {verificationResult.error ? (
              <p className="text-red-700 dark:text-red-300">{verificationResult.error}</p>
            ) : (
              <>
                <p className={`font-bold ${verificationResult.isValid ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  {verificationResult.isValid ? '✓ Signature Valid' : '✗ Signature Invalid'}
                </p>
                <p>Algorithm: {verificationResult.algorithm}</p>
                {decodedJWT && (
                  <div className="mt-4">
                    <p className="font-medium">Decoded Header:</p>
                    <pre className="bg-gray-100 p-2 rounded dark:bg-gray-600 mt-1 mb-3 text-xs">
                      {JSON.stringify(decodedJWT.header, null, 2)}
                    </pre>
                    <p className="font-medium">Decoded Payload:</p>
                    <pre className="bg-gray-100 p-2 rounded dark:bg-gray-600 mt-1 text-xs">
                      {JSON.stringify(decodedJWT.payload, null, 2)}
                    </pre>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JWTVerifier; 