import { Logo, Text } from '@chirpy-dev/ui';
import * as React from 'react';

export function PoweredBy(): JSX.Element {
  return (
    <div className="mt-4 flex flex-row items-center justify-end space-x-1">
      <Text variant="secondary">Powered by</Text>
      <Logo size="sm" hideSpacing linkProps={{ target: '_blank' }} />
    </div>
  );
}
