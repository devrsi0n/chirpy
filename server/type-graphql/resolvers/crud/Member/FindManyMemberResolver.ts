import * as TypeGraphQL from "type-graphql";
import { FindManyMemberArgs } from "./args/FindManyMemberArgs";
import { Member } from "../../../models/Member";

@TypeGraphQL.Resolver(_of => Member)
export class FindManyMemberResolver {
  @TypeGraphQL.Query(_returns => [Member], {
    nullable: false,
    description: undefined
  })
  async members(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMemberArgs): Promise<Member[]> {
    return ctx.prisma.member.findMany(args);
  }
}
