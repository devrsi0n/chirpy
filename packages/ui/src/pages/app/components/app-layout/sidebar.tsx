import { HOME_ORIGIN } from '@chirpy-dev/utils';
import { AnimatePresence, m } from 'framer-motion';
import * as React from 'react';

import { UserMenu } from '../../../../blocks';
import {
  Button,
  Divider,
  easeInOutOpacity,
  IconArrowLeft,
  IconBook,
  IconCreditCard,
  IconEdit2,
  IconFeather,
  IconGlobe,
  IconHome,
  IconLayers,
  IconPieChart,
  IconPlus,
  Logo,
} from '../../../../components';
import { trpcClient } from '../../../../utilities';
import { CollapsibleNav } from './collapsible-nav';
import { NavLink } from './nav-link';
import { UsageCard } from './usage-card';

export type SidebarProps = {
  subdomain?: string;
};

export function Sidebar(props: SidebarProps) {
  return (
    <aside className="w-72 border-r py-8 px-6">
      <AnimatePresence>
        {props.subdomain ? (
          <SiteSidebar subdomain={props.subdomain} />
        ) : (
          <HomeSidebar />
        )}
      </AnimatePresence>
    </aside>
  );
}

function HomeSidebar() {
  const { data: sites } = trpcClient.site.all.useQuery();
  return (
    <m.div
      key="home-sidebar"
      className="flex h-full flex-col justify-between"
      {...easeInOutOpacity}
    >
      <nav className="space-y-6">
        <Logo />
        <ul className="space-y-1">
          <NavLink
            href="/"
            highlightPattern={/^\/$/}
            icon={<IconHome size={24} />}
          >
            Home
          </NavLink>
          <CollapsibleNav>
            <CollapsibleNav.Trigger>
              <IconLayers size={24} />
              <span>Sites</span>
            </CollapsibleNav.Trigger>
            <CollapsibleNav.Content>
              {sites?.map((site) => (
                <CollapsibleNav.Item
                  href={`/site/${site.subdomain}`}
                  key={site.id}
                >
                  {/* TODO: Use user defined logo */}
                  <IconFeather size={18} />
                  <span>{site.name}</span>
                </CollapsibleNav.Item>
              ))}
              <CollapsibleNav.Item href="/site/create" key="create-site">
                <IconPlus size={18} />
                <span>Create new site</span>
              </CollapsibleNav.Item>
            </CollapsibleNav.Content>
          </CollapsibleNav>
        </ul>
      </nav>
      <SidebarFooter />
    </m.div>
  );
}

type SiteSidebarProps = {
  subdomain: string;
};

function SiteSidebar(props: SiteSidebarProps) {
  const { data: site } = trpcClient.site.bySubdomain.useQuery(props.subdomain);
  return (
    <m.div
      key="site-sidebar"
      className="flex h-full flex-col justify-between"
      {...easeInOutOpacity}
    >
      <nav className="space-y-6">
        <Logo />
        <Button
          variant="text"
          href="/"
          className="space-x-2 !pl-2.5 font-semibold"
          size="lg"
        >
          <IconArrowLeft size={22} />
          <span>Back to all sites home</span>
        </Button>
        <ul className="space-y-1">
          <NavLink
            href={`/site/${props.subdomain}`}
            highlightPattern={/^\/$/}
            icon={<IconHome size={24} />}
          >
            Site Home
          </NavLink>
          <NavLink
            href={`/site/${props.subdomain}/analytics`}
            highlightPattern={new RegExp(`^/site/${props.subdomain}/analytics`)}
            icon={<IconPieChart size={24} />}
          >
            Analytics
          </NavLink>
          <NavLink
            href={`/site/${props.subdomain}/domain`}
            highlightPattern={new RegExp(`^/site/${props.subdomain}/domain`)}
            icon={<IconGlobe size={24} />}
          >
            Domain
          </NavLink>
          <CollapsibleNav>
            <CollapsibleNav.Trigger>
              <IconEdit2 size={24} />
              <span>Posts</span>
            </CollapsibleNav.Trigger>
            <CollapsibleNav.Content>
              {site?.posts.length || 0 > 0 ? (
                site?.posts.map((post) => (
                  <CollapsibleNav.Item href={`/site/${post.id}`} key={post.id}>
                    <IconFeather size={22} />
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
        </ul>
      </nav>
      <SidebarFooter />
    </m.div>
  );
}

function SidebarFooter() {
  return (
    <nav className="space-y-6">
      <ul className="space-y-1">
        <li>
          <NavLink href={`${HOME_ORIGIN}/docs`} icon={<IconBook size={24} />}>
            Documentation
          </NavLink>
        </li>
        <li>
          <NavLink href="/billing" icon={<IconCreditCard size={24} />}>
            Billing
          </NavLink>
        </li>
      </ul>
      <UsageCard />
      <Divider />
      <UserMenu />
    </nav>
  );
}
