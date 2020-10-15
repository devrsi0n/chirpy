import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateWithoutTeamInput } from "../inputs/ProjectCreateWithoutTeamInput";
import { ProjectUpdateWithoutTeamDataInput } from "../inputs/ProjectUpdateWithoutTeamDataInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectUpsertWithWhereUniqueWithoutTeamInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutTeamDataInput, {
    nullable: false,
    description: undefined
  })
  update!: ProjectUpdateWithoutTeamDataInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutTeamInput, {
    nullable: false,
    description: undefined
  })
  create!: ProjectCreateWithoutTeamInput;
}
