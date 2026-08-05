export interface Car {
  id: string;
  brand: string;
  model: string;
  type: 'EV' | 'ICE' | 'HEV' | 'PHEV'; // EV: 전기차, ICE: 내연기관, HEV: 하이브리드, PHEV: 플러그인 하이브리드
  priceMin: number; // 만원 단위
  priceMax: number; // 만원 단위
  power: number; // 마력 (hp)
  torque: number; // 토크 (kg.m)
  efficiency: number; // 연비 (km/L 또는 km/kWh)
  range: number; // 1회 충전 주행거리 (km, 전기차 전용)
  zeroToHundred: number; // 제로백 (초)
  size: 'Compact' | 'Subcompact' | 'Mid-size' | 'Full-size' | 'Large' | 'Compact SUV' | 'Mid-size SUV' | 'Large SUV';
  seats: number; // 승차인원
  imageUrl?: string; // 이미지 URL
  officialUrl?: string; // 공식 홈페이지 링크
  features: string[]; // 주요 특징들
  isCustom?: boolean; // 사용자 직접 추가 여부
}
