import React, { useRef, useEffect, MutableRefObject } from 'react';

interface LazyLoaderProps {
  onVisible?: () => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default React.forwardRef<HTMLDivElement, LazyLoaderProps>(
  function LazyLoader(props, ref): JSX.Element {
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
      const elm = (ref as MutableRefObject<HTMLDivElement>)?.current;
      if (!elm) {
        return;
      }
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            props.onVisible && props.onVisible();
            observer.current?.unobserve(elm);
          }
        },
        {
          threshold: 0,
        },
      );

      observer.current.observe(elm);

      return () => {
        observer.current?.unobserve(elm);
      };
    }, []);

    return (
      <div ref={ref} className={props.className} style={props.style}>
        {props.children}
      </div>
    );
  },
);
