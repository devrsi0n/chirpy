import { trpc } from '@chirpy-dev/trpc/src/client';
import { CommonWidgetProps } from '@chirpy-dev/types';
import * as React from 'react';

import { CommentForest, PoweredBy, WidgetLayout } from '../../blocks';
import { Text } from '../../components';
import { CommentContextProvider } from '../../contexts';
import { useRefetchInterval } from './use-refetch-interval';

export type PageCommentProps = CommonWidgetProps & {
  pageURL: string;
  pageId: string;
};

/**
 * Comment tree widget for a page
 * @param props
 */
export function CommentWidgetPage(props: PageCommentProps): JSX.Element {
  const refetchInterval = useRefetchInterval();
  const { data: comments } = trpc.comment.forest.useQuery(
    {
      url: props.pageURL,
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
      <CommentContextProvider projectId={props.projectId} pageId={props.pageId}>
        <div className="pt-1">
          {/* @ts-ignore */}
          <CommentForest comments={comments} />
        </div>
        <PoweredBy />
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
