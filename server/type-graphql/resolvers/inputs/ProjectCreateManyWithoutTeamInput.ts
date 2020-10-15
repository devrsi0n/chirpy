import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateOrConnectWithoutTeamInput } from "../inputs/ProjectCreateOrConnectWithoutTeamInput";
import { ProjectCreateWithoutTeamInput } from "../inputs/ProjectCreateWithoutTeamInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectCreateManyWithoutTeamInput {
  @TypeGraphQL.Field(_type => [ProjectCreateWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  create?: ProjectCreateWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  connect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput[] | undefined;
}
