import { urlBase64ToUint8Array } from '$/utilities/string';

export function registerNotificationSubscription(): Promise<Response> {
  checkServiceWorkerCompatibility();
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

export function checkServiceWorkerCompatibility() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service worker not supported');
  }
}

export function checkNotificationCompatibility() {
  if (!('Notification' in window)) {
    throw new Error('This browser does not support notifications.');
  }
}

export function askNotificationPermission(): Promise<NotificationPermission> {
  return new Promise((resolve, reject) => {
    checkNotificationCompatibility();
    if (checkNotificationPromise()) {
      Notification.requestPermission().then(resolve, reject);
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
