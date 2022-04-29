import clsx from 'clsx';
import React from 'react';

import styles from './analytics.module.scss';

interface FadeInProps {
  className?: string;
  show: boolean;
  children: React.ReactNode;
}

export default function FadeIn({ className, show, children }: FadeInProps) {
  return (
    <div className={clsx(show ? styles['fade-enter-active'] : styles['fade-enter'], className)}>
      {children}
    </div>
  );
}
