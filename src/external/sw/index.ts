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

// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
const v = '1';
sw.addEventListener('install', (e) =>
  e.waitUntil(caches.open(v).then((cache) => cache.addAll(['/']))),
);

// Fix browser refresh button doesn't refresh the service worker
sw.addEventListener('fetch', (e) => {
  console.log('fetch', e.request);
  e.respondWith(
    (async () => {
      const matchClients = await sw.clients.matchAll();
      if (
        e.request.mode === 'navigate' &&
        e.request.method === 'GET' &&
        sw.registration.waiting &&
        matchClients.length < 2
      ) {
        sw.registration.waiting.postMessage('skipWaiting');
        return new Response('', { headers: { Refresh: '0' } });
      }
      return (await caches.match(e.request)) || fetch(e.request);
    })(),
  );
});

sw.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key != v) return caches.delete(key);
        }),
      );
    }),
  );
});

sw.addEventListener('message', (e) => {
  if (e.data === 'skipWaiting') {
    sw.skipWaiting();
  }
});
