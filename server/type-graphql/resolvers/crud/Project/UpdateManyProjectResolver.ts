import * as TypeGraphQL from "type-graphql";
import { UpdateManyProjectArgs } from "./args/UpdateManyProjectArgs";
import { Project } from "../../../models/Project";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Project)
export class UpdateManyProjectResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyProjectArgs): Promise<BatchPayload> {
    return ctx.prisma.project.updateMany(args);
  }
}
