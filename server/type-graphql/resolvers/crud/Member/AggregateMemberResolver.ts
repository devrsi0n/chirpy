import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateMemberArgs } from "./args/AggregateMemberArgs";
import { Member } from "../../../models/Member";
import { AggregateMember } from "../../outputs/AggregateMember";

@TypeGraphQL.Resolver(_of => Member)
export class AggregateMemberResolver {
  @TypeGraphQL.Query(_returns => AggregateMember, {
    nullable: false,
    description: undefined
  })
  async aggregateMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateMemberArgs): Promise<AggregateMember> {
    function transformFields(fields: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
        Object.entries(fields)
          .filter(([key, value]) => !key.startsWith("_"))
          .map<[string, any]>(([key, value]) => {
            if (Object.keys(value).length === 0) {
              return [key, true];
            }
            return [key, transformFields(value)];
          }),
      );
    }

    return ctx.prisma.member.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
