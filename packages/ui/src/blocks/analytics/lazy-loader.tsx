import React, { useRef, useEffect } from 'react';

interface LazyLoaderProps {
  onVisible?: () => void;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function LazyLoader(props: LazyLoaderProps): JSX.Element {
  const element = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elm = element.current;
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

    observer.current.observe(element.current);

    return () => {
      observer.current?.unobserve(elm);
    };
  }, []);

  return (
    <div ref={element} className={props.className} style={props.style}>
      {props.children}
    </div>
  );
}

export default LazyLoader;
