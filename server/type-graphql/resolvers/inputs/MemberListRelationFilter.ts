import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberWhereInput } from "../inputs/MemberWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberListRelationFilter {
  @TypeGraphQL.Field(_type => MemberWhereInput, {
    nullable: true,
    description: undefined
  })
  every?: MemberWhereInput | undefined;

  @TypeGraphQL.Field(_type => MemberWhereInput, {
    nullable: true,
    description: undefined
  })
  some?: MemberWhereInput | undefined;

  @TypeGraphQL.Field(_type => MemberWhereInput, {
    nullable: true,
    description: undefined
  })
  none?: MemberWhereInput | undefined;
}
