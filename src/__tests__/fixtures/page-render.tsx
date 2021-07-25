import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render as reactRender } from '@testing-library/react';

// import { ApolloClientProvider } from '../../blocks/ApolloClientProvider';
import '../mocks/mockUseCurrentUser';
import '../mocks/nextRouter';

// Disable emotion warning
const emotionCache = createCache({ key: 'emotion-key' });
emotionCache.compat = true;

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    wrapper: function TestingWrapper({ children }) {
      return (
        // <ApolloClientProvider>
        <CacheProvider value={emotionCache}>{children}</CacheProvider>
        // </ApolloClientProvider>
      );
    },
  });
}
