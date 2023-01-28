import { HOME_ORIGIN, SUPPORT_LINK } from '@chirpy-dev/utils';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence, m, MotionProps } from 'framer-motion';
import * as React from 'react';

import { handleSignOut } from '../../../../blocks';
import {
  Avatar,
  Button,
  IconFeather,
  IconMenu,
  IconPlus,
  IconX,
  Logo,
} from '../../../../components';
import { useCurrentUser } from '../../../../contexts';
import { trpcClient } from '../../../../utilities';
import { CollapsibleNav } from './collapsible-nav';
import { NavLink, NavLinkProps } from './nav-link';
import { SidebarProps } from './sidebar';

export type MobileHeaderProps = SidebarProps & {
  children: React.ReactNode;
};

export function MobileHeader(props: MobileHeaderProps): JSX.Element {
  const { data: sites } = trpcClient.site.all.useQuery();
  const [isOpen, setIsOpen] = React.useState(false);
  const { isSignIn, data } = useCurrentUser();
  const { image, name, email, username } = data;
  return (
    <>
      <Collapsible.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        className={clsx(isOpen && 'h-full')}
      >
        <header className="flex border-b p-4">
          <div className="flex w-full items-center justify-between">
            <Logo className="-translate-x-2" />
            <Collapsible.Trigger>
              {isOpen ? <IconX /> : <IconMenu />}
            </Collapsible.Trigger>
          </div>
        </header>
        <Collapsible.Content className={clsx(isOpen && 'h-full')} forceMount>
          <AnimatePresence>
            {isOpen && (
              <m.nav {...slideMotion} className="[&>ul]:border-b [&>ul]:py-6">
                <ul>
                  <li>
                    <HeaderNavLink href="/">Home</HeaderNavLink>
                  </li>
                  <li>
                    <CollapsibleNav>
                      <CollapsibleNav.Trigger className={itemStyle}>
                        <span>Sites</span>
                      </CollapsibleNav.Trigger>
                      <CollapsibleNav.Content>
                        {sites?.map((site) => (
                          <CollapsibleNav.Item
                            href={`/site/${site.subdomain}`}
                            key={site.id}
                            className={itemStyle}
                          >
                            {/* TODO: Use user defined logo */}
                            <IconFeather size={18} />
                            <span>{site.name}</span>
                          </CollapsibleNav.Item>
                        ))}
                        <CollapsibleNav.Item
                          href="/site/create"
                          key="create-site"
                          className={itemStyle}
                        >
                          <IconPlus size={18} />
                          <span>Create new site</span>
                        </CollapsibleNav.Item>
                      </CollapsibleNav.Content>
                    </CollapsibleNav>
                  </li>
                  <li>
                    <HeaderNavLink href={`${HOME_ORIGIN}/docs`}>
                      Documentation
                    </HeaderNavLink>
                  </li>
                  <li>
                    <HeaderNavLink href="/billing">Billing</HeaderNavLink>
                  </li>
                </ul>
                <ul>
                  <li>
                    <HeaderNavLink href="/profile">Profile</HeaderNavLink>
                    <HeaderNavLink href={SUPPORT_LINK}>Support</HeaderNavLink>
                  </li>
                </ul>
                <ul>
                  <li className={itemStyle}>
                    <Avatar
                      src={image}
                      alt={`${name || username}'s avatar`}
                      email={email}
                      name={name}
                      username={username}
                      showLabel
                    />
                  </li>
                  {isSignIn && (
                    <li className={itemStyle}>
                      <Button
                        className="w-full"
                        color="gray"
                        onClick={handleSignOut}
                      >
                        Sign out
                      </Button>
                    </li>
                  )}
                </ul>
              </m.nav>
            )}
          </AnimatePresence>
        </Collapsible.Content>
      </Collapsible.Root>
      {!isOpen && props.children}
    </>
  );
}

const itemStyle = `!px-4 !py-3`;

function HeaderNavLink(props: NavLinkProps) {
  return <NavLink {...props} className={clsx(itemStyle, props.className)} />;
}

const slideMotion: MotionProps = {
  transition: {
    duration: 0.15,
  },
  initial: {
    opacity: 0,
    y: '-75%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '-75%',
  },
};
