import * as TypeGraphQL from "type-graphql";
import { UpdateProjectArgs } from "./args/UpdateProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class UpdateProjectResolver {
  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async updateProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.update(args);
  }
}
