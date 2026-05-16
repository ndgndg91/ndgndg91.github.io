import React from 'react';
import JWTDecoder from './JWTDecoder';
import JWTGenerator from './JWTGenerator';
import JWTVerifier from './JWTVerifier';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const JWTPage: React.FC = () => {
  return (
      <>
      <SEOHead {...seoData.jwt} />
    <div className="mx-auto grid w-full max-w-full grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_var(--container-2xs)]">
      <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
        <p className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400">
          Developer Playground
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
          JWT Tool
        </h1>
        <p className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
          JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. This tool allows you to decode, verify, and generate JWTs. JWTs are commonly used for authentication and information exchange in web applications.
        </p>
        <br />
        
        <JWTGenerator />
        <br />
        <JWTDecoder />
        <br />
        <JWTVerifier />
        <br />

        <div className="max-w-screen p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Common JWT Claims
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            The following are standard JWT claims that you can include in your payload:
          </p>
          
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Claim</th>
                <th scope="col" className="px-6 py-3">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">iss</td>
                <td className="px-6 py-4">Issuer of the token</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">sub</td>
                <td className="px-6 py-4">Subject of the token (usually user ID)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">aud</td>
                <td className="px-6 py-4">Audience the token is intended for</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">exp</td>
                <td className="px-6 py-4">Expiration time (Unix timestamp)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">nbf</td>
                <td className="px-6 py-4">Not before time (Unix timestamp)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">iat</td>
                <td className="px-6 py-4">Issued at time (Unix timestamp)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium">jti</td>
                <td className="px-6 py-4">JWT ID (unique identifier for the token)</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Bottom Ad */}
        
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What is a JSON Web Token (JWT)?</h2>
          <p className="mb-4">
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">JWT vs. Session-based Auth</h3>
          <p className="mb-4">Why use JWT instead of traditional sessions?</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Stateless:</strong> The server doesn't need to store session data in memory or a database. Everything required to identify the user is inside the token.</li>
            <li><strong>Scalability:</strong> Since it's stateless, any server in a cluster can verify the token, making horizontal scaling much easier.</li>
            <li><strong>Cross-Domain:</strong> JWTs work seamlessly across different domains and mobile apps, whereas cookies/sessions often face CORS limitations.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Common JWT Vulnerabilities</h3>
          <p className="mb-4">When implementing JWT, beware of these common security pitfalls:</p>
          <ul className="list-disc pl-6 mb-4">
            <li><strong>Weak Secret Keys:</strong> Using a simple or short secret makes it easy for attackers to brute-force the signature. Always use a long, complex, cryptographically secure key.</li>
            <li><strong>The "None" Algorithm:</strong> Some old libraries allowed an <code>alg: "none"</code> header, which bypasses signature verification. Modern libraries block this by default.</li>
            <li><strong>Sensitive Data in Payload:</strong> Remember that the payload is only Base64 encoded, <strong>not encrypted</strong>. Never put passwords, social security numbers, or sensitive data in a JWT.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Best Practices for JWT Security</h2>
          <ol className="list-decimal pl-6 mb-4">
            <li><strong>Short Expiration:</strong> Set a short <code>exp</code> (e.g., 15 minutes) to minimize the window of opportunity if a token is stolen.</li>
            <li><strong>Use Refresh Tokens:</strong> Use a short-lived Access Token and a long-lived Refresh Token stored securely (e.g., HTTP-only cookie).</li>
            <li><strong>Secure Storage:</strong> Never store JWTs in <code>localStorage</code> if you are vulnerable to XSS. HTTP-only cookies are a safer alternative for web browsers.</li>
            <li><strong>Validate Claims:</strong> Always check the <code>iss</code> (issuer), <code>aud</code> (audience), and <code>exp</code> (expiration) claims on the server side.</li>
          </ol>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How to use this tool</h2>
          <p className="mb-4">
            Our tool provides three main features:
            <br />
            <strong>Generate:</strong> Create a new JWT by specifying your own payload, secret key, and algorithm.
            <br />
            <strong>Decode:</strong> Paste any JWT to instantly view its header and payload contents without needing the secret key.
            <br />
            <strong>Verify:</strong> Paste a JWT and provide the corresponding secret key or public key to verify its signature and ensure the token hasn't been tampered with.
          </p>
        </div>
      </div>
    </div>
      </>
  );
};

export default JWTPage; 