import { ApolloError } from 'apollo-server-micro'
import { ModelUserWithMembers } from './require-auth'

/**
 * Ensure current user can view the resources for target user
 * @param currentUser Current authenticated user
 * @param targetUserId The user to view
 */
export async function requireUserAccess(
  currentUser: ModelUserWithMembers,
  targetUserId: string,
) {
  if (currentUser.id !== targetUserId) {
    throw new ApolloError(`Forbidden`)
  }
}
