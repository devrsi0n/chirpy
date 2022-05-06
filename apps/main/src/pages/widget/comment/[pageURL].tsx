import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import * as React from 'react';
import superjson from 'superjson';
import { OperationResult } from 'urql';
import { pipe, subscribe } from 'wonka';

import { CommentTrees, WidgetLayout, PoweredBy } from '@chirpy/blocks';
import { CommentContextProvider } from '@chirpy/contexts';
import {
  CommentTreeDocument,
  CommentTreeSubscription,
  useCommentTreeSubscription,
} from '@chirpy/client-graphql/generated/comment';
import { ThemeOfPageDocument, ThemeOfPageQuery } from '@chirpy/client-graphql/generated/page';
import { useCreateAComment, useToggleALikeAction } from '@chirpy/contexts';
import { useWidgetSideEffects } from '@chirpy/hooks';
import { getAdminGqlClient } from '$/lib/admin-gql-client';
import {
  PageByUrlOnlyDocument,
  PageByUrlOnlyQuery,
  PagesDocument,
  PagesQuery,
} from '@chirpy/server-graphql/generated/page';
import { CommonWidgetProps, Theme, CommentLeafType } from '@chirpy/types';
import { ssrMode } from '@chirpy/utilities';

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * Comment tree widget for a page
 * @param props
 */
export default function CommentWidgetPage(props: PageCommentProps): JSX.Element {
  let error = '';
  let pageId = '';
  let pageURL = '';

  if (isStaticError(props)) {
    error = props.error;
  } else {
    pageId = props.pageId;
    pageURL = props.pageURL;
  }
  const [{ data }] = useCommentTreeSubscription({
    variables: { pageURL },
    pause: ssrMode,
  });
  const comments = data?.comments || (isStaticError(props) ? [] : props.comments || []);

  useWidgetSideEffects();

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
    <WidgetLayout widgetTheme={props.theme} title="Comment">
      <CommentContextProvider projectId={props.projectId}>
        <div className="pt-1">
          <CommentTrees {...{ comments, onSubmitReply, onClickLikeAction }} />
        </div>
        <PoweredBy />
      </CommentContextProvider>
    </WidgetLayout>
  );
}

type PathParams = {
  pageURL: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const client = getAdminGqlClient();
  const { data } = await client.query<PagesQuery>(PagesDocument).toPromise();

  const paths: { params: PathParams }[] =
    data?.pages.map(({ url }) => {
      return {
        params: {
          pageURL: url,
        },
      };
    }) || [];

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
};

type StaticProps = PathParams &
  CommonWidgetProps & {
    comments: CommentLeafType[];
    pageId: string;
  };
type StaticError = {
  error: string;
};

export const getStaticProps: GetStaticProps<StaticProps | StaticError, PathParams> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<GetStaticPropsResult<StaticProps | StaticError>> => {
  if (!params?.pageURL) {
    return { notFound: true };
  }
  const { pageURL } = params;
  const client = getAdminGqlClient();
  const pageQuery = await client
    .query<PageByUrlOnlyQuery>(PageByUrlOnlyDocument, { url: pageURL })
    .toPromise();
  const pageId = pageQuery.data?.pages?.[0]?.id;
  if (!pageId) {
    return { notFound: true };
  }

  try {
    const { data } = await new Promise<OperationResult<CommentTreeSubscription>>(
      (resolve /*reject*/) => {
        // @ts-ignore
        /*const { unsubscribe } = */ pipe<OperationResult<CommentTreeSubscription>>(
          client.subscription(CommentTreeDocument, { pageURL }),
          subscribe((result) => {
            // console.log(result);
            resolve(result);
          }),
        );
      },
    );

    if (!data?.comments) {
      return { notFound: true };
    }
    const { comments } = data;
    const themeResult = await client
      .query<ThemeOfPageQuery>(ThemeOfPageDocument, {
        pageId,
      })
      .toPromise();
    if (!themeResult?.data?.pageByPk) {
      console.error(`Can't find theme info`);
      return { notFound: true };
    }
    return {
      props: {
        comments,
        pageURL,
        pageId,
        projectId: themeResult.data.pageByPk.project.id,
        theme: (themeResult.data.pageByPk.project.theme as Theme) || null,
        isWidget: true,
      },
    };
  } catch (error) {
    console.error(superjson.stringify(error));
    return { notFound: true };
  }
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}