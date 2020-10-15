import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateManyWithoutTeamInput } from "../inputs/MemberCreateManyWithoutTeamInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamCreateWithoutProjectInput {
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

  @TypeGraphQL.Field(_type => MemberCreateManyWithoutTeamInput, {
    nullable: true,
    description: undefined
  })
  members?: MemberCreateManyWithoutTeamInput | undefined;
}
