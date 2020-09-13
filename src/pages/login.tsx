/** @jsx jsx */
import { jsx, Link } from 'theme-ui';
import * as React from 'react';

export default function login(): JSX.Element {
  return (
    <main>
      Login with <Link href="/api/auth/github">GitHub</Link>
    </main>
  );
}
