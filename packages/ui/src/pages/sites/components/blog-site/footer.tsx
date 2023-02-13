import clsx from 'clsx';
import * as React from 'react';

import { Image, Link, Text } from '../../../../components';
import { xAxisStyles } from './styles';
import { LinkMeta, LogoMeta } from './types';

export type BlogSiteFooterProps = {
  links: LinkMeta[];
  logo: LogoMeta;
  copyright: string;
};

export function BlogSiteFooter(props: BlogSiteFooterProps): JSX.Element {
  return (
    <footer className={clsx('py-6', xAxisStyles.parent)}>
      <div
        className={clsx('flex items-center justify-between', xAxisStyles.child)}
      >
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
