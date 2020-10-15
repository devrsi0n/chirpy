import * as TypeGraphQL from "type-graphql";
import GraphQLJSON from "graphql-type-json";
import { MemberOrderByInput } from "../../../inputs/MemberOrderByInput";
import { MemberWhereInput } from "../../../inputs/MemberWhereInput";
import { MemberWhereUniqueInput } from "../../../inputs/MemberWhereUniqueInput";
import { MemberDistinctFieldEnum } from "../../../../enums/MemberDistinctFieldEnum";

@TypeGraphQL.ArgsType()
export class FindManyMemberArgs {
  @TypeGraphQL.Field(_type => MemberWhereInput, { nullable: true })
  where?: MemberWhereInput | undefined;

  @TypeGraphQL.Field(_type => [MemberOrderByInput], { nullable: true })
  orderBy?: MemberOrderByInput[] | undefined;

  @TypeGraphQL.Field(_type => MemberWhereUniqueInput, { nullable: true })
  cursor?: MemberWhereUniqueInput | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  take?: number | undefined;

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, { nullable: true })
  skip?: number | undefined;

  @TypeGraphQL.Field(_type => [MemberDistinctFieldEnum], { nullable: true })
  distinct?: Array<"id" | "createdAt" | "updatedAt" | "userId" | "teamId" | "role"> | undefined;
}
