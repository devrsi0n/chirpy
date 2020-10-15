import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberUpdateWithoutTeamDataInput } from "../inputs/MemberUpdateWithoutTeamDataInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpdateWithWhereUniqueWithoutTeamInput {
  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: MemberWhereUniqueInput;

  @TypeGraphQL.Field(_type => MemberUpdateWithoutTeamDataInput, {
    nullable: false,
    description: undefined
  })
  data!: MemberUpdateWithoutTeamDataInput;
}
