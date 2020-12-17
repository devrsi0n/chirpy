import * as React from 'react';
import { useRouter } from 'next/router';

export function useRefreshServerProps(): () => void {
  const { replace, asPath } = useRouter();

  const refresh = React.useCallback(() => {
    replace(asPath);
  }, [replace, asPath]);

  return refresh;
}
