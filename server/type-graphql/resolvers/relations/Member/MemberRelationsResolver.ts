import * as TypeGraphQL from "type-graphql";
import { Member } from "../../../models/Member";
import { Team } from "../../../models/Team";
import { User } from "../../../models/User";

@TypeGraphQL.Resolver(_of => Member)
export class MemberRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => User, {
    nullable: false,
    description: undefined,
  })
  async user(@TypeGraphQL.Root() member: Member, @TypeGraphQL.Ctx() ctx: any): Promise<User> {
    return ctx.prisma.member.findOne({
      where: {
        id: member.id,
      },
    }).user({});
  }

  @TypeGraphQL.FieldResolver(_type => Team, {
    nullable: false,
    description: undefined,
  })
  async team(@TypeGraphQL.Root() member: Member, @TypeGraphQL.Ctx() ctx: any): Promise<Team> {
    return ctx.prisma.member.findOne({
      where: {
        id: member.id,
      },
    }).team({});
  }
}
