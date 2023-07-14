import { getTextFromRteDoc, JSONContent } from '@chirpy-dev/utils';
import { Comment } from '@prisma/client';
import { NextApiResponse } from 'next';

import { prisma } from '../../common/db-client';
import { revalidateCommentWidget } from '../../common/revalidate';
import { sendNotification } from '../notification/send';
import { NotificationPayload } from '../notification/types';
import {
  createOneNotificationMessage,
  deleteNotificationMessage,
  getAuthorByCommentId,
  getUserByPk,
} from './utilities';

export type EventPayload = {
  op: 'INSERT' | 'DELETE';
  comment: Pick<Comment, 'id' | 'content' | 'userId' | 'parentId'>;
};

/**
 * Handle INSERT/DELETE comment event: send web notification, trigger revalidation of the comment page.
 */
export async function handleCommentEvent(
  event: EventPayload,
  res: NextApiResponse,
  authUserId: string,
): Promise<void> {
  const revalidatePromises = [];
  const notificationPayloads: (NotificationPayload & { contextId: string })[] =
    [];
  if (event.op === 'INSERT') {
    const commentId = event.comment.id;
    const body = getTextFromRteDoc(event.comment.content as JSONContent);

    const siteOwnerData = await getSiteOwnerByTriggeredCommentId(commentId);

    const owner = siteOwnerData?.page.project.user;
    if (!siteOwnerData || !owner?.id) {
      throw new Error(
        `Can't find the site owner for comment id (${commentId})`,
      );
    }
    const url = siteOwnerData.page.url;
    revalidatePromises.push(revalidateCommentWidget(url, res));
    const ownerId = owner.id;
    const triggeredById = event.comment.userId;
    const triggeredBy = {
      id: triggeredById,
      name: siteOwnerData.user.name || siteOwnerData.user.username || 'Unnamed',
    };
    if (owner.id !== triggeredById) {
      // Notify the owner of the site that a comment has been added
      notificationPayloads.push({
        recipient: {
          id: ownerId,
          email: owner.email,
          name: owner.name || owner.username || 'Unnamed',
        },
        type: 'ReceivedAComment',
        triggeredBy,
        url,
        body,
        contextId: commentId,
      });
    }

    const parentCommentId = event.comment.parentId;
    if (parentCommentId) {
      // Notify the parent comment author that a reply has been added
      const parentData = await getAuthorByCommentId(parentCommentId);
      const recipientId = parentData?.user.id;
      if (
        recipientId &&
        recipientId !== ownerId &&
        recipientId !== triggeredById
      ) {
        notificationPayloads.push({
          recipient: {
            id: recipientId,
            email: parentData.user.email,
            name: parentData.user.name || parentData.user.username || 'Unnamed',
          },
          type: 'ReceivedAReply',
          triggeredBy,
          url,
          body,
          contextId: commentId,
        });
      }
    }
  } else if (event.op === 'DELETE') {
    const { comment } = event;
    // Delete the existing notification sent to the owner of site
    const siteOwnerData = await getSiteOwnerByTriggeredCommentId(comment.id);
    const ownerId = siteOwnerData?.page.project.user?.id;
    if (!siteOwnerData || !ownerId) {
      throw new Error(
        `Can't find the site owner for comment id (${comment.id})`,
      );
    }
    const contextId = comment.id;
    // Sync with `INSERT` logic
    if (ownerId !== comment.userId) {
      await deleteNotificationMessage({
        triggeredById: comment.userId,
        recipientId: ownerId,
        type: 'ReceivedAComment',
        contextId,
      });
    }
    // Delete the existing notification sent to the parent comment author
    if (comment.parentId) {
      const parentData = await getAuthorByCommentId(comment.parentId);
      const recipientId = parentData?.user.id;
      if (
        recipientId &&
        recipientId !== comment.userId &&
        recipientId !== ownerId
      ) {
        await deleteNotificationMessage({
          triggeredById: comment.userId,
          recipientId,
          type: 'ReceivedAReply',
          contextId,
        });
      }
    }

    // Send the notification to the author of the comment that his comment has been deleted
    const triggeredById = authUserId;
    const [authorData, triggeredBy] = await Promise.all([
      getAuthorByCommentId(comment.id),
      getUserByPk(triggeredById),
    ]);
    if (authorData && triggeredBy) {
      const { url } = authorData.page;
      revalidatePromises.push(revalidateCommentWidget(url, res));

      const recipientId = authorData.user.id;
      if (recipientId !== triggeredById) {
        notificationPayloads.push({
          recipient: {
            id: recipientId,
            email: authorData.user.email,
            name: authorData.user.name || authorData.user.username || 'Unnamed',
          },
          triggeredBy: {
            id: triggeredById,
            name: triggeredBy.name || '',
          },
          type: 'CommentDeleted',
          url,
          body: getTextFromRteDoc(comment.content as JSONContent),
          contextId,
        });
      }
    }
  }
  const settings = await prisma.settings.upsert({
    where: {
      userId: authUserId,
    },
    update: {},
    create: {
      userId: authUserId,
    },
    select: {
      emailReply: true,
      webPushReply: true,
    },
  });
  await Promise.allSettled([
    ...revalidatePromises,
    ...notificationPayloads.reduce((previous, { contextId, ...payload }) => {
      previous.push(
        createOneNotificationMessage({
          recipientId: payload.recipient.id,
          type: payload.type,
          url: payload.url,
          triggeredById: payload.triggeredBy.id,
          contextId,
          content: payload.body,
        }),
        sendNotification(payload, settings),
      );
      return previous;
    }, [] as Promise<any>[]),
  ]);
  return;
}

export async function getSiteOwnerByTriggeredCommentId(commentId: string) {
  return await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
    select: {
      page: {
        select: {
          id: true,
          url: true,
          project: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  username: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
}
