import * as TypeGraphQL from "type-graphql";

export enum ProjectDistinctFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  name = "name",
  teamId = "teamId",
  userId = "userId"
}
TypeGraphQL.registerEnumType(ProjectDistinctFieldEnum, {
  name: "ProjectDistinctFieldEnum",
  description: undefined,
});
