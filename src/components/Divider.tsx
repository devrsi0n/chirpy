import clsx from 'clsx';
import * as React from 'react';

export type DividerProps = React.ComponentPropsWithoutRef<'div'>;

export function Divider({ className, style, ...divProps }: DividerProps): JSX.Element {
  const [isRetina, setIsRetina] = React.useState(false);
  React.useEffect(() => {
    if (window.devicePixelRatio && devicePixelRatio >= 2) {
      setIsRetina(true);
    }
  }, []);
  return (
    <>
      <div
        role="separator"
        className={clsx(
          'w-auto max-w-full relative bg-divider',
          isRetina && 'hairlines',
          className,
        )}
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
          @apply bg-divider;
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
