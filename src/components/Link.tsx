import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

type LinkProps = React.PropsWithChildren<NextLinkProps & React.ComponentProps<'a'>>;

export function Link(props: LinkProps): JSX.Element {
  const {
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
        className={`text-primary hover:text-gray-700 transition duration-150 ease-in-out ${className}`}
      >
        {children}
      </a>
    </NextLink>
  );
}
