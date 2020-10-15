import * as TypeGraphQL from "type-graphql";
import { CreateMemberArgs } from "./args/CreateMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class CreateMemberResolver {
  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: false,
    description: undefined
  })
  async createMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateMemberArgs): Promise<Member> {
    return ctx.prisma.member.create(args);
  }
}
