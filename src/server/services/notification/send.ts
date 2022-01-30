import webpush, { PushSubscription } from 'web-push';

import { NotificationType_Enum } from '$/graphql/generated/types';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { NotificationSubscriptionsByUserIdDocument } from '$/server/graphql/generated/notification';

export type NotificationPayload = {
  recipientId: string;
  type: NotificationType_Enum;
  triggeredById: string;
  url?: string;
};

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
  await Promise.allSettled(
    notificationSubscriptions.map((subs: { subscription: PushSubscription }) =>
      webpush.sendNotification(subs.subscription, JSON.stringify(payload), WEB_PUSH_OPTIONS),
    ),
  );
}

const client = getAdminGqlClient();

const WEB_PUSH_OPTIONS: webpush.RequestOptions = {
  vapidDetails: {
    // TODO: update it with Chirpy official email
    subject: 'mailto:example@yourdomain.org',
    publicKey: process.env.NEXT_PUBLIC_VAPID,
    privateKey: process.env.PRIVATE_VAPID,
  },
  ...(process.env.PROXY && { proxy: process.env.PROXY }),
};
