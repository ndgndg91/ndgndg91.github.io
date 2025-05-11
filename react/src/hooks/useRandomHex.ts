import { useState, useCallback } from 'react';

const useRandomHex = () => {
  const [hexLength, setHexLength] = useState<number>(64);
  const [hexResult, setHexResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateRandomHex = useCallback(() => {
    try {
      if (hexLength < 1 || hexLength > 2048) {
        setError('Length must be between 1 and 2048');
        return;
      }

      const byteLength = Math.ceil(hexLength / 2);
      const bytes = new Uint8Array(byteLength);
      crypto.getRandomValues(bytes);
      
      let result = Array.from(bytes)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, hexLength);
      
      // Ensure the result has exactly the requested length
      if (result.length < hexLength) {
        result += '0'.repeat(hexLength - result.length);
      }

      setHexResult(result);
      setError('');
    } catch (err) {
      setError('An error occurred while generating random hex');
      console.error(err);
    }
  }, [hexLength]);

  const copyToClipboard = useCallback(async () => {
    if (!hexResult) return false;
    
    try {
      await navigator.clipboard.writeText(hexResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  }, [hexResult]);

  const clearAll = useCallback(() => {
    setHexResult('');
    setError('');
    setCopied(false);
  }, []);

  return {
    hexLength,
    setHexLength,
    hexResult,
    error,
    copied,
    generateRandomHex,
    copyToClipboard,
    clearAll,
  };
};

export default useRandomHex;
