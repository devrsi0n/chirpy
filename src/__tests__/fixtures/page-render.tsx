import { render as reactRender } from '@testing-library/react';

import { ToastProvider } from '$/components/toast';

import '../mocks/mock-use-session';
import '../mocks/next-router';

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    wrapper: function TestingWrapper({ children }) {
      return <ToastProvider>{children}</ToastProvider>;
    },
  });
}
