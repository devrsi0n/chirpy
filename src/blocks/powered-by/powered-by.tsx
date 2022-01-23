import * as React from 'react';
import 'twin.macro';

import { Logo } from '$/components/logo';
import { Text } from '$/components/text';

export type PoweredByProps = React.PropsWithChildren<{
  //
}>;

export function PoweredBy(/* props: PoweredByProps */): JSX.Element {
  return (
    <div tw="flex flex-row items-center justify-end mt-4 space-x-1">
      <Text variant="secondary">Powered by</Text>
      <Logo size="sm" hideSpacing linkProps={{ target: '_blank' }} />
    </div>
  );
}
