import { asNexusMethod, makeSchema } from '@nexus/schema';
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema';
import { GraphQLDate } from 'graphql-iso-date';

import { User } from './types/user';
import { Team } from './types/team';
import { Project } from './types/project';
import { Member } from './types/member';
import { isENVProd } from './utilities/env';
import { Query } from './types/query';
import { Mutation } from './types/mutation';

export const GQLDate = asNexusMethod(GraphQLDate, 'date');

export const schema = makeSchema({
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
  outputs: {
    typegen: process.cwd() + '/nexus-typegen/index.d.ts',
    schema: process.cwd() + '/api.graphql',
  },
  shouldGenerateArtifacts: !isENVProd,
  shouldExitAfterGenerateArtifacts: Boolean(process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION),
  plugins: [nexusSchemaPrisma({ experimentalCRUD: true })],
  types: [GQLDate, User, Team, Project, Member, Query, Mutation],
  prettierConfig: process.cwd() + '/.prettierrc',
});
