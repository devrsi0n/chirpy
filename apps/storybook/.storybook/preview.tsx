import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import * as React from 'react';

import { useThemeVariables } from '@chirpy/contexts';
import { loadFeatures } from '../../main/src/pages/_app';
// import '@chirpy/styles/global-styles.scss';

export const decorators = [
  urqlDecorator,
  // @ts-ignore
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <>
        <style>{styles}</style>
        <LazyMotion features={loadFeatures}>
          <div className="bg-bg h-screen pt-10">
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
