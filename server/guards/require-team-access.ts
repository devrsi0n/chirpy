import { ApolloError } from 'apollo-server-micro';
import { ModelTeam } from '$server/db.types';
import { ModelUserWithMembers } from './require-auth';

export function requireTeamAccess(
  level: 'member' | 'admin',
  user: ModelUserWithMembers,
  team: ModelTeam,
): void {
  const member = user.members.find((member) => member.teamId === team.id);

  if (level === 'admin' && (!member || member.role !== 'ADMIN')) {
    throw new ApolloError(`Require admin permission to access this team`);
  }

  if (!member) {
    throw new ApolloError(`You're not a member of this team`);
  }
}
