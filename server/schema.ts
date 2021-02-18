import * as path from 'path';
import { asNexusMethod, makeSchema } from 'nexus';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { GraphQLDate } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';

import { User } from './schema/user';
import { Team } from './schema/team';
import { Project } from './schema/project';
import { Member } from './schema/member';
import { isENVDev, isENVProd } from './utilities/env';
import { Query } from './schema/query';
import { Mutation } from './schema/mutation';
import { Page } from './schema/page';
import { Comment } from './schema/comment';
import { Like } from './schema/like';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

export const schema = makeSchema({
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index'),
        alias: 'prisma',
      },
    ],
    debug: isENVDev,
  },
  contextType: {
    module: path.resolve(require.resolve('./context')),
    export: 'Context',
  },
  outputs: {
    typegen: process.cwd() + '/nexus-typegen/index.d.ts',
    schema: process.cwd() + '/api.graphql',
  },
  shouldGenerateArtifacts: !isENVProd,
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  types: [GQLDate, GraphQLJSON, User, Team, Project, Member, Page, Comment, Like, Query, Mutation],
  prettierConfig: process.cwd() + '/.prettierrc',
});
