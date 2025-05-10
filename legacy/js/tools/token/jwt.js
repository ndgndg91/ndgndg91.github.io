/**
 * JWT Tool - JavaScript functionality
 * Provides decoding, verification, and generation of JWT tokens using browser APIs
 */
import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'

document.addEventListener('DOMContentLoaded', () => {
  // Elements for JWT decoding
  const jwtInput = document.getElementById('jwt-input');
  const decodeButton = document.getElementById('decode-jwt-button');
  const headerDisplay = document.getElementById('jwt-header');
  const payloadDisplay = document.getElementById('jwt-payload');
  const signatureStatus = document.getElementById('jwt-signature-status');

  // Elements for JWT generation
  const jwtGenerateHeader = document.getElementById('jwt-generate-header');
  const jwtGeneratePayload = document.getElementById('jwt-generate-payload');
  const jwtGenerateSecret = document.getElementById('jwt-generate-secret');
  const jwtAlgorithm = document.getElementById('jwt-algorithm');
  const generateButton = document.getElementById('generate-jwt-button');
  const generatedToken = document.getElementById('jwt-generated-token');
  const copyButton = document.getElementById('copy-jwt-button');

  // Elements for JWT verification
  const jwtVerifyToken = document.getElementById('jwt-verify-token');
  const jwtVerifySecret = document.getElementById('jwt-verify-secret');
  const secretKeyRadio = document.getElementById('secret-key-radio');
  const publicKeyRadio = document.getElementById('public-key-radio');
  const verifyButton = document.getElementById('verify-jwt-button');
  const verificationResult = document.getElementById('jwt-verification-result');

  // Set default values
  if (jwtGenerateHeader) {
    jwtGenerateHeader.value = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2);
  }

  if (jwtGeneratePayload) {
    const now = Math.floor(Date.now() / 1000);
    jwtGeneratePayload.value = JSON.stringify({
      sub: '1234567890',
      name: 'John Doe',
      iat: now,
      exp: now + 3600 // Token expires in 1 hour
    }, null, 2);
  }

  // Base64 URL Safe encoding/decoding functions
  const base64UrlEncode = (str) => {
    return btoa(str)
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const base64UrlDecode = (str) => {
    let output = str
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    // Add padding if needed
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
      throw new Error('Failed to decode base64url: ' + err.message);
    }
  };

  // String to UTF-8 ArrayBuffer conversion
  const stringToUint8Array = (str) => {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  // Convert ArrayBuffer to Hex string
  const bufferToHex = (buffer) => {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  // Simple decode JWT function (without verification)
  const decodeJWT = (token) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));

      return { header, payload, signature: parts[2] };
    } catch (error) {
      console.error('JWT Decode Error:', error);
      return { error: error.message };
    }
  };

  // JWT signature verification using Web Crypto API
  const verifyJWTSignature = async (token, secret) => {
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
      console.error('JWT Verification Error:', error);
      return { error: error.message };
    }
  };

  // JWT generation using Web Crypto API
  const generateJWT = async (header, payload, secret) => {
    try {
      // Parse header and payload
      const headerObj = typeof header === 'string' ? JSON.parse(header) : header;
      const payloadObj = typeof payload === 'string' ? JSON.parse(payload) : payload;

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
      let signatureBase64 = btoa(String.fromCharCode.apply(null, signatureBytes));
      const signature = signatureBase64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

      // Complete JWT
      return signatureBase + '.' + signature;
    } catch (error) {
      console.error('JWT Generation Error:', error);
      return { error: error.message };
    }
  };

  // Event listeners
  if (decodeButton) {
    decodeButton.addEventListener('click', () => {
      const token = jwtInput.value.trim();
      if (!token) {
        alert('Please enter a JWT token');
        return;
      }

      const decoded = decodeJWT(token);
      if (decoded.error) {
        headerDisplay.querySelector('pre').textContent = 'Error: ' + decoded.error;
        payloadDisplay.querySelector('pre').textContent = '';
        signatureStatus.innerHTML = '<span class="text-red-500">Invalid token format</span>';
        return;
      }

      headerDisplay.querySelector('pre').textContent = JSON.stringify(decoded.header, null, 2);
      payloadDisplay.querySelector('pre').textContent = JSON.stringify(decoded.payload, null, 2);

      // Add expiration information if present
      if (decoded.payload.exp) {
        const expDate = new Date(decoded.payload.exp * 1000);
        const now = new Date();
        const isExpired = now > expDate;

        let expiryInfo = `<div class="mt-2">
          <strong>Expiration:</strong> ${expDate.toLocaleString()}<br>
          <span class="${isExpired ? 'text-red-500' : 'text-green-500'}">
            ${isExpired ? 'Token has expired' : 'Token is valid'}
          </span>
        </div>`;

        payloadDisplay.querySelector('pre').innerHTML += expiryInfo;
      }

      signatureStatus.innerHTML = '<span class="text-yellow-500">Signature not verified (no secret key provided)</span>';
    });
  }

  if (generateButton) {
    generateButton.addEventListener('click', async () => {
      try {
        const header = jwtGenerateHeader.value.trim();
        const payload = jwtGeneratePayload.value.trim();
        const secret = jwtGenerateSecret.value.trim();

        if (!header || !payload || !secret) {
          alert('Please fill in all fields');
          return;
        }

        // Parse JSON to validate
        JSON.parse(header);
        JSON.parse(payload);

        const token = await generateJWT(header, payload, secret);
        if (token.error) {
          generatedToken.value = 'Error: ' + token.error;
          return;
        }

        generatedToken.value = token;
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', () => {
      generatedToken.select();
      document.execCommand('copy');
      alert('JWT copied to clipboard');
    });
  }

  if (verifyButton) {
    verifyButton.addEventListener('click', async () => {
      const token = jwtVerifyToken.value.trim();
      const secret = jwtVerifySecret.value.trim();

      if (!token || !secret) {
        alert('Please enter both a token and a secret key');
        return;
      }

      // First decode the token
      const decoded = decodeJWT(token);
      if (decoded.error) {
        verificationResult.innerHTML = `<p class="text-red-500">Error: ${decoded.error}</p>`;
        return;
      }

      // Then verify the signature
      const verified = await verifyJWTSignature(token, secret);
      if (verified.error) {
        verificationResult.innerHTML = `<p class="text-red-500">Error: ${verified.error}</p>`;
        return;
      }

      if (verified.isValid) {
        verificationResult.innerHTML = `
          <p class="text-green-500 font-bold">✓ Signature Valid</p>
          <p>Algorithm: ${verified.algorithm}</p>
          <div class="mt-4">
            <p class="font-medium">Decoded Header:</p>
            <pre class="bg-gray-100 p-2 rounded dark:bg-gray-600 mt-1 mb-3 text-xs">${JSON.stringify(decoded.header, null, 2)}</pre>
            <p class="font-medium">Decoded Payload:</p>
            <pre class="bg-gray-100 p-2 rounded dark:bg-gray-600 mt-1 text-xs">${JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>
        `;

        // Add expiration check
        if (decoded.payload.exp) {
          const expDate = new Date(decoded.payload.exp * 1000);
          const now = new Date();
          const isExpired = now > expDate;

          verificationResult.innerHTML += `
            <div class="mt-3 p-2 ${isExpired ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'} rounded">
              <p class="font-medium">Expiration Status:</p>
              <p>${expDate.toLocaleString()}</p>
              <p class="${isExpired ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'} font-bold">
                ${isExpired ? '⚠️ Token has expired' : '✓ Token is valid (not expired)'}
              </p>
            </div>
          `;
        }
      } else {
        verificationResult.innerHTML = `
          <p class="text-red-500 font-bold">✗ Signature Invalid</p>
          <p>The signature does not match the payload and header</p>
          <p>Algorithm: ${verified.algorithm || decoded.header.alg}</p>
        `;
      }
    });
  }
});
