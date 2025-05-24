import React, { useCallback, useRef, useState } from 'react';
import { Upload, Download, Loader2 } from 'lucide-react';
import { useImageConverter } from '../../../hooks/useImageConverter';
import AdSection from '../../ads/AdSection';

const ImageConverter: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    currentImage,
    targetFormat,
    setTargetFormat,
    quality,
    setQuality,
    isConverting,
    convertedImage,
    handleFileUpload,
    performConversion,
    getDownloadInfo,
    getCompressionRatio,
    formatFileSize
  } = useImageConverter();

  // 파일 입력 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setError(null);
      await handleFileUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image.');
    }
  };

  // 드래그 앤 드롭 핸들러
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    try {
      setError(null);
      await handleFileUpload(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image.');
    }
  }, [handleFileUpload]);

  // 파일 선택 대화상자 열기
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // 변환 실행 핸들러
  const handleConvert = async () => {
    if (!currentImage) return;
    
    try {
      setError(null);
      await performConversion();
    } catch (err) {
      setError('Failed to convert image. Please try again.');
    }
  };

  // 다운로드 핸들러
  const handleDownload = () => {
    const downloadInfo = getDownloadInfo();
    if (!downloadInfo) return;
    
    const a = document.createElement('a');
    a.href = downloadInfo.url;
    a.download = downloadInfo.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image Format Converter</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Convert images between different formats (JPEG, PNG, WebP) in your browser.
      </p>
      
      {/* 파일 업로드 영역 */}
      <div className="space-y-4">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <Upload className="w-10 h-10 text-gray-400" />
            <div className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-medium text-blue-600 dark:text-blue-400">Click to upload</span>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported formats: PNG, JPEG, WebP (Max 10MB)
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
          />
        </div>
      </div>
      
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-400">
          {error}
        </div>
      )}
      
      {/* 이미지 미리보기 */}
      {currentImage && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Original Image</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-2 h-48 overflow-hidden">
                  <img 
                    src={currentImage.src} 
                    alt="Original preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Filename:</span> {currentImage.file.name}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Format:</span> {currentImage.format}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Size:</span> {formatFileSize(currentImage.size)}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Dimensions:</span> {currentImage.width} × {currentImage.height}px
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 변환 설정 */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversion Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Output Format
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['jpeg', 'png', 'webp'] as const).map((format) => (
                    <button
                      key={format}
                      type="button"
                      onClick={() => setTargetFormat(format)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        targetFormat === format
                          ? 'bg-blue-700 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                      disabled={isConverting}
                    >
                      {format.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {targetFormat !== 'png' && (
                <div>
                  <label htmlFor="quality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Quality: {quality}%
                  </label>
                  <input
                    id="quality"
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    disabled={isConverting}
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Lower quality = smaller file size, higher quality = larger file size
                  </p>
                </div>
              )}

              <div>
                <button
                  type="button"
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Converting...
                    </>
                  ) : (
                    'Convert Image'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* 변환 결과 */}
      {convertedImage && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Conversion Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Original Image</h4>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 h-48 flex items-center justify-center overflow-hidden">
                <img 
                  src={currentImage?.src} 
                  alt="Original" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">
                Converted Image ({targetFormat.toUpperCase()})
              </h4>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 h-48 flex items-center justify-center overflow-hidden">
                <img 
                  src={convertedImage.dataURL} 
                  alt="Converted" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Conversion Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Format:</span> {targetFormat.toUpperCase()}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Size:</span> {formatFileSize(convertedImage.blob.size)}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Compression:</span> {getCompressionRatio()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Width:</span> {convertedImage.width}px
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Height:</span> {convertedImage.height}px
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <button
                type="button"
                onClick={handleDownload}
                className="w-full px-4 py-2 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download {targetFormat.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
      
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

export default ImageConverter;
