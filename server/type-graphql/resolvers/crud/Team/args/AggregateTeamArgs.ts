import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { TeamOrderByInput } from "../../../inputs/TeamOrderByInput";
import { TeamWhereInput } from "../../../inputs/TeamWhereInput";
import { TeamWhereUniqueInput } from "../../../inputs/TeamWhereUniqueInput";
import { TeamDistinctFieldEnum } from "../../../../enums/TeamDistinctFieldEnum";

@TypeGraphQL.ArgsType()
export class AggregateTeamArgs {
  @TypeGraphQL.Field(_type => TeamWhereInput, { nullable: true })
  where?: TeamWhereInput | undefined;

  @TypeGraphQL.Field(_type => [TeamOrderByInput], { nullable: true })
  orderBy?: TeamOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, { nullable: true })
  cursor?: TeamWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [TeamDistinctFieldEnum], { nullable: true })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "name"> | undefined;
}
