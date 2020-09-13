/** @jsx jsx */
import { jsx, NavLink, Flex } from 'theme-ui';
import * as React from 'react';
import Link from 'next/link';

export function Header(): JSX.Element {
  return (
    <header>
      <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <h1>zoo</h1>
        <nav
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <NavLink>
            <Link href="/login">Login</Link>
          </NavLink>
        </nav>
      </Flex>
    </header>
  );
}
