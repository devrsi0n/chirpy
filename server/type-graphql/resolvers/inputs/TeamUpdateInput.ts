import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { JsonValue, InputJsonValue } from "@prisma/client";
import { DateTimeFieldUpdateOperationsInput } from "../inputs/DateTimeFieldUpdateOperationsInput";
import { MemberUpdateManyWithoutTeamInput } from "../inputs/MemberUpdateManyWithoutTeamInput";
import { ProjectUpdateManyWithoutTeamInput } from "../inputs/ProjectUpdateManyWithoutTeamInput";
import { StringFieldUpdateOperationsInput } from "../inputs/StringFieldUpdateOperationsInput";

@TypeGraphQL.InputType({
  isAbstract: true,
  description: undefined,
})
export class TeamUpdateInput {
  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true,
    description: undefined
  })
  id?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
    description: undefined
  })
  createdAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => DateTimeFieldUpdateOperationsInput, {
    nullable: true,
    description: undefined
  })
  updatedAt?: DateTimeFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => StringFieldUpdateOperationsInput, {
    nullable: true,
    description: undefined
  })
  name?: StringFieldUpdateOperationsInput | undefined;

  @TypeGraphQL.Field(_type => MemberUpdateManyWithoutTeamInput, {
    nullable: true,
    description: undefined
  })
  members?: MemberUpdateManyWithoutTeamInput | undefined;

  @TypeGraphQL.Field(_type => ProjectUpdateManyWithoutTeamInput, {
    nullable: true,
    description: undefined
  })
  project?: ProjectUpdateManyWithoutTeamInput | undefined;
}
