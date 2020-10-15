import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { DateTimeFilter } from "../inputs/DateTimeFilter";
import { EnumRoleFilter } from "../inputs/EnumRoleFilter";
import { StringFilter } from "../inputs/StringFilter";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberScalarWhereInput {
  @TypeGraphQL.Field(_type => [MemberScalarWhereInput], {
    nullable: true,
    description: undefined
  })
  AND?: MemberScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberScalarWhereInput], {
    nullable: true,
    description: undefined
  })
  OR?: MemberScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberScalarWhereInput], {
    nullable: true,
    description: undefined
  })
  NOT?: MemberScalarWhereInput[] | undefined;

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
  userId?: StringFilter | undefined;

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
