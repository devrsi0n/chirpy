/** @jsx jsx */
import { jsx, Link as ThemeLink, BoxOwnProps } from 'theme-ui';
import * as React from 'react';
import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';

type LinkProps = React.PropsWithChildren<NextLinkProps> & BoxOwnProps;

export function Link(props: LinkProps): JSX.Element {
  const { variant, sx, css, children, passHref = true, ...nextProps } = props;
  return (
    <NextLink {...nextProps} passHref={passHref}>
      <ThemeLink {...{ sx, css, children }} />
    </NextLink>
  );
}
