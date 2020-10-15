import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { Team } from "../models/Team";
import { User } from "../models/User";
import { Role } from "../enums/Role";

@TypeGraphQL.ObjectType({
  isAbstract: true,
  description: undefined,
  simpleResolvers: undefined,
})
export class Member {
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  id!: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false,
    description: undefined,
  })
  createdAt!: Date;

  @TypeGraphQL.Field(_type => Date, {
    nullable: false,
    description: undefined,
  })
  updatedAt!: Date;

  user?: User;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  userId!: string;

  team?: Team;

  @TypeGraphQL.Field(_type => String, {
    nullable: false,
    description: undefined,
  })
  teamId!: string;

  @TypeGraphQL.Field(_type => Role, {
    nullable: false,
    description: undefined,
  })
  role!: "USER" | "ADMIN";
}
