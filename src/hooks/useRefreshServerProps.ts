import { useRouter } from 'next/router';
import * as React from 'react';

export function useRefreshServerProps(): () => void {
  const { replace, asPath } = useRouter();

  const refresh = React.useCallback(() => {
    replace(asPath);
  }, [replace, asPath]);

  return refresh;
}
