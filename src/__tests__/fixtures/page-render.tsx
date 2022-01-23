import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render as reactRender } from '@testing-library/react';

import { ToastProvider } from '$/components/toast';

import '../mocks/mock-use-session';
import '../mocks/next-router';

// Disable emotion warning
const emotionCache = createCache({ key: 'emotion-key' });
emotionCache.compat = true;

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    wrapper: function TestingWrapper({ children }) {
      return (
        <ToastProvider>
          <CacheProvider value={emotionCache}>{children}</CacheProvider>
        </ToastProvider>
      );
    },
  });
}
