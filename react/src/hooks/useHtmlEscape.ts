import { useState } from 'react';

const useHtmlEscape = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // HTML escape function
  const escapeHTML = (str: string): string => {
    try {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    } catch (err) {
      setError('Error escaping HTML');
      console.error(err);
      return '';
    }
  };

  // HTML unescape function
  const unescapeHTML = (str: string): string => {
    try {
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, "/");
    } catch (err) {
      setError('Error unescaping HTML');
      console.error(err);
      return '';
    }
  };

  // Handle escape action
  const handleEscape = () => {
    setError(null);
    setOutput(escapeHTML(input));
  };

  // Handle unescape action
  const handleUnescape = () => {
    setError(null);
    setOutput(unescapeHTML(input));
  };

  // Load test example
  const loadTestExample = () => {
    const testExample = `<div class="container">
  <h1>HTML sample</h1>
  <p>this <strong>HTML</strong> including tag <em>text</em>.</p>
  <ul>
    <li>item 1</li>
    <li>item 2 & item 3</li>
    <li>item "4"</li>
  </ul>
  <a href="https://example.com?param=value&another=test">link</a>
</div>`;
    
    setInput(testExample);
    setOutput(escapeHTML(testExample));
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      return false;
    }
  };

  return {
    input,
    output,
    error,
    setInput,
    handleEscape,
    handleUnescape,
    loadTestExample,
    copyToClipboard
  };
};

export default useHtmlEscape;
