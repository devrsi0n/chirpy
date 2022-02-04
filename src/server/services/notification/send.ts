import webpush from 'web-push';

import { NotificationType_Enum } from '$/graphql/generated/types';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  NotificationSubscriptionsByUserIdDocument,
  DeleteNotificationSubscriptionDocument,
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
  return (subs: NotificationSubscriptionsByUserIdQuery['notificationSubscriptions'][number]) =>
    webpush
      .sendNotification(subs.subscription, JSON.stringify(payload), WEB_PUSH_OPTIONS)
      .then((error) => {
        if (error.statusCode === 410 || error.statusCode === 404) {
          console.error('Subscription has expired or is no longer valid:', error);
          return client
            .mutation<{ deleteNotificationSubscription: boolean }, { id: string }>(
              DeleteNotificationSubscriptionDocument,
              {
                id: subs.id,
              },
            )
            .toPromise();
        } else if (error.statusCode !== 201) {
          // TODO: Remove invalid subscriptions if matchs
          console.log('webpush error', error);
          throw error;
        }
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
