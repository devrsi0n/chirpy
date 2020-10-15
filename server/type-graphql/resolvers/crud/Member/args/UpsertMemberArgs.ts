import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberCreateInput } from "../../../inputs/MemberCreateInput";
import { MemberUpdateInput } from "../../../inputs/MemberUpdateInput";
import { MemberWhereUniqueInput } from "../../../inputs/MemberWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertMemberArgs {
  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, { nullable: false })
  where!: MemberWhereUniqueInput;

  @TypeGraphQL.Field(_type => MemberCreateInput, { nullable: false })
  create!: MemberCreateInput;

  @TypeGraphQL.Field(_type => MemberUpdateInput, { nullable: false })
  update!: MemberUpdateInput;
}
