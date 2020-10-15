import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateOrConnectWithoutTeamInput } from "../inputs/ProjectCreateOrConnectWithoutTeamInput";
import { ProjectCreateWithoutTeamInput } from "../inputs/ProjectCreateWithoutTeamInput";
import { ProjectScalarWhereInput } from "../inputs/ProjectScalarWhereInput";
import { ProjectUpdateManyWithWhereNestedInput } from "../inputs/ProjectUpdateManyWithWhereNestedInput";
import { ProjectUpdateWithWhereUniqueWithoutTeamInput } from "../inputs/ProjectUpdateWithWhereUniqueWithoutTeamInput";
import { ProjectUpsertWithWhereUniqueWithoutTeamInput } from "../inputs/ProjectUpsertWithWhereUniqueWithoutTeamInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectUpdateManyWithoutTeamInput {
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

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  set?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  disconnect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  delete?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpdateWithWhereUniqueWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  update?: ProjectUpdateWithWhereUniqueWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpdateManyWithWhereNestedInput], {
    nullable: true,
    description: undefined
  })
  updateMany?: ProjectUpdateManyWithWhereNestedInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectScalarWhereInput], {
    nullable: true,
    description: undefined
  })
  deleteMany?: ProjectScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectUpsertWithWhereUniqueWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  upsert?: ProjectUpsertWithWhereUniqueWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutTeamInput[] | undefined;
}
