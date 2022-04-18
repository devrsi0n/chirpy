import * as React from 'react';
import tw from 'twin.macro';

import { SignInButton } from '$/blocks/sign-in-button';
import { UserMenu } from '$/blocks/user-menu';
import { Link } from '$/components/link';
import { Logo } from '$/components/logo';
import { useCurrentUser } from '$/contexts/current-user-context/use-current-user';
import { bluredBg } from '$/styles/common';

import { NotificationHub } from '../notification-hub';
import { SideMenu } from '../side-menu';

export function Header(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const styles = tw`ml-[22px]`;
  return (
    <header
      css={[
        tw`w-full py-3 transition duration-150 shadow-sm relative sm:(sticky top-0 left-0) z-20`,
        bluredBg,
      ]}
    >
      <div tw="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <section tw="flex flex-row items-center justify-between">
          <div tw="flex items-center sm:hidden pl-3">
            <SideMenu>
              {isSignIn ? (
                <SideMenu.Item>
                  <Link
                    size="lg"
                    href="/dashboard"
                    css={[styles]}
                    highlightPattern={/^\/dashboard/}
                  >
                    Dashboard
                  </Link>
                </SideMenu.Item>
              ) : (
                <SideMenu.Item>
                  <Link size="lg" href="/#pricing" css={[styles]} highlightPattern={/^\/#pricing/}>
                    Pricing
                  </Link>
                </SideMenu.Item>
              )}
              <SideMenu.Item>
                <Link size="lg" href="/docs/index" css={[styles]} highlightPattern={/^\/docs/}>
                  Docs
                </Link>
              </SideMenu.Item>
              <SideMenu.Item>
                <Link size="lg" href="/blog" css={[styles]} highlightPattern={/^\/blog/}>
                  Blog
                </Link>
              </SideMenu.Item>
              <SideMenu.Item>
                <Link size="lg" href="https://github.com/devrsi0n/chirpy" css={[styles]}>
                  GitHub
                </Link>
              </SideMenu.Item>
            </SideMenu>
          </div>
          <div tw="flex flex-row sm:(items-stretch justify-start)">
            <div tw="flex flex-row items-center space-x-2">
              <Logo showBadge />
            </div>
            <nav
              css={[
                tw`w-full hidden sm:(flex mb-0 pl-8 ml-8 border-l border-gray-500) flex-wrap items-center mb-5 space-x-8`,
              ]}
            >
              {isSignIn ? (
                <Link href="/dashboard" highlightPattern={/^\/dashboard/}>
                  Dashboard
                </Link>
              ) : (
                <Link href="/#pricing" highlightPattern={/^\/#pricing/}>
                  Pricing
                </Link>
              )}
              <Link href="/docs/index" highlightPattern={/^\/docs/}>
                Docs
              </Link>
              <Link href="/blog" highlightPattern={/^\/blog/}>
                Blog
              </Link>
              <Link href="https://github.com/devrsi0n/chirpy">GitHub</Link>
            </nav>
          </div>
          <div tw="flex">
            {isSignIn ? (
              <>
                <NotificationHub />
                <UserMenu variant="Nav" />
              </>
            ) : (
              <SignInButton inPageNav />
            )}
          </div>
        </section>
      </div>
    </header>
  );
}
