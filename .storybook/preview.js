import { Global } from '@emotion/react';
import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import * as React from 'react';
import 'tailwindcss/tailwind.css';
import { GlobalStyles } from 'twin.macro';

import { useThemeVariables } from '$/contexts/theme-context/use-theme-variables';
import { loadFeatures } from '$/pages/_app';
import { appGlobalStyles } from '$/styles/global-styles';

export const decorators = [
  urqlDecorator,
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <>
        <GlobalStyles />
        <Global styles={appGlobalStyles} />
        <style>{styles}</style>
        <LazyMotion features={loadFeatures}>
          <div tw="bg-bg h-screen pt-10">
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
