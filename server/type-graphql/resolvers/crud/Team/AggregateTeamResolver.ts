import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateTeamArgs } from "./args/AggregateTeamArgs";
import { Team } from "../../../models/Team";
import { AggregateTeam } from "../../outputs/AggregateTeam";

@TypeGraphQL.Resolver(_of => Team)
export class AggregateTeamResolver {
  @TypeGraphQL.Query(_returns => AggregateTeam, {
    nullable: false,
    description: undefined
  })
  async aggregateTeam(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateTeamArgs): Promise<AggregateTeam> {
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

    return ctx.prisma.team.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
