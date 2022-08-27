import Avvvatars from 'avvvatars-react';
import dynamic from 'next/dynamic';
import * as React from 'react';

const LazyAvvvatar = dynamic(
  () => import(/* webpackChunkName: "custom-avatar" */ 'avvvatars-react'),
  {
    suspense: true,
  },
);

export function DeferredCustomAvatar({
  fallback,
  className,
  ...props
}: React.ComponentProps<typeof Avvvatars> & {
  fallback: JSX.Element;
  className?: string;
}) {
  return (
    <React.Suspense fallback={fallback}>
      <div className={className}>
        <LazyAvvvatar
          {...props}
          style={
            props.style ||
            (props.value.split('@')[0][1].toLowerCase() > 'n'
              ? 'character'
              : 'shape')
          }
        />
      </div>
    </React.Suspense>
  );
}
