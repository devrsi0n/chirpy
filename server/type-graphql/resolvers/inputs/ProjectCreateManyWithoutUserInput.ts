import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { ProjectCreateOrConnectWithoutUserInput } from "../inputs/ProjectCreateOrConnectWithoutUserInput";
import { ProjectCreateWithoutUserInput } from "../inputs/ProjectCreateWithoutUserInput";
import { ProjectWhereUniqueInput } from "../inputs/ProjectWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class ProjectCreateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [ProjectCreateWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  create?: ProjectCreateWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  connect?: ProjectWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [ProjectCreateOrConnectWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: ProjectCreateOrConnectWithoutUserInput[] | undefined;
}
