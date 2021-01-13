import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import clsx from 'clsx';
import { useRouter } from 'next/router';

type Variant = 'xs' | 'sm' | 'md' | 'lg';

type LinkProps = React.PropsWithChildren<
  NextLinkProps &
    React.ComponentPropsWithoutRef<'a'> & {
      variant?: Variant;
      /**
       * Hightlight the link when href match the current url
       */
      highlightMatch?: boolean;
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
    highlightMatch,
    ...restProps
  } = props;
  const router = useRouter();
  const isCurrentURL = highlightMatch && router.pathname === href;
  return (
    <NextLink {...{ href, as, replace, scroll, shallow, passHref, prefetch, className }}>
      <a
        {...restProps}
        className={clsx(
          `text-gray-600 hover:text-primary transition duration-150 ease-in-out`,
          variant && variantStyles[variant],
          isCurrentURL && 'text-primary-dark',
          className,
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}
