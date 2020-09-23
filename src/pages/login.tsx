/** @jsx jsx */
import { jsx } from 'theme-ui';
import * as React from 'react';
import Head from 'next/head';
import { Link } from '$/components/Link';

export default function login(): JSX.Element {
  return (
    <main>
      <Head>
        <title>ZOO: login</title>
      </Head>
      Login with <Link href="/api/auth/github">GitHub</Link>
    </main>
  );
}
