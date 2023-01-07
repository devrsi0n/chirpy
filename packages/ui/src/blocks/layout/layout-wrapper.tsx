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
  return (
    <>
      <LayoutTitle title={title} />
      <div
        className={clsx(
          `flex min-h-full flex-col font-sans text-gray-1100`,
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export type LayoutTitleProps = {
  title: string;
};

export function LayoutTitle({ title }: LayoutTitleProps): JSX.Element {
  const router = useRouter();
  return (
    <Head>
      <title>{title ? `${title}・Chirpy` : 'Chirpy'}</title>
      <link rel="canonical" href={`https://chirpy.dev${router.asPath}`} />
    </Head>
  );
}
