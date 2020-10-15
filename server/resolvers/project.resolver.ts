import { Mutation, Query, Resolver, Args } from 'type-graphql';

import { GqlContext } from '$server/decorators/gql-context';
import type { TGqlContext } from '$server/decorators/gql-context';
import { Project, CreateProjectArgs, Team, Member, User } from '$server/type-graphql';
import { AuthenticationError } from 'apollo-server-micro';
import { getUserId } from '$server/utilities/auth';
import { requireAuth } from '$server/guards/require-auth';
import { requireProType } from '$server/guards/require-pro-type';

@Resolver((of) => Project)
export class ProjectResolver {
  @Mutation((returns) => Project)
  async createProjectForProUser(
    @GqlContext() ctx: TGqlContext,
    @Args() args: CreateProjectArgs,
  ): Promise<Project & { team: (Team & { members: (Member & { user: User })[] }) | null }> {
    const user = await requireAuth(ctx.req);
    await requireProType(user);

    const project = await ctx.prisma.project.create({
      data: {
        name: args.data.name,
        team: {
          create: {
            name: args.data.team?.create?.name ?? '',
            members: {
              create: {
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            },
          },
        },
      },
      include: {
        team: {
          include: {
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });
    if (!project) {
      throw new AuthenticationError(`User not found`);
    }
    return project;
  }

  @Mutation((returns) => Project)
  async createProject(
    @GqlContext() ctx: TGqlContext,
    @Args() args: CreateProjectArgs,
  ): Promise<{ id: string; name: string }> {
    const userId = getUserId(ctx.req);

    const project = await ctx.prisma.project.create({
      data: {
        name: args.data.name,
        User: {
          connect: {
            id: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
    if (!project) {
      throw new AuthenticationError(`User not found`);
    }
    return project;
  }
}
