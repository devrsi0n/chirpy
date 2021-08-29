import { Session } from 'next-auth';

import { LayoutProps, WidgetLayoutProps } from '$/components/Layout';

import { Theme } from './theme.type';

export type CommonPageProps = {
  layoutProps?: LayoutProps | WidgetLayoutProps;
  theme?: Theme;
  isWidget?: boolean;
  projectId?: string;
  session?: Session;
};
