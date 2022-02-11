import { NextApiRequest, NextApiResponse } from 'next';

import { unauthorized } from '../../utilities/response';
import { getCommentEventNotifications } from './comment-handler';
import { EventPayload } from './event-type';
import { getLikeEventNotifications } from './like-handler';

/**
 * Handle mutation event trigger by hasura. Send notifications and emails to subscribers.
 */
export async function handleMutationEvent(req: NextApiRequest, res: NextApiResponse<{}>) {
  if (req.headers['hasura_event_secret'] !== process.env.HASURA_EVENT_SECRET) {
    return unauthorized(res);
  }

  const eventBody = req.body as EventPayload;

  await Promise.allSettled([
    getCommentEventNotifications(eventBody),
    getLikeEventNotifications(eventBody),
  ]);
  res.end();
}
