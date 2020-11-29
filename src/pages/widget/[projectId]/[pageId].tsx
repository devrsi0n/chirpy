import * as React from 'react';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import Head from 'next/head';

import { prisma } from '$server/context';
import { Comment, Like, User } from '@prisma/client';
import { Comment as SectionComment } from '$/blocks/Comment';
import { RichTextEditor } from '$/blocks/RichTextEditor/RichTextEditor';
import { Node } from 'slate';
import { Tabs } from '$/components/Tabs/Tabs';
import { Button } from '$/components/buttons/Button';
import { Text } from '$/components/Text';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import {
  useCreateOneCommentMutation,
  GetAllCommentsByPageDocument,
  GetAllCommentsByPageQuery,
  GetAllCommentsByPageQueryVariables,
  useCreateOneLikeMutation,
  useDeleteOneLikeMutation,
} from '$/generated/graphql';
import { useApollo } from '$/lib/apollo-client';
import { DropDownLogin } from '$/blocks/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser';

export type CommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/ckhsvc67800093wcvw0bdjibk/ckhsvd40j00019ucv8dng90b8

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
 * @param props
 */
export default function PageComment(props: CommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  let _comments: CommentWithContext[] = [];
  if (isStaticError(props)) {
    error = props.error!;
  } else {
    _comments = props.comments;
    pageId = props.pageId;
  }
  const { isLogin, data: userData } = useCurrentUser();
  const [input, setInput] = React.useState<Node[]>();
  const [comments, setComments] = React.useState<CommentWithContext[]>(_comments);

  const client = useApollo();

  const [
    createOneComment,
    { data, loading, error: createCommentError },
  ] = useCreateOneCommentMutation();
  const refreshComments = React.useCallback(() => {
    client
      .query<GetAllCommentsByPageQuery, GetAllCommentsByPageQueryVariables>({
        query: GetAllCommentsByPageDocument,
        variables: {
          pageId,
        },
        fetchPolicy: 'no-cache',
      })
      .then((data) => {
        setInput(undefined);
        if (!data.data.getAllCommentsByPage) {
          console.error('Unexpected empty comments');
          return;
        }
        setComments((data.data.getAllCommentsByPage as unknown) as CommentWithContext[]);
      });
  }, [client, pageId]);
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
    }).then(() => {
      refreshComments();
    });
  }, [input, pageId, userData?.currentUser?.id, createOneComment, refreshComments]);

  const [createOneLike] = useCreateOneLikeMutation();
  const [deleteOneLike] = useDeleteOneLikeMutation();
  const handleClickLike = React.useCallback(
    (liked: boolean, commentId: string, likedId: string) => {
      if (!userData?.currentUser?.id) {
        console.error('No user id');
        return;
      }
      let promise: Promise<$TsAny>;
      if (liked) {
        promise = deleteOneLike({
          variables: {
            id: likedId,
          },
        });
      } else {
        promise = createOneLike({
          variables: {
            commentId,
            userId: userData?.currentUser?.id,
          },
        });
      }
      promise.then(() => {
        refreshComments();
      });
    },
    [createOneLike, userData, deleteOneLike, refreshComments],
  );

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
            {comments?.map((comment: CommentWithContext) => (
              <SectionComment
                key={comment.id}
                id={comment.id}
                name={comment.user.name}
                avatar={comment.user.avatar!}
                content={comment.content as Node[]}
                date={String((comment as $TsFixMe).createdAt as string)}
                likeList={comment.likes}
                onClickLike={handleClickLike}
                userId={userData?.currentUser?.id}
              />
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
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const projects = await prisma.project.findMany({
    include: {
      pages: {
        include: {
          comments: true,
        },
      },
    },
  });
  const paths: { params: PathParams }[] = [];
  projects.forEach((project) =>
    project.pages?.forEach((page) => {
      paths.push({
        params: {
          projectId: project.id,
          pageId: page.id,
        },
      });
    }),
  );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type CommentWithContext = Comment & {
  user: User;
  replies: Comment[];
  likes: Like[];
};

type StaticProps = PathParams & {
  comments: CommentWithContext[];
};
type StaticError = {
  error?: string;
};

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  try {
    if (!params) {
      return { props: { error: 'No params' } };
    }
    const { projectId, pageId } = params;
    // console.log({ params });
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        pages: {
          where: {
            id: pageId,
          },
          include: {
            comments: {
              include: {
                user: true,
                replies: true,
                likes: true,
              },
            },
          },
        },
      },
    });
    if (!((project?.pages[0]?.comments?.length ?? 0) > 0)) {
      return { props: { error: 'No comments' } };
    }
    return {
      props: { projectId, pageId, comments: project!.pages[0].comments! },
      // TODO: Shorter time for pro user?
      revalidate: 60 * 60,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
