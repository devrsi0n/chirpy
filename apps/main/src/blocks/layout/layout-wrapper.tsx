import clsx from 'clsx';
import Head from 'next/head';
import * as React from 'react';

export type LayoutWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function LayoutWrapper({ title, children, className }: LayoutWrapperProps): JSX.Element {
  return (
    <>
      <Head>
        <title>
          {title}
          {title ? '・' : ''}Chirpy
        </title>
      </Head>
      <div className={clsx(`flex min-h-full flex-col font-sans text-gray-1100`, className)}>
        {children}
      </div>
    </>
  );
}
