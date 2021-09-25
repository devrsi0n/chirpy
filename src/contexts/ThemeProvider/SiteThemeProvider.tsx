import Head from 'next/head';
import * as React from 'react';

import { useSiteTheme } from './useSiteTheme';

export type SiteThemeProviderProps = {
  children: React.ReactNode;
};

export function SiteThemeProvider(props: SiteThemeProviderProps): JSX.Element {
  const { styles } = useSiteTheme();

  return (
    <>
      <Head>
        <style key="site-theme">{styles}</style>
      </Head>
      {props.children}
    </>
  );
}
