import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateWithoutTeamInput } from "../inputs/MemberCreateWithoutTeamInput";
import { MemberUpdateWithoutTeamDataInput } from "../inputs/MemberUpdateWithoutTeamDataInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpsertWithWhereUniqueWithoutTeamInput {
  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: MemberWhereUniqueInput;

  @TypeGraphQL.Field(_type => MemberUpdateWithoutTeamDataInput, {
    nullable: false,
    description: undefined
  })
  update!: MemberUpdateWithoutTeamDataInput;

  @TypeGraphQL.Field(_type => MemberCreateWithoutTeamInput, {
    nullable: false,
    description: undefined
  })
  create!: MemberCreateWithoutTeamInput;
}
