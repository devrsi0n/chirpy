import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateOneWithoutMembersInput } from "../inputs/TeamCreateOneWithoutMembersInput";
import { UserCreateOneWithoutMembersInput } from "../inputs/UserCreateOneWithoutMembersInput";
import { Role } from "../../enums/Role";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberCreateInput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  id?: string | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true,
    description: undefined
  })
  createdAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true,
    description: undefined
  })
  updatedAt?: Date | undefined;

  @TypeGraphQL.Field(_type => Role, {
    nullable: true,
    description: undefined
  })
  role?: "USER" | "ADMIN" | undefined;

  @TypeGraphQL.Field(_type => UserCreateOneWithoutMembersInput, {
    nullable: false,
    description: undefined
  })
  user!: UserCreateOneWithoutMembersInput;

  @TypeGraphQL.Field(_type => TeamCreateOneWithoutMembersInput, {
    nullable: false,
    description: undefined
  })
  team!: TeamCreateOneWithoutMembersInput;
}
