import * as TypeGraphQL from "type-graphql";
import { FindFirstTeamArgs } from "./args/FindFirstTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class FindFirstTeamResolver {
  @TypeGraphQL.Query(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async findFirstTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.findFirst(args);
  }
}
