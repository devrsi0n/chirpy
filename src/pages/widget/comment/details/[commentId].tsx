import { FetchResult } from '@apollo/client';
import ArrowLeft from '@geist-ui/react-icons/arrowLeft';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
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

import { getAdminApollo } from '$server/common/admin-apollo';
import { CommentsDocument } from '$server/graphql/generated/comment';

import { CommentLinkedList } from '$/blocks/CommentLinkedList';
import { PoweredBy } from '$/blocks/PoweredBy';
import { UserDropDown } from '$/blocks/UserDropDown';
import { IconButton } from '$/components/Button';
import { Heading } from '$/components/Heading';
import { WidgetLayout } from '$/components/Layout';
import { Link } from '$/components/Link';
import { ThemeProvider } from '$/components/ThemeProvider';
import {
  CommentDetailsDocument,
  CommentDetailsSubscription,
  useCommentDetailsSubscription,
} from '$/graphql/generated/comment';
import { ThemeOfPageDocument, ThemeOfPageQuery } from '$/graphql/generated/page';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useNotifyHostHeightOfPage } from '$/hooks/useNotifyHostHeightOfPage';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { Theme } from '$/types/theme.type';
import { CommentDetailNode } from '$/types/widget';

dayjs.extend(relativeTime);

// Demo: http://localhost:3000/widget/comment/details/bd15c46c-67e6-424e-a68d-2aa3b9462093
export default function CommentDetailsWidget(
  props: InferGetStaticPropsType<typeof getStaticProps>,
): JSX.Element {
  const handleSubmitReply = useCreateAComment({ pageId: props.comment?.pageId || '' });

  const handleClickLikeAction = useToggleALikeAction();
  const { data } = useCommentDetailsSubscription({
    variables: { id: props.commentId },
  });

  useNotifyHostHeightOfPage();

  const comment = data?.commentByPk || props.comment;

  return (
    <ThemeProvider theme={props.theme}>
      <WidgetLayout projectId={props.projectId}>
        <div css={tw`flex flex-row justify-between items-center mb-4`}>
          <Link href={`/widget/comment/${comment?.pageId}`} variant="plain">
            <IconButton size="md" css={tw`transform -translate-x-3`}>
              <ArrowLeft size={20} />
            </IconButton>
          </Link>
          <Heading as="h4" css={tw`text-gray-600`}>
            <span tw="font-bold">{comment?.user.displayName}</span>
            <span>{`'s comment details`}</span>
          </Heading>
          <UserDropDown />
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
      </WidgetLayout>
    </ThemeProvider>
  );
}
type PathParams = {
  commentId: string;
};

type StaticProps = PathParams & {
  projectId: string;
  comment: CommentDetailNode;
  theme?: Theme;
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
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};
