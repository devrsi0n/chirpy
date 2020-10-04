import * as React from 'react';

import { Button } from '$/components/Button';
import { Link } from '../components/Link';
import { layoutStyle } from './styles';
import { useTheme } from '$/hooks/useTheme';
import { ColorMode } from '../types/theme.type';

const icons: Record<ColorMode, 'setting' | 'sun' | 'moon'> = {
  system: 'setting',
  light: 'sun',
  dark: 'moon',
};

export function Footer(): JSX.Element {
  const { colorMode, setColorMode } = useTheme();
  const handleClick = React.useCallback(() => {
    if (colorMode === 'system') {
      setColorMode('dark');
    } else if (colorMode === 'dark') {
      setColorMode('light');
    } else if (colorMode === 'light') {
      setColorMode('system');
    }
  }, [colorMode, setColorMode]);

  const icon = icons[colorMode];
  return (
    <footer className="flex flex-col items-start sm:items-center sm:flex-row justify-between my-10 py-10 border-t border-divider layout footer">
      <nav className="flex flex-col mb-8 sm:mb-0 sm:flex-row">
        <Link href="/" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          &copy; 2020 ZOO
        </Link>
        <Link href="/terms-of-service" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          Terms of Service
        </Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </nav>
      <Button
        variant="text"
        className="capitalize text-text-secondary"
        onClick={handleClick}
        icon={icon}
      >
        {colorMode}
      </Button>
      <style jsx>{layoutStyle}</style>
    </footer>
  );
}
