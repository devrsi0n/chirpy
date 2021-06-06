import merge from 'lodash/merge';
import Head from 'next/head';
import * as React from 'react';

import { Theme } from '$/types/theme.type';

import { siteDefaultTheme } from './siteDefaultTheme';
import { getThemeCSSVariables } from './utilities';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
};

const themeVariablePrefix = '--tw';

export type ThemeContextType = {
  theme: Theme;
  /**
   * Merge with default theme, we don't replace the whole theme
   * because we may polish the default theme
   */
  mergeTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: { colors: { primary: {} } },
  mergeTheme: () => null,
});

export function ThemeProvider(props: ThemeProviderProps): JSX.Element {
  const [theme, setTheme] = React.useState<Theme>(() => merge({}, siteDefaultTheme, props.theme));
  const value = React.useMemo<ThemeContextType>(
    () => ({
      theme,
      mergeTheme: (newTheme: Theme) => setTheme((prevTheme) => merge({}, prevTheme, newTheme)),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <Head>
        <style>
          {`.widget-theme {
              ${getThemeCSSVariables(theme, themeVariablePrefix)
                .map(([key, value]) => `${key}: ${value};`)
                .join('\n')}
            }
          `}
        </style>
      </Head>
      <div className="widget-theme">{props.children}</div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error(`'useTheme' must be used within a ThemeProvider`);
  }
  return context;
};
