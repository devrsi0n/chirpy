import * as colors from '@radix-ui/colors';
import merge from 'lodash/merge';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useTheme } from 'next-themes';
import Head from 'next/head';
import * as React from 'react';
import tw from 'twin.macro';

import { CommentTrees } from '$/blocks/CommentTrees';
import { PageTitle } from '$/blocks/PageTitle';
import { IconButton } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Popover } from '$/components/Popover';
import { Text } from '$/components/Text';
import { WidgetThemeProvider, useWidgetTheme } from '$/contexts/ThemeProvider';
import { translateRadixColor } from '$/contexts/ThemeProvider/utilities';
import { useUpdateThemeMutation } from '$/graphql/generated/project';
import { getAdminApollo } from '$/server/common/admin-apollo';
import {
  ThemeProjectByPkDocument,
  ThemeProjectByPkQuery,
  AllProjectsDocument,
} from '$/server/graphql/generated/project';
import { Theme as ThemeType } from '$/types/theme.type';

export type ThemeProps = StaticProps;

export default function Theme(props: ThemeProps): JSX.Element {
  return (
    <>
      <WidgetThemeProvider theme={props.project?.theme as ThemeType}>
        <Head>
          <title>Theme Editor</title>
        </Head>
        <ThemeEditor {...props} />
      </WidgetThemeProvider>
    </>
  );
}

Theme.auth = true;

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
  const { theme, setTheme } = useWidgetTheme();
  const { resolvedTheme } = useTheme();
  const activeTheme: keyof ColorSeries = (resolvedTheme as keyof ColorSeries) || 'light';
  const [updateTheme] = useUpdateThemeMutation();
  const handClickPrimaryColorFunction = (color: ColorSeries) => {
    return () => {
      const newTheme = merge({}, theme, {
        colors: { light: { primary: color.light }, dark: { primary: color.dark } },
      });
      setTheme(newTheme);
      updateTheme({
        variables: {
          projectId: props.projectId,
          theme: newTheme,
        },
      });
    };
  };

  return (
    <div className="main-container" tw="py-10 px-2">
      <PageTitle tw="mb-10">Theme of {props.project?.name}</PageTitle>
      <div tw="flex flex-row">
        <aside tw="flex-1 border-r pr-4 space-y-11">
          <div tw="space-y-6">
            <BoldHeading as="h4">Theme Editor</BoldHeading>
            <Text variant="secondary">
              Click to change variants then we will save your theme automatically.
            </Text>
          </div>
          <div tw="space-y-4">
            <BoldHeading>Colors</BoldHeading>
            <Text>Primary</Text>
            <div tw="flex flex-row items-center space-x-2 transform -translate-x-2">
              <Popover
                buttonAs={IconButton}
                content={
                  <ul tw="flex flex-row">
                    {Object.entries(colorOptions).map(([_, color]) => (
                      <li key={color[activeTheme][900]}>
                        <IconButton onClick={handClickPrimaryColorFunction(color)}>
                          <span
                            tw="inline-block w-6 h-6 rounded-full"
                            style={{ background: color[activeTheme][900] }}
                          />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                }
              >
                <span tw="inline-block w-6 h-6 rounded-full bg-primary-900" />
              </Popover>
              <Text tw="px-2">{theme.colors[activeTheme].primary[900]}</Text>
            </div>
          </div>
        </aside>
        <section tw="flex-2 pl-6">
          <div tw="space-y-5 mb-4">
            <BoldHeading as="h4">Preview</BoldHeading>
            <Text variant="secondary">
              {`Here's a preview of your changes to the theme. When you set the changes, the entire widget will change with the theme.`}
            </Text>
          </div>
          <div role="separator" tw="w-20 bg-gray-300 my-5 height[1px]" />
          <CommentTrees
            comments={comments as any}
            onSubmitReply={() => Promise.resolve()}
            onClickLikeAction={() => Promise.resolve()}
          />
        </section>
      </div>
    </div>
  );
}

type PathParams = {
  projectId: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const adminApollo = getAdminApollo();
  const { projects } = (
    await adminApollo.query({
      query: AllProjectsDocument,
    })
  ).data;

  const paths: { params: PathParams }[] = projects.map(({ id }) => {
    return {
      params: {
        projectId: id,
      },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = {
  project: ThemeProjectByPkQuery['projectByPk'];
} & PathParams;

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.projectId) {
    return { notFound: true };
  }
  const { projectId } = params;
  const adminApollo = getAdminApollo();
  const pageResult = await adminApollo.query({
    query: ThemeProjectByPkDocument,
    variables: {
      id: projectId,
    },
  });

  if (!pageResult.data?.projectByPk) {
    return { notFound: true };
  }
  const { projectByPk } = pageResult.data;
  return {
    props: { project: projectByPk, projectId },
    revalidate: 1,
  };
};

const comments = [
  {
    __typename: 'Comment',
    id: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
    content: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Level 1 testing 😍',
          },
        ],
      },
    ],
    createdAt: '2021-04-17T01:43:10.581584+00:00',
    parentId: null,
    pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
    depth: 1,
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'devrsi0n',
      avatar: 'https://avatars.githubusercontent.com/u/7880675?v=4',
    },
    likes: [],
    replies: [
      {
        __typename: 'Comment',
        id: '87110a09-9a4b-4f41-8784-6f8512449ddf',
        content: [
          {
            type: 'paragraph',
            children: [
              {
                text: 'Level 2 👀',
              },
            ],
          },
        ],
        createdAt: '2021-04-17T02:31:51.05373+00:00',
        parentId: '4f5f8d1f-ed42-44ff-a4cd-f7b51af55e1f',
        pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
        depth: 2,
        user: {
          __typename: 'User',
          id: '634da1be-cc04-4719-908e-c642de76e292',
          name: 'devrsi0n',
          avatar: 'https://avatars.githubusercontent.com/u/7880675?v=4',
        },
        likes: [],
        replies: [],
      },
    ],
  },
  {
    __typename: 'Comment',
    id: '7a024861-7dce-4513-9f8a-c9e91d975da4',
    content: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Ho ho 🗣',
          },
        ],
      },
    ],
    createdAt: '2021-04-17T02:51:30.517834+00:00',
    parentId: null,
    pageId: 'b5a16120-593c-492f-ad94-e14d247485f3',
    depth: 1,
    user: {
      __typename: 'User',
      id: '634da1be-cc04-4719-908e-c642de76e292',
      name: 'devrsi0n',
      avatar: 'https://avatars.githubusercontent.com/u/7880675?v=4',
    },
    likes: [],
    replies: [],
  },
];

const BoldHeading = tw(Heading)`font-bold`;
