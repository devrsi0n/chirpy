import { useTheme } from 'next-themes';
import * as React from 'react';
import tw from 'twin.macro';

import { Text } from '$/components/Text';
import { useHasMounted } from '$/hooks/useHasMounted';

import { ColorMode } from '../../types/theme.type';
import { IconButton } from '../Button/IconButton';
import { Link } from '../Link/Link';

const icons: Record<ColorMode, 'setting' | 'sun' | 'moon'> = {
  system: 'setting',
  light: 'sun',
  dark: 'moon',
};

export type FooterProps = React.ComponentPropsWithoutRef<'footer'>;

export function Footer(props: FooterProps): JSX.Element {
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
    <footer
      {...props}
      css={tw`w-full flex flex-col items-start justify-between py-10 my-10 space-y-5 transition duration-150 border-t border-gray-300 dark:border-gray-700 text-gray-500`}
    >
      <nav css={tw`flex flex-row flex-wrap justify-center w-full space-x-6 leading-8`}>
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/terms-of-service">Terms</Link>
        <Link href="/privacy-policy">Privacy</Link>
      </nav>
      <div
        css={tw`flex flex-col items-center justify-center w-full space-y-2 xs:(space-y-0 space-x-3 flex-row)`}
      >
        <Text variant="sm" css={tw`text-gray-500`}>
          &copy; 2021 Totalk Labs. All rights reserved.
        </Text>
        {hasMounted && icon && theme && <IconButton onClick={handleClick} icon={icon}></IconButton>}
      </div>
    </footer>
  );
}
