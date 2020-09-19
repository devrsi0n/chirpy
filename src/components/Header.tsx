/** @jsx jsx */
import { jsx, NavLink, Flex } from 'theme-ui';
import * as React from 'react';
import Link from 'next/link';
import { useCurrentUserQuery } from '$/generated/graphql';

export function Header(): JSX.Element {
  const { data, error } = useCurrentUserQuery();
  if (error) {
    console.error('Ger current user error: ', error);
  }
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
          {data?.currentUser?.avatar ? (
            <figure>
              <img
                src={data.currentUser.avatar}
                alt="The avatar of current user"
                sx={{ width: '64px' }}
              />
            </figure>
          ) : (
            <NavLink as="span">
              <Link href="/login">Login</Link>
            </NavLink>
          )}
        </nav>
      </Flex>
    </header>
  );
}
