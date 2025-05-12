import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

interface DecodedToken {
  header: any;
  payload: any;
}

const JWTDecoder: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [error, setError] = useState<string>('');

  const handleDecode = () => {
    try {
      if (!token) {
        setError('JWT 토큰을 입력해주세요.');
        return;
      }

      const decoded = jwtDecode(token, { header: true });
      setDecodedToken({
        header: decoded.header,
        payload: decoded.payload
      });
      setError('');
    } catch (err) {
      setError('유효하지 않은 JWT 토큰입니다.');
      setDecodedToken(null);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('클립보드에 복사되었습니다');
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="token" className="block text-sm font-medium text-gray-700">
          JWT 토큰
        </label>
        <div className="mt-1">
          <textarea
            id="token"
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="JWT 토큰을 입력하세요"
          />
        </div>
      </div>

      <button
        onClick={handleDecode}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        디코딩
      </button>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {decodedToken && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900">헤더</h3>
            <div className="mt-2 relative">
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(decodedToken.header, null, 2)}
              </pre>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decodedToken.header, null, 2))}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900">페이로드</h3>
            <div className="mt-2 relative">
              <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                {JSON.stringify(decodedToken.payload, null, 2)}
              </pre>
              <button
                onClick={() => copyToClipboard(JSON.stringify(decodedToken.payload, null, 2))}
                className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JWTDecoder; 