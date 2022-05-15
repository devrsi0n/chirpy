import { CommentTrees } from '$/blocks/comment-trees';
import { PageTitle } from '$/blocks/page-title';
import { IconButton } from '$/components/button';
import { Popover } from '$/components/popover';
import { Text } from '$/components/text';
import { useUpdateThemeMutation } from '$/graphql/generated/project';
import { useTheme } from 'next-themes';
import merge from 'lodash/merge';
import { useWidgetTheme } from '$/contexts/theme-context';
import { translateRadixColor } from '$/contexts/theme-context/utilities';
import * as colors from '@radix-ui/colors';
import { Heading, IHeadingProps } from '$/components/heading';
import { ThemeProjectByPkQuery } from '$/server/graphql/generated/project';
import { previewComments } from './preview-data';
import clsx from 'clsx';

type ColorSeries = {
  light: Record<string, string>;
  dark: Record<string, string>;
};

const colorOptions: Record<string, ColorSeries> = {
  red: {
    light: translateRadixColor(colors.red),
    dark: translateRadixColor(colors.redDark),
  },
  amber: {
    light: translateRadixColor(colors.amber),
    dark: translateRadixColor(colors.amberDark),
  },
  green: {
    light: translateRadixColor(colors.green),
    dark: translateRadixColor(colors.greenDark),
  },
  blue: {
    light: translateRadixColor(colors.blue),
    dark: translateRadixColor(colors.blueDark),
  },
  indigo: {
    light: translateRadixColor(colors.indigo),
    dark: translateRadixColor(colors.indigoDark),
  },
  violet: {
    light: translateRadixColor(colors.violet),
    dark: translateRadixColor(colors.violetDark),
  },
  default: {
    light: translateRadixColor(colors.plum),
    dark: translateRadixColor(colors.plumDark),
  },
  pink: {
    light: translateRadixColor(colors.pink),
    dark: translateRadixColor(colors.pinkDark),
  },
};

export const THEME_WIDGET_CLS = 'theme-widget';

export type ThemeEditorProps = {
  project: ThemeProjectByPkQuery['projects'][number];
};

export function ThemeEditor(props: ThemeEditorProps): JSX.Element {
  const { widgetTheme, setWidgetTheme, siteTheme } = useWidgetTheme();
  const { resolvedTheme } = useTheme();
  const activeTheme: keyof ColorSeries = ((resolvedTheme === 'system' ? 'light' : resolvedTheme) ||
    'light') as keyof ColorSeries;
  const [{}, updateTheme] = useUpdateThemeMutation();
  const handClickPrimaryColorFunction = (color: ColorSeries) => {
    return () => {
      const newTheme = merge({}, widgetTheme, {
        colors: { light: { primary: color.light }, dark: { primary: color.dark } },
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
        <aside className="flex-1 sm:pr-4 space-y-11">
          <div className="space-y-6">
            <BoldHeading as="h4">Theme Editor</BoldHeading>
            <Text variant="secondary">
              Click to change variants then we will save your theme automatically.
            </Text>
          </div>
          <div className="space-y-4">
            <BoldHeading>Colors</BoldHeading>
            <Text>Primary</Text>
            <div className="flex flex-row items-center space-x-2">
              <Popover
                buttonAs={IconButton}
                content={
                  <ul className="flex flex-row space-x-3">
                    {Object.entries(colorOptions).map(([key, color]) => (
                      <li key={color[activeTheme][900]}>
                        <IconButton
                          onClick={handClickPrimaryColorFunction(color)}
                          aria-label={`Color ${key}`}
                        >
                          <span
                            className="inline-block w-6 h-6 rounded-full"
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
                  className="inline-block w-6 h-6 rounded-full bg-primary-900"
                />
              </Popover>
              <Text
                className="px-2 !leading-none mb-2"
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
        <div role="separator" className="border-b my-6 sm:border-r sm:mx-4" />
        <section className="flex-2 sm:pl-6">
          <div className="space-y-5 mb-4">
            <BoldHeading as="h4">Preview</BoldHeading>
            <Text variant="secondary">
              {`Here's a preview of your changes to the theme. When you set the changes, the entire widget will change with the theme.`}
            </Text>
          </div>
          <div role="separator" className="w-20 bg-gray-300 my-5 h-[1px]" />

          <CommentTrees
            comments={previewComments as any}
            onSubmitReply={() => Promise.resolve()}
            onClickLikeAction={() => Promise.resolve()}
            rtePlaceholder="Preview"
          />
        </section>
      </div>
    </section>
  );
}
const BoldHeading = ({ className, ...restProps }: IHeadingProps) => (
  <Heading {...restProps} className={clsx('font-bold', className)} />
);
