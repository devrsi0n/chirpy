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
          {title.length > 0 ? '・' : ''}Chirpy
        </title>
      </Head>
      <div className={clsx(`min-h-full font-sans text-gray-1000 flex flex-col`, className)}>
        {children}
      </div>
    </>
  );
}
