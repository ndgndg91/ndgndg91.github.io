import React from 'react';
import SEOHead from '../../components/SEOHead';

const TermsOfService: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead 
        title="Terms of Service - Developer Playground" 
        description="Terms of service for Developer Playground"
      />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Terms of Service</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="mb-4">Last updated: May 01, 2026</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing and using Developer Playground (the "Site"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use the Site.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Description of Service</h2>
        <p className="mb-4">
          Developer Playground provides users with various utility tools, encoders, decoders, and a tech blog. The tools are provided "as is" and without warranty of any kind, express or implied.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. User Responsibilities</h2>
        <p className="mb-4">
          You agree to use the Site only for lawful purposes. You are responsible for all data you input into the tools provided on the Site. Do not submit sensitive or personally identifiable information into the public utility tools unless you are certain it is safe, as processing may occur on the client side or server side.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights and other proprietary laws. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Disclaimer of Warranties</h2>
        <p className="mb-4">
          The materials on Developer Playground's website are provided on an 'as is' basis. Developer Playground makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Limitation of Liability</h2>
        <p className="mb-4">
          In no event shall Developer Playground or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Developer Playground's website.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
