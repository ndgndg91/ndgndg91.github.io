import { useState } from 'react';

export const useUrlEncoding = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      setError('');
      // Try to parse as a full URL first
      try {
        const url = new URL(input);
        const encodedParams = Array.from(url.searchParams.entries())
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&');
        setOutput(`${url.origin}${url.pathname}${encodedParams ? '?' + encodedParams : ''}`);
      } catch (e) {
        // If not a valid URL, just encode the whole string
        setOutput(encodeURIComponent(input));
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      setError(`Encoding error: ${errorMessage}`);
    }
  };

  const decode = () => {
    try {
      setError('');
      setOutput(decodeURIComponent(input));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      setError(`Decoding error: ${errorMessage}`);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return {
    input,
    output,
    error,
    setInput,
    encode,
    decode,
    clearAll,
  };
};
