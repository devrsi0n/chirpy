import * as TypeGraphQL from "type-graphql";
import { DeleteManyMemberArgs } from "./args/DeleteManyMemberArgs";
import { Member } from "../../../models/Member";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Member)
export class DeleteManyMemberResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyMemberArgs): Promise<BatchPayload> {
    return ctx.prisma.member.deleteMany(args);
  }
}
