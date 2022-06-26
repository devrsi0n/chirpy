import { NextApiRequest, NextApiResponse } from 'next';

import { handleCommentEvent } from './comment-handler';
import { EventPayload } from './event-type';
import { handleLikeEvent } from './like-handler';

/**
 * Handle mutation event trigger by hasura. Send notifications and emails to subscribers.
 */
export async function handleMutationEvent(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, unknown>>,
) {
  const eventBody = req.body as EventPayload;

  await Promise.allSettled([
    handleCommentEvent(eventBody, res),
    handleLikeEvent(eventBody, res),
  ]);
  res.end();
}
