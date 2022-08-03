import { query } from '$/server/common/gql';
import { NotificationSubscriptionsByUserIdDocument } from '$/server/graphql/generated/notification';

import { pushWebNotification } from './push-web-notification';
import { sendNotificationViaEmail } from './send-notification-via-email';
import { NotificationPayload } from './types';

export async function sendNotification(payload: NotificationPayload) {
  const notificationSubscriptions = await query(
    NotificationSubscriptionsByUserIdDocument,
    {
      userId: payload.recipient.id,
    },
    'notificationSubscriptions',
  );

  if (
    !Array.isArray(notificationSubscriptions) ||
    notificationSubscriptions.length === 0
  ) {
    console.error('No subscriptions found');
    return;
  }
  await Promise.allSettled([
    ...notificationSubscriptions.map(pushWebNotification(payload)),
    sendNotificationViaEmail(payload),
  ]);
}
