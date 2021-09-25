import { Global } from '@emotion/react';
import * as React from 'react';
import { GlobalStyles } from 'twin.macro';

import { useSiteTheme } from '$/contexts/ThemeProvider/useSiteTheme';
import { appGlobalStyles } from '$/styles/global-styles';

export const decorators = [
  (Story) => {
    const { styles } = useSiteTheme();
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
