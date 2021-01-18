import * as React from 'react';
import Head from 'next/head';
import GitHubLogo from 'super-tiny-icons/images/svg/github.svg';
import GoogleLogo from 'super-tiny-icons/images/svg/google.svg';
import TwitterLogo from 'super-tiny-icons/images/svg/twitter.svg';
import FacebookLogo from 'super-tiny-icons/images/svg/facebook.svg';
import MicrosoftLogo from 'super-tiny-icons/images/svg/microsoft.svg';

import { Link } from '$/components/Link';
import { Button } from '$/components/Button';
import { Text } from '$/components/Text';
import { Heading } from '$/components/Heading';
import { Logo } from '$/components/Logo';
import styles from '$/styles/login.module.scss';
import clsx from 'clsx';

const signOptions = [
  {
    name: 'Google',
    size: 26,
    icon: GoogleLogo,
    href: '/api/auth/google',
  },
  {
    name: 'Facebook',
    size: 24,
    icon: FacebookLogo,
    href: '/api/auth/facebook',
  },
  {
    name: 'Microsoft',
    size: 27,
    icon: MicrosoftLogo,
    href: '/api/auth/microsoft',
  },
  {
    name: 'Twitter',
    size: 24,
    icon: TwitterLogo,
    href: '/api/auth/twitter',
  },
  {
    name: 'GitHub',
    size: 24,
    icon: GitHubLogo,
    href: '/api/auth/github',
  },
];

export default function Login(): JSX.Element {
  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>

      <div className="flex flex-row h-full">
        <div className="flex-1 flex flex-col justify-center">
          <div className="py-7 px-10">
            <Logo size="lg" />
            <Heading as="h2" className="font-black mt-5">
              Sign in to your account
            </Heading>
            <div className="space-y-2 mt-8">
              {signOptions.map((option) => (
                <Link key={option.name} href={option.href} variant="plain" className="block">
                  <Button className="w-full" size="lg">
                    <option.icon width={`${option.size}px`} height={`${option.size}px`} />
                    <span className="inline-block w-44 ml-2 text-left">
                      Sign in with {option.name}
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
