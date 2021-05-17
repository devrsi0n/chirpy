import * as React from 'react';
import 'twin.macro';

import { Logo } from '$/components/Logo';
import { Text } from '$/components/Text';

export type PoweredByProps = React.PropsWithChildren<{
  //
}>;

export function PoweredBy(props: PoweredByProps): JSX.Element {
  return (
    <div tw="flex flex-row items-center justify-end mt-4 space-x-1">
      <Text tw="text-gray-400">Powered by</Text>
      <Logo size="sm" noSpacing />
    </div>
  );
}
