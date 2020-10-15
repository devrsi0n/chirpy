import * as TypeGraphQL from "type-graphql";
import { FindManyTeamArgs } from "./args/FindManyTeamArgs";
import { Team } from "../../../models/Team";

@TypeGraphQL.Resolver(_of => Team)
export class FindManyTeamResolver {
  @TypeGraphQL.Query(_returns => [Team], {
    nullable: false,
    description: undefined
  })
  async teams(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyTeamArgs): Promise<Team[]> {
    return ctx.prisma.team.findMany(args);
  }
}
