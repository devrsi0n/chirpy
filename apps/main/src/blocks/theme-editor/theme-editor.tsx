import clsx from 'clsx';
import merge from 'lodash/merge';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { PageTitle } from '$/blocks/page-title';
import { IconButton } from '$/components/button';
import { Heading, IHeadingProps } from '$/components/heading';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useWidgetTheme } from '$/contexts/theme-context';
import { useUpdateThemeMutation } from '$/graphql/generated/project';
import { ThemeProjectByPkQuery } from '$/server/graphql/generated/project';

import {
  CommentWidgetPreview,
  CommentWidgetPreviewProps,
} from '../comment-widget-preview';
import { ColorSeries, colorOptions } from './colors';

export const THEME_WIDGET_CLS = 'theme-widget';

export type ThemeEditorProps = {
  project: ThemeProjectByPkQuery['projects'][number];
} & Pick<CommentWidgetPreviewProps, 'buildDate'>;

export function ThemeEditor(props: ThemeEditorProps): JSX.Element {
  const { widgetTheme, setWidgetTheme, siteTheme } = useWidgetTheme();
  const { resolvedTheme } = useTheme();
  const activeTheme: keyof ColorSeries = ((resolvedTheme === 'system'
    ? 'light'
    : resolvedTheme) || 'light') as keyof ColorSeries;
  const [{}, updateTheme] = useUpdateThemeMutation();
  const handClickPrimaryColorFunction = (color: ColorSeries) => {
    return () => {
      const newTheme = merge({}, widgetTheme, {
        colors: {
          light: { primary: color.light },
          dark: { primary: color.dark },
        },
      });
      setWidgetTheme(newTheme);
      updateTheme({
        projectId: props.project.id,
        theme: newTheme,
      });
    };
  };

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
          <div className="space-y-4">
            <BoldHeading>Colors</BoldHeading>
            <Text>Primary</Text>
            <div className="flex flex-row items-center space-x-2">
              <Popover
                buttonAs={IconButton}
                buttonProps={{
                  'aria-label': 'Click to expanded the color picker',
                }}
                content={
                  <ul className="flex flex-row space-x-3">
                    {Object.entries(colorOptions).map(([key, color]) => (
                      <li key={color[activeTheme][900]}>
                        <IconButton
                          onClick={handClickPrimaryColorFunction(color)}
                          aria-label={`Color ${key}`}
                        >
                          <span
                            className="inline-block h-6 w-6 rounded-full"
                            style={{ background: color[activeTheme][900] }}
                          />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                }
              >
                <span
                  aria-label="Primary color selector"
                  className="inline-block h-6 w-6 rounded-full bg-primary-900"
                />
              </Popover>
              <Text
                className="mb-2 px-2 !leading-none"
                variant="secondary"
                aria-label="Selected color"
                size="sm"
              >
                {widgetTheme?.colors[activeTheme].primary[900] ||
                  siteTheme.colors[activeTheme].primary[900]}
              </Text>
            </div>
          </div>
        </aside>
        <div role="separator" className="my-6 border-b sm:mx-4 sm:border-r" />
        <section className="flex-2 sm:pl-6">
          <div className="mb-4 space-y-5">
            <BoldHeading as="h4">Preview</BoldHeading>
            <Text variant="secondary">
              {`Here's a preview of your changes to the theme. When you set the changes, the entire widget will change with the theme.`}
            </Text>
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
