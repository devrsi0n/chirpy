import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import merge from 'lodash/merge';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import Head from 'next/head';
import * as React from 'react';
import colors from 'tailwindcss/colors';
import tw from 'twin.macro';

import { getAdminApollo } from '$server/common/admin-apollo';
import {
  ThemeProjectByPkDocument,
  ThemeProjectByPkQuery,
  ThemeProjectsDocument,
} from '$server/graphql/generated/project';

import { CommentWidget } from '$/blocks/CommentWidget';
import { IconButton } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Layout } from '$/components/Layout';
import { Popover } from '$/components/Popover';
import { Text } from '$/components/Text';
import { ThemeProvider, useTheme } from '$/components/ThemeProvider';
import { useUpdateThemeMutation } from '$/graphql/generated/project';
import { Theme as ThemeType } from '$/types/theme.type';

dayjs.extend(relativeTime);

export type ThemeProps = StaticProps;

type ColorSeries = typeof colors.red;

const colorOptions: ColorSeries[] = [
  colors.red,
  colors.amber,
  colors.green,
  colors.blue,
  colors.indigo,
  colors.violet,
  colors.pink,
];

export default function Theme(props: ThemeProps): JSX.Element {
  return (
    <Layout>
      <ThemeProvider theme={props.project?.theme as ThemeType}>
        <Head>
          <title>Theme Editor</title>
        </Head>
        <ThemeEditor {...props} />
      </ThemeProvider>
    </Layout>
  );
}

function ThemeEditor(props: ThemeProps): JSX.Element {
  const { theme, mergeTheme } = useTheme();
  const [updateTheme] = useUpdateThemeMutation();
  const handClickColorFunction = (color: ColorSeries) => {
    return () => {
      const newTheme = { colors: { primary: color } };
      mergeTheme(newTheme);
      updateTheme({
        variables: {
          projectId: props.projectId,
          theme: merge(theme, newTheme),
        },
      });
    };
  };

  return (
    <div tw="flex flex-row px-2">
      <aside tw="flex-1 border-r pr-4 space-y-8">
        <div tw="space-y-4">
          <BoldHeading>Theme Editor</BoldHeading>
          <SubText>
            Custom themes is a very simple thing in {process.env.NEXT_PUBLIC_APP_NAME}, click change
            and save theme.
          </SubText>
        </div>
        <div tw="space-y-4">
          <BoldHeading>Colors</BoldHeading>
          <Text>Primary</Text>
          <div tw="flex flex-row items-center space-x-2 transform -translate-x-2">
            <Popover
              buttonAs={IconButton}
              content={
                <ul tw="flex flex-row">
                  {colorOptions.map((color) => (
                    <li key={color[500]}>
                      <IconButton onClick={handClickColorFunction(color)}>
                        <span
                          tw="inline-block w-6 h-6 rounded-full"
                          style={{ background: color[500] }}
                        />
                      </IconButton>
                    </li>
                  ))}
                </ul>
              }
            >
              <span tw="inline-block w-6 h-6 rounded-full bg-primary-500" />
            </Popover>
            <Text tw="px-4 py-2 border border-primary-500 rounded">
              {theme.colors.primary[500]}
            </Text>
          </div>
        </div>
      </aside>
      <section tw="flex-2 pl-6">
        <div tw="space-y-5 mb-4">
          <BoldHeading as="h4">Preview</BoldHeading>
          <SubText>
            {`Here's a preview of your changes to the Theme. When you set the changes, the entire widget will change with the theme.`}
          </SubText>
        </div>
        <div role="separator" tw="w-20 bg-gray-300 my-5" style={{ height: 1 }} />
        <CommentWidget
          comments={comments as $TsAny}
          pageId={'12345'}
          onSubmitReply={() => Promise.resolve()}
          onClickLikeAction={() => Promise.resolve()}
        />
      </section>
    </div>
  );
}

type PathParams = {
  projectId: string;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const adminApollo = getAdminApollo();
  const pages = (
    await adminApollo.query({
      query: ThemeProjectsDocument,
    })
  ).data.projects;

  const paths: { params: PathParams }[] = pages.map(({ id }) => {
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
      displayName: 'devrsi0n',
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
          displayName: 'devrsi0n',
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
      displayName: 'devrsi0n',
      avatar: 'https://avatars.githubusercontent.com/u/7880675?v=4',
    },
    likes: [],
    replies: [],
  },
];

const BoldHeading = tw(Heading)`font-bold`;
const SubText = tw(Text)`text-gray-500`;
