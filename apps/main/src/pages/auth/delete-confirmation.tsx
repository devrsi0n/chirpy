import { Heading } from '@chirpy-dev/ui';
import { isSSRMode } from '@chirpy-dev/utils';
import * as React from 'react';

import { SiteLayout } from '../../components/layout';

export default function DeleteConfirmation(): JSX.Element {
  return (
    <SiteLayout title="Delete confirmation">
      <div className="space-y-8">
        <Heading as="h1">
          Thanks, your facebook account was deleted. Status code{' '}
          {isSSRMode ? '' : new URLSearchParams(location.search).get('code')}
        </Heading>
      </div>
    </SiteLayout>
  );
}
