import * as React from 'react';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';
import { Node } from 'slate';

import { CommentTree } from '$/blocks/CommentTree/CommentTree';
import { RichTextEditor } from '$/blocks/RichTextEditor';
import { Tabs } from '$/components/Tabs';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { DropDownLogin } from '$/blocks/DropDownLogin/DropDownLogin';
import { DropDownUser } from '$/blocks/DropDownUser/DropDownUser';
import { CommentLeaf } from '$/types/widget';
import { useNotifyHostPageOfHeight } from '$/hooks/useNotifyHostPageOfHeight';
import { useDeleteLikeByPkMutation, useInsertOneLikeMutation } from '$/graphql/generated/like';
import { deleteOneLikeInComments, createOneLikeInComments } from '$/utilities/like';
import { updateReplyInComments } from '$/utilities/merge-comment';
import { PoweredBy } from '$/blocks/PoweredBy';
import { getAdminApollo } from '$server/common/admin-apollo';
import { PagesDocument } from '$server/graphql/generated/page';
import { CommentTreeDocument } from '$server/graphql/generated/comment';
import { useInsertOneCommentMutation } from '$/graphql/generated/comment';

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/comment/ckiwwumiv0001uzcv79wjhagt

const COMMENT_TAB_VALUE = 'Comment';

/**
 * Comment widget for a page
 * @param props
 */
export default function CommentPageWidget(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  const [comments, setComments] = React.useState<CommentLeaf[]>(
    isStaticError(props) ? [] : props.comments,
  );
  if (isStaticError(props)) {
    error = props.error!;
  } else {
    pageId = props.pageId;
  }
  const { isLogin, id: currentUserId, avatar, displayName } = useCurrentUser();

  const [insertOneComment] = useInsertOneCommentMutation();

  const handleSubmit = React.useCallback(
    async (content: Node[]) => {
      if (!currentUserId) {
        console.error('Sign-in first');
        return;
      }
      const { data } = await insertOneComment({
        variables: {
          pageId,
          content,
        },
      });
      if (data?.insertOneComment?.id) {
        setComments((prev) => [
          ...prev,
          {
            ...data.insertOneComment!,
            replies: [],
          },
        ]);
      }
    },
    [pageId, currentUserId, insertOneComment],
  );

  const [insertOneLike] = useInsertOneLikeMutation();
  const [deleteLikeByPk] = useDeleteLikeByPkMutation();
  const handleClickLikeAction = async (isLiked: boolean, likeId: string, commentId: string) => {
    if (!currentUserId) {
      throw new Error('Login first');
    }
    if (isLiked) {
      await deleteLikeByPk({
        variables: {
          id: likeId,
        },
      });
      const updatedComments = deleteOneLikeInComments(comments, commentId, likeId);
      if (updatedComments !== comments) {
        setComments(updatedComments);
      } else {
        console.error(`Can't find the deleted like`);
      }
    } else {
      try {
        const { data } = await insertOneLike({
          variables: {
            commentId,
            // userId: currentUserId,
            compoundId: `${currentUserId}:${commentId}`,
          },
        });
        if (data?.insertOneLike?.id) {
          const updatedComments = createOneLikeInComments(comments, commentId, data.insertOneLike!);
          if (updatedComments !== comments) {
            setComments(updatedComments);
          } else {
            console.error(`Can't insert the created like`);
          }
        }
      } catch (error) {
        // There is a `Unique constraint failed on the fields: (`userId`,`commentId`)` error
        // when a user click the like button again during this API processing
        // TODO: Refresh UI immediately, call APIs in the background
        console.error(error);
      }
    }
  };

  const handleSubmitReply = async (reply: Node[], commentId: string) => {
    if (!currentUserId) {
      console.error('Please sign-in first');
      return Promise.reject();
    }
    const { data } = await insertOneComment({
      variables: {
        parentId: commentId,
        content: reply,
        pageId,
      },
    });
    if (data?.insertOneComment?.id) {
      const updatedComments = updateReplyInComments(comments, commentId, [
        {
          ...data.insertOneComment!,
          replies: [],
        },
      ]);
      if (updatedComments !== comments) {
        setComments(updatedComments);
      } else {
        console.error(`Can't update reply in comments`);
      }
    }
  };

  useNotifyHostPageOfHeight();

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="main-container py-8">
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} Comment</title>
      </Head>
      <Tabs
        initialValue={COMMENT_TAB_VALUE}
        className=""
        rightItems={
          isLogin ? <DropDownUser avatar={avatar} name={displayName} /> : <DropDownLogin />
        }
      >
        <Tabs.Item label={`Comments`} value={COMMENT_TAB_VALUE}>
          <div className="space-y-7">
            <div className="space-y-2">
              <RichTextEditor
                onSubmit={handleSubmit}
                postButtonLabel={!isLogin ? 'Login' : undefined}
              />
            </div>

            {comments?.map((comment: CommentLeaf) => (
              <CommentTree
                key={comment.id}
                comment={comment}
                onClickLikeAction={handleClickLikeAction}
                onSubmitReply={handleSubmitReply}
              />
            ))}
          </div>
        </Tabs.Item>
        <Tabs.Item
          label={process.env.NEXT_PUBLIC_APP_NAME}
          value={process.env.NEXT_PUBLIC_APP_NAME}
        />
      </Tabs>
      <PoweredBy />
    </div>
  );
}

type PathParams = {
  pageId: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const adminApollo = getAdminApollo();
  const pages = (
    await adminApollo.query({
      query: PagesDocument,
    })
  ).data.pages;

  const paths: { params: PathParams }[] = pages.map(({ id }) => {
    return {
      params: {
        pageId: id,
      },
    };
  });

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = PathParams & {
  comments: CommentLeaf[];
};
type StaticError = {
  error?: string;
};

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  try {
    if (!params?.pageId) {
      return { notFound: true };
    }
    const { pageId } = params;
    const adminApollo = getAdminApollo();
    const pageResult = await adminApollo.query({
      query: CommentTreeDocument,
      variables: {
        pageId,
      },
    });

    if (!pageResult.data?.comments) {
      return { notFound: true };
    }
    const { comments } = pageResult.data;

    return {
      props: { comments, pageId },
      revalidate: 1,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
