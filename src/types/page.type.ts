import { Session } from 'next-auth';

import { LayoutProps, WidgetLayoutProps } from '$/components/Layout';

import { Theme } from './theme.type';

export type CommonPageProps = {
  projectId?: string;
  layoutProps?: LayoutProps | WidgetLayoutProps;
  theme?: Theme;
  isWidget?: boolean;
  session?: Session;
};

export type CommonWidgetProps = {
  projectId: string;
  theme?: Theme;
  isWidget?: boolean;
  session?: Session;
};
