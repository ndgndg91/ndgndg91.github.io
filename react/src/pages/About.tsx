import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead 
        title="About Developer Playground - High-Quality Developer Tools & Insights" 
        description="Learn about the mission of Developer Playground and the engineering behind its high-performance tools and technical articles."
      />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">About Developer Playground</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
        <p className="mb-4">
          Developer Playground was founded with a simple goal: to provide software engineers with a <strong>high-performance, distraction-free environment</strong> for the tools they use every day. We believe that developer utilities shouldn't just be functional—they should be fast, secure, and intuitive.
        </p>
        <p className="mb-4">
          Every tool on this platform is optimized for performance and security. We prioritize client-side processing to ensure that your sensitive data (like JSON payloads, keys, or passwords) stays on your machine and never hits our servers.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What We Offer</h2>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Data Utilities:</strong> Precise Base64, URL, and HTML encoding/decoding tools.
          </li>
          <li>
            <strong>Security Tools:</strong> AES/RSA encryption and SHA-family hash generators for verifying data integrity.
          </li>
          <li>
            <strong>Formatting & Analysis:</strong> High-performance JSON and XML parsers, diff checkers, and byte counters.
          </li>
          <li>
            <strong>Technical Deep Dives:</strong> A blog dedicated to advanced software engineering topics like JVM internals, Kafka optimization, and Kubernetes architecture.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">The Creator</h2>
        <p className="mb-4">
          I'm <strong>Giri (Dong-gil Nam)</strong>, a backend software engineer with a deep interest in distributed systems, performance tuning, and developer productivity. 
          This project reflects my commitment to building clean, useful software and contributing to the global developer community.
        </p>
        <p className="mb-4">
          When I'm not building tools or writing technical articles, I'm usually diving into JVM source code or exploring the latest trends in cloud-native architecture.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Get in Touch</h2>
        <p className="mb-4">
          Feedback is the lifeblood of this project. If you have suggestions for new features, found a bug, or want to discuss a technical topic, I'd love to hear from you.
        </p>
        <div className="flex gap-4 mt-4">
          <a href="mailto:ndgndg91@gmail.com" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 no-underline font-medium transition-colors">Email Me</a>
          <a href="https://github.com/ndgndg91" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 no-underline font-medium transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default About;
