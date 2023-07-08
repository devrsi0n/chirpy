import { useInView } from 'framer-motion';
import React, { ReactNode } from 'react';

type InViewProps = {
  children: ReactNode;
  height: number;
};

export default function InView({ children, height }: InViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ height }}>
      {inView && children}
    </div>
  );
}
