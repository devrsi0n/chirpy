import clsx from 'clsx';
import * as React from 'react';

import { useLocalStorage } from '../../hooks/use-storage';
import { BaseButton } from '../button';
import { TabsConfig, TabsContext, TabsLabelItem } from './tabs-context';
import { TabsItem } from './tabs-item';

export type TabProps = React.ComponentProps<'section'> & {
  initialValue?: string;
  value?: string;
  onChange?(value: string): void;
  cacheKey?: string;
  /**
   * Render to the left half of tabs header.
   */
  leftItem?: React.ReactNode;
};

// TODO: Animation https://codepen.io/devrsi0n/pen/XWKQJoY?editors=0110
export function Tabs({
  onChange,
  className,
  value,
  initialValue: customInitialValue,
  cacheKey,
  children,
  leftItem,
  ...restProps
}: TabProps): JSX.Element {
  const [selfValue, setSelfValue] = useLocalStorage(
    customInitialValue,
    cacheKey,
  );
  const [tabs, setTabs] = React.useState<TabsLabelItem[]>([]);

  const register = React.useMemo(
    // eslint-disable-next-line unicorn/consistent-function-scoping
    () => (next: TabsLabelItem) => {
      setTabs((last) => {
        const hasItem = last.find((item) => item.value === next.value);
        if (!hasItem) return [...last, next];
        return last.map((item) => {
          if (item.value !== next.value) return item;
          return {
            ...item,
            label: next.label,
            disabled: next.disabled,
          };
        });
      });
    },
    [],
  );

  const initialValue = React.useMemo<TabsConfig>(
    () => ({
      register,
      currentValue: selfValue,
    }),
    [selfValue, register],
  );
  React.useEffect(() => {
    if (value === undefined) return;
    setSelfValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClickTab = (item: TabsLabelItem) => {
    if (item.disabled) return;
    setSelfValue(item.value);
    onChange?.(item.value);
  };

  return (
    <TabsContext.Provider value={initialValue}>
      <section {...restProps} className={className}>
        <header className="flex flex-row items-center justify-between">
          <div>{leftItem}</div>
          <nav className="space-x-1">
            {tabs.map((item) => (
              <BaseButton
                className={clsx(
                  `p-1 text-xs font-bold text-gray-1200 hover:text-primary-1000`,
                  selfValue === item.value && `text-primary-1100 underline`,
                )}
                key={item.value}
                onClick={() => handleClickTab(item)}
              >
                {item.label}
              </BaseButton>
            ))}
          </nav>
        </header>
        <div>{children}</div>
      </section>
    </TabsContext.Provider>
  );
}

Tabs.Item = TabsItem;
