import clsx from 'clsx';
import { useInView } from 'framer-motion';
import * as React from 'react';

import { SignInButton } from '../../blocks/sign-in-button';
import { UserMenu } from '../../blocks/user-menu';
import { Link, Logo, MaintenanceBanner } from '../../components';
import { useCurrentUser } from '../../contexts/current-user-context';
import { NotificationHub } from '../notification-hub';
import { SideMenu } from '../side-menu';
import { SubHeader, navBarStyles } from './subheader';

export function Header(): JSX.Element {
  const { isSignIn, data } = useCurrentUser();
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
                    <Link size="lg" href={`/dashboard/${data.username}`} className={styles}>
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
                <Logo showBadge className='[&>svg]:ps-0' />
              </div>
              <nav
                className={`mb-5 hidden w-full flex-wrap items-center space-x-8 sm:mb-0 sm:ml-8 sm:flex sm:border-l sm:border-gray-500 sm:pl-8`}
              >
                {isSignIn ? (
                  <Link href={`/dashboard/${data.username}`}>Dashboard</Link>
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
        <SubHeader fixedPos={!isInView} />
      </div>
    </header>
  );
}
