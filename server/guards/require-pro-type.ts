import { AuthenticationError } from 'apollo-server-micro';

import { User } from '@prisma/client';

export async function requireProType(user: User): Promise<void> {
  if (user.type !== 'PRO') {
    throw new AuthenticationError('Require Pro user, please upgrade your plan.');
  }
}
