import * as React from 'react';

import { CommentWidget, SiteLayout, PageTitleDeprecated } from '../blocks';
import { Alert } from '../components';

export function PlayGround(): JSX.Element {
  const [showAlert, setShowAlert] = React.useState(true);
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitleDeprecated>Playground</PageTitleDeprecated>
        {showAlert && (
          <Alert
            type="info"
            title="Feel free to play around"
            content={
              process.env.DOCKER
                ? `We don't remove comment automatically`
                : 'We remove stale comments every 24 hours automatically.'
            }
            onClickDismiss={() => setShowAlert(false)}
            hideDismissButton
          />
        )}
      </div>
      <CommentWidget />
    </SiteLayout>
  );
}
