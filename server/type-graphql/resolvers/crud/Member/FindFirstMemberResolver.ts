import * as TypeGraphQL from "type-graphql";
import { FindFirstMemberArgs } from "./args/FindFirstMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class FindFirstMemberResolver {
  @TypeGraphQL.Query(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async findFirstMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.findFirst(args);
  }
}
