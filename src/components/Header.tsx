import * as React from 'react';

import { Button } from '$/components/Button';
import { Link } from '../components/Link';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { Popover } from './Popover';
import { useRouter } from 'next/router';
import { Heading } from './Heading';
import { Avatar } from './Avatar';
import { layoutStyle } from './styles';

export function Header(): JSX.Element {
  const { data, error } = useCurrentUser();
  const router = useRouter();
  const handleClick = React.useCallback(() => {
    router.push('/api/auth/logout');
  }, [router]);
  if (error) {
    console.error('Get current user error: ', error);
  }
  return (
    <header className="sm:sticky sm:top-0 sm:left-0 header w-full border-b border-divider transition duration-150 sm:z-20">
      <div className="layout mx-auto">
        <section className="flex flex-row justify-between items-center">
          <Heading as="h3" className="flex items-center font-bold">
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
      </div>
      <style jsx>
        {`
          .header {
            backdrop-filter: blur(10px);
          }
        `}
      </style>
      <style jsx>{layoutStyle}</style>
    </header>
  );
}
