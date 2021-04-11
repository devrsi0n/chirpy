import * as React from 'react';

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  callback: (didClick: boolean) => void,
): void {
  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback],
  );
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
}
