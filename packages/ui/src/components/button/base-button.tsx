import clsx from 'clsx';
import * as React from 'react';

export type BaseButtonProps = React.ComponentPropsWithRef<'button'>;

export const BaseButton = React.forwardRef(function BaseButton(
  {
    type = 'button',
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
        'relative inline-flex select-none flex-row items-center justify-center overflow-hidden transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-75',
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
