import * as TypeGraphQL from "type-graphql";
import { CreateTeamArgs } from "./args/CreateTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class CreateTeamResolver {
  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: false,
    description: undefined
  })
  async createTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateTeamArgs): Promise<Team> {
    return ctx.prisma.team.create(args);
  }
}
