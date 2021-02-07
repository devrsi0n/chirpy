import * as React from 'react';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import { ExecutionResult } from 'graphql';

import { prisma } from '$server/context';
import { CommentDetails } from '$/types/widget';
import { queryGraphql } from '$server/queryGraphQL';
import {
  CommentDetailsDocument,
  CommentDetailsQuery,
  CommentDetailsQueryVariables,
  // useCreateOneLikeMutation,
  // useDeleteOneLikeMutation,
} from '$/graphql/generated/comment';
import { useCurrentUser } from '$/hooks/useCurrentUser';
// import { deleteOneLikeInComments } from '$/utilities/comment';
import { PoweredBy } from '$/blocks/PoweredBy';
import { CommentLinkedList } from '$/blocks/CommentLinkedList';
import { IconButton } from '$/components/Button';

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
  const { data: userData } = useCurrentUser();
  const currentUserId = userData?.currentUser?.id;
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
  comment: CommentDetails;
};

export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const comments = await prisma.comment.findMany({
    select: {
      id: true,
    },
  });
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

  const pageResult: ExecutionResult<
    CommentDetailsQuery,
    CommentDetailsQueryVariables
  > = await queryGraphql(CommentDetailsDocument, {
    commentId,
  });

  if (!pageResult.data?.comment) {
    return { notFound: true };
  }
  const { comment } = pageResult.data;

  return {
    props: { comment, commentId },
    revalidate: 1,
  };
};
