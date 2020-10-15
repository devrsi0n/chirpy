import * as TypeGraphQL from "type-graphql";

export enum MemberDistinctFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  userId = "userId",
  teamId = "teamId",
  role = "role"
}
TypeGraphQL.registerEnumType(MemberDistinctFieldEnum, {
  name: "MemberDistinctFieldEnum",
  description: undefined,
});
