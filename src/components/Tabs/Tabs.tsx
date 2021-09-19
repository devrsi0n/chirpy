import * as React from 'react';
import tw from 'twin.macro';

import { BaseButton } from '../Button';
import { TabsConfig, TabsContext, TabsLabelItem } from './TabsContext';
import { TabsItem } from './TabsItem';

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
      <section {...restProps} className={className}>
        <header tw="flex flex-row items-center justify-between border-b">
          <nav tw="space-x-1">
            {tabs.map((item) => (
              <BaseButton
                css={[
                  tw`hover:rounded hover:bg-gray-100 border-b-2 p-3 border-t-0 border-r-0 border-l-0`,
                  selfValue === item.value
                    ? tw`text-primary-900 border-primary-900`
                    : tw`border-transparent`,
                ]}
                // onMouseDown={handleKeyDown}
                key={item.value}
                onClick={() => handleClickTab(item)}
              >
                {item.label}
              </BaseButton>
            ))}
          </nav>
          <div>{rightItems}</div>
        </header>
        <div>{children}</div>
      </section>
    </TabsContext.Provider>
  );
}

Tabs.Item = TabsItem;
