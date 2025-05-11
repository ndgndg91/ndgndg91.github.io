import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useBase64 = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      setError('');
      
      if (!input.trim()) {
        setError('Please enter some text to encode');
        return;
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const binary = String.fromCharCode(...data);
      setOutput(btoa(binary));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setError(`Error: Base64 encoding failed - ${errorMessage}`);
    }
  };

  const decode = () => {
    try {
      setError('');
      
      if (!input.trim()) {
        setError('Please enter a Base64 string to decode');
        return;
      }
      
      const binary = atob(input);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const decoder = new TextDecoder();
      setOutput(decoder.decode(bytes));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      setError(`Error: Invalid Base64 string - ${errorMessage}`);
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

export default useBase64;
