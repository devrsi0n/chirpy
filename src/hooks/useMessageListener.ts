import * as React from 'react';

export function useStorageListener(handler: (event: StorageEvent) => void): void {
  React.useEffect(() => {
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [handler]);
}
