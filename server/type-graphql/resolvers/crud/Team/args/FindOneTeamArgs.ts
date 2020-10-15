import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamWhereUniqueInput } from "../../../inputs/TeamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class FindOneTeamArgs {
  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
}
