/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import { Link } from '../components/Link';
import { layoutStyle } from './styles';

export function Footer(): JSX.Element {
  return (
    <footer sx={{ ...layoutStyle, paddingTop: 5, paddingBottom: 5 }}>
      <nav
        sx={{
          display: 'flex',
          '& > :not(:last-child)': {
            marginRight: 4,
          },
          '@media screen and (max-width: 634px)': {
            flexDirection: 'column',
            '& > :not(:last-child)': {
              marginBottom: 4,
              marginRight: 0,
            },
          },
        }}
      >
        <Link href="/">&copy; 2020 ZOO</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </nav>
    </footer>
  );
}
