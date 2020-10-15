import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { TeamCreateOrConnectWithoutProjectInput } from "../inputs/TeamCreateOrConnectWithoutProjectInput";
import { TeamCreateWithoutProjectInput } from "../inputs/TeamCreateWithoutProjectInput";
import { TeamUpdateWithoutProjectDataInput } from "../inputs/TeamUpdateWithoutProjectDataInput";
import { TeamUpsertWithoutProjectInput } from "../inputs/TeamUpsertWithoutProjectInput";
import { TeamWhereUniqueInput } from "../inputs/TeamWhereUniqueInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamUpdateOneWithoutProjectInput {
  @TypeGraphQL.Field(_type => TeamCreateWithoutProjectInput, {
    nullable: true,
    description: undefined
  })
  create?: TeamCreateWithoutProjectInput | undefined;

  @TypeGraphQL.Field(_type => TeamWhereUniqueInput, {
    nullable: true,
    description: undefined
  })
  connect?: TeamWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true,
    description: undefined
  })
  disconnect?: boolean | undefined;

  @TypeGraphQL.Field(_type => Boolean, {
    nullable: true,
    description: undefined
  })
  delete?: boolean | undefined;

  @TypeGraphQL.Field(_type => TeamUpdateWithoutProjectDataInput, {
    nullable: true,
    description: undefined
  })
  update?: TeamUpdateWithoutProjectDataInput | undefined;

  @TypeGraphQL.Field(_type => TeamUpsertWithoutProjectInput, {
    nullable: true,
    description: undefined
  })
  upsert?: TeamUpsertWithoutProjectInput | undefined;

  @TypeGraphQL.Field(_type => TeamCreateOrConnectWithoutProjectInput, {
    nullable: true,
    description: undefined
  })
  connectOrCreate?: TeamCreateOrConnectWithoutProjectInput | undefined;
}
