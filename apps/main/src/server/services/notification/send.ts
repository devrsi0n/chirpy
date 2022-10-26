import { log } from 'next-axiom';

import { query } from '$/server/common/gql';
import { NotificationSubscriptionsByUserIdDocument } from '@chirpy-dev/graphql';

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
    log.error('No subscriptions found');
    return;
  }
  await Promise.allSettled([
    ...notificationSubscriptions.map(pushWebNotification(payload)),
    sendNotificationViaEmail(payload),
  ]);
}
