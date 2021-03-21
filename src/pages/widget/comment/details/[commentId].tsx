import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';
import tw from 'twin.macro';

import { getAdminApollo } from '$server/common/admin-apollo';
import {
  CommentDetailsDocument,
  CommentsDocument, // useCreateOneLikeMutation,
  // useDeleteOneLikeMutation,
} from '$server/graphql/generated/comment';

import { CommentLinkedList } from '$/blocks/CommentLinkedList';
// import { deleteOneLikeInComments } from '$/utilities/comment';
import { PoweredBy } from '$/blocks/PoweredBy';
import { IconButton } from '$/components/Button';
import { useCurrentUser } from '$/hooks/useCurrentUser';
import { CommentDetailNode } from '$/types/widget';

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
    <div className="main-container" css={tw`py-8`}>
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
