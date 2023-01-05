import * as React from 'react';

export type SitesLayoutProps = {
  children: React.ReactNode;
};

export function SitesLayout(props: SitesLayoutProps): JSX.Element {
  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
      {props.children}
    </div>
  );
}
