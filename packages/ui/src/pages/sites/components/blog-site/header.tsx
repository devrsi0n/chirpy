import clsx from 'clsx';
import * as React from 'react';

import {
  headerBlurBackgroundStyles,
  SignInButton,
  UserMenu,
} from '../../../../blocks';
import { Image, Link } from '../../../../components';
import { useCurrentUser } from '../../../../contexts';
import { LinkMeta, LogoMeta } from './types';

export type BlogSiteHeaderProps = {
  links: LinkMeta[];
  logo: LogoMeta;
};

export function BlogSiteHeader(props: BlogSiteHeaderProps): JSX.Element {
  const { isSignIn } = useCurrentUser();
  return (
    <header className={clsx(`z-20 w-full sm:sticky sm:top-0 sm:left-0`)}>
      <div
        className={clsx(
          'border-b border-b-gray-300 px-20 py-4',
          headerBlurBackgroundStyles,
        )}
      >
        <section className="mx-auto flex max-w-7xl items-center justify-between px-2 transition duration-150 sm:px-8">
          <div className="flex items-center space-x-10">
            <Image {...props.logo} alt="Site logo" />
            <nav className="flex space-x-8 font-semibold">
              {props.links.map((link) => (
                <Link key={link.name} href={link.href}>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex">
            {isSignIn ? <UserMenu /> : <SignInButton inPageNav />}
          </div>
        </section>
      </div>
    </header>
  );
}
