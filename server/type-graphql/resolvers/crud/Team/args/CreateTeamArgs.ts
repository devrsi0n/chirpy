import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamCreateInput } from "../../../inputs/TeamCreateInput";

@TypeGraphQL.ArgsType()
export class CreateTeamArgs {
  @TypeGraphQL.Field(_type => TeamCreateInput, { nullable: false })
  data!: TeamCreateInput;
}
