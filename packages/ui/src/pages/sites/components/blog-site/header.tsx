import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';

import {
  headerBlurBackgroundStyles,
  SignInButton,
  UserMenu,
} from '../../../../blocks';
import { IconMenu, IconX, Image, Link } from '../../../../components';
import { useCurrentUser } from '../../../../contexts';
import { bluredBg } from '../../../../styles/common';
import { xAxisStyles } from './styles';
import { LinkMeta, LogoMeta } from './types';

export type BlogSiteHeaderProps = {
  links: LinkMeta[];
  logo: LogoMeta;
};

export function BlogSiteHeader(props: BlogSiteHeaderProps): JSX.Element {
  const { isSignIn } = useCurrentUser();
  const [isOpen, setIsOpen] = React.useState(false);
  const logo = <Image {...props.logo} alt="Site logo" />;
  return (
    <>
      <header
        className={clsx(
          `z-20 hidden w-full sm:sticky sm:top-0 sm:left-0 sm:block`,
        )}
      >
        <div
          className={clsx(
            'border-b border-b-gray-300 py-4',
            xAxisStyles.parent,
            headerBlurBackgroundStyles,
          )}
        >
          <section
            className={clsx(
              'flex items-center justify-between',
              xAxisStyles.child,
            )}
          >
            <div className="flex items-center space-x-10">
              {logo}
              <nav className="flex gap-8 font-semibold">
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
      <Collapsible.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className={clsx(isOpen && 'h-full', 'relative block sm:hidden')}
      >
        <div
          className={clsx(isOpen && 'h-full', 'absolute left-0 top-0 w-full')}
        >
          <header className="flex w-full border-b p-4">
            <div className="flex w-full items-center justify-between">
              {logo}
              <Collapsible.Trigger>
                {isOpen ? <IconX /> : <IconMenu />}
              </Collapsible.Trigger>
            </div>
          </header>
          <Collapsible.Content className={clsx(isOpen && 'h-full')} forceMount>
            <AnimatePresence>
              {isOpen && (
                <div className={clsx(bluredBg)}>
                  <nav className={clsx('flex flex-col gap-2 font-semibold')}>
                    {props.links.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="py-3 px-4"
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="h-6" />
                  </nav>
                </div>
              )}
            </AnimatePresence>
          </Collapsible.Content>
        </div>
      </Collapsible.Root>
    </>
  );
}
