import clsx from 'clsx';
import * as React from 'react';

import { Link, Text } from '../../components';
import { ColorModeSelect } from '../color-mode-select';

export type FooterProps = React.ComponentPropsWithoutRef<'footer'>;

export function Footer({ className, ...restProps }: FooterProps): JSX.Element {
  return (
    <footer
      {...restProps}
      className={clsx(
        `my-10 flex w-full flex-col items-start justify-between space-y-5 border-t border-gray-500 py-10 transition duration-150`,
        className,
      )}
    >
      <nav
        className={`flex w-full flex-row flex-wrap justify-center space-x-6 leading-8`}
      >
        <Link href="/docs" variant="secondary">
          Docs
        </Link>
        <Link href="/blog" variant="secondary">
          Blog
        </Link>
        <Link href="/#pricing" variant="secondary">
          Pricing
        </Link>
        <Link href="/terms-of-service" variant="secondary">
          Terms
        </Link>
        <Link href="/privacy-policy" variant="secondary">
          Privacy
        </Link>
      </nav>
      <div
        className={`flex w-full flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-5`}
      >
        <CompanyRight />
        <ColorModeSelect />
      </div>
    </footer>
  );
}

export function CompanyRight() {
  return (
    <Text variant="secondary" size="sm" className="px-2 sm:px-0">
      &copy; {new Date().getFullYear()} Chirpy Information Technology LLC. All
      rights reserved.
    </Text>
  );
}
