import * as React from 'react';

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: (didClick: boolean) => void,
): void {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
