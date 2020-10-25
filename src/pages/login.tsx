import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from '$/components/Link';
import { Button } from '$/components/Button';
import { Text } from '$/components/Text';
import { Heading } from '$/components/Heading';
import { Card } from '$/components/Card';
import { Layout } from '$/components/Layout';

export default function Login(): JSX.Element {
  const router = useRouter();
  const handleClick = React.useCallback(() => {
    router.push('/api/auth/github');
  }, [router]);
  return (
    <Layout>
      <main>
        <Head>
          <title>ZOO: login</title>
        </Head>
        <Card className="py-5 max-w-screen-md">
          <Heading as="h2">Log in</Heading>
          <Button variant="primary" onClick={handleClick}>
            Continue with GitHub
          </Button>
          <Text className="py-3" variant="secondary">
            By clicking the buttons above, you acknowledge that you have read and understood, and
            agree to ZOO's <Link href="/terms-of-service">Terms of Service</Link> and{' '}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </Text>
        </Card>
      </main>
    </Layout>
  );
}
