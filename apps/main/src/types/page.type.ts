import { Session } from 'next-auth';

import { SSRData } from '$/lib/gql-client';

import { Theme } from './theme.type';

export type CommonPageProps = {
  projectId?: string;
  theme?: Theme;

  session?: Session;
};

export type CommonWidgetProps = {
  projectId: string;
  isWidget: true;
  theme?: Theme;
  session?: Session;
  urqlState?: SSRData;
};
