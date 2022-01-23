import React from 'react';

interface FadeInProps {
  className?: string;
  show: boolean;
  children: React.ReactNode;
}

export default function FadeIn({ className, show, children }: FadeInProps) {
  return (
    <div className={`${className || ''} ${show ? 'fade-enter-active' : 'fade-enter'}`}>
      {children}
    </div>
  );
}
