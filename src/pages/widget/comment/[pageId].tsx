import { FetchResult } from '@apollo/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import Head from 'next/head';
import * as React from 'react';
import superjson from 'superjson';
import 'twin.macro';

import { getAdminApollo } from '$server/common/admin-apollo';
import { PagesDocument } from '$server/graphql/generated/page';

import { CommentWidget } from '$/blocks/CommentWidget';
import { PoweredBy } from '$/blocks/PoweredBy';
import { WidgetLayout } from '$/components/Layout';
import { ThemeProvider } from '$/components/ThemeProvider';
import {
  CommentTreeDocument,
  CommentTreeSubscription,
  useCommentTreeSubscription,
} from '$/graphql/generated/comment';
import { ThemeOfPageDocument, ThemeOfPageQuery } from '$/graphql/generated/page';
import { useCreateAComment } from '$/hooks/useCreateAComment';
import { useNotifyHostHeightOfPage } from '$/hooks/useNotifyHostHeightOfPage';
import { useToggleALikeAction } from '$/hooks/useToggleALikeAction';
import { Theme } from '$/types/theme.type';
import { CommentLeafType } from '$/types/widget';

dayjs.extend(relativeTime);

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

// Demo: http://localhost:3000/widget/comment/b5a16120-593c-492f-ad94-e14d247485f3

/**
 * Comment tree widget for a page
 * @param props
 */
export default function CommentPageWidget(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  let theme;

  if (isStaticError(props)) {
    error = props.error!;
  } else {
    pageId = props.pageId;
    theme = props.theme;
  }
  const { data } = useCommentTreeSubscription({
    variables: { pageId },
  });
  const comments = data?.comments || (isStaticError(props) ? [] : props.comments || []);

  useNotifyHostHeightOfPage();

  const onSubmitReply = useCreateAComment({ pageId });
  const onClickLikeAction = useToggleALikeAction();

  if (error) {
    return <p>{error}</p>;
  }
  // TODO: resolve this comments undefined error
  if (isStaticError(props)) {
    return <p>Wrong page.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <WidgetLayout projectId={props.projectId}>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME} Comment</title>
        </Head>
        <CommentWidget {...{ comments, pageId, onSubmitReply, onClickLikeAction }} />
        <PoweredBy />
      </WidgetLayout>
    </ThemeProvider>
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
  projectId: string;
  comments: CommentLeafType[];
  theme: Theme;
};
type StaticError = {
  error: string;
};

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  if (!params?.pageId) {
    return { notFound: true };
  }
  const { pageId } = params;
  const adminApollo = getAdminApollo();
  const commentTreeSubscription = adminApollo.subscribe<CommentTreeSubscription>({
    query: CommentTreeDocument,
    variables: {
      pageId,
    },
  });
  try {
    const { data } = await new Promise<FetchResult<CommentTreeSubscription>>((resolve, reject) => {
      commentTreeSubscription.subscribe(
        (value) => {
          resolve(value);
        },
        (error) => {
          reject(error);
        },
      );
    });

    if (!data?.comments) {
      return { notFound: true };
    }
    const { comments } = data;
    const themeResult = await adminApollo.query<ThemeOfPageQuery>({
      query: ThemeOfPageDocument,
      variables: {
        pageId,
      },
    });
    if (!themeResult?.data.pageByPk) {
      console.error(`Can't find theme info`);
      return { notFound: true };
    }
    return {
      props: {
        comments,
        pageId,
        projectId: themeResult.data.pageByPk.project.id,
        theme: (themeResult.data.pageByPk?.project.theme as Theme) || null,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
