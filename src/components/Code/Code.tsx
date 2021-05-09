import * as React from 'react';
import 'twin.macro';

export type CodeProps = React.PropsWithChildren<React.ComponentProps<'pre'>>;

export function Code(props: CodeProps): JSX.Element {
  return (
    <pre tw="py-6 px-3 bg-gray-100 text-gray-600 rounded-sm whitespace-pre-wrap" {...props}>
      <code>{props.children}</code>
    </pre>
  );
}
