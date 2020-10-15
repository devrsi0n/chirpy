import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCreateWithoutMembersInput } from "../inputs/UserCreateWithoutMembersInput";
import { UserUpdateWithoutMembersDataInput } from "../inputs/UserUpdateWithoutMembersDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserUpsertWithoutMembersInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutMembersDataInput, {
    nullable: false,
    description: undefined
  })
  update!: UserUpdateWithoutMembersDataInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutMembersInput, {
    nullable: false,
    description: undefined
  })
  create!: UserCreateWithoutMembersInput;
}
