import * as React from 'react';
import { RenderElementProps } from 'slate-react';

import { Code } from '$/components/Code';
import { Text } from '$/components/Text';
import { useRichTextEditorContext } from './RichTextEditorContext';

export function Element(props: RenderElementProps): JSX.Element {
  const { disabled } = useRichTextEditorContext();
  const mergedProps = {
    ...props,
    disabled,
  };

  switch (props.element.type) {
    case 'code':
      return <Code {...mergedProps} />;
    case 'paragraph':
      return <Text {...mergedProps} />;
    default:
      return <Text {...mergedProps} />;
  }
}
