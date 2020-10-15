import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectCreateInput } from "../../../inputs/ProjectCreateInput";
import { ProjectUpdateInput } from "../../../inputs/ProjectUpdateInput";
import { ProjectWhereUniqueInput } from "../../../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpsertProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;

  @TypeGraphQL.Field(_type => ProjectCreateInput, { nullable: false })
  create!: ProjectCreateInput;

  @TypeGraphQL.Field(_type => ProjectUpdateInput, { nullable: false })
  update!: ProjectUpdateInput;
}
