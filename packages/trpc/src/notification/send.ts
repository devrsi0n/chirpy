import { log } from 'next-axiom';

import { prisma } from '../common/db-client';
import { pushWebNotification } from './push-web-notification';
import { sendEmailNotification } from './send-email-notification';
import { NotificationPayload } from './types';

export async function sendNotification(payload: NotificationPayload) {
  const notificationSubscriptions =
    await prisma.notificationSubscription.findMany({
      where: {
        userId: payload.recipient.id,
      },
      select: {
        id: true,
        subscription: true,
      },
    });

  if (notificationSubscriptions.length === 0) {
    log.error('No subscriptions found');
    return;
  }
  await Promise.allSettled([
    ...notificationSubscriptions.map(pushWebNotification(payload)),
    sendEmailNotification(payload),
  ]);
}
