import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

import { CurrentUserProvider } from '$/contexts/current-user-context';
import { GQLClientProvider } from '$/contexts/gql-client-context';
import { useThemeVariables } from '$/contexts/theme-context/use-theme-variables';
import { loadFeatures } from '$/pages/_app';

import '$/styles/global-styles.scss';

import { sbGqlHandlers } from './msw/gql-handlers';
import { sbRestHandlers } from './msw/rest-handlers';

initialize({
  onUnhandledRequest: 'warn',
});

export const decorators = [
  mswDecorator,
  urqlDecorator,
  // @ts-ignore
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <SessionProvider>
        <GQLClientProvider>
          <CurrentUserProvider>
            <style>{styles}</style>
            <LazyMotion features={loadFeatures}>
              <div className="h-screen bg-bg pt-6">
                <Story />
              </div>
            </LazyMotion>
          </CurrentUserProvider>
        </GQLClientProvider>
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
      common: [...sbRestHandlers, ...sbGqlHandlers],
    },
  },
};
