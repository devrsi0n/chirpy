import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { NotificationSubscriptionsByUserIdDocument } from '$/server/graphql/generated/notification';

import { pushWebNotification } from './push-web-notification';
import { sendNotificationViaEmail } from './send-notification-via-email';
import { NotificationPayload } from './types';

const client = getAdminGqlClient();

export async function sendNotification(payload: NotificationPayload) {
  const { data } = await client
    .query(NotificationSubscriptionsByUserIdDocument, {
      userId: payload.recipient.id,
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
  await Promise.allSettled([
    ...notificationSubscriptions.map(pushWebNotification(payload)),
    sendNotificationViaEmail(payload),
  ]);
}
