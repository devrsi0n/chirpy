import { initialize, mswLoader } from 'msw-storybook-addon';
import * as React from 'react';

import { App } from '../src/pages/app';

import { sbRestHandlers } from './msw/rest-handlers';

import { Preview } from '@storybook/react';
import "tailwindcss/tailwind.css";

initialize({
  onUnhandledRequest: 'bypass',
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
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
  },
  loaders: [mswLoader],
  // decorators: [
  //   (Story): JSX.Element => {
  //     return (
  //       <App
  //         // @ts-expect-error
  //         Component={Story}
  //         pageProps={{
  //           session: {
  //             user: {
  //               name: 'test',
  //               email: 'test@chirpy.dev',
  //             },
  //             expires: '2099-10-10T10:10:10.000Z',
  //           },
  //         }}
  //       />
  //     );
  //   },
  // ],
};

export default preview;
