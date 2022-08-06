import Avvvatars from 'avvvatars-react';
import * as React from 'react';

const LazyAvvvatar = React.lazy(
  () => import(/* webpackChunkName: "custom-avatar" */ 'avvvatars-react'),
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
          style={
            props.value.split('@')[0][1].toLowerCase() > 'n'
              ? 'character'
              : 'shape'
          }
          {...props}
        />
      </div>
    </React.Suspense>
  );
}
