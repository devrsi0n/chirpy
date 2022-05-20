import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import * as React from 'react';

import { useThemeVariables } from '../src/contexts/theme-context/use-theme-variables';
import { loadFeatures } from '../src/pages/_app';
import '../src/styles/global-styles.scss';

export const decorators = [
  urqlDecorator,
  // @ts-ignore
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <>
        <style>{styles}</style>
        <LazyMotion features={loadFeatures}>
          <div className="h-screen bg-bg pt-6">
            <Story />
          </div>
        </LazyMotion>
      </>
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
};
