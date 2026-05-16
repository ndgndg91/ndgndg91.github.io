import React from 'react';
import SEOHead from '../../components/SEOHead';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead 
        title="Privacy Policy - Developer Playground" 
        description="Detailed privacy policy for Developer Playground including information about cookies and advertisements."
      />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p className="mb-4 text-sm italic">Last updated: May 16, 2026</p>
        
        <p className="mb-6">
          At Developer Playground, accessible from <a href="https://developer-playground.com" className="text-blue-600 hover:underline">https://developer-playground.com</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Developer Playground and how we use it.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. General Information</h2>
        <p className="mb-4">
          This Site provides developer tools and technical articles. Most tools operate entirely in the client-side browser, meaning your data never leaves your device unless explicitly stated.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Cookies and Web Beacons</h2>
        <p className="mb-4">
          Like any other website, Developer Playground uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">3. Google DoubleClick DART Cookie</h2>
        <p className="mb-4">
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">4. Our Advertising Partners</h2>
        <p className="mb-4">
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier access, we hyperlinked to their Privacy Policies below.
        </p>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Google AdSense:</strong> <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">5. Advertising Partners Privacy Policies</h2>
        <p className="mb-4">
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Developer Playground, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p className="mb-4">
          Note that Developer Playground has no access to or control over these cookies that are used by third-party advertisers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">6. Third Party Privacy Policies</h2>
        <p className="mb-4">
          Developer Playground's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p className="mb-4">
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">7. Log Files</h2>
        <p className="mb-4">
          Developer Playground follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">8. Consent</h2>
        <p className="mb-4">
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">9. Contact</h2>
        <p className="mb-4">
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:ndgndg91@gmail.com" className="text-blue-600 hover:underline">ndgndg91@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
