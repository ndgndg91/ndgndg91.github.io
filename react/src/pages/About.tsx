import React from 'react';
import SEOHead from '../components/SEOHead';

const About: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
      <SEOHead 
        title="About - Developer Playground" 
        description="About Developer Playground and its creator"
      />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">About Developer Playground</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What is Developer Playground?</h2>
        <p className="mb-4">
          Developer Playground is a collection of handy utility tools and technical articles created specifically for software engineers. 
          As developers, we often find ourselves needing quick access to encoders, decoders, formatters, and hash generators. 
          This site aims to provide a clean, fast, and accessible environment to use these tools without unnecessary friction.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Who is behind this?</h2>
        <p className="mb-4">
          I'm Giri (Dong-gil Nam), a backend software engineer passionate about building efficient systems and sharing knowledge. 
          This project started as a personal workspace to gather all the tiny utilities I needed on a daily basis. 
          I hope you find these tools as useful as I do.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact</h2>
        <p className="mb-4">
          If you have any feedback, suggestions for new tools, or just want to say hi, feel free to reach out via email at <a href="mailto:ndgndg91@gmail.com" className="text-blue-600 hover:underline dark:text-blue-400">ndgndg91@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
