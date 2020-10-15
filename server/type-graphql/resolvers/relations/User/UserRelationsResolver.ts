import * as TypeGraphQL from "type-graphql";
import { Member } from "../../../models/Member";
import { Project } from "../../../models/Project";
import { User } from "../../../models/User";
import { UserMembersArgs } from "./args/UserMembersArgs";
import { UserProjectsArgs } from "./args/UserProjectsArgs";

@TypeGraphQL.Resolver(_of => User)
export class UserRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Member], {
    nullable: true,
    description: undefined,
  })
  async members(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserMembersArgs): Promise<Member[] | null> {
    return ctx.prisma.user.findOne({
      where: {
        id: user.id,
      },
    }).members(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Project], {
    nullable: true,
    description: undefined,
  })
  async projects(@TypeGraphQL.Root() user: User, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UserProjectsArgs): Promise<Project[] | null> {
    return ctx.prisma.user.findOne({
      where: {
        id: user.id,
      },
    }).projects(args);
  }
}
