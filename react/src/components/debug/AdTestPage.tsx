import React from 'react';
import KakaoAd from '../ads/KakaoAd';

const AdTestPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">카카오 광고 테스트</h1>
      
      {/* 스카이스크래퍼 광고 테스트 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">스카이스크래퍼 광고 (160x600)</h2>
        <div className="border border-gray-300 p-4 inline-block">
          <KakaoAd
            adUnit="DAN-2nMLIisQJKH9qMpe"
            width={160}
            height={600}
            className="border border-red-200"
          />
        </div>
      </div>

      {/* 직사각형 광고 테스트 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">직사각형 광고 (300x250)</h2>
        <div className="border border-gray-300 p-4 inline-block">
          <KakaoAd
            adUnit="DAN-nZOLt6AO6PDMGqAR"
            width={300}
            height={250}
            className="border border-blue-200"
          />
        </div>
      </div>

      {/* 디버깅 정보 */}
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">디버깅 정보:</h3>
        <p>• 개발자 도구 → Console에서 "Kakao Ad" 로그 확인</p>
        <p>• 개발자 도구 → Network에서 daum 도메인 요청 확인</p>
        <p>• 요소 검사에서 .kakao_ad_area 클래스 확인</p>
      </div>
    </div>
  );
};

export default AdTestPage;
