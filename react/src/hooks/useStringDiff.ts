import { useState, useCallback } from 'react';

export type DiffWord = {
  word: string;
  status: 'same' | 'diff' | 'added' | 'removed';
};

export type DiffLine = {
  lineNum: number;
  content: DiffWord[];
  content2?: DiffWord[];
  status: 'same' | 'diff' | 'added' | 'removed';
};

const useStringDiff = () => {
  const [text1, setText1] = useState<string>('');
  const [text2, setText2] = useState<string>('');
  const [diffResult, setDiffResult] = useState<DiffLine[]>([]);
  const [isComparing, setIsComparing] = useState<boolean>(false);

  // Compare two strings line by line and word by word
  const compareTexts = useCallback((str1: string, str2: string): DiffLine[] => {
    const lines1 = str1.split('\n');
    const lines2 = str2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const result: DiffLine[] = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';

      if (line1 === line2) {
        // Lines are identical
        result.push({
          lineNum: i + 1,
          content: [{ word: line1, status: 'same' }],
          status: 'same'
        });
      } else {
        // Lines are different, compare word by word
        const words1 = line1.split(' ');
        const words2 = line2.split(' ');
        const maxWords = Math.max(words1.length, words2.length);
        const diffLine: DiffLine = {
          lineNum: i + 1,
          content: [],
          content2: [],
          status: 'diff'
        };

        for (let j = 0; j < maxWords; j++) {
          const word1 = words1[j];
          const word2 = words2[j];

          if (word1 === word2) {
            // Words are the same
            diffLine.content.push({ word: word1 || '', status: 'same' });
            diffLine.content2?.push({ word: word2 || '', status: 'same' });
          } else {
            // Words are different
            if (word1 !== undefined) {
              diffLine.content.push({ word: word1, status: 'removed' });
            }
            if (word2 !== undefined) {
              diffLine.content2?.push({ word: word2, status: 'added' });
            }
          }
        }

        result.push(diffLine);
      }
    }

    return result;
  }, []);

  // Handle text comparison
  const compare = useCallback(() => {
    setIsComparing(true);
    try {
      const result = compareTexts(text1, text2);
      setDiffResult(result);
    } catch (error) {
      console.error('Error comparing texts:', error);
      setDiffResult([]);
    } finally {
      setIsComparing(false);
    }
  }, [text1, text2, compareTexts]);

  // Clear all inputs and results
  const clearAll = useCallback(() => {
    setText1('');
    setText2('');
    setDiffResult([]);
  }, []);

  return {
    text1,
    setText1,
    text2,
    setText2,
    diffResult,
    isComparing,
    compare,
    clearAll,
  };
};

export default useStringDiff;
