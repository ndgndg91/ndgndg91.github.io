import React, { useCallback } from 'react';
import useTimestamp from '../../../hooks/useTimestamp';
import { Copy, Check, X } from 'lucide-react';
import AdSection from '../../ads/AdSection';

const Timestamp: React.FC = () => {
  const {
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
  } = useTimestamp();
  
  // Set current timestamp
  const handleSetToNow = useCallback(() => {
    const now = Math.floor(Date.now() / 1000);
    handleTimestampInputChange(now.toString());
    // Trigger conversion
    convertTimestampToDatetime();
  }, [handleTimestampInputChange, convertTimestampToDatetime]);
  
  // Handle copy converted timestamp
  const handleCopyConvertedTimestampClick = useCallback(() => {
    void handleCopyConvertedTimestamp();
  }, [handleCopyConvertedTimestamp]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === 'Enter') {
      callback();
    }
  }, []);

  return (
    <div className="px-2 pt-10 pb-24 sm:px-4 xl:pr-0">
      <p 
        className="flex items-center gap-2 font-mono text-xs/6 font-medium tracking-widest text-gray-600 uppercase dark:text-gray-400"
        data-section="true"
      >
        Developer Playground
      </p>
      <h1 data-title="true" className="mt-2 text-3xl font-medium tracking-tight text-gray-950 dark:text-white">
        Unix Timestamp
      </h1>
      <p data-description="true" className="mt-6 text-base/7 text-gray-700 dark:text-gray-400">
        A Unix Timestamp represents the number of seconds elapsed since January 1, 1970, 00:00:00 UTC (Coordinated
        Universal Time). It is also called the "Epoch" and is commonly used in computer systems to record or calculate
        time.
      </p>
      
      <div className="mt-8 space-y-6">
        {/* Current Timestamp */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Current Unix Timestamp (Seconds)
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-mono text-gray-700 dark:text-gray-300">
              {currentTimestamp}
            </span>
            <button
              onClick={handleCopyTimestamp}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Current Timezone */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Current Timezone
          </h2>
          <div className="mb-4">
            <span className="text-gray-700 dark:text-gray-300">
              {currentTimezone}
            </span>
          </div>
          
          <div className="mb-4">
            <label htmlFor="timezone-select" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Timezone (Real-time):
            </label>
            <select
              id="timezone-select"
              value={selectedTimezone}
              onChange={(e) => setSelectedTimezone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-700 dark:text-gray-300">
              {currentDatetime}
            </span>
            <button
              onClick={handleCopyDatetime}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              title="Copy to clipboard"
            >
              {copiedDatetime ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Timestamp Converter */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Timestamp Converter
          </h2>
          
          <div className="mb-4">
            <label htmlFor="timestamp-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter Unix Timestamp:
            </label>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">

                <input
                  type="number"
                  id="timestamp-input"
                  value={timestampInput}
                  onChange={(e) => handleTimestampInputChange(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, convertTimestampToDatetime)}
                  placeholder="e.g., 1708765432"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                  <button
                    type="button"
                    onClick={handleSetToNow}
                    className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Set to current time"
                  >
                    Now
                  </button>
                  {timestampInput && (
                    <button
                      type="button"
                      onClick={() => setTimestampInput('')}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Clear"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={convertTimestampToDatetime}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 dark:shadow-blue-900/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert
              </button>
            </div>
            
            <div className="mb-4">
              <label htmlFor="timestamp-timezone" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Timezone:
              </label>
              <select
                id="timestamp-timezone"
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
            </div>
            
            {convertedDatetime && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-800 dark:text-gray-200">
                    {convertedDatetime}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6">
            <label htmlFor="datetime-input" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter Datetime (YYYY MM DD HH MM SS):
            </label>
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  id="datetime-input"
                  value={datetimeInput}
                  onChange={(e) => setDatetimeInput(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, convertDatetimeToTimestamp)}
                  placeholder="e.g., 2024 02 25 14 30 00"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 space-x-1">
                  <button
                    type="button"
                    onClick={() => {
                      const now = new Date();
                      const year = now.getFullYear();
                      const month = String(now.getMonth() + 1).padStart(2, '0');
                      const day = String(now.getDate()).padStart(2, '0');
                      const hours = String(now.getHours()).padStart(2, '0');
                      const minutes = String(now.getMinutes()).padStart(2, '0');
                      const seconds = String(now.getSeconds()).padStart(2, '0');
                      setDatetimeInput(`${year} ${month} ${day} ${hours} ${minutes} ${seconds}`);
                    }}
                    className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    title="Set to current time"
                  >
                    Now
                  </button>
                  {datetimeInput && (
                    <button
                      type="button"
                      onClick={() => setDatetimeInput('')}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Clear"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={convertDatetimeToTimestamp}
                className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-500/20 dark:shadow-green-900/30 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Convert
              </button>
            </div>
            
            {convertedTimestamp && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-gray-800 dark:text-gray-200">
                    {convertedTimestamp}
                  </span>
                  <button
                    onClick={handleCopyConvertedTimestampClick}
                    className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    title="Copy to clipboard"
                  >
                    {copiedTimestamp ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Ad */}
      <AdSection 
        position="bottom" 
        size="rectangle" 
        showAd={true}
        className="mt-8"
      />
    </div>
  );
};

export default Timestamp;
