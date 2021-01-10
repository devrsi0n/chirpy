import * as React from 'react';

export type ClientOnlyProps = React.PropsWithChildren<{
  //
}>;

export function ClientOnly({ children }: ClientOnlyProps): JSX.Element {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <></>;
  }
  return <>{children}</>;
}
