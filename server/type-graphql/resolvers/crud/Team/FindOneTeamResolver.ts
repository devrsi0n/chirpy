import * as TypeGraphQL from "type-graphql";
import { FindOneTeamArgs } from "./args/FindOneTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class FindOneTeamResolver {
  @TypeGraphQL.Query(_returns => Team, {
    nullable: true,
    description: undefined
  })
  async team(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneTeamArgs): Promise<Team | null> {
    return ctx.prisma.team.findOne(args);
  }
}
