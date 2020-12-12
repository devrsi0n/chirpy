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
      return (
        <Code
          {...mergedProps}
          /* attributes={{
            contentEditable: false,
            style: { userSelect: 'none' },
          }} */
        />
      );
    case 'paragraph':
      return <Text {...mergedProps} /* contentEditable={false} style={{ userSelect: 'none' }} */ />;
    default:
      return <Text {...mergedProps} /* contentEditable={false} style={{ userSelect: 'none' }} */ />;
  }
}
