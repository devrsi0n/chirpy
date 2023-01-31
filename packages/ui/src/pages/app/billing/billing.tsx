import * as React from 'react';

import { PageTitle } from '../../../blocks';
import { AppLayout } from '../components/app-layout';

export function Billing(): JSX.Element {
  return (
    <AppLayout title="Billing">
      <PageTitle className="mb-4">Billing</PageTitle>
    </AppLayout>
  );
}
