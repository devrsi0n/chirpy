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
    }),
  );
});

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'You have a comment from ',
  ReceivedAReply: 'You have a reply from ',
  ReceivedALike: 'You have a like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
