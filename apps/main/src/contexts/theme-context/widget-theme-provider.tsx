import Head from 'next/head';
import * as React from 'react';

import { Theme } from '$/types/theme.type';
import { noop } from '$/utilities/isomorphic/function';

import { siteTheme } from './site-theme';
import { useThemeVariables } from './use-theme-variables';

export type WidgetThemeProviderProps = {
  children: React.ReactNode;
  widgetTheme?: Theme;
  selector?: string;
};

export type WidgetThemeContextType = {
  siteTheme: Theme;
  widgetTheme: Theme | undefined;
  setWidgetTheme: (theme: Theme) => void;
};

export const WidgetThemeContext = React.createContext<WidgetThemeContextType>({
  siteTheme,
  widgetTheme: undefined,
  setWidgetTheme: noop,
});

export function WidgetThemeProvider(
  props: WidgetThemeProviderProps,
): JSX.Element {
  const [widgetTheme, setWidgetTheme] = React.useState<Theme | undefined>(
    props.widgetTheme,
  );
  const value = React.useMemo<WidgetThemeContextType>(
    () => ({
      // We need to add site theme here as SiteThemeProvider won't be added to a widget
      siteTheme,
      widgetTheme,
      setWidgetTheme,
    }),
    [widgetTheme],
  );
  const selector = props.selector || 'body';
  const { styles } = useThemeVariables(widgetTheme, {
    light: `${selector}`,
    dark: `.dark ${selector}`,
  });

  return (
    <WidgetThemeContext.Provider value={value}>
      <Head>
        <style key="widget-theme">{styles}</style>
      </Head>
      {props.children}
    </WidgetThemeContext.Provider>
  );
}

export const useWidgetTheme = () => {
  const context = React.useContext(WidgetThemeContext);
  if (!context) {
    throw new Error(
      `'useWidgetTheme' must be used within a WidgetThemeProvider`,
    );
  }
  return context;
};
