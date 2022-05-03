import * as React from 'react';

import { SiteLayout } from '@chirpy/blocks';
import { Heading } from '@chirpy/components';
import { ssrMode } from '$/utilities/env';

function DeleteConfirmation(): JSX.Element {
  return (
    <SiteLayout title="Delete confirmation">
      <div className="space-y-8">
        <Heading as="h1">
          Thanks, your facebook account was deleted. Status code{' '}
          {!ssrMode ? new URLSearchParams(location.search).get('code') : ''}
        </Heading>
      </div>
    </SiteLayout>
  );
}

export default DeleteConfirmation;
