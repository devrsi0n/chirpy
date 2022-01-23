import * as React from 'react';

import { useHasMounted } from '$/hooks/useHasMounted';

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
