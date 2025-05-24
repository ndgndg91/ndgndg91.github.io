import { useState, useEffect, useCallback } from 'react';


const timezones = [
  'Asia/Seoul',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Sao_Paulo',
  'Europe/London',
  'Europe/Paris',
  'Europe/Moscow',
  'Australia/Sydney',
  'Pacific/Auckland',
  'Africa/Johannesburg',
  'UTC'
];

const useTimestamp = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [currentTimezone, setCurrentTimezone] = useState<string>('');
  const [currentDatetime, setCurrentDatetime] = useState<string>('');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('Asia/Seoul');
  const [timestampInput, setTimestampInput] = useState<string>('');
  const [datetimeInput, setDatetimeInput] = useState<string>('');
  const [convertedDatetime, setConvertedDatetime] = useState<string>('');
  const [convertedTimestamp, setConvertedTimestamp] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedDatetime, setCopiedDatetime] = useState<boolean>(false);
  const [copiedTimestamp, setCopiedTimestamp] = useState<boolean>(false);

  // Update current timestamp and datetime every second
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTimestamp(Math.floor(now.getTime() / 1000));
      
      // Set current timezone
      const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setCurrentTimezone(detectedTimezone);
      
      // Format current datetime for selected timezone
      formatDatetime(now, selectedTimezone, setCurrentDatetime);
    };
    
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezone]);

  // Format datetime for a specific timezone
  const formatDatetime = (date: Date, timezone: string, setter: (value: string) => void) => {
    const options = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    } as const;
    
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);
    
    const getPart = (type: string) => {
      const part = parts.find(p => p.type === type);
      return part ? part.value : '';
    };
    
    const year = getPart('year');
    const month = getPart('month');
    const day = getPart('day');
    const hours = getPart('hour');
    const minutes = getPart('minute');
    const seconds = getPart('second');
    
    setter(`${year} ${month} ${day} ${hours} ${minutes} ${seconds}`);
  };

  // Handle timestamp input change
  const handleTimestampInputChange = (value: string) => {
    setTimestampInput(value);
  };

  // Convert timestamp to datetime
  const convertTimestampToDatetime = useCallback(() => {
    if (!timestampInput || isNaN(Number(timestampInput))) {
      setConvertedDatetime('Please enter a valid Unix Timestamp');
      return;
    }

    const timestamp = parseInt(timestampInput) * 1000;
    const date = new Date(timestamp);
    
    if (isNaN(date.getTime())) {
      setConvertedDatetime('Invalid timestamp');
      return;
    }
    
    formatDatetime(date, selectedTimezone, setConvertedDatetime);
  }, [timestampInput, selectedTimezone]);

  // Convert datetime to timestamp
  const convertDatetimeToTimestamp = useCallback(() => {
    const parts = datetimeInput.trim().split(" ");
    if (parts.length !== 6) {
      setConvertedTimestamp("형식: YYYY MM DD HH MM SS");
      return;
    }

    try {
      const [year, month, day, hour, minute, second] = parts.map(Number);
      const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
      
      // Get timezone offset in minutes and convert to seconds
      const tzOffset = date.getTimezoneOffset() * 60;
      const timestamp = Math.floor(date.getTime() / 1000) + tzOffset;
      
      setConvertedTimestamp(timestamp.toString());
    } catch (error) {
      console.error(error);
      setConvertedTimestamp("잘못된 날짜 또는 시간대");
    }
  }, [datetimeInput]);

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, setCopiedState: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Handle copy actions
  const handleCopyTimestamp = () => copyToClipboard(currentTimestamp.toString(), setCopied);
  const handleCopyDatetime = () => copyToClipboard(currentDatetime, setCopiedDatetime);
  const handleCopyConvertedTimestamp = () => copyToClipboard(convertedTimestamp, setCopiedTimestamp);

  return {
    currentTimestamp,
    currentTimezone,
    currentDatetime,
    selectedTimezone,
    setSelectedTimezone,
    timestampInput,
    setTimestampInput,
    handleTimestampInputChange,
    datetimeInput,
    setDatetimeInput,
    convertedDatetime,
    convertedTimestamp,
    copied,
    copiedDatetime,
    copiedTimestamp,
    timezones,
    convertTimestampToDatetime,
    convertDatetimeToTimestamp,
    handleCopyTimestamp,
    handleCopyDatetime,
    handleCopyConvertedTimestamp
  };
};

export default useTimestamp;
