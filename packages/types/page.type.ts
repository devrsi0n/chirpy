import { Session } from 'next-auth';

import { Theme } from './theme.type';

export type CommonPageProps = {
  projectId?: string;
  theme?: Theme;

  session?: Session;
};

export type CommonWidgetProps = {
  projectId: string;
  theme?: Theme;
  session?: Session;
  isWidget: true;
};
