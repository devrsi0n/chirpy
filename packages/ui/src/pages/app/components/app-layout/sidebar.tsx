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
  IconFigma,
  IconGlobe,
  IconHome,
  IconLayers,
  IconMessageSquare,
  IconPieChart,
  IconPlus,
  IconSettings,
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
    <aside className="flex h-full w-72 flex-col justify-between border-r py-8 px-6">
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
    <>
      <m.nav key="home-sidebar" className="space-y-6" {...easeInOutOpacity}>
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
      </m.nav>
      <SidebarFooter />
    </>
  );
}

type SiteSidebarProps = {
  subdomain: string;
};

function SiteSidebar(props: SiteSidebarProps) {
  const { data: site } = trpcClient.site.bySubdomain.useQuery(props.subdomain);
  return (
    <>
      <m.nav className="space-y-6" key="site-sidebar" {...easeInOutOpacity}>
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
          <li>
            <NavLink
              href={`/site/${props.subdomain}`}
              highlightPattern={/^\/$/}
              icon={<IconHome size={24} />}
            >
              Site Home
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/site/${props.subdomain}/analytics`}
              highlightPattern={
                new RegExp(`^/site/${props.subdomain}/analytics`)
              }
              icon={<IconPieChart size={24} />}
            >
              Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/site/${props.subdomain}/domain`}
              highlightPattern={new RegExp(`^/site/${props.subdomain}/domain`)}
              icon={<IconGlobe size={24} />}
            >
              Domain
            </NavLink>
          </li>
          <li>
            <CollapsibleNav>
              <CollapsibleNav.Trigger>
                <IconEdit2 size={24} />
                <span>Posts</span>
              </CollapsibleNav.Trigger>
              <CollapsibleNav.Content>
                {site?.posts.length || 0 > 0 ? (
                  site?.posts.map((post) => (
                    <CollapsibleNav.Item
                      href={`/site/${post.id}`}
                      key={post.id}
                    >
                      <IconFeather size={18} />
                      <span className="max-w-[140px] truncate first-letter:uppercase">
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
          <li>
            <NavLink
              href={`/site/${props.subdomain}/settings`}
              highlightPattern={
                new RegExp(`^/site/${props.subdomain}/settings`)
              }
              icon={<IconSettings size={24} />}
            >
              Site Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/site/${props.subdomain}/design`}
              highlightPattern={new RegExp(`^/site/${props.subdomain}/design`)}
              icon={<IconFigma size={24} />}
            >
              Design
            </NavLink>
          </li>
          <li>
            <NavLink
              href={`/site/${props.subdomain}/comments`}
              highlightPattern={
                new RegExp(`^/site/${props.subdomain}/comments`)
              }
              icon={<IconMessageSquare size={24} />}
            >
              Comments
            </NavLink>
          </li>
        </ul>
      </m.nav>
      <SidebarFooter />
    </>
  );
}

function SidebarFooter() {
  return (
    <m.nav className="space-y-6" key="sidebar-footer">
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
    </m.nav>
  );
}
