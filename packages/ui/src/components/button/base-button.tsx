import clsx from 'clsx';
import * as React from 'react';

export type BaseButtonProps = React.ComponentPropsWithRef<'button'> & {
  align?: ButtonAlign;
};
type ButtonAlign = 'start' | 'center';

export const BaseButton = React.forwardRef(function BaseButton(
  {
    type = 'button',
    align = 'center',
    children,
    className,
    onClick,
    onMouseDown,
    ...restProps
  }: BaseButtonProps,
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // Prevent mouse click with focus styles(e.g. outline)
      e.preventDefault();
      onMouseDown?.(e);
    },
    [onMouseDown],
  );
  const allProps = {
    type,
    ...restProps,
  };

  return (
    <button
      {...allProps}
      className={clsx(
        'relative inline-flex touch-none select-none flex-row items-center overflow-hidden transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none',
        ITEM_ALIGN_MAP[align],
        className,
      )}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      ref={ref}
    >
      {children}
    </button>
  );
});

const ITEM_ALIGN_MAP: Record<ButtonAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
};
