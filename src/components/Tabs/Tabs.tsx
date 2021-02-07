import * as React from 'react';
import clsx from 'clsx';
import { TabsConfig, TabsContext, TabsLabelItem } from './TabsContext';
import { TabsItem } from './TabsItem';
import { BaseButton } from '../Button';

export type TabProps = React.ComponentProps<'section'> & {
  initialValue?: string;
  value?: string;
  onChange?(value: string): void;
  /**
   * Render to the right half of tabs header.
   */
  rightItems?: React.ReactNode;
};

// TODO: Animation https://codepen.io/devrsi0n/pen/XWKQJoY?editors=0110
export function Tabs({
  onChange,
  className,
  value,
  initialValue: userCustomInitialValue,
  children,
  rightItems,
  ...restProps
}: TabProps): JSX.Element {
  const handleKeyDown = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    },
    [],
  );

  const [selfValue, setSelfValue] = React.useState<string | undefined>(userCustomInitialValue);
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
  }, [value]);

  const handleClickTab = (item: TabsLabelItem) => {
    if (item.disabled) return;
    setSelfValue(item.value);
    onChange?.(item.value);
  };

  return (
    <TabsContext.Provider value={initialValue}>
      <section {...restProps} className={clsx('', className)}>
        <header className="flex flex-row items-center justify-between border-b">
          <nav className="space-x-1 border-gray-400">
            {tabs.map((item) => (
              <BaseButton
                className={clsx(
                  'hover:rounded hover:bg-gray-50 border-b-2 border-transparent p-3',
                  selfValue === item.value && 'text-primary border-primary',
                )}
                style={{
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                }}
                onMouseDown={handleKeyDown}
                key={item.value}
                onClick={() => handleClickTab(item)}
              >
                {item.label}
              </BaseButton>
            ))}
          </nav>
          <div>{rightItems}</div>
        </header>
        <div className="content">{children}</div>
      </section>
    </TabsContext.Provider>
  );
}

Tabs.Item = TabsItem;
