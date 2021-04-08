import * as React from 'react';

import { Auth } from '$/blocks/Auth';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';

export default function LogIn(): JSX.Element {
  return (
    <Auth
      name="Log in"
      title="Welcome back 👋"
      subtitle={
        <div tw="flex flex-row space-x-1">
          <Text tw="text-gray-500">Don't have an account yet?</Text>
          <Link href="/sign-up" variant="nav">
            Join {process.env.NEXT_PUBLIC_APP_NAME}
          </Link>
        </div>
      }
    />
  );
}
