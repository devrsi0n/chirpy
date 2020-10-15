import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberUpdateInput } from "../../../inputs/MemberUpdateInput";
import { MemberWhereUniqueInput } from "../../../inputs/MemberWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateMemberArgs {
  @TypeGraphQL.Field(_type => MemberUpdateInput, { nullable: false })
  data!: MemberUpdateInput;

  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, { nullable: false })
  where!: MemberWhereUniqueInput;
}
