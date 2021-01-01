import * as React from 'react';
import { useTheme } from 'next-themes';

import { Button } from '$/components/buttons/Button';
import { Link } from '../components/Link';
import { layoutStyle } from './styles';
import { ColorMode } from '../types/theme.type';
import { useMounted } from '$/hooks/useMounted';

const icons: Record<ColorMode, 'setting' | 'sun' | 'moon'> = {
  system: 'setting',
  light: 'sun',
  dark: 'moon',
};

export function Footer(): JSX.Element {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
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
    <footer className="flex flex-col items-start justify-between py-10 my-10 transition duration-150 border-t sm:items-center sm:flex-row border-divider layout footer">
      <nav className="flex flex-col mb-8 sm:mb-0 sm:flex-row">
        <Link href="/" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          &copy; 2020 ZOO
        </Link>
        <Link href="/terms-of-service" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          Terms of Service
        </Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </nav>
      {mounted && icon && theme && (
        <Button variant="borderless" className="capitalize" onClick={handleClick} icon={icon}>
          {theme}
        </Button>
      )}
      <style jsx>{layoutStyle}</style>
    </footer>
  );
}
