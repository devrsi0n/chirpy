import * as React from 'react';
import { RenderElementProps } from 'slate-react';

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
        <pre>
          <code
            {...mergedProps}
            /* attributes={{
              contentEditable: false,
              style: { userSelect: 'none' },
            }} */
          />
        </pre>
      );
    case 'paragraph':
      return <p {...mergedProps} /* contentEditable={false} style={{ userSelect: 'none' }} */ />;
    default:
      return <p {...mergedProps} /* contentEditable={false} style={{ userSelect: 'none' }} */ />;
  }
}
