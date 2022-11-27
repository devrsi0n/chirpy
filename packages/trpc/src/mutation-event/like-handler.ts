import { NextApiResponse } from 'next';

import { Like, prisma } from '../common/db-client';
import { revalidateCommentWidget } from '../common/revalidate';
import { deleteNotificationMessage, getAuthorByCommentId } from './utilities';

export type EventPayload = {
  op: 'INSERT' | 'DELETE';
  like: Pick<Like, 'id' | 'userId' | 'commentId'>;
};

/**
 * Handle hasura like event, trigger revalidation of the comment page.
 * Only create a passive notification message (it's a low priority message),
 * we may send a web push only if user enables it manually.
 */
export async function handleLikeEvent(
  event: EventPayload,
  res: NextApiResponse,
  authUserId: string,
): Promise<void> {
  const promises = [];
  if (event.op === 'INSERT') {
    const like = event.like;
    const recipientData = await getRecipientByLikeId(like.id);
    if (recipientData) {
      const recipient = recipientData.comment.user;
      const triggerById = like.userId;
      const { url } = recipientData.comment.page;
      promises.push(
        prisma.notificationMessage.create({
          data: {
            recipientId: recipient.id,
            type: 'ReceivedALike',
            triggeredById: triggerById,
            url,
            contextId: like.id,
          },
        }),
        revalidateCommentWidget(url, res),
      );
    }
  } else if (event.op === 'DELETE') {
    const likeId = event.like.id;
    const authorData = await getAuthorByCommentId(event.like.commentId);
    if (authorData) {
      promises.push(
        deleteNotificationMessage({
          recipientId: authorData.user.id,
          triggeredById: authUserId,
          type: 'ReceivedALike',
          contextId: likeId,
        }),
        revalidateCommentWidget(authorData.page.url, res),
      );
    }
  }
  await Promise.allSettled(promises);
  return;
}

export async function getRecipientByLikeId(likeId: string) {
  return await prisma.like.findUnique({
    where: {
      id: likeId,
    },
    select: {
      comment: {
        select: {
          page: {
            select: {
              id: true,
              url: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}
