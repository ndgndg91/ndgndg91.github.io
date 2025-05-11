import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

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

  const copyToClipboard = useCallback(async (text: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Copy failed: ', err);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success('Copied to clipboard!');
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
        toast.error('Failed to copy to clipboard');
      }
    }
  }, []);

  return {
    input,
    output,
    error,
    setInput,
    encode,
    decode,
    clearAll,
    copyToClipboard,
  };
};
