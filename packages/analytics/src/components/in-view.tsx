import { useInView } from 'framer-motion';
import React, { ReactNode } from 'react';

type InViewProps = {
  children: ReactNode;
  height: number;
};

export default function InView({ children, height }: InViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const hasMounted = React.useRef(false);
  if (!hasMounted.current && inView) {
    // Mount view once and we don't unmount anymore
    hasMounted.current = true;
  }
  return (
    <div ref={ref} style={{ height }}>
      {hasMounted.current && children}
    </div>
  );
}
