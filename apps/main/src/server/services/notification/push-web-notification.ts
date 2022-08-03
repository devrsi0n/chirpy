import webpush from 'web-push';

import { NotificationType_Enum } from '$/graphql/generated/types';
import { mutate } from '$/server/common/gql';
import {
  DeleteNotificationSubscriptionByPkDocument,
  NotificationSubscriptionsByUserIdQuery,
} from '$/server/graphql/generated/notification';

import { NotificationPayload } from './types';

export type WebNotificationPayload = {
  title: string;
} & Pick<NotificationPayload, 'body' | 'url'>;

export function pushWebNotification(payload: NotificationPayload) {
  return async (
    sub: NotificationSubscriptionsByUserIdQuery['notificationSubscriptions'][number],
  ) => {
    try {
      await webpush.sendNotification(
        sub.subscription,
        JSON.stringify(getWebNotificationPayload(payload)),
        WEB_PUSH_OPTIONS,
      );
    } catch (error) {
      console.error('webpush error', JSON.stringify(error, null, 2));
      const err: any = error;
      if (
        err.statusCode === 410 ||
        err.statusCode === 404 ||
        err.code === 'ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY'
      ) {
        console.error('Subscription has expired or is no longer valid:', error);
        try {
          const deleteNotificationSubscriptionByPk = await mutate(
            DeleteNotificationSubscriptionByPkDocument,
            {
              id: sub.id,
            },
            'deleteNotificationSubscriptionByPk',
          );
          console.log(
            'Deleted subscription',
            deleteNotificationSubscriptionByPk,
          );
        } catch (error) {
          console.error('Error deleting subscription', error);
        }
      }

      throw error;
    }
  };
}

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    subject: 'mailto:support@chirpy.dev',
    publicKey: process.env.NEXT_PUBLIC_VAPID,
    privateKey: process.env.PRIVATE_VAPID,
  },
  ...(process.env.PROXY && { proxy: process.env.PROXY }),
};

export function getWebNotificationPayload(payload: NotificationPayload) {
  const webNotificationPayload: WebNotificationPayload = {
    title: getTitle(payload),
    body: payload.body,
    url: payload.url,
  };
  return webNotificationPayload;
}

export function getTitle(
  message: Pick<NotificationPayload, 'type' | 'triggeredBy'>,
): string {
  return titleMap[message.type] + message.triggeredBy.name;
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'New comment from ',
  ReceivedAReply: 'New reply from ',
  ReceivedALike: 'New like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
