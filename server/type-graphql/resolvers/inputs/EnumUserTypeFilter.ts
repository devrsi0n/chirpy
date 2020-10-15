import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { NestedEnumUserTypeFilter } from "../inputs/NestedEnumUserTypeFilter";
import { UserType } from "../../enums/UserType";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class EnumUserTypeFilter {
  @TypeGraphQL.Field(_type => UserType, {
    nullable: true,
    description: undefined
  })
  equals?: "FREE" | "PRO" | undefined;

  @TypeGraphQL.Field(_type => [UserType], {
    nullable: true,
    description: undefined
  })
  in?: Array<"FREE" | "PRO"> | undefined;

  @TypeGraphQL.Field(_type => [UserType], {
    nullable: true,
    description: undefined
  })
  notIn?: Array<"FREE" | "PRO"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumUserTypeFilter, {
    nullable: true,
    description: undefined
  })
  not?: NestedEnumUserTypeFilter | undefined;
}
