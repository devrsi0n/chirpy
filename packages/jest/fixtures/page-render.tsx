import { render as reactRender } from '@testing-library/react';
import { Provider } from 'urql';

import { ToastProvider } from '@chirpy/components';
import { createGqlClient } from '@chirpy/utilities';

import '../mocks/mock-use-session';
import '../mocks/next-router';

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    wrapper: function TestingWrapper({ children }) {
      return (
        <Provider value={createGqlClient()}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      );
    },
  });
}
