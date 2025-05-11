import { useState } from 'react';
import toast from 'react-hot-toast';

export interface UseJsonParserReturn {
  input: string;
  output: string;
  error: string;
  indentLevel: 2 | 4 | 8;
  setInput: (value: string) => void;
  setIndentLevel: (level: 2 | 4 | 8) => void;
  parseJson: () => void;
  copyToClipboard: () => Promise<boolean>;
  clearAll: () => void;
}

export const useJsonParser = (): UseJsonParserReturn => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentLevel, setIndentLevel] = useState<2 | 4 | 8>(2);
  let parsedJson: any = null;

  const parseJson = () => {
    try {
      if (!input.trim()) {
        setError('Please enter some JSON to parse');
        return;
      }

      parsedJson = JSON.parse(input);
      setError('');
      renderPrettyPrint(parsedJson);
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const renderPrettyPrint = (json: any) => {
    try {
      setOutput(JSON.stringify(json, null, indentLevel));
    } catch (err) {
      setError(`Error pretty printing JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  };

  const copyToClipboard = async (): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard!');
      return true;
    } catch (err) {
      console.error('Copy failed: ', err);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = output;
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          toast.success('Copied to clipboard!');
          return true;
        } else {
          throw new Error('Copy command failed');
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed: ', fallbackErr);
        toast.error('Failed to copy to clipboard');
        return false;
      }
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
    indentLevel,
    setInput,
    setIndentLevel,
    parseJson,
    copyToClipboard,
    clearAll
  };


};
