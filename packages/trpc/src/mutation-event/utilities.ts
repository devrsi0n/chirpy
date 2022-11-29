import { log } from 'next-axiom';

import { NotificationMessage, prisma } from '../common/db-client';

export async function getAuthorByCommentId(commentId: string) {
  return await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
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
          username: true,
          email: true,
        },
      },
    },
  });
}

export type CreateNotificationMessageVairables = Pick<
  NotificationMessage,
  'recipientId' | 'triggeredById' | 'type' | 'contextId' | 'url' | 'content'
>;

export async function createOneNotificationMessage(
  variables: CreateNotificationMessageVairables,
) {
  return await prisma.notificationMessage.create({
    data: variables,
  });
}

export type DeleteNotificationMessageVairables = Pick<
  NotificationMessage,
  'recipientId' | 'triggeredById' | 'type' | 'contextId'
>;

export async function deleteNotificationMessage(
  variables: DeleteNotificationMessageVairables,
) {
  const data = await prisma.notificationMessage.deleteMany({
    where: variables,
  });
  if (data.count !== 1) {
    log.error(
      `Expect 1 notification message deleted, got: ${
        data.count
      }, variables: ${JSON.stringify(variables)}`,
    );
  }
  return data;
}

export async function getUserByPk(id: string) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}
