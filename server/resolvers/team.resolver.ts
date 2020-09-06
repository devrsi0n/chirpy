import { GqlContext } from '@server/decorators/gql-context';
import type { TGqlContext } from '@server/decorators/gql-context';
import { Team } from '@server/graphql.types';
import { requireAuth } from '@server/guards/require-auth';
import { requireUserAccess } from '@server/guards/require-user-access';
import { prisma } from '@server/prisma';
import { Args, ArgsType, Field, Query, Resolver } from 'type-graphql';

@ArgsType()
class TeamsArgs {
  @Field({ nullable: true })
  user_id?: string;
}

@Resolver((of) => Team)
export class TeamResolver {
  @Query((returns) => [Team])
  async teams(@GqlContext() ctx: TGqlContext, @Args() args: TeamsArgs) {
    const user = await requireAuth(ctx.req);
    // View teams for current user if `user_id` is not specified
    const userId = args.user_id || user.id;
    // Check if current user can view teams of this user
    await requireUserAccess(user, userId);
    // Get teams for this user
    const teams = await prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: {
              equals: userId,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // Create a default team for this user if they don't have one
    if (teams.length === 0) {
      const team = await prisma.team.create({
        data: {
          name: `Personal Team`,
          members: {
            create: {
              isAdmin: true,
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          },
        },
      });
      teams.push(team);
    }
    return teams;
  }
}
