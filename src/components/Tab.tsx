import * as React from 'react';
import clsx from 'clsx';

export type TabProps = React.ComponentProps<'section'> & {
  tabs: (string | JSX.Element)[];
  activeIndex?: number;
  onClickTab?(index: number): void;
};

export function Tab({
  onClickTab,
  activeIndex = 0,
  className,
  tabs,
  ...restProps
}: TabProps): JSX.Element {
  const handleKeyDown = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
    },
    [],
  );
  return (
    <section
      {...restProps}
      className={clsx('flex flex-row space-x-1 border-b border-gray-400', className)}
    >
      {tabs.map((tab, index) => {
        return (
          <button
            type="button"
            className={clsx(
              'hover:rounded hover:bg-gray-200 border-b-2 border-transparent p-3',
              index === activeIndex && 'text-primary border-primary',
            )}
            key={index}
            onMouseDown={handleKeyDown}
            onClick={() => {
              onClickTab?.(index);
            }}
          >
            {tab}
          </button>
        );
      })}
    </section>
  );
}
