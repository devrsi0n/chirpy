import * as React from 'react';

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: (didClick: boolean) => void,
): void {
  const { current } = ref;
  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (current && !current.contains(event.target as Node)) {
        callback(true);
      }
    },
    [callback, current],
  );
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
}
