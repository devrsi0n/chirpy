import * as React from 'react';

export function useMessageListener<T>(handler: (event: MessageEvent<T>) => void): void {
  React.useEffect(() => {
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [handler]);
}
