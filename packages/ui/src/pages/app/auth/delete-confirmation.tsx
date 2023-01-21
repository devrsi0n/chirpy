import { isSSRMode } from '@chirpy-dev/utils';
import * as React from 'react';

import { Heading } from '../../../components';
import { AppLayout } from '../components/app-layout';

export function DeleteConfirmation(): JSX.Element {
  return (
    <AppLayout title="Delete confirmation">
      <div className="space-y-8">
        <Heading as="h1">
          Thanks, your facebook account was deleted. Status code{' '}
          {isSSRMode ? '' : new URLSearchParams(location.search).get('code')}
        </Heading>
      </div>
    </AppLayout>
  );
}
