import Head from 'next/head';
import * as React from 'react';

import { Theme } from '$/types/theme.type';

import { siteDefaultTheme } from './siteDefaultTheme';
import { getThemeCSSVariables } from './utilities';

export type SiteThemeProviderProps = {
  children: React.ReactNode;
};

const themeVariablePrefix = '--tw';

export const ThemeContext = React.createContext<Theme>({ colors: { primary: {} } });

export function SiteThemeProvider(props: SiteThemeProviderProps): JSX.Element {
  return (
    <ThemeContext.Provider value={siteDefaultTheme}>
      <Head>
        <style>
          {`:root {
              ${getThemeCSSVariables(siteDefaultTheme, themeVariablePrefix)
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

export const useSiteTheme = () => {
  return React.useContext(ThemeContext);
};
