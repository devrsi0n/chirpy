import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectWhereUniqueInput } from "../../../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.ArgsType()
export class DeleteProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereUniqueInput, { nullable: false })
  where!: ProjectWhereUniqueInput;
}
