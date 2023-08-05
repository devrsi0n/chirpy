import clsx from 'clsx';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';

export type LayoutWrapperProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function LayoutWrapper({
  title,
  children,
  className,
}: LayoutWrapperProps): JSX.Element {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title ? `${title}・Chirpy` : 'Chirpy'}</title>
        <link rel="canonical" href={`https://chirpy.dev${router.asPath}`} />
      </Head>
      <div className={clsx(`font-sans text-gray-1100`, className)}>
        {children}
      </div>
    </>
  );
}
