import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberScalarWhereInput } from "../inputs/MemberScalarWhereInput";
import { MemberUpdateManyDataInput } from "../inputs/MemberUpdateManyDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpdateManyWithWhereNestedInput {
  @TypeGraphQL.Field(_type => MemberScalarWhereInput, {
    nullable: false,
    description: undefined
  })
  where!: MemberScalarWhereInput;

  @TypeGraphQL.Field(_type => MemberUpdateManyDataInput, {
    nullable: false,
    description: undefined
  })
  data!: MemberUpdateManyDataInput;
}
