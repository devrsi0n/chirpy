/** @jsx jsx */
import { jsx, Flex, Avatar, Heading } from 'theme-ui';
import * as React from 'react';
import { Link } from '../components/Link';
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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Heading as="h3" sx={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/">ZOO</Link>
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
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
