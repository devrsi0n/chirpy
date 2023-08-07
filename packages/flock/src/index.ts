import { TIMEZONES } from './constants';
import { sendEvent } from './request';

declare global {
  interface Window {
    $chirpyEvent?: {
      sendEvent: (name: string, payload: Record<string, string>) => void;
    };
  }
}

export function loadFlock(): void {
  if (window.$chirpyEvent?.sendEvent) {
    // Already loaded
    return;
  }

  window.$chirpyEvent = { sendEvent };

  window.addEventListener('hashchange', sendPageHitEvent);
  const his = window.history;
  if (his.pushState) {
    const originalPushState = his['pushState'];
    his.pushState = function (...args) {
      originalPushState.apply(this, args);
      page();
    };
    window.addEventListener('popstate', page);
  }

  let lastPage: string;
  function page() {
    if (lastPage === location.pathname) {
      return;
    }
    lastPage = location.pathname;
    sendPageHitEvent();
  }
  function handleVisibilityChange() {
    if (!lastPage && document.visibilityState === 'visible') {
      page();
    }
  }

  // @ts-expect-error
  if (document.visibilityState === 'prerender') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  } else {
    page();
  }
}

function sendPageHitEvent() {
  // If local development environment
  // if (/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(location.hostname) || location.protocol === 'file:') return;
  // If test environment
  // @ts-expect-error
  if (window.__nightmare || window.navigator.webdriver || window.Cypress)
    return;

  let country: string;
  let locale: string;
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions()
      .timeZone as keyof typeof TIMEZONES;
    country = TIMEZONES[timezone];
    locale =
      navigator.languages && navigator.languages.length > 0
        ? navigator.languages[0]
        : // @ts-expect-error
          navigator.userLanguage ||
          navigator.language ||
          // @ts-expect-error
          navigator.browserLanguage ||
          'en';
  } catch (error) {
    console.log(`Can't decode country and locale`, error);
  }

  // Wait a bit for SPA routers
  setTimeout(() => {
    sendEvent('page_hit', {
      'user-agent': window.navigator.userAgent,
      locale,
      location: country,
      referrer: document.referrer,
      pathname: window.location.pathname,
      href: window.location.href,
    });
  }, 300);
}
