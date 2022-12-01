import { logger } from '../../utilities/logger';

const SERVICE_WORKER_ERROR = 'Service worker not supported';
export function checkServiceWorkerCompatibility(): boolean {
  const supported = 'serviceWorker' in navigator;
  if (!supported) {
    logger.error(SERVICE_WORKER_ERROR);
  }
  return supported;
}

const NOTIFICATION_ERROR = 'This browser does not support notifications.';

export function checkNotificationCompatibility(): boolean {
  const supported = 'Notification' in window;
  if (!supported) {
    logger.error(NOTIFICATION_ERROR);
  }
  return supported;
}

export function askNotificationPermission(): Promise<NotificationPermission> {
  return new Promise((resolve, reject) => {
    if (!checkNotificationCompatibility()) {
      reject(new Error(NOTIFICATION_ERROR));
      return;
    }
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

export function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    const codePoint = rawData.codePointAt(i);
    if (codePoint) {
      outputArray[i] = codePoint;
    }
  }
  return outputArray;
}
