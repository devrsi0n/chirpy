import * as React from 'react';
import clsx from 'clsx';
import Head from 'next/head';

import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Logo } from '$/components/Logo';
import { Text } from '$/components/Text';
import { authOptions } from './DataSource';

import styles from './auth.module.scss';

export type AuthProps = React.PropsWithChildren<{
  name: 'Sign in' | 'Sign up';
  title: string;
  subtitle?: React.ReactNode;
}>;

export function Auth({ name, title, subtitle }: AuthProps): JSX.Element {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>

      <div className="flex flex-row h-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="py-7 px-10">
            <Logo size="lg" />
            <div className="space-y-2">
              <Heading as="h2" className="font-black mt-5">
                {title}
              </Heading>
              {subtitle}
            </div>
            <div className="space-y-2 mt-8">
              {authOptions.map((option) => (
                <Link key={option.name} href={option.href} variant="plain" className="block">
                  <Button className="w-full" size="lg">
                    <option.icon width={`${option.size}px`} height={`${option.size}px`} />
                    <span className="inline-block ml-2 text-left" style={{ width: '11.5rem' }}>
                      {name} with {option.name}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
            <Text className="py-3 text-gray-400" variant="sm">
              By clicking the buttons above, you acknowledge that you have read and understood, and
              agree to {process.env.NEXT_PUBLIC_APP_NAME}'s{' '}
              <Link href="/terms-of-service">Terms of Service</Link> and{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </Text>
          </div>
        </div>
        <div className={clsx('flex-1 hidden md:block', styles.banner)}></div>
      </div>
    </>
  );
}
