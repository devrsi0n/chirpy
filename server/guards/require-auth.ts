import { AuthenticationError } from 'apollo-server-micro';
import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

import { getUserId } from '$server/utilities/auth';
import { prisma } from '$server/context';
import { User, Member, Team, Project } from '@prisma/client';

export type AllUserData = User & {
  members: (Member & {
    team: Team & {
      project: Project[];
    };
  })[];
};

export async function requireAuth(req: NextApiRequest | IncomingMessage): Promise<AllUserData> {
  const userId = getUserId(req);

  const user = await prisma.user.findOne({
    where: { id: userId },
    include: {
      members: {
        include: {
          team: {
            include: {
              project: true,
            },
          },
        },
      },
    },
  });
  if (!user) {
    throw new AuthenticationError(`User not found`);
  }
  return user;
}
