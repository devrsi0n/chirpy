import { FetchResult } from '@apollo/client';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsResult,
} from 'next';
import * as React from 'react';
import superjson from 'superjson';
import tw from 'twin.macro';

import { CommentLinkedList } from '$/blocks/CommentLinkedList';
import { PoweredBy } from '$/blocks/PoweredBy';
import { UserDropDown } from '$/blocks/UserDropDown';
import { IconButton } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { Link } from '$/components/Link';
import { CommentContextProvider } from '$/contexts/CommentContext';
import {
  CommentDetailsDocument,
  CommentDetailsSubscription,
  useCommentDetailsSubscription,
} from '$/graphql/generated/comment';
import { ThemeOfPageDocument, ThemeOfPageQuery } from '$/graphql/generated/page';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { useWidgetSideEffects } from '$/hooks/useWidgetSideEffects';
import { getAdminApollo } from '$/server/common/admin-apollo';
import { CommentsDocument } from '$/server/graphql/generated/comment';
import { CommonWidgetProps } from '$/types/page.type';
import { Theme } from '$/types/theme.type';
import { CommentDetailNode } from '$/types/widget';

// Demo: http://localhost:3000/widget/comment/details/bd15c46c-67e6-424e-a68d-2aa3b9462093
export default function CommentDetailsWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const handleSubmitReply = useCreateAComment({ pageId: props.comment?.pageId || '' });

  const handleClickLikeAction = useToggleALikeAction();
  const { data } = useCommentDetailsSubscription({
    variables: { id: props.commentId },
  });

  useWidgetSideEffects();

  const comment = data?.commentByPk || props.comment;

  return (
    <CommentContextProvider projectId={props.projectId}>
      <div css={tw`flex flex-row justify-between items-center mb-4`}>
        <Link href={`/widget/comment/${comment?.pageId}`} variant="plain">
          <IconButton css={tw`transform translate-x-1`}>
            <ArrowLeft size={20} />
          </IconButton>
        </Link>
        <Heading as="h4">
          <span tw="font-bold">{comment?.user.name}</span>
          <span>{`'s comment details`}</span>
        </Heading>
        <UserDropDown variant="Widget" />
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
    </CommentContextProvider>
  );
}
type PathParams = {
  commentId: string;
};

type StaticProps = PathParams &
  CommonWidgetProps & {
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

  const commentDetailsSubscription = adminApollo.subscribe<CommentDetailsSubscription>({
    query: CommentDetailsDocument,
    variables: {
      id: commentId,
    },
  });
  try {
    const { data } = await new Promise<FetchResult<CommentDetailsSubscription>>(
      (resolve, reject) => {
        commentDetailsSubscription.subscribe(
          (value) => {
            resolve(value);
          },
          (error) => {
            reject(error);
          },
        );
      },
    );

    if (!data?.commentByPk) {
      return { notFound: true };
    }

    const themeResult = await adminApollo.query<ThemeOfPageQuery>({
      query: ThemeOfPageDocument,
      variables: {
        pageId: data.commentByPk.pageId,
      },
    });
    if (!themeResult.data.pageByPk) {
      console.error(`Can't find page info`);
      return { notFound: true };
    }

    return {
      props: {
        projectId: themeResult.data.pageByPk.project.id,
        comment: data.commentByPk,
        commentId,
        theme: (themeResult.data.pageByPk?.project.theme as Theme) || null,
        isWidget: true,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};
