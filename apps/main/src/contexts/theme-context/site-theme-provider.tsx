import Head from 'next/head';
import * as React from 'react';

import siteThemeStyles from './site-theme-provider.module.scss';
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
      </Head>
      <div className={siteThemeStyles.siteTheme}>{props.children}</div>
    </>
  );
}
