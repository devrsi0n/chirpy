import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberUpdateWithoutUserDataInput } from "../inputs/MemberUpdateWithoutUserDataInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpdateWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: MemberWhereUniqueInput;

  @TypeGraphQL.Field(_type => MemberUpdateWithoutUserDataInput, {
    nullable: false,
    description: undefined
  })
  data!: MemberUpdateWithoutUserDataInput;
}
