import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectWhereInput } from "../../../inputs/ProjectWhereInput";

@TypeGraphQL.ArgsType()
export class DeleteManyProjectArgs {
  @TypeGraphQL.Field(_type => ProjectWhereInput, { nullable: true })
  where?: ProjectWhereInput | undefined;
}
