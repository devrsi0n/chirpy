import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamWhereInput } from "../inputs/TeamWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamRelationFilter {
  @TypeGraphQL.Field(_type => TeamWhereInput, {
    nullable: true,
    description: undefined
  })
  is?: TeamWhereInput | undefined;

  @TypeGraphQL.Field(_type => TeamWhereInput, {
    nullable: true,
    description: undefined
  })
  isNot?: TeamWhereInput | undefined;
}
