import { trpc, type RouterOutputs } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps, type RTEValue } from '@chirpy-dev/types';
import { getTextFromRteValue } from '@chirpy-dev/utils';
import * as React from 'react';
import type {
  Comment,
  DiscussionForumPosting,
  InteractionCounter,
  LikeAction,
  Person,
  WithContext,
} from 'schema-dts';

import { CommentForest, PoweredBy, WidgetLayout } from '../../blocks';
import { Text } from '../../components';
import { JSONLD } from '../../components/json-ld/json-ld';
import { CommentContextProvider } from '../../contexts';
import { useRefetchInterval } from './use-refetch-interval';

export type PageCommentProps = CommonWidgetProps & {
  page: {
    id: string;
    url: string;
    authorId: string | null;
  };
};

type ForestComment = NonNullable<RouterOutputs['comment']['forest'][number]>;

/**
 * Creates a JSON-LD comment structure recursively for a comment and its replies
 */
function createCommentJsonLd(comment: ForestComment, pageUrl: string): Comment {
  const author: Person = {
    '@type': 'Person',
    name: comment.user.name || '',
    image: comment.user.image || undefined,
  };

  const commentJsonLd: Comment = {
    '@type': 'Comment',
    text: getTextFromRteValue(comment.content as RTEValue),
    dateCreated: comment.createdAt.toISOString(),
    author: author,
    url: `${pageUrl}#comment-${comment.id}`,
  };

  // Add likes information if available
  if (comment.likes && comment.likes.length > 0) {
    commentJsonLd.interactionStatistic = {
      '@type': 'InteractionCounter',
      interactionType: 'https://schema.org/LikeAction' as unknown as LikeAction,
      userInteractionCount: comment.likes.length,
    } as InteractionCounter;
  }

  // Recursively process replies
  if (comment.replies && comment.replies.length > 0) {
    commentJsonLd.comment = comment.replies.map((reply: ForestComment) =>
      createCommentJsonLd(reply, pageUrl),
    ) as Comment[];
  }

  return commentJsonLd;
}

/**
 * Comment tree widget for a page
 * @param props
 */
export function CommentWidgetPage(props: PageCommentProps): JSX.Element {
  const refetchInterval = useRefetchInterval();
  const { data: comments } = trpc.comment.forest.useQuery(
    {
      url: props.page.url,
    },
    {
      refetchInterval,
    },
  );
  const { data: pinnedComments = [] } = trpc.comment.pinnedComments.useQuery({
    url: props.page.url,
  });

  if (isStaticError(props) || !comments) {
    return (
      <Text>{`Can't find a Chirpy comment widget with this page, please contact the support.`}</Text>
    );
  }

  const jsonldUrl = `https://chirpy.dev/widget/comment/${encodeURIComponent(
    props.page.url,
  )}`;
  // Create JSON-LD structured data for the comments
  const jsonLdData: WithContext<DiscussionForumPosting> = {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    headline: `Comments on ${props.page.url} - Powered by Chirpy`,
    url: jsonldUrl,
    comment: [...comments, ...pinnedComments].map((comment: ForestComment) =>
      createCommentJsonLd(comment, jsonldUrl),
    ) as Comment[],
  };

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment">
      <JSONLD<DiscussionForumPosting> data={jsonLdData} />
      <CommentContextProvider projectId={props.projectId} page={props.page}>
        <div className="pt-1">
          {/* @ts-ignore */}
          <CommentForest comments={comments} pinnedComments={pinnedComments} />
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
