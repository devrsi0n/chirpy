/** @jsx jsx */
import { Button, Card, Heading, jsx, Text } from 'theme-ui';
import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from '../components/Link';

export default function Login(): JSX.Element {
  const router = useRouter();
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      router.push('/api/auth/github');
    },
    [router],
  );
  return (
    <main>
      <Head>
        <title>ZOO: login</title>
      </Head>
      <Card sx={{ width: 'max-content', maxWidth: '70%' }}>
        <Heading as="h2">Log in</Heading>
        <Button variant="primary" onClick={handleClick}>
          Continue with GitHub
        </Button>
        <Text sx={{ paddingTop: 3, paddingBottom: 3 }} variant="secondary">
          By clicking the buttons above, you acknowledge that you have read and understood, and
          agree to ZOO's <Link href="/terms-of-service">Terms of Service</Link> and{' '}
          <Link href="/privacy-policy">Privacy Policy</Link>.
        </Text>
      </Card>
    </main>
  );
}
