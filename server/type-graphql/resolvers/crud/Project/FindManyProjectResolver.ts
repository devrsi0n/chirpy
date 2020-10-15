import * as TypeGraphQL from "type-graphql";
import { FindManyProjectArgs } from "./args/FindManyProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class FindManyProjectResolver {
  @TypeGraphQL.Query(_returns => [Project], {
    nullable: false,
    description: undefined
  })
  async projects(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyProjectArgs): Promise<Project[]> {
    return ctx.prisma.project.findMany(args);
  }
}
