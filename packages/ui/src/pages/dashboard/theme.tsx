import { RouterOutputs } from '@chirpy-dev/trpc/src/client';
import { Theme as ThemeType } from '@chirpy-dev/types';

import {
  CommentWidgetPreviewProps,
  SiteLayout,
  THEME_WIDGET_CLS,
  ThemeEditor,
} from '../../blocks';
import { WidgetThemeProvider } from '../../contexts';

export type ThemeProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
  username: string;
} & Pick<CommentWidgetPreviewProps, 'buildDate'>;

export function ThemePage({
  project,
  buildDate,
  username,
}: ThemeProps): JSX.Element {
  return (
    <SiteLayout
      title={project?.name || 'Theme'}
      styles={{
        container: `!grid-cols-[1fr_min(105ch,calc(100%-32px))_1fr]`,
      }}
    >
      <WidgetThemeProvider
        widgetTheme={project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        <ThemeEditor
          username={username}
          project={project}
          buildDate={buildDate}
        />
      </WidgetThemeProvider>
    </SiteLayout>
  );
}
