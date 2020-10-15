import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateWithoutUserInput } from "../inputs/MemberCreateWithoutUserInput";
import { MemberUpdateWithoutUserDataInput } from "../inputs/MemberUpdateWithoutUserDataInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: MemberWhereUniqueInput;

  @TypeGraphQL.Field(_type => MemberUpdateWithoutUserDataInput, {
    nullable: false,
    description: undefined
  })
  update!: MemberUpdateWithoutUserDataInput;

  @TypeGraphQL.Field(_type => MemberCreateWithoutUserInput, {
    nullable: false,
    description: undefined
  })
  create!: MemberCreateWithoutUserInput;
}
