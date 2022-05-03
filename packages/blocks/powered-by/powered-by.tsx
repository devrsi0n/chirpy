import * as React from 'react';

import { Logo } from '@chirpy/components';
import { Text } from '@chirpy/components';

export type PoweredByProps = React.PropsWithChildren<{
  //
}>;

export function PoweredBy(/* props: PoweredByProps */): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-end mt-4 space-x-1">
      <Text variant="secondary">Powered by</Text>
      <Logo size="sm" hideSpacing linkProps={{ target: '_blank' }} />
    </div>
  );
}
