import * as React from 'react';

import { useMountedPromise } from './use-mounted-promise';

/**
 * Async function hooks
 * @param asyncFunction
 * @param immediate Call the function immediately
 * @returns
 */
export function useAsync<T, E = Error>(asyncFunction: () => Promise<T>, immediate = false) {
  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<E | null>(null);

  const asyncFuncRef = React.useRef(asyncFunction);
  React.useEffect(() => {
    asyncFuncRef.current = asyncFunction;
  });

  const mountedPromise = useMountedPromise<T>();

  const execute = React.useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);
    try {
      const response = await mountedPromise(asyncFuncRef.current());
      setData(response);
      setStatus('success');
    } catch (error) {
      setError(error as E);
      setStatus('error');
    }
  }, [mountedPromise]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  const reset = React.useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  return { execute, status, data, error, reset };
}
