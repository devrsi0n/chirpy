import * as TypeGraphQL from "type-graphql";
import { FindFirstProjectArgs } from "./args/FindFirstProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class FindFirstProjectResolver {
  @TypeGraphQL.Query(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async findFirstProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.findFirst(args);
  }
}
