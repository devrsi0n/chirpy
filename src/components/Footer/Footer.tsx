import * as React from 'react';
import { useTheme } from 'next-themes';

import { Text } from '$/components/Text';
import { Link } from '../Link/Link';
import { ColorMode } from '../../types/theme.type';
import { useHasMounted } from '$/hooks/useHasMounted';
import { IconButton } from '../Button/IconButton';

const icons: Record<ColorMode, 'setting' | 'sun' | 'moon'> = {
  system: 'setting',
  light: 'sun',
  dark: 'moon',
};

export function Footer(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const hasMounted = useHasMounted();
  const handleClick = React.useCallback(() => {
    if (theme === 'system') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    }
  }, [theme, setTheme]);

  const icon = icons[(theme as ColorMode) || 'system'];
  return (
    <footer className="w-full flex flex-col items-start justify-between py-10 my-10 space-y-5 transition duration-150 border-t border-gray-300 dark:border-gray-700 footer text-text">
      <nav className="flex flex-row flex-wrap justify-center w-full space-x-6 leading-8">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/terms-of-service">Terms</Link>
        <Link href="/privacy-policy">Privacy</Link>
      </nav>
      <div className="flex flex-col items-center justify-center w-full space-y-2 xs:space-y-0 xs:space-x-3 xs:flex-row">
        <Text variant="sm" className="text-gray-500">
          &copy; 2021 Totalk Labs. All rights reserved.
        </Text>
        {hasMounted && icon && theme && <IconButton onClick={handleClick} icon={icon}></IconButton>}
      </div>
    </footer>
  );
}
