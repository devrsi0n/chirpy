import * as React from 'react';

export function useHasMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  return mounted;
}
