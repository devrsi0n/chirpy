import { CommonWidgetProps } from '@chirpy-dev/types';
import * as React from 'react';

import { CommentForest, WidgetLayout, PoweredBy } from '../../blocks';
import { Text } from '../../components';
import { CommentContextProvider } from '../../contexts';
import { trpcClient } from '../../utilities/trpc-client';
import { useIntervalRefrsh } from './use-interval-refrsh';

export type PageCommentProps = CommonWidgetProps & {
  pageURL: string;
  pageId: string;
};

/**
 * Comment tree widget for a page
 * @param props
 */
export function CommentWidgetPage(props: PageCommentProps): JSX.Element {
  const { data: comments, refetch } = trpcClient.comment.forest.useQuery({
    url: props.pageURL,
  });
  useIntervalRefrsh(refetch);

  if (isStaticError(props) || !comments) {
    return (
      <Text>{`Can't find a Chirpy comment widget with this page, please contact the support.`}</Text>
    );
  }

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment">
      <CommentContextProvider
        projectId={props.projectId}
        pageId={props.pageId}
        refetchComment={refetch}
      >
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
