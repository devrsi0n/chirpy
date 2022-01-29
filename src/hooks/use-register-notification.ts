import * as React from 'react';

import { urlBase64ToUint8Array } from '$/utilities/string';

export function useRegisterNotification() {
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/worker.js').then((registration) => {
          registration.pushManager
            .getSubscription()
            .then((subscription) => {
              if (subscription) {
                return subscription;
              }

              const convertedVapidKey = urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID);
              return registration.pushManager.subscribe({
                // This means all push events will result in a notification
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
              });
            })
            .then((subscription) => {
              // Send the subscription details to server
              fetch('/api/notification/register-device', {
                method: 'post',
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify({ subscription: subscription }),
              });
            });
        });
      });
    }
  }, []);
}
