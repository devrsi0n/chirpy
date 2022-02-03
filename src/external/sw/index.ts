/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
import { NotificationType_Enum } from '../../server/graphql/generated/types';
import type { NotificationPayload } from '../../server/services/notification/send';
import { isENVDev } from '../../server/utilities/env';

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

sw.addEventListener('push', (event: PushEvent) => {
  if (sw.Notification?.permission !== 'granted' || !event.data) {
    return;
  }
  const message: NotificationPayload = event.data.json();
  console.log('Push message received:', message);
  event.waitUntil(
    sw.registration.showNotification(titleMap[message.type] + message.triggeredBy.name, {
      requireInteraction: isENVDev,
      icon: '/favicon.png',
      data: message,
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

/**
 * Focus on the existing tab or open a new one.
 * @param url
 */
function openOrFocusWindow(url: string): Promise<void | WindowClient | null> {
  const urlToOpen = new URL(url, sw.location.origin).href;

  return sw.clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      let matchingClient = null;

      for (const windowClient of windowClients) {
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      return matchingClient ? matchingClient.focus() : sw.clients.openWindow(urlToOpen);
    });
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'You have a comment from ',
  ReceivedAReply: 'You have a reply from ',
  ReceivedALike: 'You have a like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
