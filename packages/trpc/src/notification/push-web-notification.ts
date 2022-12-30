import { NotificationType_Enum } from '@chirpy-dev/types';
import { FEEDBACK_LINK } from '@chirpy-dev/utils';
import { log } from 'next-axiom';
import webpush, { PushSubscription } from 'web-push';

import { prisma } from '../db/client';
import { NotificationSubscription } from '../db/types';
import { NotificationPayload } from './types';

export type WebNotificationPayload = {
  title: string;
} & Pick<NotificationPayload, 'body' | 'url'>;

export type NotificationSubscriptionPayload = Pick<
  NotificationSubscription,
  'id' | 'subscription'
>;

export function pushWebNotification(payload: NotificationPayload) {
  return async (sub: NotificationSubscriptionPayload) => {
    try {
      await webpush.sendNotification(
        sub.subscription as unknown as PushSubscription,
        JSON.stringify(getWebNotificationPayload(payload)),
        WEB_PUSH_OPTIONS,
      );
    } catch (error) {
      const err: any = error;
      if (
        err.statusCode === 410 ||
        err.statusCode === 404 ||
        err.code === 'ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY'
      ) {
        log.error('Subscription has expired or is no longer valid:', error);
        try {
          const deleteNotificationSubscriptionByPk =
            await prisma.notificationSubscription.delete({
              where: {
                id: sub.id,
              },
            });
          log.debug('Deleted subscription', deleteNotificationSubscriptionByPk);
        } catch (error) {
          log.error('Error deleting subscription', error);
        }
        return;
      }
      log.error('webpush error', JSON.stringify(error, null, 2));
      throw error;
    }
  };
}

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    subject: FEEDBACK_LINK,
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
