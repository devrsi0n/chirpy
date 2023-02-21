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
    <footer className={clsx('py-12 sm:py-6', xAxisStyles.parent)}>
      <div
        className={clsx(
          'flex flex-col items-start justify-between sm:flex-row sm:items-center',
          xAxisStyles.child,
        )}
      >
        <Image {...props.logo} alt="Site logo" />
        <nav className="mt-8 grid w-full grid-cols-2 gap-y-3 sm:mt-0 sm:flex sm:items-center sm:justify-center sm:gap-x-8">
          {props.links.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="font-semibold !text-gray-1100"
            >
              {l.name}
            </Link>
          ))}
        </nav>
        <Text variant="secondary" className="mt-12 whitespace-nowrap sm:mt-0">
          {props.copyright}
        </Text>
      </div>
    </footer>
  );
}
