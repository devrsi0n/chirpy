import clsx from 'clsx';
import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  ClientOnly,
  IconMoon,
  IconSettings,
  IconSun,
  Link,
  Select,
  Text,
} from '../../components';

export type FooterProps = React.ComponentPropsWithoutRef<'footer'>;

export function Footer({ className, ...restProps }: FooterProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  const handleChange = (value: string) => {
    setTheme(value);
  };

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
        <ClientOnly>
          <Select
            value={theme || 'system'}
            onChange={handleChange}
            className="w-32"
            placement="top"
            aria-label="Mode selector"
          >
            <Select.Option value="light">
              <IconSun size={16} />
              <span>Light</span>
            </Select.Option>
            <Select.Option value="dark">
              <IconMoon size={16} />
              <span>Dark</span>
            </Select.Option>
            <Select.Option value="system">
              <IconSettings size={16} />
              <span>System</span>
            </Select.Option>
          </Select>
        </ClientOnly>
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
