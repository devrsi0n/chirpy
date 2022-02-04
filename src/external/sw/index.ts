/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
import type { NotificationPayload } from '../../server/services/notification/send';
import { isENVDev } from '../../server/utilities/env';
import { getTitle, openOrFocusWindow } from './utilities';

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener('push', (event: PushEvent) => {
  if (sw.Notification?.permission !== 'granted' || !event.data) {
    return;
  }
  const message: NotificationPayload = event.data.json();
  console.log('Push message received:', message);
  event.waitUntil(
    sw.registration.showNotification(getTitle(message), {
      requireInteraction: isENVDev,
      icon: '/favicon.png',
      data: message,
      body: `"${message.body}"`,
    }),
  );
});

sw.addEventListener('notificationclick', (event: NotificationEvent) => {
  const clickedNotification = event.notification;
  const data: NotificationPayload = event.notification.data;
  clickedNotification.close();

  const promiseChain = openOrFocusWindow(data.url);
  event.waitUntil(promiseChain);
});
