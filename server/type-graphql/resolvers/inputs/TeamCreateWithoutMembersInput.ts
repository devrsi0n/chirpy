import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateManyWithoutTeamInput } from "../inputs/ProjectCreateManyWithoutTeamInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamCreateWithoutMembersInput {
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

  @TypeGraphQL.Field(_type => ProjectCreateManyWithoutTeamInput, {
    nullable: true,
    description: undefined
  })
  project?: ProjectCreateManyWithoutTeamInput | undefined;
}
