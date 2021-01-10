import * as React from 'react';

// export type useIsUnmountingOptions = {};

export function useIsUnmountingRef(): React.MutableRefObject<boolean> {
  const isUnmountingRef = React.useRef(false);
  React.useEffect(() => {
    return () => {
      isUnmountingRef.current = true;
    };
  }, []);

  return isUnmountingRef;
}
