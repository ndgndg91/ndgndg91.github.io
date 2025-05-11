import { useState } from 'react';
import { parseString, Builder } from 'xml2js';
import type { ParserOptions } from 'xml2js';
import { toast } from 'react-toastify';

export interface UseXmlParserReturn {
  input: string;
  output: string;
  error: string;
  indentLevel: 2 | 4 | 8;
  setInput: (value: string) => void;
  setIndentLevel: (level: 2 | 4 | 8) => void;
  parseXml: () => void;
  copyToClipboard: () => Promise<boolean>;
  clearAll: () => void;
}

export const useXmlParser = (): UseXmlParserReturn => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentLevel, setIndentLevel] = useState<2 | 4 | 8>(2);

  // Format XML with indentation (similar to legacy implementation)
  const formatXml = (xml: string): string => {
    let formatted = '';
    let indent = 0;
    const tab = '  '; // 2 spaces for indentation

    // Split by tags and content
    const nodes = xml.match(/<[^>]+>|[^<>]+/g) || [];
    
    nodes.forEach((node) => {
      node = node.trim();
      if (!node) return;

      if (node.startsWith('</')) {
        // Closing tag
        indent = Math.max(0, indent - 1);
        formatted += `${tab.repeat(indent)}${node}\n`;
      } else if (node.startsWith('<') && !node.endsWith('/>')) {
        // Opening tag
        formatted += `${tab.repeat(indent)}${node}\n`;
        indent++;
      } else if (node.startsWith('<') && node.endsWith('/>')) {
        // Self-closing tag
        formatted += `${tab.repeat(indent)}${node}\n`;
      } else {
        // Text content
        formatted += `${tab.repeat(indent)}${node}\n`;
      }
    });

    return formatted.trim();
  };

  const parseXml = () => {
    try {
      const xmlString = input.trim();
      if (!xmlString) {
        setError('Please enter some XML to parse');
        setOutput('');
        return;
      }

      // First, try to format the XML directly
      try {
        const formatted = formatXml(xmlString);
        setOutput(formatted);
        setError('');
      } catch (err) {
        // If direct formatting fails, try parsing with xml2js as fallback
        const options: ParserOptions = {
          explicitArray: false,
          explicitRoot: false,
          mergeAttrs: true,
          normalize: true,
          trim: true
        };
        
        parseString(xmlString, options, (err: Error | null, result: any) => {
          if (err) {
            setError(`Error parsing XML: ${err.message}`);
            setOutput('');
            return;
          }
          
          try {
            // Convert back to XML with pretty print
            const builder = new Builder({
              renderOpts: { 
                pretty: true, 
                indent: '  ',
                newline: '\n'
              }
            });
            const formattedXml = builder.buildObject(result);
            setOutput(formattedXml);
            setError('');
          } catch (buildErr) {
            const error = buildErr instanceof Error ? buildErr : new Error('Unknown error building XML');
            setError(`Error formatting XML: ${error.message}`);
            setOutput('');
          }
        });
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(`Error: ${error.message}`);
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
    parseXml,
    copyToClipboard,
    clearAll
  };
};
