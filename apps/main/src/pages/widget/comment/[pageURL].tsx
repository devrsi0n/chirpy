import { prisma, ssg } from '@chirpy-dev/trpc';
import { trpc } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, Theme } from '@chirpy-dev/types';
import { Text } from '@chirpy-dev/ui';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { log } from 'next-axiom';
import * as React from 'react';
import superjson from 'superjson';

import { CommentForest } from '../../../components/comment-forest';
import { WidgetLayout } from '../../../components/layout';
import { PoweredBy } from '../../../components/powered-by';
import { CommentContextProvider } from '../../../contexts';
import { useRefetchInterval } from '../../../hooks/use-refetch-interval';

/**
 * Comment tree widget for a page
 * @param props
 */

type PathParams = {
  pageURL: string;
};

// Get all project then prerender all their page comments
export const getStaticPaths: GetStaticPaths<PathParams> = async () => {
  const freshPages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      url: true,
    },
  });

  const paths: { params: PathParams }[] =
    freshPages
      // Nodejs FS can't handle too long file name, so we just don't build static json for those
      .filter(({ url }) => url.length < 128)
      .map(({ url }) => {
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

type StaticProps = PageCommentProps;

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
  const page = await prisma.page.findUnique({
    where: {
      url: pageURL,
    },
    select: {
      id: true,
      url: true,
      authorId: true,
      project: {
        select: {
          id: true,
          theme: true,
          user: {
            select: {
              plan: true,
            },
          },
        },
      },
    },
  });
  const pageId = page?.id;
  if (!pageId) {
    return { notFound: true };
  }

  try {
    await ssg.comment.forest.prefetch({
      url: pageURL,
    });

    if (!page.project.id) {
      log.error(`Can't find  the project`, page);
      return { notFound: true };
    }
    return {
      props: {
        trpcState: ssg.dehydrate(),
        page,
        projectId: page.project.id,
        theme: (page.project.theme as Theme) || null,
        isWidget: true,
        plan: page.project.user?.plan || 'HOBBY',
      },
      revalidate: 5 * 60,
    };
  } catch (error) {
    log.error(superjson.stringify(error));
    return { notFound: true };
  }
};

export type PageCommentProps = CommonWidgetProps & {
  page: {
    id: string;
    url: string;
    authorId: string | null;
  };
};

/**
 * Comment tree widget for a page
 * @param props
 */
export default function CommentWidgetPage(
  props: PageCommentProps,
): JSX.Element {
  const refetchInterval = useRefetchInterval();
  const { data: comments } = trpc.comment.forest.useQuery(
    {
      url: props.page.url,
    },
    {
      refetchInterval,
    },
  );

  if (isStaticError(props) || !comments) {
    return (
      <Text>{`Can't find a Chirpy comment widget with this page, please contact the support.`}</Text>
    );
  }

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment">
      <CommentContextProvider projectId={props.projectId} page={props.page}>
        <div className="pt-1">
          <CommentForest comments={comments} />
        </div>
        {props.plan === 'HOBBY' && <PoweredBy />}
      </CommentContextProvider>
    </WidgetLayout>
  );
}

type StaticError = {
  error: string;
};

function isStaticError(props: $TsAny): props is StaticError {
  return !!props.error;
}
