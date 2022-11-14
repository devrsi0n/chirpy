import * as React from 'react';

export function useForceUpdate() {
  const [, forceUpdate] = React.useState<boolean>();

  return React.useCallback(() => {
    forceUpdate((s) => !s);
  }, []);
}
