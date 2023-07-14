import { Settings } from '@prisma/client';
import { log } from 'next-axiom';

import { prisma } from '../../common/db-client';
import { pushWebNotification } from './push-web-notification';
import { sendEmailNotification } from './send-email-notification';
import { NotificationPayload } from './types';

export async function sendNotification(
  payload: NotificationPayload,
  userSettings: Pick<Settings, 'emailReply' | 'webPushReply'>,
) {
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
    log.info('No subscriptions found');
  }
  await Promise.allSettled([
    ...(userSettings.webPushReply
      ? notificationSubscriptions.map(pushWebNotification(payload))
      : []),
    ...(userSettings.emailReply ? [sendEmailNotification(payload)] : []),
  ]);
}
