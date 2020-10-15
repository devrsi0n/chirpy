import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectWhereInput } from "../inputs/ProjectWhereInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectListRelationFilter {
  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true,
    description: undefined
  })
  every?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true,
    description: undefined
  })
  some?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereInput, {
    nullable: true,
    description: undefined
  })
  none?: ProjectWhereInput | undefined;
}
