import * as React from 'react';

import { SiteLayout } from '../../blocks';
import { Heading } from '../../components';
import { isSSRMode } from 'utils';

export function DeleteConfirmation(): JSX.Element {
  return (
    <SiteLayout title="Delete confirmation">
      <div className="space-y-8">
        <Heading as="h1">
          Thanks, your facebook account was deleted. Status code{' '}
          {!isSSRMode ? new URLSearchParams(location.search).get('code') : ''}
        </Heading>
      </div>
    </SiteLayout>
  );
}
