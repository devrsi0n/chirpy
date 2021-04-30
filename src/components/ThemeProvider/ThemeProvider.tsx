import merge from 'lodash/merge';
import Head from 'next/head';
import * as React from 'react';

import { Theme } from '$/types/theme.type';

export type ThemeProviderProps = {
  children: React.ReactNode;
  theme: Theme;
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
  const [theme, setTheme] = React.useState<Theme>(props.theme);
  const value = React.useMemo<ThemeContextType>(
    () => ({
      theme,
      mergeTheme: (newTheme: Theme) => setTheme((prevTheme) => merge(prevTheme, newTheme)),
    }),
    [theme],
  );
  return (
    <ThemeContext.Provider value={value}>
      <Head>
        <style>
          {`:root {
              ${getThemeCSSVariables(theme, themeVariablePrefix)
                .map(([key, value]) => `${key}: ${value};`)
                .join('\n')}
            }
          `}
        </style>
      </Head>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return React.useContext(ThemeContext);
};

export type CSSVariables = Array<[string, string]>;

type NestedObject = { [key: string]: string | NestedObject };

/**
 * Support any depth level of nesting objects
 */
function getThemeCSSVariables(theme: NestedObject, prefix: string): CSSVariables {
  const cssVariables: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(theme)) {
    const cssVariableKey = prefix && key ? [prefix, key].join('-') : prefix || key;
    if (typeof value === 'string') {
      cssVariables.push([cssVariableKey, value]);
    } else if (typeof value === 'object' && value) {
      cssVariables.push(...getThemeCSSVariables(value, cssVariableKey));
    } else {
      throw new Error(`Unexpected theme value: ${value}`);
    }
  }
  return cssVariables;
}
