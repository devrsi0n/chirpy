import { ThemeProjectByPkQuery } from '@chirpy-dev/graphql';
import { Theme as ThemeType } from 'types';
import {
  SiteLayout,
  ThemeEditor,
  ThemeEditorProps,
  THEME_WIDGET_CLS,
} from '../../blocks';
import { WidgetThemeProvider } from '../../contexts';

export type ThemeProps = {
  project: ThemeProjectByPkQuery['projects'][0];
} & Pick<ThemeEditorProps, 'buildDate'>;

export function ThemePage(props: ThemeProps): JSX.Element {
  return (
    <SiteLayout
      title={props.project?.name || 'Theme'}
      styles={{
        container: `!grid-cols-[1fr_min(105ch,calc(100%-32px))_1fr]`,
      }}
    >
      <WidgetThemeProvider
        widgetTheme={props.project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        <ThemeEditor {...props} />
      </WidgetThemeProvider>
    </SiteLayout>
  );
}
