import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateOneWithoutProjectInput } from "../inputs/TeamCreateOneWithoutProjectInput";
import { UserCreateOneWithoutProjectsInput } from "../inputs/UserCreateOneWithoutProjectsInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectCreateInput {
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

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined
  })
  name!: string;

  @TypeGraphQL.Field(_type => TeamCreateOneWithoutProjectInput, {
    nullable: true,
    description: undefined
  })
  team?: TeamCreateOneWithoutProjectInput | undefined;

  @TypeGraphQL.Field(_type => UserCreateOneWithoutProjectsInput, {
    nullable: true,
    description: undefined
  })
  User?: UserCreateOneWithoutProjectsInput | undefined;
}
