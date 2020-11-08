import * as React from 'react';
import { RenderElementProps } from 'slate-react';
import { Code } from '$/components/Code';
import { Text } from '$/components/Text';

export function RenderElement(props: RenderElementProps): JSX.Element {
  switch (props.element.type) {
    case 'code':
      return <Code {...props} />;
    case 'paragraph':
      return <Text {...props} />;
    default:
      return <Text {...props} />;
  }
}
