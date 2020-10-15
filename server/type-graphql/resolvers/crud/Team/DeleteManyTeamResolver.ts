import * as TypeGraphQL from "type-graphql";
import { DeleteManyTeamArgs } from "./args/DeleteManyTeamArgs";
import { Team } from "../../../models/Team";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Team)
export class DeleteManyTeamResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyTeamArgs): Promise<BatchPayload> {
    return ctx.prisma.team.deleteMany(args);
  }
}
