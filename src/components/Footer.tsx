import * as React from 'react';

import { SunIcon } from './Sun.Icon';
import { SettingIcon } from './Setting.Icon';
import { MoonIcon } from './Moon.Icon';
import { Button } from '$/components/Button';
import { Link } from '../components/Link';
import { layoutStyle } from './styles';
import { useTheme } from '$/hooks/useTheme';
import { ColorMode } from '../types/theme.type';

const modeIcons: Record<ColorMode, React.FunctionComponent<{ size?: number }>> = {
  System: SettingIcon,
  Light: SunIcon,
  Dark: MoonIcon,
};

export function Footer(): JSX.Element {
  const { colorMode, setColorMode } = useTheme();
  const handleClick = React.useCallback(() => {
    if (colorMode === 'System') {
      setColorMode('Dark');
    } else if (colorMode === 'Dark') {
      setColorMode('Light');
    } else if (colorMode === 'Light') {
      setColorMode('System');
    }
  }, [colorMode, setColorMode]);

  const Icon = modeIcons[colorMode];
  return (
    <footer className="flex flex-col items-start sm:items-center sm:flex-row justify-between my-10 py-10 border-t border-gray-300 layout footer">
      <nav className="flex flex-col mb-8 sm:mb-0 sm:flex-row">
        <Link href="/" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          &copy; 2020 ZOO
        </Link>
        <Link href="/terms-of-service" className="mb-6 mr-0 sm:mr-8 sm:mb-0">
          Terms of Service
        </Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </nav>
      <Button variant="text" className="" onClick={handleClick}>
        <Icon size={18} />
        <span>{colorMode}</span>
      </Button>
      <style jsx>{layoutStyle}</style>
    </footer>
  );
}
