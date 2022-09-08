import * as React from 'react';

import { CommentWidget } from '$/blocks/comment-widget';
import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Alert } from '$/components/alert';

export default function PlayGround(): JSX.Element {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitle>Playground</PageTitle>
        {showAlert && (
          <Alert
            type="info"
            title="Feel free to play around"
            content="We remove stale comments every 24hours automatically."
            onClickDismiss={() => setShowAlert(false)}
            hideDismissButton
          />
        )}
      </div>
      <CommentWidget />
    </SiteLayout>
  );
}
