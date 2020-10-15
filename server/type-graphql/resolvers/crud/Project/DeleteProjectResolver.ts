import * as TypeGraphQL from "type-graphql";
import { DeleteProjectArgs } from "./args/DeleteProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class DeleteProjectResolver {
  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async deleteProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.delete(args);
  }
}
