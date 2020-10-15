import * as TypeGraphQL from "type-graphql";

export enum TeamDistinctFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  name = "name"
}
TypeGraphQL.registerEnumType(TeamDistinctFieldEnum, {
  name: "TeamDistinctFieldEnum",
  description: undefined,
});
