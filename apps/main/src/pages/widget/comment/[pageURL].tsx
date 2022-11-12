import {
  CommentTreeDocument,
  CommentTreeSubscription,
  CommentTreeSubscriptionVariables,
  ThemeOfPageDocument,
  PageByUrlOnlyDocument,
  FreshPagesDocument,
} from '@chirpy-dev/graphql';
import { CommonWidgetProps, Theme, CommentLeafType } from '@chirpy-dev/types';
import {
  GetStaticProps,
  InferGetStaticPropsType,
  GetStaticPropsResult,
  GetStaticPropsContext,
  GetStaticPaths,
} from 'next';
import { log } from 'next-axiom';
import superjson from 'superjson';
import { OperationResult } from 'urql';
import { pipe, subscribe } from 'wonka';

import { getAdminGqlClient } from '$/lib/admin-gql-client';
import { query } from '$/server/common/gql';

export type PageCommentProps = InferGetStaticPropsType<typeof getStaticProps>;

/**
 * Comment tree widget for a page
 * @param props
 */

type PathParams = {
  pageURL: string;
};

const client = getAdminGqlClient();

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  if (process.env.DOCKER) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
  const freshPages = await query(
    FreshPagesDocument,
    {
      limit: 50,
    },
    'pages',
  );

  const paths: { params: PathParams }[] =
    freshPages.map(({ url }) => {
      return {
        params: {
          pageURL: url,
        },
      };
    }) || [];

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: 'blocking' };
};

type StaticProps = PathParams &
  CommonWidgetProps & {
    comments: CommentLeafType[];
    pageId: string;
  };
type StaticError = {
  error: string;
};

export const getStaticProps: GetStaticProps<
  StaticProps | StaticError,
  PathParams
> = async ({
  params,
}: GetStaticPropsContext<PathParams>): Promise<
  GetStaticPropsResult<StaticProps | StaticError>
> => {
  if (!params?.pageURL) {
    return { notFound: true };
  }
  const { pageURL } = params;
  const pages = await query(PageByUrlOnlyDocument, { url: pageURL }, 'pages');
  const pageId = pages?.[0]?.id;
  if (!pageId) {
    return { notFound: true };
  }

  try {
    const { data } = await new Promise<
      OperationResult<CommentTreeSubscription>
    >((resolve /*reject*/) => {
      pipe<
        OperationResult<
          CommentTreeSubscription,
          CommentTreeSubscriptionVariables
        >,
        any
      >(
        // @ts-ignore
        client.subscription(CommentTreeDocument, { pageURL }),
        subscribe((result) => {
          // log.debug(result);
          resolve(result);
        }),
      );
    });

    if (!data?.comments) {
      return { notFound: true };
    }
    const { comments } = data;
    const pageByPk = await query(
      ThemeOfPageDocument,
      {
        pageId,
      },
      'pageByPk',
    );
    if (!pageByPk) {
      log.error(`Can't find theme info`);
      return { notFound: true };
    }
    return {
      props: {
        comments,
        pageURL,
        pageId,
        projectId: pageByPk.project.id,
        theme: (pageByPk.project.theme as Theme) || null,
        isWidget: true,
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};

export { CommentWidgetPage as default } from '@chirpy-dev/ui';
