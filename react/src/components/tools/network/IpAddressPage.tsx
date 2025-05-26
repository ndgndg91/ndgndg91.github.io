import React from 'react';
import { useIpAddress } from '../../../hooks/useIpAddress';
import LocationMap from '../../../components/LocationMap';
import toast from 'react-hot-toast';
import {seoData} from "../../../data/seoData.ts";
import SEOHead from "../../SEOHead.tsx";

const IpAddressPage: React.FC = () => {
  const { ipData, loading, error } = useIpAddress();

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">Loading location data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="ml-2 text-red-500 dark:text-red-400">{error}</span>
        </div>
      </div>
    );
  }

  return (
      <>
      <SEOHead {...seoData.checkMyIP} />
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IP Address</h1>
        <button 
          onClick={() => navigator.clipboard.writeText(ipData.ip)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          title="Copy IP address to clipboard"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
        </button>
      </div>
      <div className="space-y-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
            <svg className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            IP Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
              <p className="text-gray-600 dark:text-gray-300 font-semibold">IPv4:</p>
              <code className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.ip}</code>
              <button 
                onClick={() => copyToClipboard(ipData.ip)}
                className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
            <div className="grid grid-cols-[120px_1fr_auto] items-center gap-4">
              <p className="text-gray-600 dark:text-gray-300 font-semibold">IPv6:</p>
              <code className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.location?.ipv6 || 'Not detected'}</code>
              <button 
                onClick={() => ipData.location?.ipv6 && copyToClipboard(ipData.location.ipv6)}
                disabled={!ipData.location?.ipv6 || ipData.location.ipv6 === 'Not detected'}
                className="px-4 py-2 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy to clipboard"
              >
                Copy
              </button>
            </div>
            {ipData.location?.isp && (
              <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                <p className="text-gray-600 dark:text-gray-300 font-semibold">ISP:</p>
                <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.location.isp}</span>
              </div>
            )}
          </div>
        </div>

        {ipData.location && (
          <>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location Information
              </h2>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center text-gray-900 dark:text-gray-300">
                  <span className="font-semibold w-24">City:</span>
                  <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.location.city}</span>
                </p>
                <p className="flex items-center text-gray-900 dark:text-gray-300">
                  <span className="font-semibold w-24">Region:</span>
                  <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.location.region}</span>
                </p>
                <p className="flex items-center text-gray-900 dark:text-gray-300">
                  <span className="font-semibold w-24">Country:</span>
                  <span className="bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">{ipData.location.country}</span>
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
                <svg className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
                Location on Map
              </h2>
              <LocationMap 
                latitude={ipData.location.latitude} 
                longitude={ipData.location.longitude}
                city={ipData.location.city}
                country={ipData.location.country}
              />
            </div>
          </>
        )}
      </div>
    </div>
        </>
  );
};

export default IpAddressPage; 