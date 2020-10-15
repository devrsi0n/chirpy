import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateManyWithoutUserInput } from "../inputs/ProjectCreateManyWithoutUserInput";
import { UserType } from "../../enums/UserType";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class UserCreateWithoutMembersInput {
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

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined
  })
  email!: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  googleUserId?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  githubUserId?: string | undefined;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
    description: undefined
  })
  avatar?: string | undefined;

  @TypeGraphQL.Field(_type => UserType, {
    nullable: true,
    description: undefined
  })
  type?: "FREE" | "PRO" | undefined;

  @TypeGraphQL.Field(_type => ProjectCreateManyWithoutUserInput, {
    nullable: true,
    description: undefined
  })
  projects?: ProjectCreateManyWithoutUserInput | undefined;
}
