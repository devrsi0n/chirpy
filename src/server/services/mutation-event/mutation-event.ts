import { NextApiRequest, NextApiResponse } from 'next';

import { getCommentEventNotifications } from './comment-handler';
import { EventPayload } from './event-type';
import { getLikeEventNotifications } from './like-handler';

/**
 * Handle mutation event trigger by hasura. Send notifications and emails to subscribers.
 */
export async function handleMutationEvent(req: NextApiRequest, res: NextApiResponse<{}>) {
  const eventBody = req.body as EventPayload;

  await Promise.allSettled([
    getCommentEventNotifications(eventBody),
    getLikeEventNotifications(eventBody),
  ]);
  res.end();
}
