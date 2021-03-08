import * as React from 'react';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';

import { CommentDetailNode } from '$/types/widget';
import {
  CommentDetailsDocument,
  CommentsDocument,
  // useCreateOneLikeMutation,
  // useDeleteOneLikeMutation,
} from '$server/graphql/generated/comment';
import { useCurrentUser } from '$/hooks/useCurrentUser';
// import { deleteOneLikeInComments } from '$/utilities/comment';
import { PoweredBy } from '$/blocks/PoweredBy';
import { CommentLinkedList } from '$/blocks/CommentLinkedList';
import { IconButton } from '$/components/Button';
import { getAdminApollo } from '$server/common/admin-apollo';

const handleSubmitReply = () => {
  return Promise.resolve();
};
const handleClickBack = () => {
  window.history.back();
};

// Demo: http://localhost:3000/widget/comment/details/ckjqveq4q0000docvo1otdtfb
export default function CommentDetailsWidget({
  comment,
}: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
  // const [createOneLike] = useCreateOneLikeMutation();
  // const [deleteOneLike] = useDeleteOneLikeMutation();
  const { id: currentUserId } = useCurrentUser();
  const handleClickLikeAction = async (isLiked: boolean, likeId: string, commentId: string) => {
    if (!currentUserId) {
      throw new Error('Login first');
    }
    console.log('handleClick');
  };

  return (
    <div className="main-container py-8">
      <div>
        <IconButton icon="arrow-left" size="lg" onClick={handleClickBack} />
      </div>
      {comment?.id && (
        <CommentLinkedList
          key={comment!.id}
          comment={comment!}
          onClickLikeAction={handleClickLikeAction}
          onSubmitReply={handleSubmitReply}
        />
      )}
      <PoweredBy />
    </div>
  );
}
type PathParams = {
  commentId: string;
};

type StaticProps = PathParams & {
  comment: CommentDetailNode;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const adminApollo = getAdminApollo();
  const comments = (
    await adminApollo.query({
      query: CommentsDocument,
    })
  ).data.comments;
  const paths = comments.map(({ id }) => ({
    params: {
      commentId: id,
    },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<StaticProps, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps>> => {
  if (!params?.commentId) {
    return { notFound: true };
  }
  const { commentId } = params;
  const adminApollo = getAdminApollo();
  const pageResult = await adminApollo.query({
    query: CommentDetailsDocument,
    variables: {
      id: commentId,
    },
  });

  if (!pageResult.data?.commentByPk) {
    return { notFound: true };
  }
  const { commentByPk } = pageResult.data;

  return {
    props: { comment: commentByPk, commentId },
    revalidate: 1,
  };
};
