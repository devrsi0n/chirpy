// @ts-nocheck
import { urqlDecorator } from '@urql/storybook-addon';
import { LazyMotion } from 'framer-motion';
import * as React from 'react';
import 'tailwindcss/tailwind.css';

import { useThemeVariables } from '$/contexts/theme-context/use-theme-variables';
import { loadFeatures } from '$/pages/_app';
import '$/styles/global-styles';

export const decorators = [
  urqlDecorator,
  (Story) => {
    const { styles } = useThemeVariables();
    return (
      <>
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
