import * as TypeGraphQL from "type-graphql";
import { Member } from "../../../models/Member";
import { Project } from "../../../models/Project";
import { Team } from "../../../models/Team";
import { TeamMembersArgs } from "./args/TeamMembersArgs";
import { TeamProjectArgs } from "./args/TeamProjectArgs";

@TypeGraphQL.Resolver(_of => Team)
export class TeamRelationsResolver {
  @TypeGraphQL.FieldResolver(_type => [Member], {
    nullable: true,
    description: undefined,
  })
  async members(@TypeGraphQL.Root() team: Team, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TeamMembersArgs): Promise<Member[] | null> {
    return ctx.prisma.team.findOne({
      where: {
        id: team.id,
      },
    }).members(args);
  }

  @TypeGraphQL.FieldResolver(_type => [Project], {
    nullable: true,
    description: undefined,
  })
  async project(@TypeGraphQL.Root() team: Team, @TypeGraphQL.Ctx() ctx: any, @TypeGraphQL.Args() args: TeamProjectArgs): Promise<Project[] | null> {
    return ctx.prisma.team.findOne({
      where: {
        id: team.id,
      },
    }).project(args);
  }
}
