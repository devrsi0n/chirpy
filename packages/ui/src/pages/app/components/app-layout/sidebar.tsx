import { HOME_ORIGIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { UserMenu } from '../../../../blocks';
import {
  Divider,
  IconBook,
  IconCreditCard,
  IconFeather,
  IconHome,
  IconLayers,
  IconPlus,
  Logo,
} from '../../../../components';
import { RouterOutputs } from '../../../../utilities';
import { CollapsibleNav } from './collapsible-nav';
import { NavLink } from './nav-link';
import { UsageCard } from './usage-card';

export type SidebarProps = {
  sites: RouterOutputs['site']['all'] | undefined;
  children: React.ReactNode;
};

export function Sidebar({ sites, children }: SidebarProps) {
  return (
    <div className="hidden h-full flex-row md:flex">
      <aside className="flex w-72 flex-col justify-between border-r py-8 px-6">
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
        <nav className="space-y-6">
          <ul className="space-y-1">
            <li>
              <NavLink
                href={`${HOME_ORIGIN}/docs`}
                icon={<IconBook size={24} />}
              >
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
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
