import * as TypeGraphQL from "type-graphql";
import graphqlFields from "graphql-fields";
import { GraphQLResolveInfo } from "graphql";
import { AggregateMemberArgs } from "./args/AggregateMemberArgs";
import { CreateMemberArgs } from "./args/CreateMemberArgs";
import { DeleteManyMemberArgs } from "./args/DeleteManyMemberArgs";
import { DeleteMemberArgs } from "./args/DeleteMemberArgs";
import { FindFirstMemberArgs } from "./args/FindFirstMemberArgs";
import { FindManyMemberArgs } from "./args/FindManyMemberArgs";
import { FindOneMemberArgs } from "./args/FindOneMemberArgs";
import { UpdateManyMemberArgs } from "./args/UpdateManyMemberArgs";
import { UpdateMemberArgs } from "./args/UpdateMemberArgs";
import { UpsertMemberArgs } from "./args/UpsertMemberArgs";
import { Member } from "../../../models/Member";
import { AggregateMember } from "../../outputs/AggregateMember";
import { BatchPayload } from "../../outputs/BatchPayload";

@TypeGraphQL.Resolver(_of => Member)
export class MemberCrudResolver {
  @TypeGraphQL.Query(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async member(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindOneMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.findOne(args);
  }

  @TypeGraphQL.Query(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async findFirstMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindFirstMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.findFirst(args);
  }

  @TypeGraphQL.Query(_returns => [Member], {
    nullable: false,
    description: undefined
  })
  async members(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: FindManyMemberArgs): Promise<Member[]> {
    return ctx.prisma.member.findMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: false,
    description: undefined
  })
  async createMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: CreateMemberArgs): Promise<Member> {
    return ctx.prisma.member.create(args);
  }

  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async deleteMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.delete(args);
  }

  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: true,
    description: undefined
  })
  async updateMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateMemberArgs): Promise<Member | null> {
    return ctx.prisma.member.update(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async deleteManyMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: DeleteManyMemberArgs): Promise<BatchPayload> {
    return ctx.prisma.member.deleteMany(args);
  }

  @TypeGraphQL.Mutation(_returns => BatchPayload, {
    nullable: false,
    description: undefined
  })
  async updateManyMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpdateManyMemberArgs): Promise<BatchPayload> {
    return ctx.prisma.member.updateMany(args);
  }

  @TypeGraphQL.Mutation(_returns => Member, {
    nullable: false,
    description: undefined
  })
  async upsertMember(@TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: UpsertMemberArgs): Promise<Member> {
    return ctx.prisma.member.upsert(args);
  }

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
