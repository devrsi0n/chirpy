import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberWhereInput } from "../../../inputs/MemberWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyMemberArgs {
  @TypeGraphQL.Field(_type => MemberWhereInput, { nullable: true })
  where?: MemberWhereInput | undefined;
}
