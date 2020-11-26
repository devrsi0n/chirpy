import { AuthenticationError } from 'apollo-server-micro';
import { NextApiRequest } from 'next';
import { User, Member, Team, Project } from '@prisma/client';

import { getUserId } from '../utilities/auth';
import { prisma } from '../context';

export type AllUserData = User & {
  members: (Member & {
    team: Team & {
      project: Project[];
    };
  })[];
};

export async function requireAuth(req: NextApiRequest): Promise<AllUserData> {
  const userId = await getUserId(req);

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
