import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamUpdateManyMutationInput } from "../../../inputs/TeamUpdateManyMutationInput";
import { TeamWhereInput } from "../../../inputs/TeamWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyTeamArgs {
  @TypeGraphQL.Field(_type => TeamUpdateManyMutationInput, { nullable: false })
  data!: TeamUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => TeamWhereInput, { nullable: true })
  where?: TeamWhereInput | undefined;
}
