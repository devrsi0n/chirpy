import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCreateWithoutProjectsInput } from "../inputs/UserCreateWithoutProjectsInput";
import { UserUpdateWithoutProjectsDataInput } from "../inputs/UserUpdateWithoutProjectsDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserUpsertWithoutProjectsInput {
  @TypeGraphQL.Field(_type => UserUpdateWithoutProjectsDataInput, {
    nullable: false,
    description: undefined
  })
  update!: UserUpdateWithoutProjectsDataInput;

  @TypeGraphQL.Field(_type => UserCreateWithoutProjectsInput, {
    nullable: false,
    description: undefined
  })
  create!: UserCreateWithoutProjectsInput;
}
