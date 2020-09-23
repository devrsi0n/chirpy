/** @jsx jsx */
import { jsx, NavLink, Flex, Avatar, Heading } from 'theme-ui';
import * as React from 'react';
import Link from 'next/link';
import { useCurrentUserQuery } from '$/generated/graphql';
import { layoutStyle } from './styles';

export function Header(): JSX.Element {
  const { data, error } = useCurrentUserQuery();
  if (error) {
    console.error('Ger current user error: ', error);
  }
  return (
    <header
      sx={{
        ...layoutStyle,
        position: 'sticky',
        top: 0,
        left: 0,
        backgroundColor: 'navbarBackground',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Heading as="h3" sx={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/">
            <NavLink>ZOO</NavLink>
          </Link>
        </Heading>
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
              <Avatar src={data.currentUser.avatar} alt="The avatar of current user" />
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
