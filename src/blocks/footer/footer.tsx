import type { Icon } from '@geist-ui/react-icons';
import Moon from '@geist-ui/react-icons/moon';
import Settings from '@geist-ui/react-icons/settings';
import Sun from '@geist-ui/react-icons/sun';
import clsx from 'clsx';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { IconButton } from '$/components/button/icon-button';
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
        `w-full flex flex-col items-start justify-between py-10 my-10 space-y-5 transition duration-150 border-t border-gray-500`,
        className,
      )}
    >
      <nav className={`flex flex-row flex-wrap justify-center w-full space-x-6 leading-8`}>
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
        className={`flex flex-col items-center justify-center w-full space-y-2 xs:(space-y-0 space-x-5 flex-row)`}
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
