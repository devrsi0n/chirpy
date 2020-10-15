import * as TypeGraphQL from "type-graphql";
import { FindOneMemberArgs } from "./args/FindOneMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class FindOneMemberResolver {
  @TypeGraphQL.Query(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async member(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.findOne(args);
  }
}
