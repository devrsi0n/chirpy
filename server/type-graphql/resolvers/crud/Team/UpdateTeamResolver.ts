import * as TypeGraphQL from "type-graphql";
import { UpdateTeamArgs } from "./args/UpdateTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class UpdateTeamResolver {
  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async updateTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.update(args);
  }
}
