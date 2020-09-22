/** @jsx jsx */
import { jsx, NavLink } from 'theme-ui';
import * as React from 'react';
import Link from 'next/link';

export function Footer(): JSX.Element {
  return (
    <footer sx={{ padding: '40px 0' }}>
      <nav
        sx={{
          display: 'flex',
          '& > *': {
            marginRight: 4,
          },
        }}
      >
        <NavLink as="span">
          <Link href="/">&copy; 2020 ZOO</Link>
        </NavLink>
        <NavLink as="span">
          <Link href="/terms-of-service">Terms of Service</Link>
        </NavLink>
        <NavLink as="span">
          <Link href="/privacy-policy">Privacy Policy</Link>
        </NavLink>
      </nav>
    </footer>
  );
}
