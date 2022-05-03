import * as React from 'react';

import { useHasMounted } from '@chirpy/hooks';

export type ClientOnlyProps = React.PropsWithChildren<{
  //
}>;

export function ClientOnly({ children }: ClientOnlyProps): JSX.Element {
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <></>;
  }
  return <>{children}</>;
}
