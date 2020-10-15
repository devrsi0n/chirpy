import * as TypeGraphQL from "type-graphql";
import { Project } from "../../../models/Project";
import { Team } from "../../../models/Team";
import { User } from "../../../models/User";

@TypeGraphQL.Resolver(_of => Project)
export class ProjectRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => Team, {
    nullable: true,
    description: undefined,
  })
  async team(@TypeGraphQL.Root() project: Project, @TypeGraphQL.Ctx() ctx: any): Promise<Team | null> {
    return ctx.prisma.project.findOne({
      where: {
        id: project.id,
      },
    }).team({});
  }

  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: true,
    description: undefined,
  })
  async User(@TypeGraphQL.Root() project: Project, @TypeGraphQL.Ctx() ctx: any): Promise<User | null> {
    return ctx.prisma.project.findOne({
      where: {
        id: project.id,
      },
    }).User({});
  }
}
