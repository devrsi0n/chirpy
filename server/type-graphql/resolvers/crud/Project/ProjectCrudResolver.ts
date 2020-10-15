import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateProjectArgs } from "./args/AggregateProjectArgs";
import { CreateProjectArgs } from "./args/CreateProjectArgs";
import { DeleteManyProjectArgs } from "./args/DeleteManyProjectArgs";
import { DeleteProjectArgs } from "./args/DeleteProjectArgs";
import { FindFirstProjectArgs } from "./args/FindFirstProjectArgs";
import { FindManyProjectArgs } from "./args/FindManyProjectArgs";
import { FindOneProjectArgs } from "./args/FindOneProjectArgs";
import { UpdateManyProjectArgs } from "./args/UpdateManyProjectArgs";
import { UpdateProjectArgs } from "./args/UpdateProjectArgs";
import { UpsertProjectArgs } from "./args/UpsertProjectArgs";
import { Project } from "../../../models/Project";
import { AggregateProject } from "../../outputs/AggregateProject";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Project)
export class ProjectCrudResolver {
  @TypeGraphQL.Query(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async project(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.findOne(args);
  }

  @TypeGraphQL.Query(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async findFirstProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Project], {
    nullable: false,
    description: undefined
  })
  async projects(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyProjectArgs): Promise<Project[]> {
    return ctx.prisma.project.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: false,
    description: undefined
  })
  async createProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateProjectArgs): Promise<Project> {
    return ctx.prisma.project.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async deleteProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: true,
    description: undefined
  })
  async updateProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateProjectArgs): Promise<Project | null> {
    return ctx.prisma.project.update(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyProjectArgs): Promise<BatchPayload> {
    return ctx.prisma.project.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyProjectArgs): Promise<BatchPayload> {
    return ctx.prisma.project.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Project, {
    nullable: false,
    description: undefined
  })
  async upsertProject(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertProjectArgs): Promise<Project> {
    return ctx.prisma.project.upsert(args);
  }

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
