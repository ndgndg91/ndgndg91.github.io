import { useState, useCallback } from 'react';

type ImageFormat = 'jpeg' | 'png' | 'webp';

interface ImageInfo {
  file: File;
  width: number;
  height: number;
  src: string;
  format: string;
  size: number;
}

interface ConvertedImage {
  dataURL: string;
  blob: Blob;
  width: number;
  height: number;
}

export const useImageConverter = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<ImageInfo | null>(null);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>('jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<ConvertedImage | null>(null);

  // 파일 형식 감지
  const detectFormat = useCallback((file: File): string => {
    const type = file.type.toLowerCase();
    if (type.includes('jpeg') || type.includes('jpg')) {
      return 'JPEG';
    } else if (type.includes('png')) {
      return 'PNG';
    } else if (type.includes('webp')) {
      return 'WebP';
    } else {
      return 'Unknown';
    }
  }, []);

  // 파일 크기 포맷팅
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // 이미지 로드
  const loadImage = useCallback((file: File): Promise<ImageInfo> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve({
            file,
            width: img.width,
            height: img.height,
            src: e.target?.result as string,
            format: detectFormat(file),
            size: file.size
          });
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }, [detectFormat]);

  // 이미지 변환
  const convertImage = useCallback(async (img: ImageInfo, format: ImageFormat, quality: number): Promise<ConvertedImage> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      const image = new Image();
      image.onload = () => {
        // 캔버스에 이미지 그리기
        ctx.drawImage(image, 0, 0);

        // 투명도 처리 (JPEG로 변환 시 배경을 흰색으로)
        if (format === 'jpeg' && (img.format === 'PNG' || img.format === 'WebP')) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const alpha = data[i + 3] / 255;
            data[i] = data[i] * alpha + 255 * (1 - alpha);     // r
            data[i + 1] = data[i + 1] * alpha + 255 * (1 - alpha); // g
            data[i + 2] = data[i + 2] * alpha + 255 * (1 - alpha); // b
            data[i + 3] = 255; // a
          }

          ctx.putImageData(imageData, 0, 0);
        }

        // MIME 타입 설정
        let mimeType: string;
        switch (format) {
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'webp':
            mimeType = 'image/webp';
            break;
          default:
            mimeType = 'image/jpeg';
        }

        // 이미지 변환
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to convert image'));
            return;
          }
          const dataURL = URL.createObjectURL(blob);
          resolve({
            dataURL,
            blob,
            width: img.width,
            height: img.height
          });
        }, mimeType, quality);
      };
      image.onerror = reject;
      image.src = img.src;
    });
  }, []);

  // 파일 처리
  const handleFileUpload = useCallback(async (file: File) => {
    // 이미지 파일 검증
    if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
      throw new Error('Unsupported image format. Only JPEG, PNG, or WebP images can be uploaded.');
    }

    try {
      const imageInfo = await loadImage(file);
      setCurrentFile(file);
      setCurrentImage(imageInfo);
      
      // 기본적으로 현재 포맷과 다른 포맷을 선택
      const currentFormat = detectFormat(file).toLowerCase();
      if (currentFormat === 'jpeg') {
        setTargetFormat('png');
      } else {
        setTargetFormat('jpeg');
      }
      
      return imageInfo;
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }, [detectFormat, loadImage]);

  // 이미지 변환 실행
  const performConversion = useCallback(async () => {
    if (!currentImage) {
      throw new Error('No image to convert');
    }

    try {
      setIsConverting(true);
      const result = await convertImage(currentImage, targetFormat, quality / 100);
      setConvertedImage(result);
      return result;
    } catch (error) {
      console.error('Error converting image:', error);
      throw error;
    } finally {
      setIsConverting(false);
    }
  }, [currentImage, targetFormat, quality, convertImage]);

  // 다운로드 링크 생성
  const getDownloadInfo = useCallback(() => {
    if (!convertedImage || !currentFile) return null;
    
    const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
    const filename = `${currentFile.name.split('.')[0]}.${extension}`;
    
    return {
      url: convertedImage.dataURL,
      filename
    };
  }, [convertedImage, currentFile, targetFormat]);

  // 압축률 계산
  const getCompressionRatio = useCallback(() => {
    if (!convertedImage || !currentFile) return null;
    
    const ratio = 1 - (convertedImage.blob.size / currentFile.size);
    return ratio > 0
      ? `${(ratio * 100).toFixed(1)}% decrease`
      : `${(Math.abs(ratio) * 100).toFixed(1)}% increase`;
  }, [convertedImage, currentFile]);

  return {
    // 상태
    currentFile,
    currentImage,
    targetFormat,
    setTargetFormat,
    quality,
    setQuality,
    isConverting,
    convertedImage,
    
    // 메서드
    handleFileUpload,
    performConversion,
    getDownloadInfo,
    getCompressionRatio,
    formatFileSize
  };
};
