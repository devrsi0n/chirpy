import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberCreateInput } from "../../../inputs/MemberCreateInput";

@TypeGraphQL.ArgsType()
export class CreateMemberArgs {
  @TypeGraphQL.Field(_type => MemberCreateInput, { nullable: false })
  data!: MemberCreateInput;
}
