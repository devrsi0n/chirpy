import clsx from 'clsx';
import { Link } from '../Link';
import * as React from 'react';

import { Text } from '../Text';

type Size = 'md' | 'lg';
export type LogoProps = {
  size?: Size;
};

const sizeStyles: Record<Size, string> = {
  md: 'text-xl font-black',
  lg: 'text-3xl font-black',
};

/* eslint-disable jsx-a11y/anchor-is-valid */
export function Logo({ size = 'md' }: LogoProps): JSX.Element {
  return (
    <Link href="/" aria-label={`Logo of ${process.env.NEXT_PUBLIC_APP_NAME}`} variant="plain">
      <Text className={clsx(sizeStyles[size], 'inline-block leading-none select-none')}>
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Text>
    </Link>
  );
}
