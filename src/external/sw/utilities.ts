/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="WebWorker" />
import type { NotificationType_Enum } from '../../server/graphql/generated/types';
import { NotificationPayload } from '../../server/services/notification/send';

const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;

/**
 * Focus on the existing tab or open a new one.
 * @param url
 */
export function openOrFocusWindow(url: string): Promise<void | WindowClient | null> {
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

export function getTitle(message: NotificationPayload): string {
  return titleMap[message.type] + message.triggeredBy.name;
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'New comment from ',
  ReceivedAReply: 'New reply from ',
  ReceivedALike: 'New like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
