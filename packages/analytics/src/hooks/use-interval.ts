import { useEffect, useRef } from 'react';

import useIsomorphicLayoutEffect from './use-isomorphic-layout-effect';

export default function useInterval(
  callback: () => void,
  delay: number | null,
) {
  const savedCallback = useRef(callback);

  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
