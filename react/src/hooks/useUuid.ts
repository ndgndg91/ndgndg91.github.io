import { useState, useCallback } from 'react';
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, v7 as uuidv7 } from 'uuid';
import toast from 'react-hot-toast';

export const useUuid = () => {
  const [uuidV1, setUuidV1] = useState('');
  const [uuidV3, setUuidV3] = useState('');
  const [uuidV4, setUuidV4] = useState('');
  const [uuidV5, setUuidV5] = useState('');
  const [uuidV7, setUuidV7] = useState('');
  const [v3Namespace, setV3Namespace] = useState('');
  const [v3Name, setV3Name] = useState('');
  const [v5Namespace, setV5Namespace] = useState('');
  const [v5Name, setV5Name] = useState('');
  const [error, setError] = useState('');

  // UUID v1 (Time-based)
  const generateV1 = useCallback(() => {
    try {
      setError('');
      setUuidV1(uuidv1());
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to generate UUID v1';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  // UUID v3 (Name-based, MD5)
  const generateV3 = useCallback(() => {
    try {
      setError('');
      
      if (!v3Namespace.trim() || !v3Name.trim()) {
        setError('Please enter both namespace and name');
        toast.error('Please enter both namespace and name');
        return;
      }

      if (!isValidUUID(v3Namespace)) {
        setError('Namespace must be a valid UUID');
        toast.error('Namespace must be a valid UUID');
        return;
      }

      setUuidV3(uuidv3(v3Name, v3Namespace));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to generate UUID v3';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [v3Namespace, v3Name]);

  // UUID v4 (Random)
  const generateV4 = useCallback(() => {
    try {
      setError('');
      setUuidV4(uuidv4());
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to generate UUID v4';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  // UUID v5 (Name-based, SHA-1)
  const generateV5 = useCallback(() => {
    try {
      setError('');
      
      if (!v5Namespace.trim() || !v5Name.trim()) {
        setError('Please enter both namespace and name');
        toast.error('Please enter both namespace and name');
        return;
      }

      if (!isValidUUID(v5Namespace)) {
        setError('Namespace must be a valid UUID');
        toast.error('Namespace must be a valid UUID');
        return;
      }

      setUuidV5(uuidv5(v5Name, v5Namespace));
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to generate UUID v5';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, [v5Namespace, v5Name]);

  // UUID v7 (Time-ordered)
  const generateV7 = useCallback(() => {
    try {
      setError('');
      setUuidV7(uuidv7());
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to generate UUID v7';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  }, []);

  // Copy to clipboard function
  const copyToClipboard = useCallback(async (text: string) => {
    if (!text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy to clipboard');
    }
  }, []);

  // Helper function to validate UUID format
  const isValidUUID = (str: string): boolean => {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(str);
  };

  return {
    // States
    uuidV1,
    uuidV3,
    uuidV4,
    uuidV5,
    uuidV7,
    v3Namespace,
    v3Name,
    v5Namespace,
    v5Name,
    error,
    
    // Setters
    setV3Namespace,
    setV3Name,
    setV5Namespace,
    setV5Name,
    
    // Generators
    generateV1,
    generateV3,
    generateV4,
    generateV5,
    generateV7,
    
    // Utils
    copyToClipboard
  };
};

export default useUuid;
