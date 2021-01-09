import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';

type Variant = 'xs' | 'sm' | 'md' | 'lg';

type LinkProps = React.PropsWithChildren<
  NextLinkProps &
    React.ComponentProps<'a'> & {
      variant?: Variant;
    }
>;

const variantStyles: Record<Variant, string> = {
  xs: 'text-xs font-semibold',
  sm: 'text-sm font-semibold',
  md: 'text-md font-semibold',
  lg: 'text-lg font-semibold',
};

export function Link(props: LinkProps): JSX.Element {
  const {
    variant,
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref = true,
    prefetch,
    className = '',
    children,
    ...restProps
  } = props;
  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch, className }}>
      <a
        {...restProps}
        className={clsx(
          `text-primary hover:text-text transition duration-150 ease-in-out`,
          variant && variantStyles[variant],
          className,
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}
