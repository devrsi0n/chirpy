import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumRoleFilter } from "../inputs/EnumRoleFilter";
import { StringFilter } from "../inputs/StringFilter";
import { TeamRelationFilter } from "../inputs/TeamRelationFilter";
import { UserRelationFilter } from "../inputs/UserRelationFilter";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberWhereInput {
  @TypeGraphQL.Field(_type => [MemberWhereInput], {
    nullable: true,
    description: undefined
  })
  AND?: MemberWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereInput], {
    nullable: true,
    description: undefined
  })
  OR?: MemberWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereInput], {
    nullable: true,
    description: undefined
  })
  NOT?: MemberWhereInput[] | undefined;

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

  @TypeGraphQL.Field(_type => UserRelationFilter, {
    nullable: true,
    description: undefined
  })
  user?: UserRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true,
    description: undefined
  })
  userId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => TeamRelationFilter, {
    nullable: true,
    description: undefined
  })
  team?: TeamRelationFilter | undefined;

  @TypeGraphQL.Field(_type => StringFilter, {
    nullable: true,
    description: undefined
  })
  teamId?: StringFilter | undefined;

  @TypeGraphQL.Field(_type => EnumRoleFilter, {
    nullable: true,
    description: undefined
  })
  role?: EnumRoleFilter | undefined;
}
