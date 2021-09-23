import Head from 'next/head';
import * as React from 'react';

import { Theme } from '$/types/theme.type';

import { siteDefaultTheme } from './siteDefaultTheme';
import { getThemeCSSVariablesString } from './utilities';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
};

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: siteDefaultTheme,
  setTheme: () => null,
});

export function WidgetThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = React.useState<Theme>(() => props.theme || siteDefaultTheme);
  const value = React.useMemo<ThemeContextType>(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );
  const styles = React.useMemo(
    () => `body {
    ${getThemeCSSVariablesString({
      colors: {
        ...siteDefaultTheme.colors.light,
        ...theme.colors.light,
      },
    })}
  }

  .dark body {
    ${getThemeCSSVariablesString({
      colors: {
        ...siteDefaultTheme.colors.dark,
        ...theme.colors.dark,
      },
    })} 
  }
`,
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Head>
        <style key="widget-theme">{styles}</style>
      </Head>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useWidgetTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`'useWidgetTheme' must be used within a WidgetThemeProvider`);
  }
  return context;
};
