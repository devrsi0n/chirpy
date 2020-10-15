import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamUpdateInput } from "../../../inputs/TeamUpdateInput";
import { TeamWhereUniqueInput } from "../../../inputs/TeamWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateTeamArgs {
  @TypeGraphQL.Field(_type => TeamUpdateInput, { nullable: false })
  data!: TeamUpdateInput;

  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, { nullable: false })
  where!: TeamWhereUniqueInput;
}
