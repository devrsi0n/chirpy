import Head from 'next/head';
import * as React from 'react';
import { theme } from 'twin.macro';

import { useThemeVariables } from './use-theme-variables';

export type SiteThemeProviderProps = {
  children: React.ReactNode;
};

export function SiteThemeProvider(props: SiteThemeProviderProps): JSX.Element {
  const { styles } = useThemeVariables();

  return (
    <>
      <Head>
        <style key="site-theme">{styles}</style>
        <style key="site-background">{`
          html,
          body {
            background: ${theme('colors.bg')};
          }
        `}</style>
      </Head>
      {props.children}
    </>
  );
}
