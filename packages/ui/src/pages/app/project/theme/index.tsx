import { Theme as ThemeType } from '@chirpy-dev/types';
import { DehydratedState } from '@tanstack/react-query';

import {
  ThemeEditor,
  ThemeEditorProps,
  THEME_WIDGET_CLS,
} from '../../../../blocks';
import { WidgetThemeProvider } from '../../../../contexts';
import { trpcClient } from '../../../../utilities/trpc-client';
import { AppLayout } from '../../components/app-layout';

export type ProjectThemeProps = {
  trpcState: DehydratedState;
  domain: string;
} & Pick<ThemeEditorProps, 'buildDate'>;

export function ProjectThemePage(props: ProjectThemeProps): JSX.Element {
  const { data: project } = trpcClient.project.byDomain.useQuery(props.domain);
  return (
    <AppLayout title={project?.name || 'Theme'}>
      <WidgetThemeProvider
        widgetTheme={project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        <ThemeEditor project={project!} buildDate={props.buildDate} />
      </WidgetThemeProvider>
    </AppLayout>
  );
}
