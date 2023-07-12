import clsx from 'clsx';
import { Highlight, themes } from 'prism-react-renderer';
import * as React from 'react';

export type CodeProps = React.ComponentProps<'pre'> & {
  children: string;
  language: 'html' | 'js' | 'ts';
};

export function Code({
  children,
  className,
  language,
  ...preProps
}: CodeProps): JSX.Element {
  return (
    <Highlight theme={themes.dracula} code={children} language={language}>
      {({
        className: innerClsx,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => (
        <pre
          {...preProps}
          className={clsx(
            'whitespace-pre-wrap rounded-md px-3 py-4 text-gray-1100',
            innerClsx,
            className,
          )}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="me-3 select-none">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
