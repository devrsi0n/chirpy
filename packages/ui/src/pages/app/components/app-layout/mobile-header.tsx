import {
  getSitesSubdomain,
  HOME_ORIGIN,
  SUPPORT_LINK,
} from '@chirpy-dev/utils';
import * as Collapsible from '@radix-ui/react-collapsible';
import clsx from 'clsx';
import { AnimatePresence, m, MotionProps } from 'framer-motion';
import * as React from 'react';

import { handleSignOut } from '../../../../blocks';
import {
  Avatar,
  Button,
  IconArrowLeft,
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
  const [isOpen, setIsOpen] = React.useState(false);
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
            {isOpen &&
              (props.subdomain ? (
                <SiteMobileHeader subdomain={props.subdomain} />
              ) : (
                <HomeMobileHeader />
              ))}
          </AnimatePresence>
        </Collapsible.Content>
      </Collapsible.Root>
      {!isOpen && props.children}
    </>
  );
}

type SiteMobileHeaderProps = {
  subdomain: string;
};

function SiteMobileHeader(props: SiteMobileHeaderProps) {
  const { data: site } = trpcClient.site.bySubdomain.useQuery(props.subdomain);
  return (
    <m.nav {...slideMotion} className="[&>ul]:border-b [&>ul]:py-6">
      <ul>
        <Button
          variant="text"
          href="/"
          className="space-x-2 !pl-3 font-semibold"
          size="lg"
        >
          <IconArrowLeft size={22} />
          <span>Back to all sites home</span>
        </Button>
        <li>
          <HeaderNavLink href={`/site/${props.subdomain}`}>
            Site Home
          </HeaderNavLink>
        </li>
        <li>
          <HeaderNavLink href={`/site/${props.subdomain}/analytics`}>
            Analytics
          </HeaderNavLink>
        </li>
        <li>
          <HeaderNavLink href={`/site/${props.subdomain}/domain`}>
            Domain
          </HeaderNavLink>
        </li>
        <li>
          <CollapsibleNav>
            <CollapsibleNav.Trigger className={itemStyle}>
              <span>Posts</span>
            </CollapsibleNav.Trigger>
            <CollapsibleNav.Content>
              {site?.posts.length || 0 > 0 ? (
                site?.posts.map((post) => (
                  <CollapsibleNav.Item
                    href={`${getSitesSubdomain(props.subdomain)}/post/${
                      post.slug
                    }`}
                    key={post.id}
                    className={itemStyle}
                  >
                    <span className="w-[18px]">
                      <IconFeather size={18} />
                    </span>
                    <span className="truncate first-letter:uppercase">
                      {post.slug.replace(/-/g, ' ')}
                    </span>
                  </CollapsibleNav.Item>
                ))
              ) : (
                <CollapsibleNav.Item
                  href={`${HOME_ORIGIN}/docs/how-to/create-a-post`}
                >
                  No posts, create one?
                </CollapsibleNav.Item>
              )}
            </CollapsibleNav.Content>
          </CollapsibleNav>
        </li>
      </ul>
      <MobileHeaderNav />
    </m.nav>
  );
}

function HomeMobileHeader() {
  const { data: sites } = trpcClient.site.all.useQuery();

  return (
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
      </ul>
      <MobileHeaderNav />
    </m.nav>
  );
}

function MobileHeaderNav() {
  const { isSignIn, data } = useCurrentUser();
  const { image, name, email, username } = data;
  return (
    <>
      <ul>
        <li>
          <HeaderNavLink href="/billing">Billing</HeaderNavLink>
        </li>
        <li>
          <HeaderNavLink href={`${HOME_ORIGIN}/docs`}>
            Documentation
          </HeaderNavLink>
        </li>
        <li>
          <HeaderNavLink href="/profile">Profile</HeaderNavLink>
        </li>
        <li>
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
            <Button className="w-full" color="gray" onClick={handleSignOut}>
              Sign out
            </Button>
          </li>
        )}
      </ul>
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
    y: '-50%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '-50%',
  },
};
