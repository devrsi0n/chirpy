import { useSubscription } from '@apollo/client';
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
import { CommentsDocument } from '$server/graphql/generated/comment';

import { CommentLinkedList } from '$/blocks/CommentLinkedList';
import { PoweredBy } from '$/blocks/PoweredBy';
import { IconButton } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { CommentDetailsQuery, CommentDetailsQueryVariables } from '$/graphql/generated/comment';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { CommentDetailNode } from '$/types/widget';
import {
  getQueryCommentDetailsDoc,
  getSubscribeCommentDetailsDoc,
} from '$/utilities/comment-request';

const handleClickBack: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  window.history.go(-1);
  event.preventDefault();
};

// Demo: http://localhost:3000/widget/comment/details/bd15c46c-67e6-424e-a68d-2aa3b9462093
export default function CommentDetailsWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const handleSubmitReply = useCreateAComment({ pageId: props.comment?.pageId || '' });

  const handleClickLikeAction = useToggleALikeAction();
  const { data } = useSubscription<CommentDetailsQuery, CommentDetailsQueryVariables>(
    getSubscribeCommentDetailsDoc(),
    {
      variables: { id: props.commentId },
    },
  );
  const comment = data?.commentByPk || props.comment;

  return (
    <div className="main-container" css={tw`py-8`}>
      <div css={tw`flex flex-row items-center mb-4`}>
        <IconButton
          icon="arrow-left"
          size="md"
          onClick={handleClickBack}
          css={tw`transform -translate-x-4`}
        />
        <Heading as="h4" css={tw`text-gray-600`}>
          Comment details
        </Heading>
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
  const { data } = await adminApollo.query<CommentDetailsQuery>({
    query: getQueryCommentDetailsDoc(),
    variables: {
      id: commentId,
    },
  });

  if (!data?.commentByPk) {
    return { notFound: true };
  }

  return {
    props: { comment: data.commentByPk, commentId },
    revalidate: 1,
  };
};
