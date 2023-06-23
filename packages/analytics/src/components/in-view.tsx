import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';

type InViewProps = {
  children: ReactNode;
  height: number;
};

export default function InView({ children, height }: InViewProps) {
  const [ref, inView] = useInView({ threshold: 0, triggerOnce: true });
  return (
    <div ref={ref} style={{ height }}>
      {inView && children}
    </div>
  );
}
