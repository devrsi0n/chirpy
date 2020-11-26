import { ApolloError } from 'apollo-server-micro';

import { AllUserData } from './require-auth';

/**
 * Ensure current user can view the resources for target user
 * @param currentUser Current authenticated user
 * @param targetUserId The user to view
 */
export function requireUserAccess(currentUser: AllUserData, targetUserId: string): void {
  if (currentUser.id !== targetUserId) {
    throw new ApolloError(`Forbidden`);
  }
}
