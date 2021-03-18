import * as React from 'react';
import Head from 'next/head';
import 'twin.macro';

import { Button } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { Logo } from '$/components/Logo';
import { Text } from '$/components/Text';
import { authOptions } from './DataSource';

import tw, { css } from 'twin.macro';

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

      <div tw="flex flex-row h-full">
        <div tw="flex-1 flex flex-col justify-center">
          <div tw="py-7 px-10">
            <Logo size="lg" noSpacing />
            <div tw="space-y-2">
              <Heading as="h2" tw="font-black mt-5">
                {title}
              </Heading>
              {subtitle}
            </div>
            <div tw="space-y-2 mt-8">
              {authOptions.map((option) => (
                <Link key={option.name} href={option.href} variant="plain" tw="block">
                  <Button tw="w-full" size="lg">
                    <option.icon width={`${option.size}px`} height={`${option.size}px`} />
                    <span tw="inline-block ml-2 text-left" style={{ width: '11.5rem' }}>
                      {name} with {option.name}
                    </span>
                  </Button>
                </Link>
              ))}
            </div>
            <Text tw="py-3 text-gray-500" variant="sm">
              By clicking the buttons above, you acknowledge that you have read and understood, and
              agree to {process.env.NEXT_PUBLIC_APP_NAME}'s{' '}
              <Link href="/terms-of-service">Terms of Service</Link> and{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </Text>
          </div>
        </div>
        <div css={[tw`flex-1 hidden md:block`, bannerStyle]}></div>
      </div>
    </>
  );
}

const bannerStyle = css`
  width: 100%;
  height: 100vh;
  min-height: 200px;
  background: url('/images/sign-in/banner.jpg') center no-repeat;
  background-size: cover;
`;
