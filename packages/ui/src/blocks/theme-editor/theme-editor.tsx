import { useUpdateThemeMutation } from '@chirpy-dev/graphql';
import { ThemeProjectByPkQuery } from '@chirpy-dev/graphql';
import clsx from 'clsx';

import { PageTitle } from '../../blocks/page-title';
import { Alert } from '../../components/alert';
import { Heading, IHeadingProps } from '../../components/heading';
import { Text } from '../../components/text';
import { useToast } from '../../components/toast';
import { useWidgetTheme } from '../../contexts/theme-context';
import { getColorFromCssVariable } from '../../utilities';
import { logger } from '../../utilities/logger';
import { mergeDeep } from '../../utilities/object';
import {
  CommentWidgetPreview,
  CommentWidgetPreviewProps,
} from '../comment-widget-preview';
import { ThemeSelect } from '../theme-select';
import { ColorPicker, ColorSeriesPicker } from './color-picker';
import { COLOR_OPTIONS, useColors } from './colors';
import { revalidateProjectPages } from './utilities';

export const THEME_WIDGET_CLS = 'theme-widget';

export type ThemeEditorProps = {
  project: ThemeProjectByPkQuery['projects'][number];
} & Pick<CommentWidgetPreviewProps, 'buildDate'>;

export function ThemeEditor(props: ThemeEditorProps): JSX.Element {
  const { widgetTheme, setWidgetTheme } = useWidgetTheme();

  const [{}, updateTheme] = useUpdateThemeMutation();
  const { showToast } = useToast();
  const handClickPrimaryColorFunction = async (colorKey: string) => {
    const colorSeries = COLOR_OPTIONS[colorKey];
    const newTheme = mergeDeep(widgetTheme || {}, {
      colors: {
        light: { primary: colorSeries.light },
        dark: { primary: colorSeries.dark },
      },
    });
    setWidgetTheme(newTheme);
    try {
      await updateTheme({
        projectId: props.project.id,
        theme: newTheme,
      });
      await revalidateProjectPages(props.project.id, props.project.domain);
      showToast({
        type: 'info',
        title: 'Theme has been saved',
      });
    } catch (error) {
      logger.warn(`Save theme pages failed`, error);
      showToast({
        type: 'error',
        title: 'Save theme failed',
      });
    }
  };
  const primaryColorOptions = useColors({ level: 900 });

  return (
    <section className="px-2">
      <PageTitle className="mb-10">Theme of {props.project?.name}</PageTitle>
      <div className={`flex flex-col sm:flex-row ${THEME_WIDGET_CLS}`}>
        <aside className="flex-1 space-y-11 sm:pr-4">
          <div className="space-y-6">
            <BoldHeading as="h4">Theme Editor</BoldHeading>
            <Text variant="secondary">
              Click to change variants then we will save your theme
              automatically.
            </Text>
          </div>
          <div className="space-y-2">
            <Text variant="secondary">Try your theme with different modes</Text>
            <ThemeSelect />
          </div>
          <div className="space-y-6">
            <BoldHeading>Colors</BoldHeading>
            <ColorSeriesPicker
              label="Primary"
              colorOptions={primaryColorOptions}
              onSelectColor={handClickPrimaryColorFunction}
              styles={{ triggerButton: 'bg-primary-900' }}
            />
            <ColorPicker
              label="Background"
              hintText="You may save a color for dark mode as well"
              value={getColorFromCssVariable('--tw-colors-bg')}
              onSelectColor={(color) => {
                console.log({ color });
              }}
            />
          </div>
        </aside>
        <div role="separator" className="my-6 border-b sm:mx-4 sm:border-r" />
        <section className="flex-2 sm:pl-6">
          <div className="mb-4 space-y-5">
            <BoldHeading as="h4">Preview</BoldHeading>
            <Text variant="secondary">
              {`Here's a preview of your changes to the theme. When you set the changes, the entire widget will change with the theme.`}
            </Text>
            <Alert
              type="warn"
              title="Note"
              content="Your online widgets will be refreshed in 1 or 2 minutes after saving."
              hideDismissButton
            />
          </div>
          <div role="separator" className="my-5 h-[1px] w-20 bg-gray-300" />
          <CommentWidgetPreview buildDate={props.buildDate} />
        </section>
      </div>
    </section>
  );
}

const BoldHeading = ({ className, ...restProps }: IHeadingProps) => (
  <Heading {...restProps} className={clsx('font-bold', className)} />
);
