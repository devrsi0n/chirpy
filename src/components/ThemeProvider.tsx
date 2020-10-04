import * as React from 'react';

import { ThemeContext, ThemeContextType } from '$/context/ThemeContext';
import { ITheme, ColorMode } from '../types/theme.type';
import {
  CSSVariables,
  getThemeColorMode,
  getThemeCSSVariables,
  saveThemeColorMode,
} from '../utilities/theme';

export type ThemeProviderProps = {
  children: React.ReactNode;
  colorModes: ITheme;
};

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [colorMode, setColorMode] = React.useState<ColorMode>('light');
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(colorMode === 'dark');
  const contextValue = React.useMemo<ThemeContextType>(
    () => ({
      isDarkMode,
      colorMode,
      setColorMode: (value: ColorMode) => {
        if (value === 'dark') {
          setIsDarkMode(true);
        } else if (value === 'light') {
          setIsDarkMode(false);
        }
        saveThemeColorMode(value);
        setColorMode(value);
      },
    }),
    [isDarkMode, colorMode],
  );
  const { light, dark } = React.useMemo(() => getThemeCSSVariables(props.colorModes), [
    props.colorModes,
  ]);

  // Set color mode after mounted
  React.useEffect(() => {
    const mode = getThemeColorMode(true);
    setColorMode(mode);
    if (mode === 'dark') {
      setIsDarkMode(true);
    } else if (mode === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  // Listen to theme change when color mode is 'system'
  React.useEffect(() => {
    if (colorMode !== 'system') {
      return;
    }
    const switchMode = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', switchMode);
    // cleanup on unmount
    return () => darkModeMediaQuery.removeEventListener('change', switchMode);
  }, [colorMode]);

  // Update theme CSS variables
  React.useEffect(() => {
    if (isDarkMode) {
      setColorModeCSSVariable(dark);
    } else {
      setColorModeCSSVariable(light);
    }
  }, [isDarkMode, light, dark]);

  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
}

function setColorModeCSSVariable(colors: CSSVariables) {
  const root = document.documentElement;
  for (const [key, value] of colors) {
    root.style.setProperty(`--colors-${key}`, value);
  }
}
