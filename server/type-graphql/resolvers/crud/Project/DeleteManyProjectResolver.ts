import * as TypeGraphQL from "type-graphql";
import { DeleteManyProjectArgs } from "./args/DeleteManyProjectArgs";
import { Project } from "../../../models/Project";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Project)
export class DeleteManyProjectResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyProjectArgs): Promise<BatchPayload> {
    return ctx.prisma.project.deleteMany(args);
  }
}
