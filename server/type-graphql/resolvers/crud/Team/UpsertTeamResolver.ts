import * as TypeGraphQL from "type-graphql";
import { UpsertTeamArgs } from "./args/UpsertTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class UpsertTeamResolver {
  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: false,
    description: undefined
  })
  async upsertTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertTeamArgs): Promise<Team> {
    return ctx.prisma.team.upsert(args);
  }
}
