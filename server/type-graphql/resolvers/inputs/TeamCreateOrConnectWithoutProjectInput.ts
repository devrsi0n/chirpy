import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateWithoutProjectInput } from "../inputs/TeamCreateWithoutProjectInput";
import { TeamWhereUniqueInput } from "../inputs/TeamWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamCreateOrConnectWithoutProjectInput {
  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, {
    nullable: false,
    description: undefined
  })
  where!: TeamWhereUniqueInput;

  @TypeGraphQL.Field(_type => TeamCreateWithoutProjectInput, {
    nullable: false,
    description: undefined
  })
  create!: TeamCreateWithoutProjectInput;
}
