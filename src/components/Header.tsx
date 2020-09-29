/** @jsx jsx */
import { jsx, Avatar, Heading, Container, Button } from 'theme-ui';
import * as React from 'react';
import { Link } from '../components/Link';
import { useCurrentUserQuery } from '$/generated/graphql';
import { layoutStyle } from './styles';
import { Popover } from './Popover';
import { useRouter } from 'next/router';

export function Header(): JSX.Element {
  const { data, error } = useCurrentUserQuery();
  const router = useRouter();
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      router.push('/api/auth/logout');
    },
    [router],
  );
  if (error) {
    console.error('Ger current user error: ', error);
  }
  return (
    <Container as="header" variant="header">
      <section
        className="flex flex-row justify-between items-center"
        sx={{
          ...layoutStyle,
        }}
      >
        <Heading as="h3" className="flex items-center">
          <Link href="/">ZOO</Link>
        </Heading>
        <nav className="flex flex-row items-center h-full">
          {data?.currentUser?.avatar ? (
            <Popover
              content={
                <Button variant="text" onClick={handleClick}>
                  Logout
                </Button>
              }
            >
              <figure>
                <Avatar src={data.currentUser.avatar} alt="The avatar of current user" />
              </figure>
            </Popover>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </nav>
      </section>
    </Container>
  );
}
