import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectUpdateInput } from "../../../inputs/ProjectUpdateInput";
import { ProjectWhereUniqueInput } from "../../../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class UpdateProjectArgs {
  @TypeGraphQL.Field(_type => ProjectUpdateInput, { nullable: false })
  data!: ProjectUpdateInput;

  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;
}
