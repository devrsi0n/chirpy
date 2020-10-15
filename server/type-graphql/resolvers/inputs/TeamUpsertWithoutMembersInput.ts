import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateWithoutMembersInput } from "../inputs/TeamCreateWithoutMembersInput";
import { TeamUpdateWithoutMembersDataInput } from "../inputs/TeamUpdateWithoutMembersDataInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamUpsertWithoutMembersInput {
  @TypeGraphQL.Field(_type => TeamUpdateWithoutMembersDataInput, {
    nullable: false,
    description: undefined
  })
  update!: TeamUpdateWithoutMembersDataInput;

  @TypeGraphQL.Field(_type => TeamCreateWithoutMembersInput, {
    nullable: false,
    description: undefined
  })
  create!: TeamCreateWithoutMembersInput;
}
