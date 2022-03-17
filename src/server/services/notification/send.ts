import { NotificationType_Enum } from '$/graphql/generated/types';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { NotificationSubscriptionsByUserIdDocument } from '$/server/graphql/generated/notification';

import { pushWebNotification } from './push-web-notification';

export type NotificationPayload = {
  recipientId: string;
  type: NotificationType_Enum;
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
  await Promise.allSettled(notificationSubscriptions.map(pushWebNotification(payload)));
}
