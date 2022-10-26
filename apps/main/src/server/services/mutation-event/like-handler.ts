import { NextApiResponse } from 'next';

import { query } from '$/server/common/gql';
import { RecipientByLikeIdDocument } from '@chirpy-dev/graphql';
import { revalidateCommentWidget } from '$/server/utilities/revalidate';

import { EventLike, EventPayload } from './event-type';
import {
  createOneNotificationMessage,
  deleteNotificationMessage,
  getAuthorByCommentId,
} from './utilities';

/**
 * Handle hasura like event, trigger revalidation of the comment page.
 * Only create a passive notification message (it's a low priority message),
 * we may send a web push only if user enables it manually.
 * @param eventBody
 */
export async function handleLikeEvent(
  eventBody: EventPayload,
  res: NextApiResponse,
): Promise<void> {
  // log.debug(JSON.stringify(eventBody, null, 2));
  if (!isEventLike(eventBody)) {
    return;
  }
  const promises = [];
  const { event } = eventBody;
  if (event.op === 'INSERT') {
    const like = event.data.new;
    const recipientData = await getRecipientByLikeId(like.id);
    const recipient = recipientData.comment.recipient;
    const triggerById = like.userId;
    const { url } = recipientData.comment.page;
    promises.push(
      createOneNotificationMessage({
        recipientId: recipient.id,
        type: 'ReceivedALike',
        triggeredById: triggerById,
        url,
        contextId: like.id,
      }),
      revalidateCommentWidget(url, res),
    );
  } else if (event.op === 'DELETE') {
    const likeId = event.data.old.id;
    const authorData = await getAuthorByCommentId(event.data.old.commentId);
    promises.push(
      deleteNotificationMessage({
        recipientId: authorData.author.id,
        triggeredById: event.data.old.userId,
        type: 'ReceivedALike',
        contextId: likeId,
      }),
      revalidateCommentWidget(authorData.page.url, res),
    );
  }
  await Promise.allSettled(promises);
  return;
}

export function getRecipientByLikeId(likeId: string) {
  return query(
    RecipientByLikeIdDocument,
    {
      likeId,
    },
    'likeByPk',
  );
}

function isEventLike(eventBody: EventPayload): eventBody is EventLike {
  const { table } = eventBody;
  return table.name === 'Like';
}
