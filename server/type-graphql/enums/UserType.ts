import * as TypeGraphQL from "type-graphql";

export enum UserType {
  FREE = "FREE",
  PRO = "PRO"
}
TypeGraphQL.registerEnumType(UserType, {
  name: "UserType",
  description: undefined,
});
