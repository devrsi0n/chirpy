import * as TypeGraphQL from "type-graphql";
import { UpdateManyTeamArgs } from "./args/UpdateManyTeamArgs";
import { Team } from "../../../models/Team";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Team)
export class UpdateManyTeamResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyTeamArgs): Promise<BatchPayload> {
    return ctx.prisma.team.updateMany(args);
  }
}
