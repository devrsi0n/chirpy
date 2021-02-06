import { Logo } from '$/components/Logo';
import { Text } from '$/components/Text';
import * as React from 'react';

export type PoweredByProps = React.PropsWithChildren<{
  //
}>;

export function PoweredBy(props: PoweredByProps): JSX.Element {
  return (
    <div className="flex flex-row items-center justify-end mt-4 space-x-1">
      <Text className="text-right">Powered by</Text>
      <Logo size="sm" noSpacing />
    </div>
  );
}
