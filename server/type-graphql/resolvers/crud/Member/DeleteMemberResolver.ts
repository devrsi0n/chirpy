import * as TypeGraphQL from "type-graphql";
import { DeleteMemberArgs } from "./args/DeleteMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class DeleteMemberResolver {
  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async deleteMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.delete(args);
  }
}
