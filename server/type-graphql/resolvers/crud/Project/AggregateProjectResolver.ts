import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateProjectArgs } from "./args/AggregateProjectArgs";
import { Project } from "../../../models/Project";
import { AggregateProject } from "../../outputs/AggregateProject";

@TypeGraphQL.Resolver(_of => Project)
export class AggregateProjectResolver {
  @TypeGraphQL.Query(_returns => AggregateProject, {
    nullable: false,
    description: undefined
  })
  async aggregateProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Info() info: GraphQLResolveInfo, @TypeGraphQL.Args() args: AggregateProjectArgs): Promise<AggregateProject> {
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

    return ctx.prisma.project.aggregate({
      ...args,
      ...transformFields(graphqlFields(info as any)),
    });
  }
}
