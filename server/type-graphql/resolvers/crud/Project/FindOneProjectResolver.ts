import * as TypeGraphQL from "type-graphql";
import { FindOneProjectArgs } from "./args/FindOneProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class FindOneProjectResolver {
  @TypeGraphQL.Query(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async project(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.findOne(args);
  }
}
