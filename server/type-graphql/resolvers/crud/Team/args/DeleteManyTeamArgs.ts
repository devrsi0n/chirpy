import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamWhereInput } from "../../../inputs/TeamWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyTeamArgs {
  @TypeGraphQL.Field(_type => TeamWhereInput, { nullable: true })
  where?: TeamWhereInput | undefined;
}
