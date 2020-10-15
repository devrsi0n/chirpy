import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserCreateOrConnectWithoutMemberInput } from "../inputs/UserCreateOrConnectWithoutMemberInput";
import { UserCreateWithoutMembersInput } from "../inputs/UserCreateWithoutMembersInput";
import { UserUpdateWithoutMembersDataInput } from "../inputs/UserUpdateWithoutMembersDataInput";
import { UserUpsertWithoutMembersInput } from "../inputs/UserUpsertWithoutMembersInput";
import { UserWhereUniqueInput } from "../inputs/UserWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserUpdateOneRequiredWithoutMembersInput {
  @TypeGraphQL.Field(_type => UserCreateWithoutMembersInput, {
    nullable: true,
    description: undefined
  })
  create?: UserCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field(_type => UserWhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  connect?: UserWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => UserUpdateWithoutMembersDataInput, {
    nullable: true,
    description: undefined
  })
  update?: UserUpdateWithoutMembersDataInput | undefined;

  @TypeGraphQL.Field(_type => UserUpsertWithoutMembersInput, {
    nullable: true,
    description: undefined
  })
  upsert?: UserUpsertWithoutMembersInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOrConnectWithoutMemberInput, {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: UserCreateOrConnectWithoutMemberInput | undefined;
}
