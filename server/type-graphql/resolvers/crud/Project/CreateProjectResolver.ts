import * as TypeGraphQL from "type-graphql";
import { CreateProjectArgs } from "./args/CreateProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class CreateProjectResolver {
  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: false,
    description: undefined
  })
  async createProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateProjectArgs): Promise<Project> {
    return ctx.prisma.project.create(args);
  }
}
