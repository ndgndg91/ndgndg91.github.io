import { useState } from 'react';

export const useBase64 = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const encode = () => {
    try {
      setError('');
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

export default useBase64;
