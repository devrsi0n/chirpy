import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateOrConnectWithoutUserInput } from "../inputs/MemberCreateOrConnectWithoutUserInput";
import { MemberCreateWithoutUserInput } from "../inputs/MemberCreateWithoutUserInput";
import { MemberScalarWhereInput } from "../inputs/MemberScalarWhereInput";
import { MemberUpdateManyWithWhereNestedInput } from "../inputs/MemberUpdateManyWithWhereNestedInput";
import { MemberUpdateWithWhereUniqueWithoutUserInput } from "../inputs/MemberUpdateWithWhereUniqueWithoutUserInput";
import { MemberUpsertWithWhereUniqueWithoutUserInput } from "../inputs/MemberUpsertWithWhereUniqueWithoutUserInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberUpdateManyWithoutUserInput {
  @TypeGraphQL.Field(_type => [MemberCreateWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  create?: MemberCreateWithoutUserInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [MemberUpdateWithWhereUniqueWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  update?: MemberUpdateWithWhereUniqueWithoutUserInput[] | undefined;

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

  @TypeGraphQL.Field(_type => [MemberUpsertWithWhereUniqueWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  upsert?: MemberUpsertWithWhereUniqueWithoutUserInput[] | undefined;

  @TypeGraphQL.Field(_type => [MemberCreateOrConnectWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: MemberCreateOrConnectWithoutUserInput[] | undefined;
}
