import { RouterOutputs, trpcClient } from '@chirpy-dev/trpc/src/client';
import { Theme } from '@chirpy-dev/types';
import clsx from 'clsx';
import debounce from 'debounce-promise';
import * as React from 'react';

import { PageTitle } from '../../blocks/page-title';
import { ClientOnly } from '../../components';
import { Alert } from '../../components/alert';
import { Heading, IHeadingProps } from '../../components/heading';
import { Text } from '../../components/text';
import { useToast } from '../../components/toast';
import { useWidgetTheme } from '../../contexts/theme-context';
import { logger } from '../../utilities/logger';
import { mergeDeep } from '../../utilities/object';
import { ColorModeSelect } from '../color-mode-select';
import {
  CommentWidgetPreview,
  CommentWidgetPreviewProps,
} from '../comment-widget-preview';
import { ColorPicker, ColorSeriesPicker } from './color-picker';
import { COLOR_OPTIONS, useActiveColorMode, useColors } from './colors';
import { hslToHex, useRevalidateProjectPages } from './utilities';

export const THEME_WIDGET_CLS = 'theme-widget';

export type ThemeEditorProps = {
  project: NonNullable<RouterOutputs['project']['byDomain']>;
} & Pick<CommentWidgetPreviewProps, 'buildDate'>;

export function ThemeEditor(props: ThemeEditorProps): JSX.Element {
  const { widgetTheme, setWidgetTheme, siteTheme } = useWidgetTheme();

  const { mutateAsync: updateTheme } =
    trpcClient.project.updateTheme.useMutation();
  const { showToast } = useToast();
  const revalidateProjectPages = useRevalidateProjectPages();
  const saveTheme = debounce(
    React.useCallback(
      async (newTheme: Theme) => {
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
          logger.warn(`Save theme pages failed`, { error });
          showToast({
            type: 'error',
            title: 'Save theme failed',
          });
        }
      },
      [
        props.project.domain,
        props.project.id,
        setWidgetTheme,
        showToast,
        updateTheme,
        revalidateProjectPages,
      ],
    ),
    1500,
  );
  const activeMode = useActiveColorMode();
  const handleSaveBackground = async (color: string) => {
    const newTheme = mergeDeep(widgetTheme || {}, {
      colors: {
        [activeMode]: { bg: color },
      },
    }) as Theme;
    await saveTheme(newTheme);
  };
  const handleSavePrimaryColor = async (colorKey: string) => {
    const colorSeries = COLOR_OPTIONS[colorKey];
    const newTheme = mergeDeep(widgetTheme || {}, {
      colors: {
        light: { primary: colorSeries.light },
        dark: { primary: colorSeries.dark },
      },
    });
    await saveTheme(newTheme);
  };
  const primaryColorOptions = useColors({ level: '900' });
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
            <BoldHeading>Color Mode</BoldHeading>
            <Text variant="secondary">
              Preview your theme with different color modes
            </Text>
            <ColorModeSelect />
          </div>
          <div className="space-y-6">
            <BoldHeading>Colors</BoldHeading>
            <ColorSeriesPicker
              label="Primary"
              colorOptions={primaryColorOptions}
              onSelectColor={handleSavePrimaryColor}
              styles={{ triggerButton: 'bg-primary-900' }}
            />
            <ClientOnly>
              <ColorPicker
                key={activeMode}
                label="Background"
                hintText="Remember to save a color for dark/light mode as well"
                defaultValue={hslToHex(
                  widgetTheme?.colors[activeMode]?.bg ||
                    siteTheme.colors[activeMode]?.bg ||
                    '#fff',
                )}
                onSelectColor={handleSaveBackground}
              />
            </ClientOnly>
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
          <div className="bg-bg">
            <CommentWidgetPreview buildDate={props.buildDate} />
          </div>
        </section>
      </div>
    </section>
  );
}

const BoldHeading = ({ className, ...restProps }: IHeadingProps) => (
  <Heading {...restProps} className={clsx('font-bold', className)} />
);
