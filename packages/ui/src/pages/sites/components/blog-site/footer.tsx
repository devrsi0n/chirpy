import * as React from 'react';

import { Image, Link, Text } from '../../../../components';
import { LinkMeta, LogoMeta } from './types';

export type BlogSiteFooterProps = {
  links: LinkMeta[];
  logo: LogoMeta;
  copyright: string;
};

export function BlogSiteFooter(props: BlogSiteFooterProps): JSX.Element {
  return (
    <footer className="px-20 py-6">
      <div className="flex items-center justify-between px-8">
        <Image {...props.logo} alt="Site logo" />
        <nav className="flex items-center space-x-8">
          {props.links.map((l) => (
            <Link key={l.name} href={l.href} className="font-semibold">
              {l.name}
            </Link>
          ))}
        </nav>
        <Text variant="secondary">{props.copyright}</Text>
      </div>
    </footer>
  );
}
