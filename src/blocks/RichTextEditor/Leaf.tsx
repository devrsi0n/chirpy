import * as React from 'react';
import { RenderLeafProps } from 'slate-react';

import { Text } from '$/components/Text';

export function Leaf(props: RenderLeafProps): JSX.Element {
  const { attributes, leaf, children } = props;
  let childWithWrap = children;

  if (leaf.bold) {
    childWithWrap = <Text bold>{childWithWrap}</Text>;
  }

  if (leaf.italic) {
    childWithWrap = <Text italic>{childWithWrap}</Text>;
  }

  if (leaf.underline) {
    childWithWrap = <Text underline>{childWithWrap}</Text>;
  }

  return <span {...attributes}>{childWithWrap}</span>;
}
