import webpush from 'web-push';

import { NotificationType_Enum } from '$/graphql/generated/types';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  NotificationSubscriptionsByUserIdDocument,
  DeleteNotificationSubscriptionByPkDocument,
  NotificationSubscriptionsByUserIdQuery,
} from '$/server/graphql/generated/notification';

export type NotificationPayload = {
  recipientId: string;
  type: NotificationType_Enum;
  triggeredById: string;
  triggeredBy: {
    id: string;
    name: string;
  };
  url: string;
  body: string;
};

const client = getAdminGqlClient();

export async function sendNotification(payload: NotificationPayload) {
  const { data } = await client
    .query(NotificationSubscriptionsByUserIdDocument, {
      userId: payload.recipientId,
    })
    .toPromise();

  if (
    !data ||
    !Array.isArray(data?.notificationSubscriptions) ||
    data?.notificationSubscriptions.length === 0
  ) {
    console.error('No subscriptions found');
    return;
  }
  const { notificationSubscriptions } = data;
  // console.log('sending notification', { data });
  await Promise.allSettled(notificationSubscriptions.map(sendANotification(payload)));
}

function sendANotification(payload: NotificationPayload) {
  return (sub: NotificationSubscriptionsByUserIdQuery['notificationSubscriptions'][number]) =>
    webpush
      .sendNotification(sub.subscription, JSON.stringify(payload), WEB_PUSH_OPTIONS)
      .catch((error) => {
        console.log('webpush error', JSON.stringify(error, null, 2));
        if (
          error.statusCode === 410 ||
          error.statusCode === 404 ||
          error.code === 'ERR_CRYPTO_ECDH_INVALID_PUBLIC_KEY'
        ) {
          console.error('Subscription has expired or is no longer valid:', error);
          return client
            .mutation(DeleteNotificationSubscriptionByPkDocument, {
              id: sub.id,
            })
            .toPromise()
            .then((resp) => {
              console.log('Deleted subscription', resp);
            })
            .catch((error) => {
              console.log('Error deleting subscription', error);
            });
        }

        throw error;
      });
}

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    // TODO: update it with Chirpy official email
    subject: 'mailto:example@yourdomain.org',
    publicKey: process.env.NEXT_PUBLIC_VAPID,
    privateKey: process.env.PRIVATE_VAPID,
  },
  ...(process.env.PROXY && { proxy: process.env.PROXY }),
};
