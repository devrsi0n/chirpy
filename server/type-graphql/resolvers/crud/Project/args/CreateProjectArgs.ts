import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectCreateInput } from "../../../inputs/ProjectCreateInput";

@TypeGraphQL.ArgsType()
export class CreateProjectArgs {
  @TypeGraphQL.Field(_type => ProjectCreateInput, { nullable: false })
  data!: ProjectCreateInput;
}
