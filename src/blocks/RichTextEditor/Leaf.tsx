import * as React from 'react';
import { RenderLeafProps } from 'slate-react';

// import { Text } from '$/components/Text';

export function Leaf({ attributes, children, leaf }: RenderLeafProps): JSX.Element {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
}
