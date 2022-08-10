import * as React from 'react';

import { CommentWidget } from '$/blocks/comment-widget';
import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Text } from '$/components/text';

export default function PlayGround(): JSX.Element {
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitle>Playground</PageTitle>
        <Text variant="secondary">Feel free to play around.</Text>
      </div>
      <CommentWidget />
    </SiteLayout>
  );
}
