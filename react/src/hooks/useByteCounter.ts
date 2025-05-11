import { useState, useCallback } from 'react';

interface ByteCounterResult {
  charLength: number;
  byteLength: number;
}

const useByteCounter = () => {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<ByteCounterResult>({ charLength: 0, byteLength: 0 });

  // Calculate the byte length of a string (UTF-8)
  const getByteLength = useCallback((str: string): number => {
    return new TextEncoder().encode(str).length;
  }, []);

  // Count characters and bytes in the input string
  const countBytes = useCallback(() => {
    if (!input) {
      setResult({ charLength: 0, byteLength: 0 });
      return;
    }

    const charLength = input.length;
    const byteLength = getByteLength(input);
    
    setResult({ charLength, byteLength });
  }, [input, getByteLength]);

  // Clear all input and results
  const clearAll = useCallback(() => {
    setInput('');
    setResult({ charLength: 0, byteLength: 0 });
  }, []);

  return {
    input,
    setInput,
    result,
    countBytes,
    clearAll,
  };
};

export default useByteCounter;
