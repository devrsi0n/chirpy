import * as React from 'react';

import { logger } from '../../utilities/logger';
import { checkServiceWorkerCompatibility } from './utilities';

// export interface IUseReloadWhenSwChangeOptions {}

export function useReloadWhenSwChange() {
  React.useEffect(() => {
    if (!checkServiceWorkerCompatibility()) {
      return;
    }

    let refreshing = false;
    // When the user asks to refresh the UI, we'll need to reload the window
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return; // prevent infinite refresh loop when we use "Update on Reload" in DevTool
      refreshing = true;
      logger.debug('Controller loaded');
      window.location.reload();
    });
  }, []);

  React.useEffect(() => {
    if (!checkServiceWorkerCompatibility()) {
      return;
    }

    navigator.serviceWorker.register('/sw.js').then((registration) => {
      if (!navigator.serviceWorker.controller) {
        return;
      }
      registration.update();

      // Handle both page refresh/close and SPA navigation
      const skipWaitingOnNavigation = () => {
        if (registration.waiting) {
          logger.debug('Activating new service worker on navigation');
          registration.waiting.postMessage('skipWaiting');
        }
      };

      // Listen for regular page unload
      window.addEventListener('beforeunload', skipWaitingOnNavigation);

      // Listen for SPA navigation
      window.addEventListener('popstate', skipWaitingOnNavigation);
      const originalPushState = history.pushState.bind(history);
      const originalReplaceState = history.replaceState.bind(history);

      history.pushState = (...args) => {
        originalPushState(...args);
        skipWaitingOnNavigation();
      };

      history.replaceState = (...args) => {
        originalReplaceState(...args);
        skipWaitingOnNavigation();
      };

      registration.addEventListener('updatefound', () => {
        registration.installing?.addEventListener(
          'statechange',
          (event: Event) => {
            // @ts-ignore
            if (event.target?.state === 'installed' && registration.waiting) {
              // Will activate on next navigation
              logger.debug(
                'New service worker installed, waiting for navigation',
              );
            }
          },
        );
      });

      // Cleanup
      return () => {
        window.removeEventListener('beforeunload', skipWaitingOnNavigation);
        window.removeEventListener('popstate', skipWaitingOnNavigation);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
    });
  }, []);
}
