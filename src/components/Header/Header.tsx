import Menu from '@geist-ui/react-icons/menu';
import Dismiss from '@geist-ui/react-icons/x';
import * as React from 'react';
import tw from 'twin.macro';

import { SignInButton } from '$/blocks/SignInButton';
import { UserDropDown } from '$/blocks/UserDropDown';
import { Link } from '$/components/Link';
import { useCurrentUser } from '$/contexts/CurrentUserProvider/useCurrentUser';
import { bluredBg } from '$/styles/common';

import { IconButton } from '../Button';
import { Logo } from '../Logo';

export function Header(): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const [showMenu, setShowMenu] = React.useState(false);
  const handleClickMenu = React.useCallback(() => {
    setShowMenu((prev) => !prev);
  }, []);

  return (
    <header
      css={[
        tw`w-full py-3 transition duration-150 shadow-sm sm:(sticky top-0 left-0 z-10) `,
        bluredBg,
      ]}
    >
      <div tw="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <section tw="flex flex-row items-center justify-between">
          <div tw="flex items-center sm:hidden pl-3">
            <IconButton aria-expanded={false} onClick={handleClickMenu}>
              <span tw="sr-only">Open navigation menu</span>
              <Menu css={[showMenu && tw`hidden`]} />
              <Dismiss css={[!showMenu && tw`hidden`]} />
            </IconButton>
          </div>
          <div tw="flex flex-row sm:(items-stretch justify-start)">
            <div tw="flex flex-row items-center space-x-2">
              <Logo />
            </div>
            <nav tw="w-full hidden sm:(flex mb-0 pl-8 ml-8 border-l border-gray-500) flex-wrap items-center mb-5 space-x-5">
              {!isSignIn ? (
                <Link href="/#pricing" tw="" highlightPattern={/^\/#pricing/}>
                  Pricing
                </Link>
              ) : (
                <Link href="/dashboard" tw="" highlightPattern={/^\/dashboard/}>
                  Dashboard
                </Link>
              )}
              <Link href="/docs/index" tw="" highlightPattern={/^\/docs/}>
                Docs
              </Link>
              <Link href="/blog" tw="" highlightPattern={/^\/blog/}>
                Blog
              </Link>
            </nav>
          </div>
          <div tw="flex">
            {isSignIn ? <UserDropDown variant="Nav" /> : <SignInButton inPageNav />}
          </div>
        </section>
      </div>
      <div tw="w-full">
        <nav css={[tw`flex w-full flex-col px-2 pt-2 pb-3 space-y-1`, !showMenu && tw`hidden`]}>
          {isSignIn ? (
            <Link href="/dashboard" tw="px-3 py-2" highlightPattern={/^\/dashboard/}>
              Dashboard
            </Link>
          ) : (
            <Link href="/#pricing" tw="px-3 py-2" highlightPattern={/^\/#pricing/}>
              Pricing
            </Link>
          )}
          <Link href="/docs/index" tw="px-3 py-2" highlightPattern={/^\/docs/}>
            Docs
          </Link>
          <Link href="/blog" tw="px-3 py-2" highlightPattern={/^\/blog/}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
