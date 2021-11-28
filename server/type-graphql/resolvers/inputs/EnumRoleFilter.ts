import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { NestedEnumRoleFilter } from "../inputs/NestedEnumRoleFilter";
import { Role } from "../../enums/Role";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class EnumRoleFilter {
  @TypeGraphQL.Field(_type => Role, {
    nullable: true,
    description: undefined
  })
  equals?: "USER" | "ADMIN" | undefined;

  @TypeGraphQL.Field(_type => [Role], {
    nullable: true,
    description: undefined
  })
  in?: Array<"USER" | "ADMIN"> | undefined;

  @TypeGraphQL.Field(_type => [Role], {
    nullable: true,
    description: undefined
  })
  notIn?: Array<"USER" | "ADMIN"> | undefined;

  @TypeGraphQL.Field(_type => NestedEnumRoleFilter, {
    nullable: true,
    description: undefined
  })
  not?: NestedEnumRoleFilter | undefined;
}
