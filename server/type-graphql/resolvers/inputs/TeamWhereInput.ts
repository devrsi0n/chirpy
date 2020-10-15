import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { MemberListRelationFilter } from "../inputs/MemberListRelationFilter";
import { ProjectListRelationFilter } from "../inputs/ProjectListRelationFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamWhereInput {
  @TypeGraphQL.Field(_type => [TeamWhereInput], {
    nullable: true,
    description: undefined
  })
  AND?: TeamWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TeamWhereInput], {
    nullable: true,
    description: undefined
  })
  OR?: TeamWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [TeamWhereInput], {
    nullable: true,
    description: undefined
  })
  NOT?: TeamWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true,
    description: undefined
  })
  id?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true,
    description: undefined
  })
  createdAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => DateTimeFilter, {
    nullable: true,
    description: undefined
  })
  updatedAt?: DateTimeFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true,
    description: undefined
  })
  name?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => MemberListRelationFilter, {
    nullable: true,
    description: undefined
  })
  members?: MemberListRelationFilter | undefined;

  @TypeGraphQL.Field(_type => ProjectListRelationFilter, {
    nullable: true,
    description: undefined
  })
  project?: ProjectListRelationFilter | undefined;
}
