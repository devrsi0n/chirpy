import * as TypeGraphQL from "type-graphql";
import { UpsertMemberArgs } from "./args/UpsertMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class UpsertMemberResolver {
  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: false,
    description: undefined
  })
  async upsertMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMemberArgs): Promise<Member> {
    return ctx.prisma.member.upsert(args);
  }
}
