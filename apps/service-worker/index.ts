/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
import type { WebNotificationPayload } from '@chirpy/types';

import { openOrFocusWindow } from './utilities';

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener('push', (event: PushEvent) => {
  if (sw.Notification?.permission !== 'granted' || !event.data) {
    return;
  }
  const message: WebNotificationPayload = event.data.json();
  // console.log('Push message received:', message);
  event.waitUntil(
    sw.registration.showNotification(message.title, {
      requireInteraction: true,
      icon: '/favicon.png',
      data: message,
      body: `"${message.body}"`,
      tag: message.url,
    }),
  );
});

sw.addEventListener('notificationclick', (event: NotificationEvent) => {
  const clickedNotification = event.notification;
  const data: WebNotificationPayload = event.notification.data;
  clickedNotification.close();

  const promiseChain = openOrFocusWindow(data.url);
  event.waitUntil(promiseChain);
});

// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68
const CACHE_ID = process.env.SW_CACHE_ID;
sw.addEventListener('install', (e) => {
  // Make sure complete success or total failure, with nothing between
  e.waitUntil(caches.open(CACHE_ID).then((cache) => cache.addAll(['/'])));
});

// Fix browser refresh button doesn't refresh the service worker
sw.addEventListener('fetch', (e) => {
  // console.log('fetch', e.request);
  e.respondWith(
    (async () => {
      if (
        e.request.mode === 'navigate' &&
        e.request.method === 'GET' &&
        sw.registration.waiting &&
        // eslint-disable-next-line unicorn/no-await-expression-member
        (await sw.clients.matchAll()).length < 2
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
          if (key != CACHE_ID) return caches.delete(key);
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
