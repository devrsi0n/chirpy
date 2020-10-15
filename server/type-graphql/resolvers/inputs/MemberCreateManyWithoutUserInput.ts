import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { MemberCreateOrConnectWithoutUserInput } from "../inputs/MemberCreateOrConnectWithoutUserInput";
import { MemberCreateWithoutUserInput } from "../inputs/MemberCreateWithoutUserInput";
import { MemberWhereUniqueInput } from "../inputs/MemberWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class MemberCreateManyWithoutUserInput {
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

  @TypeGraphQL.Field(_type => [MemberCreateOrConnectWithoutUserInput], {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: MemberCreateOrConnectWithoutUserInput[] | undefined;
}
