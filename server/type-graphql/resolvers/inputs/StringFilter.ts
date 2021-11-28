import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { NestedStringFilter } from "../inputs/NestedStringFilter";
import { QueryMode } from "../../enums/QueryMode";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class StringFilter {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  equals?: string | undefined;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true,
    description: undefined
  })
  in?: string[] | undefined;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true,
    description: undefined
  })
  notIn?: string[] | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  lt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  lte?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  gt?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  gte?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  contains?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  startsWith?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  endsWith?: string | undefined;

  @TypeGraphQL.Field(_type => QueryMode, {
    nullable: true,
    description: undefined
  })
  mode?: "default" | "insensitive" | undefined;

  @TypeGraphQL.Field(_type => NestedStringFilter, {
    nullable: true,
    description: undefined
  })
  not?: NestedStringFilter | undefined;
}
