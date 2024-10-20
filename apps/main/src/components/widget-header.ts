import { isSSRMode, TOKEN_KEY, WIDGET_HEADER } from '@chirpy-dev/utils';

export function setupWidgetSessionHeader() {
  if (isSSRMode) {
    return;
  }
  const originFetch = window.fetch;
  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
  ) => {
    const isWidget = location.pathname.startsWith('/widget/');
    if (
      isWidget &&
      typeof input === 'string' &&
      input.endsWith('/api/auth/session')
    ) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        init = {
          ...init,
          headers: {
            ...init?.headers,
            // Widgets/iframe can't access cookies, use saved token instead
            Authorization: `Bearer ${token}`,
            [WIDGET_HEADER]: 'true',
          },
        };
      }
    }

    return await originFetch(input, init);
  };
}
