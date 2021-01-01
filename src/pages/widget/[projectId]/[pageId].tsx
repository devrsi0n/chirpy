import * as React from 'react';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';
import { ApolloQueryResult } from '@apollo/client';

import { MemoCommentBlock } from '$/blocks/CommentBlock';
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
  useCreateOneReplyMutation,
} from '$/generated/graphql';
import { DropDownLogin } from '$/blocks/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser';
import { initializeApollo } from '$/lib/apollo-client';
import { CommentByPage } from '$/types/widget';
import { useNotifyHostPageOfHeight } from '$/hooks/useNotifyHostPageOfHeight';
import { prisma } from '$server/context';
import { useCreateOneLikeMutation, useDeleteOneLikeMutation } from '$/generated/graphql';
import {
  deleteOneLikeInComments,
  createOneLikeInComments,
  updateReplyInComments,
} from '$/utilities/comment';

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/__testing/comment

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
 * @param props
 */
export default function CommentWidget(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  const [comments, setComments] = React.useState<CommentByPage[]>(
    isStaticError(props) ? [] : props.comments,
  );
  if (isStaticError(props)) {
    error = props.error!;
  } else {
    pageId = props.pageId;
  }
  const { isLogin, data: userData } = useCurrentUser();
  const [input, setInput] = React.useState<Node[]>();

  const [createOneComment] = useCreateOneCommentMutation();

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
    }).then((data) => {
      if (data.data?.createOneComment.id) {
        setComments((prev) => [
          ...prev,
          {
            ...data.data!.createOneComment,
            replies: [],
          },
        ]);
      }
    });
  }, [input, pageId, userData?.currentUser?.id, createOneComment]);

  const [createOneLike] = useCreateOneLikeMutation();
  const [deleteOneLike] = useDeleteOneLikeMutation();
  const currentUserId = userData?.currentUser?.id;
  const handleClickLikeAction = (isLiked: boolean, likeId: string, commentId: string) => {
    if (!currentUserId) {
      throw Error('Login first');
    }
    if (isLiked) {
      deleteOneLike({
        variables: {
          id: likeId,
        },
      }).then(() => {
        const updatedComments = deleteOneLikeInComments(comments, commentId, likeId);
        if (updatedComments !== comments) {
          setComments(updatedComments);
        } else {
          console.error(`Can't find the deleted like`);
        }
      });
    } else {
      createOneLike({
        variables: {
          commentId,
          userId: currentUserId,
        },
      }).then((data) => {
        if (data.data?.createOneLike.id) {
          const updatedComments = createOneLikeInComments(
            comments,
            commentId,
            data.data.createOneLike,
          );
          if (updatedComments !== comments) {
            setComments(updatedComments);
          } else {
            console.error(`Can't insert the created like`);
          }
        }
      });
    }
  };

  const [createOneReply] = useCreateOneReplyMutation();
  const handleSubmitReply = (reply: Node[], commentId: string) => {
    if (!currentUserId) {
      console.error('Please login first');
      return Promise.reject();
    }
    return createOneReply({
      variables: {
        id: commentId,
        content: reply,
        pageId,
        userId: currentUserId,
      },
    }).then(({ data }) => {
      if (data?.updateOneComment?.replies) {
        const updatedComments = updateReplyInComments(
          comments,
          commentId,
          data.updateOneComment.replies,
        );
        if (updatedComments !== comments) {
          setComments(updatedComments);
        } else {
          console.error(`Can't update reply in comments`);
        }
      }
    });
  };

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
              <MemoCommentBlock
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                onClickLikeAction={handleClickLikeAction}
                onSubmitReply={handleSubmitReply}
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

type StaticProps = PathParams & {
  comments: CommentByPage[];
};
type StaticError = {
  error?: string;
};

const client = initializeApollo();

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  try {
    if (!params) {
      return { props: { error: 'No params' } };
    }
    const { pageId, projectId } = params;

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
      revalidate: 1,
    };
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
