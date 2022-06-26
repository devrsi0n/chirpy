import { useTheme } from 'next-themes';
import Script from 'next/script';
import * as React from 'react';

import { SiteLayout } from '$/blocks/layout';
import { PageTitle } from '$/blocks/page-title';
import { Text } from '$/components/text';

export default function PlayGround(): JSX.Element {
  const { theme } = useTheme();
  return (
    <SiteLayout title="Playground">
      <div className="space-y-8">
        <PageTitle>Playground</PageTitle>
        <Text variant="secondary">Feel free to play around.</Text>
      </div>
      <div
        data-chirpy-comment
        data-chirpy-theme={theme || 'system'}
        className="my-16"
      />
      <Script
        src="/bootstrap/comment.js"
        data-chirpy-domain={process.env.NEXT_PUBLIC_COMMENT_DOMAIN}
      />
    </SiteLayout>
  );
}
