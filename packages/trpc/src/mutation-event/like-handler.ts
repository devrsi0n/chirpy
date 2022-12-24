import { NextApiResponse } from 'next';

import { revalidateCommentWidget } from '../common/revalidate';
import { Like, prisma } from '../db/client';
import { deleteNotificationMessage, getAuthorByCommentId } from './utilities';

export type EventPayload = {
  op: 'INSERT' | 'DELETE';
  like: Pick<Like, 'id' | 'userId' | 'commentId'>;
};

/**
 * Handle like INSERT & DELETE event, trigger revalidation of the comment page.
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
    const { like } = event;
    const recipientData = await getRecipientByLikeId(like.id);
    if (!recipientData) {
      throw new Error(`Can't find recipient for like ${like.id}`);
    }
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
  } else if (event.op === 'DELETE') {
    const likeId = event.like.id;
    const authorData = await getAuthorByCommentId(event.like.commentId);
    if (!authorData) {
      throw new Error(`Can't find author for comment ${event.like.commentId}`);
    }
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
