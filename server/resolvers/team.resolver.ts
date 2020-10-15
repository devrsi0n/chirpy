import { GqlContext } from '$server/decorators/gql-context';
import type { TGqlContext } from '$server/decorators/gql-context';
import { Team } from '$server/type-graphql';
import { requireAuth } from '$server/guards/require-auth';
import { requireUserAccess } from '$server/guards/require-user-access';
import { prisma } from '$server/prisma';
import { Args, ArgsType, Field, Query, Resolver } from 'type-graphql';

@ArgsType()
class TeamsArgs {
  @Field({ nullable: true })
  user_id?: string;
}

@Resolver((of) => Team)
export class TeamResolver {
  @Query((returns) => [Team])
  async currentTeams(@GqlContext() ctx: TGqlContext, @Args() args: TeamsArgs): Promise<Team[]> {
    const user = await requireAuth(ctx.req);
    // View teams for current user if `user_id` is not specified
    const userId = args.user_id || user.id;
    // Check if current user can view teams of this user
    requireUserAccess(user, userId);
    // Get teams for this user
    const teams: Team[] = await prisma.team.findMany({
      where: {
        members: {
          some: {
            userId: {
              equals: userId,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
            team: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    // Create a default team for this user if they don't have one
    // if (teams.length === 0) {
    //   const team = await prisma.team.create({
    //     data: {
    //       name: `Your Team`,
    //       members: {
    //         create: {
    //           role: 'ADMIN' as Role,
    //           user: {
    //             connect: {
    //               id: userId,
    //             },
    //           },
    //         },
    //       },
    //     },
    //     include: {
    //       members: {
    //         include: {
    //           user: true,
    //           team: true,
    //         },
    //       },
    //     },
    //   });
    //   teams.push(team as unknown as GqlTeam);
    // }
    return teams;
  }
}
