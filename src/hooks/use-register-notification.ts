import * as React from 'react';

import { urlBase64ToUint8Array } from '$/utilities/string';

import { useLocalStorage } from './use-local-storage';

let didRegister = false;

export function useRegisterNotification() {
  const [permission, setPermission] = useLocalStorage<NotificationPermission | null>(
    null,
    'notification-permission',
  );

  React.useEffect(() => {
    // Register the service worker on first load
    if (!didRegister && permission === 'granted') {
      // Only register once in whole page
      didRegister = true;
      registerNotificationSubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerNotification = React.useCallback(async (): Promise<void> => {
    if (!('serviceWorker' in navigator)) {
      return console.error('Service worker not supported');
    }

    const notificationPermission = await askNotificationPermission();
    if (notificationPermission === 'denied' || notificationPermission === 'default') {
      setPermission(notificationPermission);
      return console.log(`User didn't grant notification permission`);
    }
    // We don't want to wait here for registering the service worker, we only need to wait for permission check
    registerNotificationSubscription().then((response) => {
      if (response.ok) {
        setPermission(notificationPermission);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission]);

  return { registerNotification };
}

function registerNotificationSubscription(): Promise<Response> {
  // It's safe to register the service worker multiply times
  return navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      return registration.pushManager
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
          // Save the subscription details to server
          return fetch('/api/notification/register-device', {
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
      throw error;
    });
}

function askNotificationPermission(): Promise<NotificationPermission> {
  return new Promise((resolve, reject) => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications.');
    }
    if (checkNotificationPromise()) {
      Notification.requestPermission()
        .then((permission) => {
          resolve(permission);
        })
        .catch(reject);
    } else {
      Notification.requestPermission((permission) => {
        resolve(permission);
      });
    }
  });
}

function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch {
    return false;
  }

  return true;
}
