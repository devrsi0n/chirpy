import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateWithoutProjectInput } from "../inputs/TeamCreateWithoutProjectInput";
import { TeamUpdateWithoutProjectDataInput } from "../inputs/TeamUpdateWithoutProjectDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamUpsertWithoutProjectInput {
  @TypeGraphQL.Field(_type => TeamUpdateWithoutProjectDataInput, {
    nullable: false,
    description: undefined
  })
  update!: TeamUpdateWithoutProjectDataInput;

  @TypeGraphQL.Field(_type => TeamCreateWithoutProjectInput, {
    nullable: false,
    description: undefined
  })
  create!: TeamCreateWithoutProjectInput;
}
