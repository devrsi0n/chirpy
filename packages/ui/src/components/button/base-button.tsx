import clsx from 'clsx';
import NextLink from 'next/link';
import * as React from 'react';

export type BaseButtonProps = React.ComponentPropsWithRef<'button'> & {
  align?: ButtonAlign;
  href?: string;
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
    href,
    ...restProps
  }: BaseButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
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

  const _className = clsx(
    'relative inline-flex touch-none select-none flex-row items-center overflow-hidden transition duration-150 ease-in-out focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-1 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-75 disabled:shadow-none',
    ITEM_ALIGN_MAP[align],
    className,
  );

  return href && !allProps.disabled ? (
    <NextLink
      // link doesn't have `disabled` state
      className={_className.replaceAll('enabled:', '')}
      href={href}
      ref={ref as React.ForwardedRef<HTMLAnchorElement>}
    >
      {children}
    </NextLink>
  ) : (
    <button
      {...allProps}
      className={_className}
      onMouseDown={handleMouseDown}
      onClick={onClick}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {children}
    </button>
  );
});

const ITEM_ALIGN_MAP: Record<ButtonAlign, string> = {
  start: 'justify-start',
  center: 'justify-center',
};
