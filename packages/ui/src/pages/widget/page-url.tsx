import { CommonWidgetProps } from '@chirpy-dev/types';

import { CommentForest, WidgetLayout, PoweredBy } from '../../blocks';
import { CommentContextProvider } from '../../contexts';
import { trpcClient } from '../../utilities/trpc-client';

export type PageCommentProps = CommonWidgetProps & {
  pageURL: string;
  pageId: string;
};

/**
 * Comment tree widget for a page
 * @param props
 */
export function CommentWidgetPage(props: PageCommentProps): JSX.Element {
  const { data: comments } = trpcClient.comment.forest.useQuery({
    url: props.pageURL,
  });

  if (isStaticError(props) || !comments) {
    return (
      <p>{`Can't find a Chirpy comment widget with this page, please contact the support.`}</p>
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
