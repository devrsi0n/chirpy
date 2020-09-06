import { AUTH_COOKIE_NAME } from '@server/constants'
import { AuthenticationError } from 'apollo-server-micro'
import { IncomingMessage } from 'http'
import { NextApiRequest } from 'next'
import { parse } from 'cookie'
import { parseSecureToken } from '@server/auth'
import { ModelMember, ModelUser } from '@server/db.types'
import { prisma } from '@server/prisma'

export type ModelUserWithMembers = ModelUser & { members: ModelMember[] }

export async function requireAuth(
  req: NextApiRequest | IncomingMessage,
): Promise<ModelUserWithMembers | null> {
  const token = parse(req.headers.cookie || '')[AUTH_COOKIE_NAME]
  const authUser = parseSecureToken(token)

  if (!authUser) {
    throw new AuthenticationError(`Authentication Error`)
  }

  const user = await prisma.user.findOne({
    where: { id: authUser.userId },
    include: {
      members: true,
    },
  })
  if (!user) {
    throw new AuthenticationError(`User not found`)
  }
  return user
}
