import * as React from 'react';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';
import { ApolloQueryResult } from '@apollo/client';

import { Comment as SectionComment } from '$/blocks/Comment';
import { RichTextEditor } from '$/blocks/RichTextEditor';
import { Node } from 'slate';
import { Tabs } from '$/components/Tabs/Tabs';
import { Button } from '$/components/buttons/Button';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import {
  useCreateOneCommentMutation,
  CommentsByPageQuery,
  CommentsByPageQueryVariables,
  CommentsByPageDocument,
} from '$/generated/graphql';
import { DropDownLogin } from '$/blocks/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser';
import { initializeApollo } from '$/lib/apollo-client';
import { CommentByPage } from '$/types/widget';
import { useRefreshServerProps } from '$/hooks/useRefreshServerProps';
import { useNotifyHostPageOfHeight } from '$/hooks/useNotifyHostPageOfHeight';

export type PageCommentProps = InferGetServerSidePropsType<typeof getServerSideProps>;

// Demo: http://localhost:3000/__testing/comment

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
 * @param props
 */
export default function PageComment(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  let comments: CommentByPage[] = [];
  if (isStaticError(props)) {
    error = props.error!;
  } else {
    comments = props?.comments || comments;
    pageId = props.pageId;
  }
  const { isLogin, data: userData } = useCurrentUser();
  const [input, setInput] = React.useState<Node[]>();

  const refreshProps = useRefreshServerProps();
  const [createOneComment] = useCreateOneCommentMutation({
    onCompleted() {
      refreshProps();
    },
  });

  const handleSubmit = React.useCallback(() => {
    if (!userData?.currentUser?.id) {
      console.error('login first');
      return;
    }
    createOneComment({
      variables: {
        pageId,
        content: input,
        userId: userData.currentUser.id,
      },
    });
  }, [input, pageId, userData?.currentUser?.id, createOneComment]);

  useNotifyHostPageOfHeight();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto my-3">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} Comment</title>
      </Head>
      <Tabs
        initialValue={COMMENT_TAB_VALUE}
        className="mb-3"
        rightItems={
          isLogin && userData?.currentUser?.avatar && userData?.currentUser?.name ? (
            <DropDownUser
              avatar={userData?.currentUser?.avatar}
              name={userData?.currentUser?.name}
            />
          ) : (
            <DropDownLogin />
          )
        }
      >
        <Tabs.Item label={`Comments`} value={COMMENT_TAB_VALUE}>
          <div className="space-y-2">
            {comments?.map((comment: CommentByPage) => (
              <SectionComment key={comment.id} comment={comment} />
            ))}
            <RichTextEditor
              {...{
                ...(!isLogin && {
                  disabled: true,
                  placeholder: [
                    {
                      type: 'paragraph',
                      children: [{ text: `Please login first.` }],
                    },
                  ],
                }),
              }}
              value={input}
              onChange={setInput}
              className="bg-gray-100"
            />
            <div className="flex flex-row justify-end">
              {isLogin ? <Button onClick={handleSubmit}>Submit</Button> : <Button>Login</Button>}
            </div>
          </div>
        </Tabs.Item>
        <Tabs.Item
          label={process.env.NEXT_PUBLIC_APP_NAME}
          value={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </Tabs>
      <Text className="text-right">Powered by {process.env.NEXT_PUBLIC_APP_NAME}</Text>
    </div>
  );
}

type PathParams = {
  projectId: string;
  pageId: string;
};

// Get all project then prerender all their page comments
// export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
//   const projects = await prisma.project.findMany({
//     include: {
//       pages: {
//         include: {
//           comments: true,
//         },
//       },
//     },
//   });
//   const paths: { params: PathParams }[] = [];
//   projects.forEach((project) =>
//     project.pages?.forEach((page) => {
//       paths.push({
//         params: {
//           projectId: project.id,
//           pageId: page.id,
//         },
//       });
//     }),
//   );

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: true };
// };

type StaticProps = PathParams & {
  comments: CommentByPage[];
};
type StaticError = {
  error?: string;
};

const client = initializeApollo();

// TODO: Re-enable static build page: getStaticProps
export const getServerSideProps: GetServerSideProps<
  StaticProps | StaticError,
  PathParams
> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  try {
    if (!params) {
      return { props: { error: 'No params' } };
    }
    const { pageId, projectId } = params;

    // TODO: fix http performance issue, better to fetch the data directly
    const pageResult: ApolloQueryResult<CommentsByPageQuery> = await client.query<
      CommentsByPageQuery,
      CommentsByPageQueryVariables
    >({
      query: CommentsByPageDocument,
      variables: {
        pageId: pageId,
      },
      fetchPolicy: 'no-cache',
    });

    if (!pageResult.data?.comments) {
      return { props: { error: 'No page data' } };
    }
    const { comments } = pageResult.data;

    return {
      props: { comments, pageId, projectId },
      // revalidate: 1,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
