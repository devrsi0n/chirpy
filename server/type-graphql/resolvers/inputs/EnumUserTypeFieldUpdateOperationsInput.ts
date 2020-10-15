import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { UserType } from "../../enums/UserType";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class EnumUserTypeFieldUpdateOperationsInput {
  @TypeGraphQL.Field(_type => UserType, {
    nullable: true,
    description: undefined
  })
  set?: "FREE" | "PRO" | undefined;
}
