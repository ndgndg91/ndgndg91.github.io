interface Window {
  kakaoAdQueue?: Array<() => void>;
  kakao?: {
    displaySlot: (slotId: string) => void;
  };
}
