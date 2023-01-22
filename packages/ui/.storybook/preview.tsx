import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

import { ColorModeSelect } from '../src/blocks/color-mode-select';
import {
  SiteThemeProvider,
  useThemeVariables
} from '../src/contexts';
import { loadFeatures } from '../src/pages/_app';

// TODO: fix tailwind not work in storybook,
// use the tailwind CLI to build a separated css instead.
import '../src/styles/global-styles.scss';

import { sbRestHandlers } from './msw/rest-handlers';

initialize({
  onUnhandledRequest: 'bypass',
});

export const decorators = [
  mswDecorator,

  // @ts-ignore
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <SessionProvider>
        {/* <CurrentUserProvider> */}
        <NextThemesProvider attribute="class" storageKey={'chirpy.sb.theme'}>
          <SiteThemeProvider>
            <style>{styles}</style>
            <LazyMotion features={loadFeatures}>
              <div className="h-screen bg-bg pt-6">
                <Story />
                <ColorModeSelect />
              </div>
            </LazyMotion>
            {/* </CurrentUserProvider> */}
          </SiteThemeProvider>
        </NextThemesProvider>
      </SessionProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: {
    handlers: {
      common: [...sbRestHandlers],
    },
  },
};
