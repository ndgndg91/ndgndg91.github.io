import { useSyncExternalStore } from 'react';

/**
 * React 18 하이드레이션 불일치(#418)를 원천 차단하는 표준 훅
 * 정적 HTML(react-snap)과 클라이언트의 첫 번째 렌더링 결과를 100% 일치시킵니다.
 */
const emptySubscribe = () => () => {};

export const useIsMounted = () => {
  // 서버와 첫 렌더링에서는 항상 false를 반환하도록 고정
  // 클라이언트에서 두 번째 렌더링(Effect 이후)에서만 true를 반환
  return useSyncExternalStore(
    emptySubscribe,
    () => true,    // Client side value
    () => false    // Server/Build side value
  );
};
