import * as React from 'react';

export function useClickOutside(
  callback: () => void,
): React.RefObject<HTMLElement> {
  const containerRef = React.useRef<HTMLElement>(null);
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;

  React.useEffect(() => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const listener = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        callbackRef.current();
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  return containerRef;
}
