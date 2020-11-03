import * as React from 'react';

export type CodeProps = React.PropsWithChildren<{
  attributes: React.ComponentProps<'pre'>;
}>;

export function Code(props: CodeProps): JSX.Element {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}
