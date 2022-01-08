import { Global } from '@emotion/react';
import * as React from 'react';
import { GlobalStyles } from 'twin.macro';

import { useThemeVariables } from '$/contexts/ThemeProvider/useThemeVariables';
import { appGlobalStyles } from '$/styles/global-styles';

export const decorators = [
  (Story) => {
    const { styles } = useThemeVariables();
    return <>
      <GlobalStyles />
      <Global styles={appGlobalStyles} />
      <style>{styles}</style>
      <div tw="bg-bg h-screen pt-10">
        <Story />
      </div>
    </>;
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
