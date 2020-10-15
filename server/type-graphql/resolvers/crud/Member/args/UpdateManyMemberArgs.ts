import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberUpdateManyMutationInput } from "../../../inputs/MemberUpdateManyMutationInput";
import { MemberWhereInput } from "../../../inputs/MemberWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyMemberArgs {
  @TypeGraphQL.Field(_type => MemberUpdateManyMutationInput, { nullable: false })
  data!: MemberUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => MemberWhereInput, { nullable: true })
  where?: MemberWhereInput | undefined;
}
