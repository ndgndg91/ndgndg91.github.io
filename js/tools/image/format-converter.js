import '../../../css/tailwind.css'
import '../../navigation';
import '../../utils'

document.addEventListener('DOMContentLoaded', function() {
  // DOM 요소 참조
  const fileInput = document.getElementById('file-input');
  const dropArea = document.querySelector('label[for="file-input"]');
  const imageSettings = document.getElementById('image-settings');
  const conversionResult = document.getElementById('conversion-result');
  const qualityControl = document.getElementById('quality-control');
  const qualitySlider = document.getElementById('quality');
  const qualityValue = document.getElementById('quality-value');

  // 포맷 버튼
  const formatJpegBtn = document.getElementById('format-jpeg');
  const formatPngBtn = document.getElementById('format-png');
  const formatWebpBtn = document.getElementById('format-webp');

  // 미리보기 이미지
  const originalPreview = document.getElementById('original-preview');
  const convertedPreview = document.getElementById('converted-preview');

  // 원본 이미지 정보
  const originalFilename = document.getElementById('original-filename');
  const originalFormat = document.getElementById('original-format');
  const originalSize = document.getElementById('original-size');
  const originalWidth = document.getElementById('original-width');
  const originalHeight = document.getElementById('original-height');

  // 변환된 이미지 정보
  const convertedFormat = document.getElementById('converted-format');
  const convertedSize = document.getElementById('converted-size');
  const compressionRatio = document.getElementById('compression-ratio');
  const convertedWidth = document.getElementById('converted-width');
  const convertedHeight = document.getElementById('converted-height');

  // 버튼
  const convertBtn = document.getElementById('convert-btn');
  const downloadBtn = document.getElementById('download-btn');

  // 상태 변수
  let currentFile = null;
  let currentImage = null;
  let targetFormat = 'jpeg'; // 기본 변환 형식
  let activeFormatBtn = formatJpegBtn; // 기본 활성화 버튼

  // 포맷 감지 함수
  function detectFormat(file) {
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
  }

  // 파일 크기 포맷팅 함수
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // 이미지 로드 함수
  function loadImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  // 이미지 변환 함수
  function convertImage(img, format, quality = 0.9) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let mimeType;
      switch (format.toLowerCase()) {
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

      // 투명도 처리 (JPEG로 변환 시 배경을 흰색으로)
      if (mimeType === 'image/jpeg' && (detectFormat(currentFile) === 'PNG' || detectFormat(currentFile) === 'WebP')) {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3] / 255;
          data[i] = data[i] * alpha + 255 * (1 - alpha); // r
          data[i + 1] = data[i + 1] * alpha + 255 * (1 - alpha); // g
          data[i + 2] = data[i + 2] * alpha + 255 * (1 - alpha); // b
          data[i + 3] = 255; // a
        }

        ctx.putImageData(imageData, 0, 0);
      }

      const dataURL = canvas.toDataURL(mimeType, quality);

      // 변환된 이미지 크기 계산
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          resolve({
            dataURL,
            blob,
            width: img.width,
            height: img.height
          });
        });
    });
  }

  // 포맷 버튼 활성화 함수
  function setActiveFormatBtn(btn) {
    if (activeFormatBtn) {
      activeFormatBtn.classList.remove('bg-blue-700', 'text-white');
      activeFormatBtn.classList.add('bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-gray-400');
    }

    btn.classList.remove('bg-white', 'text-gray-900', 'dark:bg-gray-800', 'dark:text-gray-400');
    btn.classList.add('bg-blue-700', 'text-white');
    activeFormatBtn = btn;
  }

  // 품질 슬라이더 표시/숨김 함수
  function toggleQualityControl() {
    if (targetFormat === 'png') {
      qualityControl.classList.add('hidden');
    } else {
      qualityControl.classList.remove('hidden');
    }
  }

  // 파일 처리 함수
  async function handleFile(file) {
    // 이미지 파일 검증
    if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
      alert('Unsupported image format. Only JPEG, PNG, or WebP images can be uploaded.');
      return;
    }

    currentFile = file;

    try {
      // 이미지 로드
      currentImage = await loadImage(file);

      // 원본 이미지 정보 표시
      originalPreview.src = currentImage.src;
      originalFilename.textContent = file.name;
      originalFormat.textContent = detectFormat(file);
      originalSize.textContent = formatFileSize(file.size);
      originalWidth.textContent = currentImage.width;
      originalHeight.textContent = currentImage.height;

      // 기본적으로 현재 포맷과 다른 포맷을 선택
      const currentFormat = detectFormat(file).toLowerCase();
      if (currentFormat === 'jpeg') {
        targetFormat = 'png';
        setActiveFormatBtn(formatPngBtn);
      } else {
        targetFormat = 'jpeg';
        setActiveFormatBtn(formatJpegBtn);
      }

      toggleQualityControl();

      // 설정 UI 표시
      imageSettings.classList.remove('hidden');

      // 결과 UI 숨김
      conversionResult.classList.add('hidden');
    } catch (error) {
      console.error('Error processing image:', error);
      alert('An error occurred while processing the image.');
    }
  }

  // 이미지 변환 및 결과 표시 함수
  async function performConversion() {
    if (!currentFile || !currentImage) {
      alert('Please upload an image first.');
      return;
    }

    try {
      // 품질 값 적용 (PNG는 무손실이므로 무시됨)
      const quality = parseInt(qualitySlider.value) / 100;

      // 이미지 변환
      const result = await convertImage(currentImage, targetFormat, quality);

      // 결과 표시
      convertedPreview.src = result.dataURL;
      convertedFormat.textContent = targetFormat.toUpperCase();
      convertedSize.textContent = formatFileSize(result.blob.size);
      convertedWidth.textContent = result.width;
      convertedHeight.textContent = result.height;

      // 압축률 계산
      const ratio = 1 - (result.blob.size / currentFile.size);
      const ratioText = ratio > 0
        ? `${(ratio * 100).toFixed(1)}% decrease`
        : `${(Math.abs(ratio) * 100).toFixed(1)}% increase`;
      compressionRatio.textContent = ratioText;

      // 다운로드 링크 설정
      downloadBtn.href = result.dataURL;
      const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
      downloadBtn.download = `${currentFile.name.split('.')[0]}.${extension}`;

      // 결과 UI 표시
      conversionResult.classList.remove('hidden');
    } catch (error) {
      console.error('Error converting image:', error);
      alert('An error occurred while converting the image.');
    }
  }

  // 이벤트 리스너 설정

  // 파일 입력 이벤트
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  // 드래그 앤 드롭 이벤트
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.add('bg-gray-200', 'dark:bg-gray-600');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
      dropArea.classList.remove('bg-gray-200', 'dark:bg-gray-600');
    }, false);
  });

  dropArea.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  });

  // 포맷 버튼 이벤트
  formatJpegBtn.addEventListener('click', () => {
    targetFormat = 'jpeg';
    setActiveFormatBtn(formatJpegBtn);
    toggleQualityControl();
  });

  formatPngBtn.addEventListener('click', () => {
    targetFormat = 'png';
    setActiveFormatBtn(formatPngBtn);
    toggleQualityControl();
  });

  formatWebpBtn.addEventListener('click', () => {
    targetFormat = 'webp';
    setActiveFormatBtn(formatWebpBtn);
    toggleQualityControl();
  });

  // 품질 슬라이더 이벤트
  qualitySlider.addEventListener('input', () => {
    qualityValue.textContent = qualitySlider.value;
  });

  // 변환 버튼 이벤트
  convertBtn.addEventListener('click', performConversion);
});
