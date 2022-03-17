import { NotificationType_Enum } from '$/graphql/generated/types';

import { NotificationPayload } from './send';

export type WebNotificationPayload = {
  title: string;
} & Pick<NotificationPayload, 'body' | 'url'>;

export function getWebNotificationPayload(payload: NotificationPayload) {
  const webNotificationPayload: WebNotificationPayload = {
    title: getTitle(payload),
    body: payload.body,
    url: payload.url,
  };
  return webNotificationPayload;
}

export function getTitle(message: Pick<NotificationPayload, 'type' | 'triggeredBy'>): string {
  return titleMap[message.type] + message.triggeredBy.name;
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'New comment from ',
  ReceivedAReply: 'New reply from ',
  ReceivedALike: 'New like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
