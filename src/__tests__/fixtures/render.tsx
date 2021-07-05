import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { render as reactRender } from '@testing-library/react';

import { MockCurrentUserProvider } from '../mocks/CurrentUserProvider';
import '../mocks/nextRouter';

// Disable emotion warning
const emotionCache = createCache({ key: 'my-lower-case-alphabetical-cache-key' });
emotionCache.compat = true;

export function pageRender(ui: React.ReactElement) {
  return reactRender(ui, {
    // eslint-disable-next-line react/display-name
    wrapper: ({ children }) => (
      <CacheProvider value={emotionCache}>
        <MockCurrentUserProvider>{children}</MockCurrentUserProvider>
      </CacheProvider>
    ),
  });
}
