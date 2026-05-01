import React from 'react';
import SEOHead from '../../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead 
        title="Privacy Policy - Developer Playground" 
        description="Privacy policy for Developer Playground"
      />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="mb-4">Last updated: May 01, 2026</p>
        
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on a user's prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Use of Cookies</h2>
        <p className="mb-4">
          A cookie is a small text file that a website saves on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences over a period of time.
        </p>
        <p className="mb-4">
          Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" className="text-blue-600 hover:underline dark:text-blue-400">Ads Settings</a>. Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="https://youradchoices.com/" className="text-blue-600 hover:underline dark:text-blue-400">www.aboutads.info</a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Log Data</h2>
        <p className="mb-4">
          Like many site operators, we collect information that your browser sends whenever you visit our website. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics. This is used solely for the purpose of improving the website and its services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Changes to This Privacy Policy</h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at ndgndg91@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
