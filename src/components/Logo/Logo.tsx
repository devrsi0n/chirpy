import Link from 'next/link';
import * as React from 'react';

import { Text } from '../Text';

export type LogoProps = {
  //
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Logo(props: LogoProps): JSX.Element {
  return (
    <Link href="/">
      <a aria-label={`Logo of ${process.env.NEXT_PUBLIC_APP_NAME}`}>
        <Text className="text-xl font-black leading-none select-none">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Text>
      </a>
    </Link>
  );
}
