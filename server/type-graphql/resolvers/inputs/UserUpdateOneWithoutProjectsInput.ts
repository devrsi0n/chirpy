import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCreateOrConnectWithoutProjectInput } from "../inputs/UserCreateOrConnectWithoutProjectInput";
import { UserCreateWithoutProjectsInput } from "../inputs/UserCreateWithoutProjectsInput";
import { UserUpdateWithoutProjectsDataInput } from "../inputs/UserUpdateWithoutProjectsDataInput";
import { UserUpsertWithoutProjectsInput } from "../inputs/UserUpsertWithoutProjectsInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserUpdateOneWithoutProjectsInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutProjectsInput, {
    nullable: true,
    description: undefined
  })
  create?: UserCreateWithoutProjectsInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true,
    description: undefined
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true,
    description: undefined
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutProjectsDataInput, {
    nullable: true,
    description: undefined
  })
  update?: UserUpdateWithoutProjectsDataInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutProjectsInput, {
    nullable: true,
    description: undefined
  })
  upsert?: UserUpsertWithoutProjectsInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutProjectInput, {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: UserCreateOrConnectWithoutProjectInput | undefined;
}
