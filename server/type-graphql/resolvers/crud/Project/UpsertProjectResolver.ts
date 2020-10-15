import * as TypeGraphQL from "type-graphql";
import { UpsertProjectArgs } from "./args/UpsertProjectArgs";
import { Project } from "../../../models/Project";

@TypeGraphQL.Resolver(_of => Project)
export class UpsertProjectResolver {
  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: false,
    description: undefined
  })
  async upsertProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertProjectArgs): Promise<Project> {
    return ctx.prisma.project.upsert(args);
  }
}
