import clsx from 'clsx';
import * as React from 'react';

import { SignInButton } from '$/blocks/sign-in-button';
import { UserMenu } from '$/blocks/user-menu';
import { Link } from '$/components/link';
import { Logo } from '$/components/logo';
import { useCurrentUser } from '$/contexts/current-user-context';

import { NotificationHub } from '../notification-hub';
import { SideMenu } from '../side-menu';

export function Header(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const styles = `ml-[22px]`;
  return (
    <header
      className={clsx(
        `relative z-20 w-full py-3 shadow-xs transition duration-150 sm:sticky sm:top-0 sm:left-0`,
        // Can't use the normal backdrop-filter here as it'll cause nested blur elements not working in chrome.
        'before:z-index-[-1] before:absolute before:inset-0 before:bg-gray-0 before:bg-opacity-75 before:backdrop-blur-xl before:backdrop-saturate-150 before:dark:bg-opacity-70',
      )}
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <section className="flex flex-row items-center justify-between">
          <div className="flex items-center pl-3 sm:hidden">
            <SideMenu>
              {isSignIn ? (
                <SideMenu.Item>
                  <Link
                    size="lg"
                    href="/dashboard"
                    className={styles}
                    highlightPattern={/^\/dashboard/}
                  >
                    Dashboard
                  </Link>
                </SideMenu.Item>
              ) : (
                <SideMenu.Item>
                  <Link
                    size="lg"
                    href="/#pricing"
                    className={styles}
                    highlightPattern={/^\/#pricing/}
                  >
                    Pricing
                  </Link>
                </SideMenu.Item>
              )}
              <SideMenu.Item>
                <Link
                  size="lg"
                  href="/docs/index"
                  className={styles}
                  highlightPattern={/^\/docs/}
                >
                  Docs
                </Link>
              </SideMenu.Item>
              <SideMenu.Item>
                <Link
                  size="lg"
                  href="/blog"
                  className={styles}
                  highlightPattern={/^\/blog/}
                >
                  Blog
                </Link>
              </SideMenu.Item>
              <SideMenu.Item>
                <Link
                  size="lg"
                  href="https://github.com/devrsi0n/chirpy"
                  className={styles}
                >
                  GitHub
                </Link>
              </SideMenu.Item>
            </SideMenu>
          </div>
          <div className="flex flex-row sm:items-stretch sm:justify-start">
            <div className="flex flex-row items-center space-x-2">
              <Logo showBadge />
            </div>
            <nav
              className={`mb-5 hidden w-full flex-wrap items-center space-x-8 sm:mb-0 sm:ml-8 sm:flex sm:border-l sm:border-gray-500 sm:pl-8`}
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
          <div className="flex">
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
