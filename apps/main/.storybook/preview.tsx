import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import * as React from 'react';

import {
  SessionProvider,
  CurrentUserProvider,
  GQLClientProvider,
  useThemeVariables,
} from 'ui';
import { loadFeatures } from '$/pages/_app';

import '$/styles/global-styles.scss';

import { sbGqlHandlers } from './msw/gql-handlers';
import { sbRestHandlers } from './msw/rest-handlers';

initialize({
  onUnhandledRequest: 'bypass',
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
