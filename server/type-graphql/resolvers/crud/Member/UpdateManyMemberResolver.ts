import * as TypeGraphQL from "type-graphql";
import { UpdateManyMemberArgs } from "./args/UpdateManyMemberArgs";
import { Member } from "../../../models/Member";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Member)
export class UpdateManyMemberResolver {
  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyMemberArgs): Promise<BatchPayload> {
    return ctx.prisma.member.updateMany(args);
  }
}
