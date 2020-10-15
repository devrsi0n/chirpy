import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { ProjectUpdateManyMutationInput } from "../../../inputs/ProjectUpdateManyMutationInput";
import { ProjectWhereInput } from "../../../inputs/ProjectWhereInput";

@TypeGraphQL.ArgsType()
export class UpdateManyProjectArgs {
  @TypeGraphQL.Field(_type => ProjectUpdateManyMutationInput, { nullable: false })
  data!: ProjectUpdateManyMutationInput;

  @TypeGraphQL.Field(_type => ProjectWhereInput, { nullable: true })
  where?: ProjectWhereInput | undefined;
}
