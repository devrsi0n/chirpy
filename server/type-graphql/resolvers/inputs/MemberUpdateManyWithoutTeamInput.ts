import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateOrConnectWithoutTeamInput } from "../inputs/MemberCreateOrConnectWithoutTeamInput";
import { MemberCreateWithoutTeamInput } from "../inputs/MemberCreateWithoutTeamInput";
import { MemberScalarWhereInput } from "../inputs/MemberScalarWhereInput";
import { MemberUpdateManyWithWhereNestedInput } from "../inputs/MemberUpdateManyWithWhereNestedInput";
import { MemberUpdateWithWhereUniqueWithoutTeamInput } from "../inputs/MemberUpdateWithWhereUniqueWithoutTeamInput";
import { MemberUpsertWithWhereUniqueWithoutTeamInput } from "../inputs/MemberUpsertWithWhereUniqueWithoutTeamInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpdateManyWithoutTeamInput {
  @TypeGraphQL.Field(_type => [MemberCreateWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  create?: MemberCreateWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  connect?: MemberWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  set?: MemberWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  disconnect?: MemberWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberWhereUniqueInput], {
    nullable: true,
    description: undefined
  })
  delete?: MemberWhereUniqueInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberUpdateWithWhereUniqueWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  update?: MemberUpdateWithWhereUniqueWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberUpdateManyWithWhereNestedInput], {
    nullable: true,
    description: undefined
  })
  updateMany?: MemberUpdateManyWithWhereNestedInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberScalarWhereInput], {
    nullable: true,
    description: undefined
  })
  deleteMany?: MemberScalarWhereInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberUpsertWithWhereUniqueWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  upsert?: MemberUpsertWithWhereUniqueWithoutTeamInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberCreateOrConnectWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: MemberCreateOrConnectWithoutTeamInput[] | undefined;
}
