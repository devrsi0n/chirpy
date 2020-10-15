import * as TypeGraphQL from "type-graphql";
import { DeleteTeamArgs } from "./args/DeleteTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class DeleteTeamResolver {
  @TypeGraphQL.Mutation(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async deleteTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.delete(args);
  }
}
