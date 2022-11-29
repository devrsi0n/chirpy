import { sendNotificationEmail } from '@chirpy-dev/emails';
import { NotificationType_Enum } from '@chirpy-dev/types';
import { log } from 'next-axiom';

import { NotificationPayload } from './types';

export async function sendEmailNotification(payload: NotificationPayload) {
  if (!payload.recipient.email) {
    log.warn(`No recipient email`, payload);
    return;
  }
  await sendNotificationEmail({
    userName: payload.recipient.name,
    to: {
      email: payload.recipient.email,
      name: payload.recipient.name,
    },
    url: payload.url,
    title: getTitle(payload),
    body: payload.body,
  });
}

export function getTitle(
  message: Pick<NotificationPayload, 'type' | 'triggeredBy'>,
): string {
  return titleMap[message.type] + message.triggeredBy.name;
}

const titleMap: Record<NotificationType_Enum, string> = {
  ReceivedAComment: 'You got a new comment from ',
  ReceivedAReply: 'You got a new reply from ',
  ReceivedALike: 'You got a new like from ',
  CommentDeleted: 'Your comment was deleted by ',
};
