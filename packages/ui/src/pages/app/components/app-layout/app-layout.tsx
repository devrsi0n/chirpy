import { HOME_ORIGIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { LayoutTitle, UserMenu } from '../../../../blocks';
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
import { SiteThemeProvider } from '../../../../contexts';
import { trpcClient } from '../../../../utilities';
import { CollapsibleNav } from './collapsible-nav';
import { NavLink } from './nav-link';
import { UsageCard } from './usage-card';

export type AppLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function AppLayout(props: AppLayoutProps): JSX.Element {
  const { data: sites } = trpcClient.site.all.useQuery();
  return (
    <SiteThemeProvider>
      <LayoutTitle title={props.title} />
      <div className="flex h-full flex-row">
        <div className="flex w-72 flex-col justify-between border-r py-8 px-6">
          <div className="space-y-1">
            <Logo />
            <NavLink
              href="/"
              highlightPattern={/^\/$/}
              icon={<IconHome size={24} />}
            >
              Home
            </NavLink>
            <CollapsibleNav
              trigger={
                <>
                  <IconLayers size={24} />
                  <span>Sites</span>
                </>
              }
            >
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
            </CollapsibleNav>
          </div>
          <div className="space-y-1">
            <NavLink href={`${HOME_ORIGIN}/docs`} icon={<IconBook size={24} />}>
              Documentation
            </NavLink>
            <NavLink href="/billing" icon={<IconCreditCard size={24} />}>
              Billing
            </NavLink>
            <UsageCard />
            <Divider className="!my-6" />
            <UserMenu />
          </div>
        </div>
        <main className="flex-1 p-8">{props.children}</main>
      </div>
    </SiteThemeProvider>
  );
}
