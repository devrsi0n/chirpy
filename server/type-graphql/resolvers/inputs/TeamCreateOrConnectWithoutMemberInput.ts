import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateWithoutMembersInput } from "../inputs/TeamCreateWithoutMembersInput";
import { TeamWhereUniqueInput } from "../inputs/TeamWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamCreateOrConnectWithoutMemberInput {
  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: TeamWhereUniqueInput;

  @TypeGraphQL.Field(_type => TeamCreateWithoutMembersInput, {
    nullable: false,
    description: undefined
  })
  create!: TeamCreateWithoutMembersInput;
}
