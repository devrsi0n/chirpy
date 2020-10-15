import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectScalarWhereInput } from "../inputs/ProjectScalarWhereInput";
import { ProjectUpdateManyDataInput } from "../inputs/ProjectUpdateManyDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectUpdateManyWithWhereNestedInput {
  @TypeGraphQL.Field(_type => ProjectScalarWhereInput, {
    nullable: false,
    description: undefined
  })
  where!: ProjectScalarWhereInput;

  @TypeGraphQL.Field(_type => ProjectUpdateManyDataInput, {
    nullable: false,
    description: undefined
  })
  data!: ProjectUpdateManyDataInput;
}
