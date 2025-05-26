import React from 'react';
import JWTDecoder from './JWTDecoder';
import JWTGenerator from './JWTGenerator';
import JWTVerifier from './JWTVerifier';
import AdSection from '../../ads/AdSection';
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
        <AdSection 
          position="bottom" 
          size="rectangle" 
          showAd={true}
          className="mt-8"
        />
      </div>
    </div>
      </>
  );
};

export default JWTPage; 