import * as React from 'react';

export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  return mounted;
}
