import clsx from 'clsx';
import { useInView } from 'framer-motion';
import * as React from 'react';

import { SignInButton } from '../../blocks/sign-in-button';
import { UserMenu } from '../../blocks/user-menu';
import { Link, Logo, MaintenanceBanner } from '../../components';
import { useCurrentUser } from '../../contexts/current-user-context';
import { NotificationHub } from '../notification-hub';
import { SideMenu } from '../side-menu';

export function Header(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const styles = `ml-[22px]`;
  const topNavBarRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(topNavBarRef);
  return (
    <header className={clsx()}>
      <MaintenanceBanner />
      <div>
        <section className={navBarStyles} ref={topNavBarRef}>
          <div className="flex w-full max-w-7xl flex-row items-center justify-between">
            <div className="flex items-center pl-3 sm:hidden">
              <SideMenu>
                {isSignIn ? (
                  <SideMenu.Item>
                    <Link size="lg" href="/dashboard" className={styles}>
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
                  <Link size="lg" href="/docs" className={styles}>
                    Docs
                  </Link>
                </SideMenu.Item>
                <SideMenu.Item>
                  <Link size="lg" href="/blog" className={styles}>
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
                  <Link href="/dashboard">Dashboard</Link>
                ) : (
                  <Link href="/#pricing" highlightPattern={/^\/#pricing/}>
                    Pricing
                  </Link>
                )}
                <Link href="/docs">Docs</Link>
                <Link href="/blog">Blog</Link>
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
          </div>
        </section>
        <section
          className={clsx(
            navBarStyles,
            'shadow-xs',
            !isInView && `z-10 sm:fixed sm:left-0 sm:top-0`,
          )}
        >
          <nav className="flex w-full max-w-7xl gap-8">
            <Link href="/dashboard">Overview</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </section>
      </div>
    </header>
  );
}

const navBarStyles = clsx(
  'relative flex justify-center',
  // Can't use the normal backdrop-filter here as it'll cause nested blur elements not working in chrome.
  'before:z-index-[-1] before:absolute before:inset-0 before:bg-gray-100 before:bg-opacity-75 before:backdrop-blur-xl before:backdrop-saturate-150 dark:before:bg-gray-300 before:dark:bg-opacity-70',
  `mx-auto w-full px-2 py-3 sm:px-6 lg:px-8`,
);
