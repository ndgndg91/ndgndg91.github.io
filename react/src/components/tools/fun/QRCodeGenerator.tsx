import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Copy, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://developer-playground.com');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error('Please enter text');
      return;
    }

    setIsGenerating(true);
    try {
      // Canvas에 QR 코드 생성
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 280,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
      }

      // Data URL로도 생성 (다운로드용)
      const url = await QRCode.toDataURL(text, {
        width: 280,
        margin: 2,
        errorCorrectionLevel: 'M'
      });
      setQrCodeUrl(url);
      toast.success('QR code generated successfully');
    } catch (error) {
      console.error('QR code generation error:', error);
      toast.error('Failed to generate QR code');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `qrcode-${Date.now()}.png`;
      link.href = qrCodeUrl;
      link.click();
      toast.success('QR code downloaded successfully');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  // Auto-generate QR code when text changes
  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(() => {
        generateQRCode();
      }, 300); // 300ms 디바운스

      return () => clearTimeout(timeoutId);
    }
  }, [text]);

  // Generate initial QR code on component mount
  useEffect(() => {
    generateQRCode();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <QrCode className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">QR Code Generator</h1>
              <p className="text-blue-100">Convert text or URL to QR code</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Text or URL
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter content to convert to QR code&#10;&#10;Examples:&#10;• https://example.com&#10;• Hello World&#10;• tel:010-1234-5678&#10;• mailto:test@example.com"
                    className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    rows={8}
                  />
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {text.length} characters | QR code auto-generates as you type
                </div>
              </div>

              {/* Quick Examples */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Examples
                </h3>
                <div className="space-y-2">
                  {[
                    { label: 'WiFi', value: 'WIFI:T:WPA;S:MyNetwork;P:MyPassword;;' },
                    { label: 'Phone', value: 'tel:010-1234-5678' },
                    { label: 'Email', value: 'mailto:example@gmail.com' },
                    { label: 'SMS', value: 'sms:010-1234-5678?body=Hello' }
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => setText(example.value)}
                      className="text-xs bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded px-3 py-1 hover:bg-gray-50 dark:hover:bg-gray-550 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {example.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* QR Code Display Section */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Generated QR Code
                </h3>
                
                <div className="inline-block p-4 bg-white rounded-lg shadow-inner border-2 border-gray-100 dark:border-gray-600">
                  {isGenerating ? (
                    <div className="w-70 h-70 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <canvas
                      ref={canvasRef}
                      className="max-w-full h-auto"
                    />
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center mt-6">
                  <button
                    onClick={generateQRCode}
                    disabled={isGenerating || !text.trim()}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    <QrCode className="h-4 w-4" />
                    Regenerate
                  </button>
                  
                  <button
                    onClick={downloadQRCode}
                    disabled={!qrCodeUrl}
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>

                {/* Instructions */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Smartphone className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-700 dark:text-blue-300 text-left">
                      <p className="font-medium mb-1">How to Scan with Smartphone</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Open camera app and focus on the QR code</li>
                        <li>• Or use a QR code scanner app</li>
                        <li>• URLs will automatically open in browser</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;