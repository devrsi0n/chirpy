import * as React from 'react';

import { Auth } from '$/blocks/Auth';
import { Link } from '$/components/Link';
import { Text } from '$/components/Text';

export default function SignUp(): JSX.Element {
  return (
    <Auth
      name="Sign up"
      title="Create an account 🎓"
      subtitle={
        <div className="flex flex-row space-x-1">
          <Text className="text-gray-500">Already have an account?</Text>
          <Link href="/sign-in" variant="nav">
            Sign in
          </Link>
        </div>
      }
    />
  );
}
