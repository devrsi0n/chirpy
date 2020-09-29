/** @jsx jsx */
import { Button, jsx, useThemeUI } from 'theme-ui';
import * as React from 'react';
import Sun from '@geist-ui/react-icons/sun';
import Settings from '@geist-ui/react-icons/settings';
import Moon from '@geist-ui/react-icons/moon';
import { Link } from '../components/Link';
import { layoutStyle } from './styles';

const modeIcons = {
  System: Settings,
  Light: Sun,
  Dark: Moon,
};

export function Footer(): JSX.Element {
  const [mode, setMode] = React.useState<'System' | 'Light' | 'Dark'>('System');
  const { setColorMode } = useThemeUI();
  const handleClick = React.useCallback(() => {
    if (mode === 'System') {
      setMode('Dark');
      setColorMode('dark');
    } else if (mode === 'Dark') {
      setMode('Light');
      setColorMode('default');
    } else if (mode === 'Light') {
      setMode('System');
    }
  }, [mode, setColorMode]);
  React.useEffect(() => {
    if (mode !== 'System') {
      return;
    }
    const switchMode = (e: MediaQueryListEvent) => {
      const isDarkMode = e.matches;
      console.log(e);
      isDarkMode ? setColorMode('dark') : setColorMode('light');
    };
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', switchMode);
    // cleanup on unmount
    return () => darkModeMediaQuery.removeEventListener('change', switchMode);
  }, [setColorMode, mode]);

  const Icon = modeIcons[mode];
  return (
    <footer
      className="flex flex-row justify-between items-center"
      sx={{
        ...layoutStyle,
        paddingTop: 5,
        paddingBottom: 5,
        '@media screen and (max-width: 634px)': {
          flexDirection: 'column',
          alignItems: 'flex-start',
          '& > :not(:last-child)': {
            marginBottom: 4,
          },
        },
      }}
    >
      <nav
        sx={{
          display: 'flex',
          '& > :not(:last-child)': {
            marginRight: 4,
          },
          '@media screen and (max-width: 634px)': {
            flexDirection: 'column',
            '& > :not(:last-child)': {
              marginBottom: 4,
              marginRight: 0,
            },
          },
        }}
      >
        <Link href="/">&copy; 2020 ZOO</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/privacy-policy">Privacy policy</Link>
      </nav>
      <Button variant="icon" onClick={handleClick} sx={{ width: '76px' }}>
        <Icon sx={{ pr: 1 }} size={18} />
        {mode}
      </Button>
    </footer>
  );
}
