import * as React from 'react';

export function useRefetchInterval() {
  const intervalCount = React.useRef(0);
  return function refetchInterval() {
    intervalCount.current += 1;
    return Math.min(500 * intervalCount.current + 5000, 30 * 1000);
  };
}
