import { useCommentTreeSubscription } from '@chirpy-dev/graphql';
import { CommonWidgetProps, CommentLeafType } from 'types';
import { isSSRMode } from '@chirpy-dev/utils';
import { CommentTrees, WidgetLayout, PoweredBy } from '../../blocks';
import { CommentContextProvider } from '../../contexts';

export type PageCommentProps = CommonWidgetProps & {
  pageURL: string;
  comments: CommentLeafType[];
  pageId: string;
};

/**
 * Comment tree widget for a page
 * @param props
 */
export function CommentWidgetPage(props: PageCommentProps): JSX.Element {
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
    pause: isSSRMode,
  });
  const comments =
    data?.comments || (isStaticError(props) ? [] : props.comments || []);

  if (error) {
    return <p>{error}</p>;
  }
  // TODO: resolve this comments undefined error
  if (isStaticError(props)) {
    return <p>Wrong page.</p>;
  }

  return (
    <WidgetLayout widgetTheme={props.theme} title="Comment">
      <CommentContextProvider projectId={props.projectId} pageId={pageId}>
        <div className="pt-1">
          <CommentTrees comments={comments} />
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
