interface Window {
  kakaoAdQueue?: Array<() => void>;
  kakao_adfit?: {
    display: (adUnit: string) => void;
  };
  kakao?: {
    displaySlot: (slotId: string) => void;
  };
}
