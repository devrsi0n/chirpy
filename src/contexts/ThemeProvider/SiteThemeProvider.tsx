import * as radixColors from '@radix-ui/colors';
import Head from 'next/head';
import * as React from 'react';

import { getColors } from './siteDefaultTheme';
import { getThemeCSSVariablesString, translateRadixColor } from './utilities';

export type SiteThemeProviderProps = {
  children: React.ReactNode;
};

const colors = getColors();
const FIXED_COLORS = {
  whitea: translateRadixColor(radixColors.whiteA),
  blacka: translateRadixColor(radixColors.blackA),
};

export function SiteThemeProvider(props: SiteThemeProviderProps): JSX.Element {
  const styles = React.useMemo(() => {
    const lightTheme = {
      colors: {
        ...FIXED_COLORS,
        ...colors.light,
      },
    };
    const darkTheme = {
      colors: {
        ...FIXED_COLORS,
        ...colors.dark,
      },
    };
    return `body {
        ${getThemeCSSVariablesString(lightTheme)}
      }
    
       .dark body {
        ${getThemeCSSVariablesString(darkTheme)}
      }
    `;
  }, []);
  return (
    <>
      <Head>
        <style key="site-theme">{styles}</style>
      </Head>
      {props.children}
    </>
  );
}
