import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateWithoutUserInput } from "../inputs/ProjectCreateWithoutUserInput";
import { ProjectUpdateWithoutUserDataInput } from "../inputs/ProjectUpdateWithoutUserDataInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectUpsertWithWhereUniqueWithoutUserInput {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectUpdateWithoutUserDataInput, {
    nullable: false,
    description: undefined
  })
  update!: ProjectUpdateWithoutUserDataInput;

  @TypeGraphQL.Field(_type => ProjectCreateWithoutUserInput, {
    nullable: false,
    description: undefined
  })
  create!: ProjectCreateWithoutUserInput;
}
