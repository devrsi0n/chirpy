import type { DehydratedState } from '@tanstack/react-query';
import { Session } from 'next-auth';

import { Theme } from './theme';

export type CommonPageProps = {
  projectId?: string;
  theme?: Theme;
  session?: Session;
  trpcState?: DehydratedState;
};

export type CommonWidgetProps = {
  projectId: string;
  theme?: Theme;
  session?: Session;
  isWidget: true;
  trpcState?: DehydratedState;
};

export type PageProps = CommonPageProps | CommonWidgetProps;
