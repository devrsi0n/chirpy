import clsx from 'clsx';
import * as React from 'react';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

export function Divider({ className, style, ...divProps }: DividerProps): JSX.Element {
  const isRetina = window && window.devicePixelRatio && devicePixelRatio >= 2;
  return (
    <>
      <div
        role="separator"
        className={clsx('w-auto max-w-full relative', isRetina && 'hairlines', className)}
        style={{
          ...(!isRetina && {
            height: '1px',
          }),
          ...style,
        }}
        {...divProps}
      />
      <style jsx>{`
        .hairlines:after {
          @apply bg-gray-400;
          content: '';
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          transform: scaleY(0.5);
          transform-origin: 0 0;
        }
      `}</style>
    </>
  );
}
