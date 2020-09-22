/** @jsx jsx */
import { jsx, Link as ThemeLink } from 'theme-ui';
import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

type LinkProps = React.PropsWithChildren<NextLinkProps>;

export function Link(props: LinkProps): JSX.Element {
  return <ThemeLink as={() => <NextLink {...props} />} />;
}
