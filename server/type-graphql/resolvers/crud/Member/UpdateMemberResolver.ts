import * as TypeGraphQL from "type-graphql";
import { UpdateMemberArgs } from "./args/UpdateMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class UpdateMemberResolver {
  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async updateMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.update(args);
  }
}
