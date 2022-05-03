import * as colors from '@radix-ui/colors';
import clsx from 'clsx';
import merge from 'lodash/merge';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { CommentTrees } from '@chirpy/blocks';
import { SiteLayout } from '@chirpy/blocks';
import { PageTitle } from '@chirpy/blocks';
import { IconButton } from '@chirpy/components';
import { Heading, IHeadingProps } from '@chirpy/components';
import { Popover } from '@chirpy/components';
import { Text } from '@chirpy/components';
import { WidgetThemeProvider, useWidgetTheme } from '@chirpy/contexts';
import { translateRadixColor } from '@chirpy/contexts';
import { useUpdateThemeMutation } from '@chirpy/graphql/generated/project';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  ThemeProjectByPkDocument,
  ThemeProjectByPkQuery,
} from '$/server/graphql/generated/project';
import { getAllProjectStaticPathsByDomain } from '$/server/services/project';
import { Theme as ThemeType } from '$/types/theme.type';

export type ThemeProps = StaticProps;

const THEME_WIDGET_CLS = 'theme-widget';

export default function ThemePage(props: ThemeProps): JSX.Element {
  return (
    <SiteLayout title={props.project?.name || 'Theme'}>
      <WidgetThemeProvider
        widgetTheme={props.project?.theme as ThemeType}
        selector={`.${THEME_WIDGET_CLS}`}
      >
        <ThemeEditor {...props} />
      </WidgetThemeProvider>
    </SiteLayout>
  );
}

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

function ThemeEditor(props: ThemeProps): JSX.Element {
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
      <div className="flex flex-row">
        <aside className="flex-1 border-r pr-4 space-y-11">
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
        <section className="flex-2 pl-6">
          <div className="space-y-5 mb-4">
            <BoldHeading as="h4">Preview</BoldHeading>
            <Text variant="secondary">
              {`Here's a preview of your changes to the theme. When you set the changes, the entire widget will change with the theme.`}
            </Text>
          </div>
          <div role="separator" className="w-20 bg-gray-300 my-5 h-[1px]" />
          <div className={THEME_WIDGET_CLS}>
            <CommentTrees
              comments={comments as any}
              onSubmitReply={() => Promise.resolve()}
              onClickLikeAction={() => Promise.resolve()}
              rtePlaceholder="Preview"
            />
          </div>
        </section>
      </div>
    </section>
  );
}

type PathParams = {
  domain: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const paths = await getAllProjectStaticPathsByDomain();

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = {
  project: ThemeProjectByPkQuery['projects'][0];
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.domain) {
    return { notFound: true };
  }
  const { domain } = params;
  const client = getAdminGqlClient();
  const { data } = await client
    .query<ThemeProjectByPkQuery>(ThemeProjectByPkDocument, {
      domain,
    })
    .toPromise();

  if (!data?.projects || !data?.projects[0]) {
    return { notFound: true };
  }
  return {
    props: { project: data.projects[0] },
    revalidate: 1,
  };
};

const comments = [
  {
    __typename: 'Comment',
    id: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Your article is 100% gorgeous 😍',
            },
          ],
        },
      ],
    },
    createdAt: '2021-04-17T01:43:10.581584+00:00',
    parentId: null,
    pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'Jane',
      avatar: '/images/avatars/female-1.jpeg',
    },
    likes: [],
    replies: [
      {
        __typename: 'Comment',
        id: '87110a09-9a4b-4f41-8784-6f8512449ddf',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [
                {
                  type: 'text',
                  text: `Can't agree more!`,
                },
              ],
            },
          ],
        },
        createdAt: '2021-04-17T02:31:51.05373+00:00',
        parentId: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
        pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
        user: {
          __typename: 'User',
          id: '634da1be-cc04-4719-908e-c642de76e292',
          name: 'Dianne',
          avatar: '/images/avatars/female-2.jpeg',
        },
        likes: [],
        replies: [],
      },
    ],
  },
  {
    __typename: 'Comment',
    id: '7a024861-7dce-4513-9f8a-c9e91d975da4',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Interesting, thanks for sharing.',
            },
          ],
        },
      ],
    },
    createdAt: '2021-04-17T02:51:30.517834+00:00',
    parentId: null,
    pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'William',
      avatar: '/images/avatars/male-1.jpeg',
    },
    likes: [],
    replies: [],
  },
];

const BoldHeading = ({ className, ...restProps }: IHeadingProps) => (
  <Heading {...restProps} className={clsx('font-bold', className)} />
);
