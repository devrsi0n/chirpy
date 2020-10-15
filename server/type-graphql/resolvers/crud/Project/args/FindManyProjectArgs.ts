import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectOrderByInput } from "../../../inputs/ProjectOrderByInput";
import { ProjectWhereInput } from "../../../inputs/ProjectWhereInput";
import { ProjectWhereUniqueInput } from "../../../inputs/ProjectWhereUniqueInput";
import { ProjectDistinctFieldEnum } from "../../../../enums/ProjectDistinctFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereInput, { nullable: true })
  where?: ProjectWhereInput | undefined;

  @TypeGraphQL.Field(_type => [ProjectOrderByInput], { nullable: true })
  orderBy?: ProjectOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, { nullable: true })
  cursor?: ProjectWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [ProjectDistinctFieldEnum], { nullable: true })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "name" | "teamId" | "userId"> | undefined;
}
