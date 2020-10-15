import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTeamArgs } from "./args/AggregateTeamArgs";
import { CreateTeamArgs } from "./args/CreateTeamArgs";
import { DeleteManyTeamArgs } from "./args/DeleteManyTeamArgs";
import { DeleteTeamArgs } from "./args/DeleteTeamArgs";
import { FindFirstTeamArgs } from "./args/FindFirstTeamArgs";
import { FindManyTeamArgs } from "./args/FindManyTeamArgs";
import { FindOneTeamArgs } from "./args/FindOneTeamArgs";
import { UpdateManyTeamArgs } from "./args/UpdateManyTeamArgs";
import { UpdateTeamArgs } from "./args/UpdateTeamArgs";
import { UpsertTeamArgs } from "./args/UpsertTeamArgs";
import { Team } from "../../../models/Team";
import { AggregateTeam } from "../../outputs/AggregateTeam";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Team)
export class TeamCrudResolver {
  @TypeGraphQL.Query(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async team(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.findOne(args);
  }

  @TypeGraphQL.Query(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async findFirstTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Team], {
    nullable: false,
    description: undefined
  })
  async teams(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyTeamArgs): Promise<Team[]> {
    return ctx.prisma.team.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: false,
    description: undefined
  })
  async createTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateTeamArgs): Promise<Team> {
    return ctx.prisma.team.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async deleteTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async updateTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.update(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyTeamArgs): Promise<BatchPayload> {
    return ctx.prisma.team.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyTeamArgs): Promise<BatchPayload> {
    return ctx.prisma.team.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: false,
    description: undefined
  })
  async upsertTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertTeamArgs): Promise<Team> {
    return ctx.prisma.team.upsert(args);
  }

  @TypeGraphQL.Query(_returns => AggregateTeam, {
    nullable: false,
    description: undefined
  })
  async aggregateTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTeamArgs): Promise<AggregateTeam> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          .filter(([key, value]) => !key.startsWith("_"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.team.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
