import { HOME_ORIGIN } from '@chirpy-dev/utils';
import * as React from 'react';

import { SiteThemeProvider } from '../../../../contexts';
import { BlogSiteFooter } from './footer';
import { BlogSiteHeader } from './header';
import { xAxisStyles } from './styles';
import { LinkMeta, LogoMeta } from './types';

export type BlogSiteLayoutProps = {
  children: React.ReactNode;
};

export function BlogSiteLayout(props: BlogSiteLayoutProps): JSX.Element {
  return (
    <SiteThemeProvider>
      <div className="min-h-full">
        <BlogSiteHeader links={headerLinks} logo={logo} />
        <main className={xAxisStyles.parent}>
          <div className={xAxisStyles.child}>{props.children}</div>
        </main>
        <BlogSiteFooter
          links={footerLinks}
          logo={logo}
          copyright="© 2023 Chirpy"
        />
      </div>
    </SiteThemeProvider>
  );
}

const logo: LogoMeta = {
  src: '/favicon.png',
  width: 32,
  height: 32,
};

const headerLinks: LinkMeta[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Product',
    href: HOME_ORIGIN,
  },
  {
    name: 'Design',
    href: '/',
  },
];

const footerLinks: LinkMeta[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Privacy',
    href: `${HOME_ORIGIN}/privacy`,
  },
  {
    name: 'Policy',
    href: `${HOME_ORIGIN}/policy`,
  },
];
