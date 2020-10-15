import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateOrConnectWithoutTeamInput } from "../inputs/MemberCreateOrConnectWithoutTeamInput";
import { MemberCreateWithoutTeamInput } from "../inputs/MemberCreateWithoutTeamInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberCreateManyWithoutTeamInput {
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

  @TypeGraphQL.Field(_type => [MemberCreateOrConnectWithoutTeamInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: MemberCreateOrConnectWithoutTeamInput[] | undefined;
}
