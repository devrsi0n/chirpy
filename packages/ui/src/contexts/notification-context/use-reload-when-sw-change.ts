import * as React from 'react';

import { useToast } from '../../components/toast';
import { logger } from '../../utilities/logger';

import { checkServiceWorkerCompatibility } from './utilities';

// export interface IUseReloadWhenSwChangeOptions {}

export function useReloadWhenSwChange() {
  const { showToast } = useToast();
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
      // Track updates to the Service Worker.
      if (!navigator.serviceWorker.controller) {
        // The window client isn't currently controlled so it's a new service
        // worker that will activate immediately
        return;
      }
      registration.update();

      handleNewServiceWorker(registration, () => {
        showToast({
          type: 'info',
          title: 'New version available',
          persistent: true,
          action: {
            label: 'Refresh',
            onClick: () => {
              if (!registration.waiting) {
                // Just to ensure registration.waiting is available before
                // calling postMessage()
                return;
              }

              registration.waiting.postMessage('skipWaiting');
            },
          },
        });
      });
    });
  }, [showToast]);
}

function handleNewServiceWorker(
  registration: ServiceWorkerRegistration,
  callback: () => void,
) {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  function listenInstalledStateChange() {
    registration.installing?.addEventListener('statechange', (event: Event) => {
      // @ts-ignore
      if (event.target?.state === 'installed') {
        // A new service worker is available, inform the user
        callback();
      }
    });
  }

  if (registration.installing) {
    return listenInstalledStateChange();
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}
