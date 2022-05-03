import Script from 'next/script';
import * as React from 'react';

import { SiteLayout } from '@chirpy/blocks';
import { PageTitle } from '@chirpy/blocks';
import { isENVDev } from '$/server/utilities/env';

export default function PlayGround(): JSX.Element {
  return (
    <SiteLayout title="Playground">
      <PageTitle>Playground</PageTitle>
      <div data-chirpy-comment className="my-16" />
      <Script
        src="/bootstrap/comment.js"
        strategy={isENVDev ? 'afterInteractive' : 'beforeInteractive'}
        data-chirpy-domain={process.env.NEXT_PUBLIC_COMMENT_DOMAIN}
      />
    </SiteLayout>
  );
}
