import * as React from 'react';
// import { Divider } from '$/components/Divider';
import tw from 'twin.macro';

export type ToolbarProps = React.PropsWithChildren<React.ComponentProps<'div'>>;

export function Toolbar({ className, children, ...divProps }: ToolbarProps): JSX.Element {
  return (
    <div
      css={tw`px-1 py-1 leading-none border dark:border-gray-700 rounded shadow-sm`}
      className={className}
      {...divProps}
    >
      {children}
    </div>
  );
}
