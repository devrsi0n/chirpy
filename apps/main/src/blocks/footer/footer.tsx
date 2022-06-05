import clsx from 'clsx';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { IconButton } from '$/components/button/icon-button';
import { Moon, Settings, Sun, Icon } from '$/components/icons';
import { Link } from '$/components/link/link';
import { Text } from '$/components/text';
import { useHasMounted } from '$/hooks/use-has-mounted';
import { ColorMode } from '$/types/theme.type';

const icons: Record<ColorMode, Icon> = {
  system: Settings,
  light: Sun,
  dark: Moon,
};

export type FooterProps = React.ComponentPropsWithoutRef<'footer'>;

export function Footer({ className, ...restProps }: FooterProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();
  const handleClick = () => {
    switch (theme) {
      case 'system': {
        setTheme('dark');
        break;
      }
      case 'dark': {
        setTheme('light');
        break;
      }
      case 'light': {
        setTheme('system');
        break;
      }
    }
  };

  const ThemeIcon = icons[(theme as ColorMode) || 'system'];
  return (
    <footer
      {...restProps}
      className={clsx(
        `my-10 flex w-full flex-col items-start justify-between space-y-5 border-t border-gray-500 py-10 transition duration-150`,
        className,
      )}
    >
      <nav className={`flex w-full flex-row flex-wrap justify-center space-x-6 leading-8`}>
        <Link href="/docs/index" variant="secondary">
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
        className={`flex w-full flex-col items-center justify-center space-y-2 xs:flex-row xs:space-y-0 xs:space-x-5`}
      >
        <Text variant="secondary" size="sm">
          &copy; {new Date().getFullYear()} Chirpy Labs. All rights reserved.
        </Text>
        {hasMounted && ThemeIcon && theme && (
          <IconButton onClick={handleClick} aria-label={`${theme} theme`}>
            <ThemeIcon size={18} />
          </IconButton>
        )}
      </div>
    </footer>
  );
}
