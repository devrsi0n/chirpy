import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateOrConnectWithoutMemberInput } from "../inputs/TeamCreateOrConnectWithoutMemberInput";
import { TeamCreateWithoutMembersInput } from "../inputs/TeamCreateWithoutMembersInput";
import { TeamUpdateWithoutMembersDataInput } from "../inputs/TeamUpdateWithoutMembersDataInput";
import { TeamUpsertWithoutMembersInput } from "../inputs/TeamUpsertWithoutMembersInput";
import { TeamWhereUniqueInput } from "../inputs/TeamWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamUpdateOneRequiredWithoutMembersInput {
  @TypeGraphQL.Field(_type => TeamCreateWithoutMembersInput, {
    nullable: true,
    description: undefined
  })
  create?: TeamCreateWithoutMembersInput | undefined;

  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  connect?: TeamWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TeamUpdateWithoutMembersDataInput, {
    nullable: true,
    description: undefined
  })
  update?: TeamUpdateWithoutMembersDataInput | undefined;

  @TypeGraphQL.Field(_type => TeamUpsertWithoutMembersInput, {
    nullable: true,
    description: undefined
  })
  upsert?: TeamUpsertWithoutMembersInput | undefined;

  @TypeGraphQL.Field(_type => TeamCreateOrConnectWithoutMemberInput, {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: TeamCreateOrConnectWithoutMemberInput | undefined;
}
