import * as React from 'react';

import { useIsUnmountingRef } from './use-is-unmounting-ref';

/**
 * Resolve promise only when component is mounted,
 * fix React setState on unmount warning
 * @returns
 */
export function useMountedPromise<T>(): (promise: Promise<T>) => Promise<T> {
  const isUnmountingRef = useIsUnmountingRef();
  return React.useCallback(
    (promise: Promise<any>) =>
      new Promise<any>((resolve, reject) => {
        const onValue = (value: T) => {
          !isUnmountingRef.current && resolve(value);
        };
        const onError = (error: any) => {
          !isUnmountingRef.current && reject(error);
        };
        promise.then(onValue, onError);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
}
