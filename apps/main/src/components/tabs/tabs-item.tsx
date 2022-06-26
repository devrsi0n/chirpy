import * as React from 'react';

import { useTabsContext } from './tabs-context';

export type TabsItemProps = React.PropsWithChildren<{
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}>;

export function TabsItem({
  children,
  value,
  label,
  disabled,
}: TabsItemProps): JSX.Element {
  const { register, currentValue } = useTabsContext();
  const isActive = React.useMemo(
    () => currentValue === value,
    [currentValue, value],
  );

  React.useEffect(() => {
    register?.({ value, label, disabled: !!disabled });
  }, [value, label, disabled, register]);

  return <>{isActive && <div className="py-1">{children}</div>}</>;
}
