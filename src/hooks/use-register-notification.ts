import * as React from 'react';

import { isBrowser } from '$/utilities/env';
import { urlBase64ToUint8Array } from '$/utilities/string';

export function useRegisterNotification() {
  React.useEffect(() => {
    if (!isBrowser) {
      return;
    }
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            registration.pushManager
              .getSubscription()
              .then((subscription) => {
                if (subscription) {
                  return subscription;
                }
                const vapidKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID);
                return registration.pushManager.subscribe({
                  // This means all push events will result in a notification
                  userVisibleOnly: true,
                  applicationServerKey: vapidKey,
                });
              })
              .then((subscription) => {
                console.log('subscription', subscription);
                // Send the subscription details to server
                fetch('/api/notification/register-device', {
                  method: 'POST',
                  headers: {
                    'Content-type': 'application/json',
                  },
                  body: JSON.stringify({ subscription }),
                });
              });
          })
          .catch((error) => {
            console.error('Service worker registration failed', error);
          });
      });
    } else {
      console.error('Service worker not supported');
    }
  }, []);
}
