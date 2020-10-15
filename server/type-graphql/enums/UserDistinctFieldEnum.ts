import * as TypeGraphQL from "type-graphql";

export enum UserDistinctFieldEnum {
  id = "id",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  name = "name",
  email = "email",
  googleUserId = "googleUserId",
  githubUserId = "githubUserId",
  avatar = "avatar",
  type = "type"
}
TypeGraphQL.registerEnumType(UserDistinctFieldEnum, {
  name: "UserDistinctFieldEnum",
  description: undefined,
});
